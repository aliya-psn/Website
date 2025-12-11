# 品牌官网前端

一个使用 Vue 3 + Vite 构建的品牌官网，覆盖首页、产品、科学研发、会员服务、房屋科技等多业务板块，支持中英文切换与多媒体展示。

## 技术栈
- Vue 3 + Vite + Vue Router
- Tailwind CSS 4（PostCSS）样式构建
- Vue I18n 国际化
- VueUse 组合式工具、Motion 动效
- Leaflet 地图组件

## 目录结构
- `src/views`：按业务分组的页面（home、product、science、member、house 等）
- `src/components`：导航、页脚、时间轴、懒加载图片等通用组件
- `src/assets`：各业务线图片资源
- `src/i18n`：多语言文案与图片映射
- `src/utils`：IP 定位、常量等工具

## 快速开始
```bash
npm install
npm run dev
```
本地开发默认使用 Vite，端口见终端输出。

## 构建与预览
```bash
npm run build
npm run preview
```

## 图片性能优化

项目已实施以下图片加载优化方案：

### 1. 按需加载
- 使用 `eager: false` 实现图片懒加载，避免预加载所有图片资源
- 只有在图片进入视口时才加载，大幅减少初始加载时间

### 2. 图片压缩
- 集成 `vite-plugin-image-optimizer` 插件
- 构建时自动压缩 PNG、JPEG、WebP 等格式
- 压缩质量设置为 75%，在质量和文件大小之间取得平衡

### 3. 懒加载组件
- `LazyImage` 组件支持 IntersectionObserver 懒加载
- 自动处理异步图片路径解析
- 提供骨架屏占位符，提升用户体验

### 4. 构建优化
- 图片资源单独打包到 `assets/images/` 目录
- 启用代码分割，避免单个 chunk 过大
- 优化资源加载策略

### 使用建议
- 开发环境：图片按需加载，首次访问可能较慢
- 生产环境：运行 `npm run build` 后，图片会被自动压缩
- 如需进一步优化，建议：
  - 将大图（>2MB）转换为 WebP 格式
  - 使用响应式图片（srcset）
  - 考虑使用 CDN 加速

## 其他
- 站点默认开启多语言，新增文案请同步更新 `src/i18n/locales/` 与图片映射。
