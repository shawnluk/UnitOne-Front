"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const HomeCategoryBar = () => "../../components/HomeCategoryBar.js";
const HomeActivityCard = () => "../../components/HomeActivityCard.js";
const Swiper = () => "../../components/Swiper2.js";
const _sfc_main = {
  components: { Swiper, HomeActivityCard, HomeCategoryBar },
  data() {
    return {
      title: "Hello",
      Number: 0,
      categoryItems: [
        { acid: 1, key: "sport", text: "约球", icon: "/static/e_000109_r.png", isActive: false },
        { acid: 2, key: "movie", text: "观影", icon: "/static/e_000103_r.png", isActive: false },
        { acid: 3, key: "outdoor", text: "户外", icon: "/static/e_000108_r.png", isActive: false },
        { acid: 4, key: "chat", text: "闲聊", icon: "/static/e_000102_r_ll.png", isActive: false },
        { acid: 5, keykey: "art", text: "艺术", icon: "/static/e_000100_r_w.png", isActive: false },
        { acid: 6, key: "subscribe", text: "订阅", icon: "/static/e_000109_r.png", badge: true, isActive: false }
      ],
      activityList: [
        {
          acid: 1,
          name: "1-1",
          isActive: false,
          cover: "/static/e_000100_r_w.png",
          title: "标题-1",
          locationText: "地址-1",
          timeText: "时间",
          orgAvatar: "/static/logo.png",
          orgName: "作者-1",
          joinCount: 10,
          joinAvatars: ["/static/flag_007_ll.png", "/static/e_000108_r.png", "/static/e_000103_r.png"]
        },
        {
          acid: 1,
          name: "1-2",
          isActive: false,
          cover: "/static/e_000100_r_w.png",
          title: "标题-1-2",
          locationText: "地址-1-2",
          timeText: "时间",
          orgAvatar: "/static/logo.png",
          orgName: "作者-1",
          joinCount: 10,
          joinAvatars: ["/static/flag_007_ll.png", "/static/e_000108_r.png", "/static/e_000103_r.png"]
        },
        {
          acid: 2,
          name: "2-2",
          isActive: false,
          cover: "/static/e_000100_r_w.png",
          title: "标题-2",
          locationText: "地址-2",
          timeText: "时间",
          orgAvatar: "/static/logo.png",
          orgName: "作者-2",
          joinCount: 11,
          joinAvatars: ["/static/flag_007_ll.png", "/static/e_000108_r.png", "/static/e_000103_r.png"]
        },
        {
          acid: 3,
          name: "3-3",
          isActive: false,
          cover: "/static/e_000100_r_w.png",
          title: "标题-3",
          locationText: "地址-3",
          timeText: "时间",
          orgAvatar: "/static/logo.png",
          orgName: "作者-3",
          joinCount: 12,
          joinAvatars: ["/static/e_000100_r_w.png", "/static/e_000102_r_ll.png", "/static/e_000109_r.png"]
        },
        {
          acid: 4,
          name: "4-4",
          isActive: false,
          cover: "/static/e_000100_r_w.png",
          title: "标题-4",
          locationText: "地址-4",
          timeText: "时间",
          orgAvatar: "/static/logo.png",
          orgName: "作者-4",
          joinCount: 13,
          joinAvatars: ["/static/flag_007_ll.png", "/static/e_000108_r.png", "/static/e_000103_r.png"]
        },
        {
          acid: 5,
          name: "5-5",
          isActive: false,
          cover: "/static/e_000100_r_w.png",
          title: "标题-5",
          locationText: "地址-5",
          timeText: "时间",
          orgAvatar: "/static/logo.png",
          orgName: "作者-5",
          joinCount: 14,
          joinAvatars: [
            "/static/e_000100_r_w.png",
            "/static/e_000100_r_w.png",
            "/static/e_000109_r.png",
            "/static/e_000100_r_w.png",
            "/static/e_000102_r_ll.png",
            "/static/e_000109_r.png",
            "/static/e_000100_r_w.png",
            "/static/e_000100_r_w.png",
            "/static/e_000109_r.png",
            "/static/e_000100_r_w.png",
            "/static/e_000102_r_ll.png",
            "/static/e_000109_r.png"
          ]
        }
      ],
      NewActivityList: []
    };
  },
  onLoad() {
    this.activityList.forEach((value) => {
      value.isActive = true;
    });
    this.NewActivityList = this.activityList;
  },
  methods: {
    onSelectCategory(item, index) {
      this.NewActivityList = [], this.Number = item.acid;
      this.categoryItems.forEach((value) => {
        value.isActive = false;
      });
      this.NewActivityList = this.activityList.filter((e) => e.acid === item.acid);
      this.categoryItems[index].isActive = !this.categoryItems[index].isActive;
      this.NewActivityList.forEach((value) => {
        value.isActive = true;
      });
    },
    onClickFilter() {
      common_vendor.index.showToast({ title: "点击了筛选", icon: "none" });
    },
    onSelectCard(item) {
      common_vendor.index.navigateTo({
        url: "/src/ActivityDetail/activity-detail?item=" + encodeURIComponent(JSON.stringify(item))
      });
    },
    onclickHeadTitle() {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    },
    goto(i) {
      if (i === 1) {
        common_vendor.index.navigateTo({
          url: "/components/ButtonList"
        });
      }
      if (i === 2) {
        common_vendor.index.navigateTo({
          url: "/components/Swiper"
        });
      }
    }
  }
};
if (!Array) {
  const _component_Swiper = common_vendor.resolveComponent("Swiper");
  const _component_HomeCategoryBar = common_vendor.resolveComponent("HomeCategoryBar");
  const _component_HomeActivityCard = common_vendor.resolveComponent("HomeActivityCard");
  (_component_Swiper + _component_HomeCategoryBar + _component_HomeActivityCard)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_1,
    b: common_assets._imports_1$1,
    c: common_vendor.o($options.onSelectCategory),
    d: common_vendor.p({
      items: $data.categoryItems
    }),
    e: common_vendor.o((...args) => $options.onclickHeadTitle && $options.onclickHeadTitle(...args)),
    f: common_vendor.o((...args) => $options.onClickFilter && $options.onClickFilter(...args)),
    g: common_vendor.o($options.onSelectCard),
    h: common_vendor.p({
      items: $data.NewActivityList
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
