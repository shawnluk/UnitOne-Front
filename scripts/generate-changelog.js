#!/usr/bin/env node
/**
 * 更新 README.md 中 <!-- AUTO_CHANGELOG_START --> … <!-- AUTO_CHANGELOG_END --> 之间内容：
 * - 工作区未提交（git status）
 * - 已提交历史：仅包含「提交日期」早于 Asia/Shanghai **当日** 的提交（当日及以后留给手工「### 当日」小节）
 *
 * 用法：在项目根目录执行  node scripts/generate-changelog.js
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const ROOT = path.resolve(__dirname, '..')
const README = path.join(ROOT, 'README.md')
const START = '<!-- AUTO_CHANGELOG_START -->'
const END = '<!-- AUTO_CHANGELOG_END -->'
const MAX_COMMITS = 200
const MAX_PATHS_PER_COMMIT = 40

function sh(cmd) {
	return execSync(cmd, { cwd: ROOT, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 })
}

function shanghaiYmd(d = new Date()) {
	return new Intl.DateTimeFormat('en-CA', {
		timeZone: 'Asia/Shanghai',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(d)
}

function parseCommits(logText) {
	const commits = []
	let cur = null
	for (const line of logText.split(/\r?\n/)) {
		const m = line.match(/^>>>([^|]+)\|([^|]+)\|(.*)$/)
		if (m) {
			if (cur) commits.push(cur)
			cur = { hash: m[1], date: m[2], subject: m[3].trim(), files: [] }
			continue
		}
		if (!cur) continue
		if (/^[MADRCU]\d*\t/.test(line) || /^R\d+\t/.test(line)) {
			const parts = line.split('\t').filter(Boolean)
			const status = parts[0]
			const rest = parts.slice(1).join(' → ')
			cur.files.push({ status, path: rest || parts[0] })
		}
	}
	if (cur) commits.push(cur)
	return commits
}

function formatFileLine(f) {
	const p = f.path.replace(/\t/g, ' ')
	return `- \`${f.status}\` ${p}`
}

function buildWorkingTreeSection() {
	let out = ''
	try {
		const porc = sh('git status --porcelain')
		const lines = porc.split(/\r?\n/).filter((l) => l.length > 2)
		if (lines.length === 0) {
			out += '（工作区干净，无未提交改动。）\n'
			return out
		}
		out += '相对 `HEAD` 的未提交变更：\n\n'
		for (const l of lines) {
			const xy = l.slice(0, 2)
			const file = l.slice(3).trim()
			const xyVis = xy.replace(/ /g, '·')
			out += `- \`${xyVis}\` ${file}\n`
		}
		try {
			const stat = sh('git diff --stat HEAD')
			if (stat.trim()) {
				out += '\n```text\n' + stat.trimEnd() + '\n```\n'
			}
		} catch (_) {
			/* ignore */
		}
	} catch (e) {
		out += `（无法读取 git 状态：${e.message}）\n`
	}
	return out
}

function buildCommittedSection(cutoffYmd) {
	let logText
	try {
		logText = sh(
			`git log -${MAX_COMMITS} --date=short --pretty=tformat:'>>>%h|%ad|%s' --name-status`
		)
	} catch (e) {
		return `（无法执行 git log：${e.message}）\n`
	}

	const commits = parseCommits(logText).filter((c) => c.date < cutoffYmd)
	const byDate = new Map()
	for (const c of commits) {
		if (!byDate.has(c.date)) byDate.set(c.date, [])
		byDate.get(c.date).push(c)
	}
	const dates = [...byDate.keys()].sort((a, b) => (a < b ? 1 : a > b ? -1 : 0))

	if (dates.length === 0) {
		return `（无提交日期早于 **${cutoffYmd}** 的记录。）\n`
	}

	let out = ''
	for (const date of dates) {
		out += `### ${date}\n\n`
		const list = byDate.get(date)
		for (const c of list) {
			out += `- **\`${c.hash}\`** ${c.subject}\n`
			if (c.files.length === 0) {
				out += '  - （无文件列表）\n'
				continue
			}
			const shown = c.files.slice(0, MAX_PATHS_PER_COMMIT)
			for (const f of shown) {
				out += `  ${formatFileLine(f)}\n`
			}
			if (c.files.length > MAX_PATHS_PER_COMMIT) {
				out += `  - … 共 ${c.files.length} 条路径，已省略部分\n`
			}
			out += '\n'
		}
	}
	return out.trimEnd() + '\n'
}

function buildAutoBlock() {
	const cutoffYmd = shanghaiYmd()
	const genAt = new Date().toLocaleString('zh-CN', {
		hour12: false,
		timeZone: 'Asia/Shanghai',
	})
	let md = ''
	md += `> 本段由 \`scripts/generate-changelog.js\` 于 **${genAt}**（Asia/Shanghai）根据 \`git\` 生成；**仅含提交日期早于 ${cutoffYmd} 的提交**（当日及以后请写在标记上方的手工小节）。\n\n`
	md += '#### 工作区未提交\n\n'
	md += buildWorkingTreeSection()
	md += `\n#### 已提交历史（早于 ${cutoffYmd}；新 → 旧，按提交日分组）\n\n`
	md += buildCommittedSection(cutoffYmd)
	return md
}

function main() {
	if (!fs.existsSync(README)) {
		console.error('找不到 README.md：', README)
		process.exit(1)
	}
	const raw = fs.readFileSync(README, 'utf8')
	const re = new RegExp(
		`${START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
		'm'
	)
	if (!re.test(raw)) {
		console.error('README.md 中未找到 AUTO_CHANGELOG 标记对。')
		process.exit(1)
	}
	const inner = buildAutoBlock()
	const next = raw.replace(re, `${START}\n\n${inner}\n${END}`)
	fs.writeFileSync(README, next, 'utf8')
	console.log('已更新', path.relative(ROOT, README), '（截断日', shanghaiYmd(), '）')
}

main()
