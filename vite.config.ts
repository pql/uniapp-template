import { defineConfig, PluginOption } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import ViteWeappTailwindcssPlugin from "weapp-tailwindcss-webpack-plugin/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import postcssRemToResponsivePixelPlugin from "postcss-rem-to-responsive-pixel";

// 注意： 打包成 h5 和 app 都不需要开启插件配置
const isH5 = process.env.UNI_PLATFORM === "h5";
const isApp = process.env.UNI_PLATFORM === "app";
// 在 h5 环境和 app 环境禁用插件
const WeappTailwindcssDisabled = isH5 || isApp;

const vitePlugins = [
  uni() as PluginOption,
  WeappTailwindcssDisabled ? undefined : ViteWeappTailwindcssPlugin(),
];
const postcssPlugins = [autoprefixer(), tailwindcss()];

if (!WeappTailwindcssDisabled) {
  postcssPlugins.push(
    postcssRemToResponsivePixelPlugin({
      rootValue: 32,
      propList: ["*"],
      transformUnit: "rpx",
    })
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: vitePlugins,
  css: {
    postcss: {
      plugins: postcssPlugins,
    },
  },
});
