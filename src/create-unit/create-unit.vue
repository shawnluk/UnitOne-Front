<template>
	<view class="page">
		<text class="lead">创建小队，与搭子一起玩。上传头像、填写名称后即可提交（接口待接入）。</text>

		<view class="field">
			<text class="label">小队头像</text>
			<view
				class="avatarPicker"
				:class="{ hasAvatar: !!avatarTempPath }"
				hover-class="avatarPicker--hover"
				hover-stay-time="120"
				@tap="selectAvatar"
			>
				<image v-if="avatarTempPath" class="avatarImg" :src="avatarTempPath" mode="aspectFill" />
				<view v-else class="avatarPlaceholder">
					<text class="avatarPlus">＋</text>
					<text class="avatarHint">点击上传</text>
				</view>
			</view>
			<text v-if="avatarTempPath" class="avatarTip" @tap.stop="selectAvatar">点击可更换头像</text>
		</view>

		<view class="field">
			<text class="label">小队名称</text>
			<input
				:key="nameInputKey"
				class="input"
				type="text"
				:value="unitName"
				placeholder="例如周末徒步小队"
				placeholder-class="ph"
				:adjust-position="true"
				:cursor-spacing="24"
				@input="onUnitNameInput"
				@compositionend="onUnitNameInput"
			/>
			<text class="hint">仅中文、字母、数字、空格；最多 8 个汉字或 16 个英文字符（混合按字数折算）</text>
			<text class="counter">已用 {{ nameWidthUsed }} / {{ nameWidthMax }}</text>
		</view>

		<view class="field">
			<text class="label">简介（可选）</text>
			<textarea
				class="textarea"
				:value="unitIntro"
				placeholder="一句话说明小队做什么"
				placeholder-class="ph"
				:auto-height="true"
				:maxlength="unitIntroMaxLen"
				:cursor-spacing="24"
				@input="onUnitIntroInput"
			/>
			<text class="hint">最多 {{ unitIntroMaxLen }} 个字符</text>
		</view>

		<view class="primary" hover-class="primary--hover" @tap="onSubmitPlaceholder">
			<text class="primaryTxt">提交（待接入接口）</text>
		</view>
	</view>
</template>

<script>
import {
	clampSquadName,
	squadNameDisplayWidth,
	stripInvalidSquadChars,
	SQUAD_NAME_MAX_WIDTH,
} from '@/utils/squad-name.js'

const SQUAD_NAME_TOAST_GAP_MS = 600
/** 小队简介最大字符数（含换行等，与 textarea maxlength 一致） */
const UNIT_INTRO_MAX_LEN = 100

export default {
	data() {
		return {
			avatarTempPath: '',
			unitName: '',
			unitIntro: '',
			unitIntroMaxLen: UNIT_INTRO_MAX_LEN,
			/** 与计数条同步，避免部分端 computed 不随 :value 输入刷新 */
			nameWidthUsed: 0,
			nameWidthMax: SQUAD_NAME_MAX_WIDTH,
			/** 受控 input 缩短时部分端原生不刷新，变更 key 强制重建以显示截断结果 */
			nameInputKey: 0,
			_lastSquadWidthToastAt: 0,
		}
	},
	methods: {
		/**
		 * uni-app：小程序常见 e.detail.value；H5 常见 e.target.value；
		 * 少数封装会挂在 mpEvent / nativeEvent。
		 */
		readInputValue(e) {
			if (!e) return ''
			const pick = (v) => {
				if (v === undefined || v === null) return null
				const s = String(v)
				return s === 'undefined' ? null : s
			}
			const detailVal = () => {
				const d = e.detail
				if (d == null) return null
				if (typeof d === 'string') return pick(d)
				return pick(d.value)
			}
			const chain = [
				detailVal,
				() => pick(e.mpEvent && e.mpEvent.detail && e.mpEvent.detail.value),
				() => pick(e.nativeEvent && e.nativeEvent.detail && e.nativeEvent.detail.value),
				() => pick(e.target && e.target.value),
				() => pick(e.currentTarget && e.currentTarget.value),
			]
			for (const get of chain) {
				const s = get()
				if (s !== null) return s
			}
			return ''
		},
		/** 同步当前名称的显示宽度计数 */
		syncNameWidthUsed() {
			this.nameWidthUsed = squadNameDisplayWidth(this.unitName || '')
		},
		/** 名称输入处理：过滤非法字符、超宽截断并同步计数 */
		onUnitNameInput(e) {
			const raw = this.readInputValue(e)
			// blur/change 在部分端无 detail.value，若仍绑定会误把名称清空，导致计数与截断「不生效」
			const t = e && e.type
			if (
				raw === '' &&
				(t === 'blur' || t === 'change') &&
				String(this.unitName || '').length > 0
			) {
				this.syncNameWidthUsed()
				return
			}
			const onlyValid = stripInvalidSquadChars(raw)
			const w = squadNameDisplayWidth(onlyValid)
			if (w > SQUAD_NAME_MAX_WIDTH) {
				this.maybeToastSquadMaxWidth()
			}
			const next = clampSquadName(raw)
			this.unitName = next
			this.syncNameWidthUsed()
			const needRemount =
				raw !== onlyValid || next !== onlyValid
			if (needRemount) {
				this.nameInputKey += 1
			}
		},
		onUnitIntroInput(e) {
			let s = this.readInputValue(e)
			if (s.length > UNIT_INTRO_MAX_LEN) {
				s = s.slice(0, UNIT_INTRO_MAX_LEN)
			}
			this.unitIntro = s
		},
		/** 名称超宽时提示（带间隔防抖） */
		maybeToastSquadMaxWidth() {
			const now = Date.now()
			if (now - this._lastSquadWidthToastAt < SQUAD_NAME_TOAST_GAP_MS) return
			this._lastSquadWidthToastAt = now
			uni.showToast({ title: '已达最大宽度，已截断', icon: 'none' })
		},
		selectAvatar() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed', 'original'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					const path = res.tempFilePaths && res.tempFilePaths[0]
					if (path) this.avatarTempPath = path
				},
				fail: (err) => {
					const msg = (err && err.errMsg) || ''
					if (msg.includes('cancel') || msg.includes('取消')) return
					uni.showToast({ title: '选择图片失败', icon: 'none' })
				},
			})
		},
		/** 提交占位：校验头像/名称/简介后提示接口待接入 */
		onSubmitPlaceholder() {
			if (!this.avatarTempPath) {
				uni.showToast({ title: '请先上传小队头像', icon: 'none' })
				return
			}
			const name = (this.unitName || '').trim()
			if (!name) {
				uni.showToast({ title: '请填写小队名称', icon: 'none' })
				return
			}
			if (squadNameDisplayWidth(name) > SQUAD_NAME_MAX_WIDTH) {
				uni.showToast({ title: '小队名称超出长度限制', icon: 'none' })
				return
			}
			const intro = this.unitIntro || ''
			if (intro.length > UNIT_INTRO_MAX_LEN) {
				uni.showToast({ title: `简介最多 ${UNIT_INTRO_MAX_LEN} 个字符`, icon: 'none' })
				return
			}
			uni.showToast({ title: '接口待接入', icon: 'none' })
		},
	},
}
</script>

