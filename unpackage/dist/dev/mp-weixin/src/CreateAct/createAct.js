"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 发布活动弹窗控制
      showActivityModal: true,
      // 活动表单数据
      activityForm: {
        title: "",
        type: "",
        time: "",
        location: "",
        price: "",
        description: ""
      },
      // 选择器控制
      showTypeSelector: false,
      showTimeSelector: false
    };
  },
  methods: {
    closeActivityModal() {
      common_vendor.index.switchTab({
        url: "/pages/user/user"
      });
    },
    selectCoverImage() {
      common_vendor.index.__f__("log", "at src/CreateAct/createAct.vue:98", "选择活动封面");
    },
    submitActivity() {
      common_vendor.index.__f__("log", "at src/CreateAct/createAct.vue:102", "提交活动", this.activityForm);
      this.activityForm = {
        title: "",
        type: "",
        time: "",
        location: "",
        price: "",
        description: ""
      };
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showActivityModal
  }, $data.showActivityModal ? {
    b: common_vendor.o((...args) => $options.closeActivityModal && $options.closeActivityModal(...args)),
    c: common_vendor.o((...args) => $options.selectCoverImage && $options.selectCoverImage(...args)),
    d: $data.activityForm.title,
    e: common_vendor.o(($event) => $data.activityForm.title = $event.detail.value),
    f: common_vendor.t($data.activityForm.type || "请选择活动类型"),
    g: common_vendor.o(($event) => $data.showTypeSelector = true),
    h: common_vendor.t($data.activityForm.time || "请选择活动时间"),
    i: common_vendor.o(($event) => $data.showTimeSelector = true),
    j: $data.activityForm.location,
    k: common_vendor.o(($event) => $data.activityForm.location = $event.detail.value),
    l: $data.activityForm.price,
    m: common_vendor.o(($event) => $data.activityForm.price = $event.detail.value),
    n: $data.activityForm.description,
    o: common_vendor.o(($event) => $data.activityForm.description = $event.detail.value),
    p: common_vendor.o((...args) => $options.submitActivity && $options.submitActivity(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/src/CreateAct/createAct.js.map
