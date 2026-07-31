# 游戏机选购指南 — 技术文档

## 一、整体架构

```
                    GitHub 公开仓库
                   (Markdown + 图片)
                          │
                          ▼
                Cloudflare Pages 构建
                (Astro + Starlight)
                          │
                          ▼
                  chubbyducky.com
                   ├─ / → 301 /switch
                   ├─ /switch/ → Switch 选购指南
                   └─ /ps5/ ... (未来)
```

## 二、技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | Astro 5.x | 静态站点生成器，默认零 JS |
| 主题 | Starlight | Astro 官方文档站主题 |
| 内容 | Markdown | `.md` 文件，日常维护只碰这个 |
| 图片 | WebP | 放 `src/assets/` 下 |
| 版本管理 | Git + GitHub | 公开仓库 |
| 部署 | Cloudflare Pages | push 自动构建部署 |
| 域名 | chubbyducky.com | Cloudflare DNS 管理 |

## 三、目录结构

```
console-buy-guide/                    # GitHub 仓库根目录
├── astro.config.mjs              # Astro 配置（导航 + 首页跳转 + 域名）
├── package.json
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/                   # 所有图片放这里
│   │   ├── switch/
│   │   │   ├── switch-oled.jpg
│   │   │   ├── comparison-table.webp
│   │   │   └── ...
│   │   └── ps5/                  # 未来
│   ├── content/                  # 内容目录 -> 自动生成导航
│   │   └── docs/
│   │       ├── index.md          # 首页（跳转到 /switch）
│   │       └── switch/           # Switch 选购指南
│   │           ├── index.md
│   │           ├── models/
│   │           │   ├── index.md
│   │           │   ├── oled-vs.md
│   │           │   └── lite.md
│   │           ├── versions/
│   │           │   ├── guohang.md
│   │           │   ├── jp.md
│   │           │   └── hk.md
│   │           ├── accessories/
│   │           └── pitfalls/
│   └── styles/
│       └── custom.css            # 自定义样式（可选）
└── README.md                     # 仓库说明
```

## 四、导航自动生成规则

Starlight 根据文件目录自动生成侧边栏导航：

| 文件操作 | 导航效果 |
|----------|---------|
| 新建文件夹 | 侧边栏新增分组（可折叠） |
| 在文件夹内新建 `.md` | 分组下新增页面链接 |
| 修改文件名 | 导航文字同步更新 |
| 删除 `.md` | 导航链接消失 |

**不需要任何代码配置**。导航文字自动取自 Markdown 的 `title` frontmatter。

## 五、Markdown 文章模板

```markdown
---
title: OLED vs 续航版
description: 详细对比 Switch OLED 和续航版的区别
---

## 屏幕

正文内容...

![屏幕对比](./switch-oled.jpg)

## 电池续航

正文内容...
```

Frontmatter 字段：
- `title`：页面标题（同时出现在导航和正文 H1）
- `description`：SEO 描述（可选）

## 六、部署流程（一次性配置）

### 1. 创建 GitHub 仓库

在 GitHub 上创建公开仓库，名称建议 `console-buy-guide`。

### 2. 初始化 Astro + Starlight 项目

```bash
npm create astro@latest console-buy-guide -- --template starlight
cd console-buy-guide
git init
git remote add origin https://github.com/<username>/console-buy-guide.git
```

### 3. 配置 astro.config.mjs

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://chubbyducky.com',
  integrations: [
    starlight({
      title: '游戏机选购指南',
      defaultLocale: 'zh-CN',
      // 首页跳转到 /switch
      // 在 src/content/docs/index.md 中做 redirect
    }),
  ],
});
```

### 4. 首页跳转

在 `src/content/docs/index.md` 中写：

```markdown
---
title: 游戏机选购指南
---

## 目前有：

- [Nintendo Switch 选购指南](/switch/)
```

等未来有多个主机时，改回导航页。

### 5. 连接 Cloudflare Pages

1. 登录 Cloudflare Dashboard → Workers & Pages → Create → Pages
2. 连接 GitHub，选择 `console-buy-guide` 仓库
3. 构建配置：
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
4. 自定义域名：添加 `chubbyducky.com`
5. DNS 记录：Cloudflare 会自动处理

### 6. 验证

```bash
git push origin main
```

等 1-2 分钟，访问 `chubbyducky.com` 确认上线。

## 七、日常维护操作

### 新建文章

1. 在对应文件夹下新建 `.md` 文件（GitHub 网页直接操作）
2. 写内容 + 贴图片
3. 提交 commit → 自动部署

### 修改文章

1. 打开 `.md` 文件编辑
2. 修改内容
3. 提交 → 自动部署

### 添加图片

1. 上传图片到 `src/assets/switch/`
2. 在 `.md` 中用 `![描述](./路径)` 引用
3. 提交

### 调整导航结构

在 GitHub 网页上拖动文件/新建文件夹，提交即可。

### 什么时候需要碰代码？

- 新增一个主机系列（需要修改 `astro.config.mjs` 添加分组）
- 换域名
- 升级 Astro/Starlight 版本
- 修改全局样式
- 添加新功能（搜索/评论等）
