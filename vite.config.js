import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 图片优化插件：自动压缩 PNG、JPEG、WebP 等格式
    ViteImageOptimizer({
      // 匹配的图片文件类型
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      // 包含 public 目录（如果需要）
      includePublic: false,
      // 启用统计日志
      logStats: true,
      // PNG 压缩配置
      png: {
        quality: 75,
      },
      // JPEG 压缩配置
      jpeg: {
        quality: 75,
      },
      // WebP 配置
      webp: {
        quality: 75,
      },
      // SVG 优化配置
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
  ],
  // 优化构建配置
  build: {
    // 启用代码分割
    rollupOptions: {
      output: {
        // 将图片资源单独打包
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        // 手动分包，避免单个 chunk 过大
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'vue-i18n'],
        },
      },
    },
    // 启用压缩（使用 esbuild，Vite 默认，更快且无需额外依赖）
    minify: 'esbuild',
    // 增加 chunk 大小警告限制（因为图片可能较大）
    chunkSizeWarningLimit: 2000,
  },
  // 优化开发服务器
  server: {
    // 启用 HTTP/2
    http2: true,
  },
})
