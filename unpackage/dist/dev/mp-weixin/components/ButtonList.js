"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      buttonList: [
        { isActive: false },
        { isActive: false },
        { isActive: false },
        { isActive: false },
        { isActive: false }
      ]
    };
  },
  methods: {
    changeColor(index) {
      this.buttonList[index].isActive = !this.buttonList[index].isActive;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.buttonList, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: index,
        c: common_vendor.o(($event) => $options.changeColor(index), index),
        d: item.isActive ? "red" : "#f0f0f0"
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-59c9b90d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/ButtonList.js.map
