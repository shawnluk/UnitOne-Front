"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      bannerList: [
        { url: "/static/e_000100_r_w.png" },
        { url: "/static/e_000102_r_ll.png" },
        { url: "/static/e_000103_r.png" }
      ]
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_1,
    b: common_assets._imports_1$3,
    c: common_vendor.f($data.bannerList, (item, index, i0) => {
      return {
        a: item.url,
        b: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/message.js.map
