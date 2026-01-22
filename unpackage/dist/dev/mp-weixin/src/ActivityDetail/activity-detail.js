"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "activity-detail",
  setup(__props) {
    const actDetail = common_vendor.reactive({
      data: {}
      // joinAvatars:[],
    });
    common_vendor.onLoad((option) => {
      actDetail.data = JSON.parse(decodeURIComponent(option.item));
    });
    const backTo = () => {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(backTo),
        b: common_vendor.t(actDetail.data.acid),
        c: common_vendor.t(actDetail.data.name),
        d: common_vendor.t(actDetail.data.title),
        e: common_assets._imports_0,
        f: common_vendor.t(actDetail.data.title),
        g: common_vendor.t(actDetail.data.time),
        h: common_vendor.t(actDetail.data.locationText),
        i: common_vendor.t(actDetail.data.joinCount),
        j: common_vendor.f(actDetail.data.joinAvatars, (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6289bdfd"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/src/ActivityDetail/activity-detail.js.map
