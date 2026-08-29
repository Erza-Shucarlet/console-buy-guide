# 🎮 游戏机选购指南

> 帮你选到最合适的游戏主机，少花冤枉钱。

一个面向中文玩家的游戏机选购指南网站，用最简单的语言帮你理清思路。

**线上地址**: https://chubbyducky.com

---

## 🛠️ 技术架构

| 层 | 技术 |
|---|---|
| 框架 | Astro 7 + Starlight 0.41 |
| 内容 | Markdown (.md) + MDX (.mdx) |
| 部署 | Cloudflare Pages（GitHub push 自动构建） |
| 域名 | chubbyducky.com（Cloudflare DNS） |
| 仓库 | https://github.com/Erza-Shucarlet/console-buy-guide |

## 📁 项目结构

```
console-buy-guide/
├── astro.config.mjs          # 站点配置（标题、侧边栏、favicon、CSS）
├── package.json
├── public/                   # 静态资源（构建时原样拷贝到 dist/）
│   ├── favicon.png           # 主 favicon（192px）
│   ├── favicon-16.png        # 16px favicon
│   ├── favicon-32.png        # 32px favicon
│   ├── apple-touch-icon.png  # iOS 主屏幕图标（180px）
│   ├── image-backups/        # 旧版图片备份（不删除）
│   └── robots.txt / llms.txt # SEO / LLM 相关
├── raw-assets/               # 原始 PNG/JPG 素材（.gitignore，不删除）
├── src/
│   ├── assets/               # Astro 处理资源（hero 图等）
│   │   └── houston.webp      # 首页 hero 图（胖黄鸭透明头像）
│   ├── content/
│   │   └── docs/             # 内容页面（Starlight 自动路由）
│   │       ├── images/       # 内容图片（WebP，q85，集中管理）
│   │       ├── index.mdx     # 根首页（splash 模板 + hero + CardGrid）
│   │       ├── contact.md    # 联系页
│   │       └── switch/       # Switch 板块
│   │           ├── switch-index.mdx               # Switch 总览（splash 模板）
│   │           ├── gen-1/                         # 一代回顾
│   │           │   ├── guide.md                   # 一代四型号详解
│   │           │   ├── gen1-limited.md            # 一代限定机图鉴
│   │           │   ├── oled-limited.md            # OLED 限定机图鉴
│   │           │   ├── gen1-limited-controllers.md  # 一代限定手柄图鉴
│   │           │   └── gen1-jailbreak.md          # 破解科普（反对破解）
│   │           └── gen-2/                         # 二代详解
│   │               ├── guide.md                   # 二代详解 + 涨价信息
│   │               └── faq.md                     # 常见问题 Q&A
│   └── styles/
│       └── custom.css        # 全站自定义样式
└── dist/                     # 构建输出（Cloudflare Pages 部署此目录）
```

## 🚀 本地开发

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 构建到 dist/
```

**后台 dev server**（推荐）：
```bash
npx astro dev --port 4321 &   # 后台运行
npx astro dev stop            # 停止
```

## 📝 内容维护规范

### 文件格式

| 类型 | 格式 | 说明 |
|---|---|---|
| 内容文章（guide.md） | **.md** | 纯 Markdown，Obsidian 可编辑 |
| 首页/landing 页 | **.mdx** | 可用 JSX 组件（CardGrid、Card） |

**原则**: 能用 .md 就不用 .mdx。只有需要 splash 卡片布局的首页才用 .mdx。

### 提示框语法

用 Starlight 原生 `:::` 语法，**不要用 JSX `import { Aside }`**（在 .md 中不渲染）：

```markdown
:::tip[标题]
内容
:::

:::caution[标题]
内容
:::

:::danger[标题]
内容
:::
```

### 图片

- **格式**: WebP（cwebp -q 85 转换）
- **位置**: `src/content/docs/images/`，文章用相对路径 `../../images/xxx.webp` 引用（从 `switch/gen-1/`、`switch/gen-2/` 等二级目录出发）
- **备份**: 原始 PNG/JPG 保留在 `raw-assets/`（.gitignore），旧版 WebP 移 `public/image-backups/`，都不删除
- **AI 生图**: 胜算云 gpt-image-2，扁平矢量风格

### 更新日期

每篇文章顶部加日期引用块，会渲染成灰色小徽章：

```markdown
> 本文最后更新日期：2026-08-02
```

## 🎨 自定义样式

全站样式在 `src/styles/custom.css`，已覆盖：

- **配色**: 紫色 accent（#7c6ff7），深色/浅色双模式适配
- **侧边栏**: 加宽至 20rem，激活项药丸高亮 + 紫色左边线
- **内容区**: 加宽至 56rem
- **图片**: 缩小居中（max 420px）+ 圆角阴影
- **表格**: 紫色表头 + 圆角 + 斑马纹 + hover + 居中
- **日期徽章**: 顶部引用块 → 灰色小药丸

**修改后需重启 dev server 生效**（CSS 不热更新）。

## 🚀 部署

Push 到 `main` 分支 → Cloudflare Pages 自动构建部署。

**无需手动操作**，但需等 1-2 分钟构建。

## ⚠️ 常见问题

| 问题 | 解决 |
|---|---|
| 改了 CSS 没效果 | 重启 dev server：`npx astro dev stop && npx astro dev` |
| .md 中 `:::` 不渲染 | 检查是否在 .mdx 中误用了 `import { Aside }` |
| 侧边栏标题不对 | autogenerate 读的是 frontmatter `title`，不是 `sidebar.label` |
| 图片不显示 | 确认在 `src/content/docs/images/` 目录，路径用相对路径 `../../images/xxx.webp` |
| 构建报图片错误 | 检查 `src/assets/` 下的图片是否被正确引用 |

## 🤝 贡献

内容在 `src/content/docs/` 下，Markdown 格式。图片用 WebP 放 `src/content/docs/images/`。改完提 PR。

---

**维护者**: 胖黄鸭（Erza）
**联系**: alsashucarlet@gmail.com
