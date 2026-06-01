# 前端内容修改指南

本文档说明了修改哪些文件可以改动网站的前端内容。

## 📋 项目概述

这是一个基于 **Vue 3 + Vite** 构建的实验室官网项目。

## 🎯 核心数据文件（最重要）

### `src/data/siteData.js` - 网站所有内容数据
这是**最重要**的文件，包含网站的所有展示内容：

```javascript
export const siteInfo = {
  name: '问题研究社',              // 修改实验室中文名称
  nameEn: 'Problem Research Lab', // 修改实验室英文名称
  subtitle: '...',                 // 修改副标题
  email: 'guoyun@mails.neu.edu.cn',      // 修改联系邮箱
  location: '北京 · 问题研究社联合空间', // 修改地址
}

export const navItems = [...]           // 修改导航栏菜单项

export const stats = [...]               // 修改首页统计数据

export const researchProblems = [...]   // 修改研究问题库

export const publications = [...]       // 修改论文列表

export const news = [...]               // 修改动态新闻

export const resources = [...]          // 修改资源列表

export const people = [...]             // 修改团队成员信息
```

### 修改示例

**修改实验室名称：**
```javascript
export const siteInfo = {
  name: '你的实验室名称',
  nameEn: 'Your Lab Name',
  ...
}
```

**添加新的研究问题：**
```javascript
export const researchProblems = [
  {
    "id": "problem-XXX",
    "title": "问题标题",
    "direction": "方向名称",
    "year": "2026",
    "owner": "负责人",
    "problem": "问题描述",
    "vision": "愿景",
    "value": "价值",
    "challenge": "挑战",
    "opportunity": "机会",
    "progress": "进展",
    "accent": "teal",  // 主题色
    "tags": ["标签1", "标签2"],
    "status": "状态"
  },
  ...
]
```

---

## 🎨 样式文件

### `src/styles/main.css` - 全局样式
修改网站的整体样式：

- `--ink`: 主要文字颜色
- `--blue`, `--teal`, `--amber`, `--rose`: 主题色
- `--radius`: 圆角大小
- `font-family`: 字体设置

**修改主题色示例：**
```css
:root {
  --blue: #4f82c2;    /* 修改主蓝色 */
  --teal: #1fb7b1;    /* 修改青色 */
  --amber: #f2b84b;   /* 修改琥珀色 */
  ...
}
```

---

## 📄 页面布局文件

### 页面视图文件（主要布局，内容来自 siteData.js）

| 文件路径 | 功能 |
|---------|------|
| `src/views/HomeView.vue` | 首页布局 |
| `src/views/PeopleView.vue` | 团队页面 |
| `src/views/PublicationsView.vue` | 成果页面 |
| `src/views/NewsView.vue` | 动态页面 |
| `src/views/ProjectsView.vue` | 项目页面 |
| `src/views/ResourcesView.vue` | 资源页面 |
| `src/views/JoinView.vue` | 加入我们页面 |
| `src/views/ResearchDetailView.vue` | 研究方向详情页 |
| `src/views/PublicationDetailView.vue` | 论文详情页 |
| `src/views/ProjectDetailView.vue` | 项目详情页 |

### 通用组件

| 文件路径 | 功能 |
|---------|------|
| `src/components/LabHeader.vue` | 顶部导航栏 |
| `src/components/SiteFooter.vue` | 底部页脚 |
| `src/components/PageHero.vue` | 页面标题头 |
| `src/components/HeroVisual.vue` | 首页视觉元素 |

---

## 🚀 常见修改操作

### 1. 修改网站标题
编辑 `index.html`：
```html
<title>你的网站标题</title>
```

### 2. 修改网站描述
编辑 `index.html`：
```html
<meta name="description" content="你的网站描述" />
```

### 3. 添加新页面
1. 在 `src/views/` 创建新的 `.vue` 文件
2. 在 `src/router/index.js` 添加路由
3. 在 `src/data/siteData.js` 的 `navItems` 添加菜单项

### 4. 修改导航栏菜单
编辑 `src/data/siteData.js`：
```javascript
export const navItems = [
  { label: '首页', path: '/' },
  { label: '团队', path: '/people' },
  // 添加或删除菜单项...
]
```

---

## 🔧 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

---

## 📂 项目结构速览

```
labweb/
├── index.html              # HTML入口（标题、描述、favicon）
├── src/
│   ├── data/
│   │   └── siteData.js     # ⭐ 所有内容数据（最重要的文件）
│   ├── components/         # 可复用组件
│   ├── views/             # 页面视图（布局结构）
│   ├── router/            # 路由配置
│   └── styles/            # 全局样式
└── package.json           # 项目配置
```

---

## 📝 总结

要修改网站内容，**主要关注 `src/data/siteData.js`**，这个文件包含了所有展示数据。

- 修改文字内容 → `src/data/siteData.js`
- 修改颜色/样式 → `src/styles/main.css`
- 修改页面结构 → `src/views/*.vue`
- 修改导航菜单 → `src/data/siteData.js` 的 `navItems`
