# 官网
使用 Vue 3 + Vite 构建的官网

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本，打包dist
npm run build
```

## 目录说明

- `src/assets/` - 图片、字体等静态资源
- `src/i18n/locales/` - 多语言文案文件
- `src/i18n/images.json` - CDN 图片配置
- `src/i18n/images_local.json` - 本地图片配置

## 配置说明

### 图片位置配置

网站使用的图片资源位置在以下文件中配置：

- **`src/i18n/images.json`** - CDN 图片地址（远程图片）- 目前不使用
- **`src/i18n/images_local.json`** - 本地图片地址（本地资源）

**修改图片：**
1. 将图片文件放入 `src/assets/` 目录
2. 在 `src/i18n/images_local.json` 中更新对应的图片路径
3. 图片路径使用相对路径，例如：`"product.1": "/src/assets/product_1.jpg"`

### 国际化文案配置

网站支持多语言，文案文件位于：

- **`src/i18n/locales/zh-CN.json`** - 中文文案
- **`src/i18n/locales/en.json`** - 英文文案

### IP 定位功能

IP 自动定位功能**当前已关闭**。

如需开启：打开 `src/i18n/index.js` 文件，取消注释60-65行，并注释掉55-58行的代码

