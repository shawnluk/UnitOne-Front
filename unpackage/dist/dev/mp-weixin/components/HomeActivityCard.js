"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "HomeActivityCard",
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  emits: ["select"]
  // computed: {
  //   avatarGroup() {
  //     const arr = Array.isArray(this.items[index].joinAvatars) ? this.items[index].joinAvatars : []
  //     return arr.slice(0, 3)
  //   },
  // },
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.items, (data, index, i0) => {
      return common_vendor.e({
        a: data.cover,
        b: common_vendor.t(data.title),
        c: data.tagText
      }, data.tagText ? {
        d: common_vendor.t(data.tagText)
      } : {}, {
        e: common_vendor.t(data.timeText),
        f: common_vendor.t(data.locationText),
        g: data.orgAvatar,
        h: common_vendor.t(data.orgName),
        i: common_vendor.t(data.joinCount),
        j: common_vendor.f(data.joinAvatars.slice(0, 3), (a, idx, i1) => {
          return {
            a: idx,
            b: 10 - idx,
            c: a
          };
        }),
        k: common_vendor.o(($event) => _ctx.$emit("select", data, index))
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-976027e2"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/HomeActivityCard.js.map
