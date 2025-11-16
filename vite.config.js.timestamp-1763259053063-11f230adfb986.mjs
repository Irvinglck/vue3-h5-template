// vite.config.js
import { fileURLToPath, URL } from "node:url";
import vueSetupExtend from "file:///F:/part_job/tqzs_stu/vue3-h5-template/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import { defineConfig, loadEnv } from "file:///F:/part_job/tqzs_stu/vue3-h5-template/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/part_job/tqzs_stu/vue3-h5-template/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///F:/part_job/tqzs_stu/vue3-h5-template/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import Components from "file:///F:/part_job/tqzs_stu/vue3-h5-template/node_modules/unplugin-vue-components/dist/vite.js";
import { VantResolver } from "file:///F:/part_job/tqzs_stu/vue3-h5-template/node_modules/@vant/auto-import-resolver/dist/index.js";
import { createSvgIconsPlugin } from "file:///F:/part_job/tqzs_stu/vue3-h5-template/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import mockDevServerPlugin from "file:///F:/part_job/tqzs_stu/vue3-h5-template/node_modules/vite-plugin-mock-dev-server/dist/index.js";
import viteCompression from "file:///F:/part_job/tqzs_stu/vue3-h5-template/node_modules/vite-plugin-compression/dist/index.mjs";
import { createHtmlPlugin } from "file:///F:/part_job/tqzs_stu/vue3-h5-template/node_modules/vite-plugin-html/dist/index.mjs";

// build/cdn.js
import { cdn } from "file:///F:/part_job/tqzs_stu/vue3-h5-template/node_modules/vite-plugin-cdn2/dist/index.mjs";
import { unpkg } from "file:///F:/part_job/tqzs_stu/vue3-h5-template/node_modules/vite-plugin-cdn2/dist/resolver/unpkg.mjs";
function enableCDN(isEnabled) {
  if (isEnabled === "true") {
    return cdn({
      resolve: unpkg(),
      modules: ["vue", "vue-demi", "pinia", "axios", "vant", "vue-router"]
    });
  }
}

