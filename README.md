# 品牌官网前端

使用 Vue 3 + Vite 构建的品牌官网

## 技术栈
- Vue 3 + Vite + Vue Router
- Tailwind CSS 4（PostCSS）样式构建
- Vue I18n 国际化
- VueUse 组合式工具、Motion 动效
- Leaflet 地图组件

## 目录结构
- `src/views`：按业务分组的页面
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
## 其他
- 站点默认开启多语言，新增文案请同步更新 `src/i18n/locales/` 与图片映射。