<style>
.page {
	min-height: 100vh;
	box-sizing: border-box;
	padding: 32rpx 28rpx 48rpx;
	background: linear-gradient(180deg, #f0f4ff 0%, #f7f5ff 45%, #ffffff 100%);
}

.lead {
	display: block;
	font-size: 26rpx;
	color: #6c6392;
	line-height: 1.55;
	margin-bottom: 36rpx;
}

.field {
	margin-bottom: 28rpx;
}

.label {
	display: block;
	font-size: 26rpx;
	color: #3b3558;
	margin-bottom: 12rpx;
	font-weight: 600;
}

.avatarPicker {
	width: 200rpx;
	height: 200rpx;
	border-radius: 50%;
	background: #ffffff;
	border: 2rpx dashed rgba(125, 95, 255, 0.35);
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	box-sizing: border-box;
}

.avatarPicker.hasAvatar {
	border-style: solid;
	border-color: rgba(125, 95, 255, 0.22);
	box-shadow: 0 12rpx 28rpx rgba(93, 55, 255, 0.15);
}

.avatarPicker--hover {
	opacity: 0.88;
}

.avatarImg {
	width: 100%;
	height: 100%;
}

.avatarPlaceholder {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	padding: 16rpx;
}

.avatarPlus {
	font-size: 56rpx;
	line-height: 1;
	color: #7d5fff;
	font-weight: 300;
}

.avatarHint {
	font-size: 22rpx;
	color: #8d79c9;
}

.avatarTip {
	display: block;
	margin-top: 12rpx;
	font-size: 22rpx;
	color: #8d79c9;
}

.input,
.textarea {
	width: 100%;
	box-sizing: border-box;
	min-height: 88rpx;
	padding: 22rpx 24rpx;
	border-radius: 20rpx;
	background: #ffffff;
	border: 2rpx solid rgba(125, 95, 255, 0.18);
	font-size: 28rpx;
	line-height: 1.45;
	color: #1b1732;
}

.textarea {
	min-height: 160rpx;
	line-height: 1.45;
}

.hint {
	display: block;
	margin-top: 10rpx;
	font-size: 22rpx;
	color: #8d79c9;
	line-height: 1.45;
}

.counter {
	display: block;
	margin-top: 8rpx;
	font-size: 22rpx;
	color: #5d37ff;
	font-weight: 600;
}

.ph {
	color: #b0aac4;
}

.primary {
	margin-top: 48rpx;
	height: 96rpx;
	border-radius: 999rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(90deg, #7d5fff 0%, #5f8bff 100%);
	box-shadow: 0 16rpx 36rpx rgba(93, 55, 255, 0.28);
}

.primary--hover {
	opacity: 0.92;
}

.primaryTxt {
	font-size: 30rpx;
	font-weight: 600;
	color: #ffffff;
}
</style>