// vite.config.js
var __vite_injected_original_import_meta_url = "file:///F:/part_job/tqzs_stu/vue3-h5-template/vite.config.js";
var root = process.cwd();
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "");
  return {
    base: env.VITE_BASE_URL || "/",
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [VantResolver()]
      }),
      // 允许 setup 语法糖上添加组件名属性
      vueSetupExtend(),
      // svg icon
      createSvgIconsPlugin({
        // 指定图标文件夹
        iconDirs: [path.resolve(root, "src/icons/svg")],
        // 指定 symbolId 格式
        symbolId: "icon-[dir]-[name]"
      }),
      mockDevServerPlugin(),
      // 生产环境 gzip 压缩资源
      viteCompression(),
      // 注入模板数据
      createHtmlPlugin({
        inject: {
          data: {
            ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || "false"
          }
        }
      }),
      // 生产环境默认不启用 CDN 加速
      enableCDN(env.VITE_CDN_DEPS)
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      host: true,
      // 仅在 proxy 中配置的代理前缀， mock-dev-server 才会拦截并 mock
      // doc: https://github.com/pengzhanbo/vite-plugin-mock-dev-server
      proxy: {
        "^/dev-api": {
          target: ""
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAiYnVpbGQvY2RuLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxccGFydF9qb2JcXFxcdHF6c19zdHVcXFxcdnVlMy1oNS10ZW1wbGF0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxccGFydF9qb2JcXFxcdHF6c19zdHVcXFxcdnVlMy1oNS10ZW1wbGF0ZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovcGFydF9qb2IvdHF6c19zdHUvdnVlMy1oNS10ZW1wbGF0ZS92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xyXG5pbXBvcnQgdnVlU2V0dXBFeHRlbmQgZnJvbSBcInZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmRcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB2dWVKc3ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjtcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcclxuaW1wb3J0IHsgVmFudFJlc29sdmVyIH0gZnJvbSBcIkB2YW50L2F1dG8taW1wb3J0LXJlc29sdmVyXCI7XHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgbW9ja0RldlNlcnZlclBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tbW9jay1kZXYtc2VydmVyXCI7XHJcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4taHRtbFwiO1xyXG5pbXBvcnQgeyBlbmFibGVDRE4gfSBmcm9tIFwiLi9idWlsZC9jZG5cIjtcclxuXHJcbi8vIFx1NUY1M1x1NTI0RFx1NURFNVx1NEY1Q1x1NzZFRVx1NUY1NVx1OERFRlx1NUY4NFxyXG5jb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICAvLyBcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QsIFwiXCIpO1xyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlOiBlbnYuVklURV9CQVNFX1VSTCB8fCBcIi9cIixcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKCksXHJcbiAgICAgIHZ1ZUpzeCgpLFxyXG4gICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICByZXNvbHZlcnM6IFtWYW50UmVzb2x2ZXIoKV1cclxuICAgICAgfSksXHJcbiAgICAgIC8vIFx1NTE0MVx1OEJCOCBzZXR1cCBcdThCRURcdTZDRDVcdTdDRDZcdTRFMEFcdTZERkJcdTUyQTBcdTdFQzRcdTRFRjZcdTU0MERcdTVDNUVcdTYwMjdcclxuICAgICAgdnVlU2V0dXBFeHRlbmQoKSxcclxuICAgICAgLy8gc3ZnIGljb25cclxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgIC8vIFx1NjMwN1x1NUI5QVx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxyXG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHJvb3QsIFwic3JjL2ljb25zL3N2Z1wiKV0sXHJcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBIHN5bWJvbElkIFx1NjgzQ1x1NUYwRlxyXG4gICAgICAgIHN5bWJvbElkOiBcImljb24tW2Rpcl0tW25hbWVdXCJcclxuICAgICAgfSksXHJcbiAgICAgIG1vY2tEZXZTZXJ2ZXJQbHVnaW4oKSxcclxuICAgICAgLy8gXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzIGd6aXAgXHU1MzhCXHU3RjI5XHU4RDQ0XHU2RTkwXHJcbiAgICAgIHZpdGVDb21wcmVzc2lvbigpLFxyXG4gICAgICAvLyBcdTZDRThcdTUxNjVcdTZBMjFcdTY3N0ZcdTY1NzBcdTYzNkVcclxuICAgICAgY3JlYXRlSHRtbFBsdWdpbih7XHJcbiAgICAgICAgaW5qZWN0OiB7XHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIEVOQUJMRV9FUlVEQTogZW52LlZJVEVfRU5BQkxFX0VSVURBIHx8IFwiZmFsc2VcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICAgIC8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1OUVEOFx1OEJBNFx1NEUwRFx1NTQyRlx1NzUyOCBDRE4gXHU1MkEwXHU5MDFGXHJcbiAgICAgIGVuYWJsZUNETihlbnYuVklURV9DRE5fREVQUylcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG9zdDogdHJ1ZSxcclxuICAgICAgLy8gXHU0RUM1XHU1NzI4IHByb3h5IFx1NEUyRFx1OTE0RFx1N0Y2RVx1NzY4NFx1NEVFM1x1NzQwNlx1NTI0RFx1N0YwMFx1RkYwQyBtb2NrLWRldi1zZXJ2ZXIgXHU2MjREXHU0RjFBXHU2MkU2XHU2MjJBXHU1RTc2IG1vY2tcclxuICAgICAgLy8gZG9jOiBodHRwczovL2dpdGh1Yi5jb20vcGVuZ3poYW5iby92aXRlLXBsdWdpbi1tb2NrLWRldi1zZXJ2ZXJcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICBcIl4vZGV2LWFwaVwiOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IFwiXCJcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxyXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwic3RhdGljL2pzL1tuYW1lXS1baGFzaF0uanNcIixcclxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcInN0YXRpYy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdXCJcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxwYXJ0X2pvYlxcXFx0cXpzX3N0dVxcXFx2dWUzLWg1LXRlbXBsYXRlXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxwYXJ0X2pvYlxcXFx0cXpzX3N0dVxcXFx2dWUzLWg1LXRlbXBsYXRlXFxcXGJ1aWxkXFxcXGNkbi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovcGFydF9qb2IvdHF6c19zdHUvdnVlMy1oNS10ZW1wbGF0ZS9idWlsZC9jZG4uanNcIjtpbXBvcnQgeyBjZG4gfSBmcm9tIFwidml0ZS1wbHVnaW4tY2RuMlwiO1xyXG5pbXBvcnQgeyB1bnBrZyB9IGZyb20gXCJ2aXRlLXBsdWdpbi1jZG4yL3Jlc29sdmVyL3VucGtnXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlQ0ROKGlzRW5hYmxlZCkge1xyXG4gIGlmIChpc0VuYWJsZWQgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICByZXR1cm4gY2RuKHtcclxuICAgICAgcmVzb2x2ZTogdW5wa2coKSxcclxuICAgICAgbW9kdWxlczogW1widnVlXCIsIFwidnVlLWRlbWlcIiwgXCJwaW5pYVwiLCBcImF4aW9zXCIsIFwidmFudFwiLCBcInZ1ZS1yb3V0ZXJcIl1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlTLFNBQVMsZUFBZSxXQUFXO0FBQzVVLE9BQU8sb0JBQW9CO0FBQzNCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxVQUFVO0FBQ2pCLE9BQU8seUJBQXlCO0FBQ2hDLE9BQU8scUJBQXFCO0FBQzVCLFNBQVMsd0JBQXdCOzs7QUNYNFEsU0FBUyxXQUFXO0FBQ2pVLFNBQVMsYUFBYTtBQUVmLFNBQVMsVUFBVSxXQUFXO0FBQ25DLE1BQUksY0FBYyxRQUFRO0FBQ3hCLFdBQU8sSUFBSTtBQUFBLE1BQ1QsU0FBUyxNQUFNO0FBQUEsTUFDZixTQUFTLENBQUMsT0FBTyxZQUFZLFNBQVMsU0FBUyxRQUFRLFlBQVk7QUFBQSxJQUNyRSxDQUFDO0FBQUEsRUFDSDtBQUNGOzs7QURWeUwsSUFBTSwyQ0FBMkM7QUFlMU8sSUFBTSxPQUFPLFFBQVEsSUFBSTtBQUd6QixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUV4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLE1BQU0sRUFBRTtBQUNsQyxTQUFPO0FBQUEsSUFDTCxNQUFNLElBQUksaUJBQWlCO0FBQUEsSUFDM0IsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFDLGFBQWEsQ0FBQztBQUFBLE1BQzVCLENBQUM7QUFBQTtBQUFBLE1BRUQsZUFBZTtBQUFBO0FBQUEsTUFFZixxQkFBcUI7QUFBQTtBQUFBLFFBRW5CLFVBQVUsQ0FBQyxLQUFLLFFBQVEsTUFBTSxlQUFlLENBQUM7QUFBQTtBQUFBLFFBRTlDLFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxNQUNELG9CQUFvQjtBQUFBO0FBQUEsTUFFcEIsZ0JBQWdCO0FBQUE7QUFBQSxNQUVoQixpQkFBaUI7QUFBQSxRQUNmLFFBQVE7QUFBQSxVQUNOLE1BQU07QUFBQSxZQUNKLGNBQWMsSUFBSSxxQkFBcUI7QUFBQSxVQUN6QztBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQTtBQUFBLE1BRUQsVUFBVSxJQUFJLGFBQWE7QUFBQSxJQUM3QjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQTtBQUFBO0FBQUEsTUFHTixPQUFPO0FBQUEsUUFDTCxhQUFhO0FBQUEsVUFDWCxRQUFRO0FBQUEsUUFDVjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
