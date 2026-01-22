"use strict";
const common_vendor = require("./common/vendor.js");
const _sfc_main = {
  name: "Swiper",
  props: {
    // 轮播图数据
    swiperList: {
      type: Array,
      default: () => [
        { url: "/static/e_000102_r_ll.png" },
        { url: "/static/e_000103_r.png" },
        { url: "/static/e_000100_r_w.png" }
      ]
    }
  },
  data() {
    return {
      // currentIndex: 0
    };
  },
  methods: {
    // 点击轮播图项
    onItemClick(item, index) {
      this.$emit("itemClick", {
        item,
        index
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.swiperList, (item, index, i0) => {
      return {
        a: item.url,
        b: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0ce53761"]]);
exports.MiniProgramPage = MiniProgramPage;
//# sourceMappingURL=../.sourcemap/mp-weixin/Swiper.js.map
