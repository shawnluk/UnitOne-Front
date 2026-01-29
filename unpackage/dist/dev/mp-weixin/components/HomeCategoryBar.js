"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "HomeCategoryBar",
  emits: ["select"],
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.items, (item, idx, i0) => {
      return common_vendor.e({
        a: item.icon,
        b: item.badge
      }, item.badge ? {} : {}, {
        c: common_vendor.t(item.text),
        d: idx,
        e: common_vendor.o(($event) => _ctx.$emit("select", item, idx), idx),
        f: item.isActive ? "blue" : "red"
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d21e0912"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/HomeCategoryBar.js.map
