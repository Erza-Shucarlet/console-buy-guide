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
                   ├─ /switch/ → Switch 选购指南
                   │   ├─ nintendo_switch_1/ → 一代
                   │   └─ nintendo_switch_2/ → 二代
                   └─ /ps5/ ...（未来）
```

## 二、技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | Astro 7.x | 静态站点生成器 |
| 主题 | Starlight 0.41 | Astro 官方文档站主题 |
| 内容 | Markdown | `.md` 文件，`src/content/docs/` 下 |
| 图片 | **WebP 必须** | `public/` 目录，质量 85 |
| 版本管理 | Git + GitHub | 公开仓库 |
| 部署 | Cloudflare Pages | push 自动构建部署 |
| 域名 | chubbyducky.com | Cloudflare DNS 管理 |
| 图片生图 | 胜算云 GPT-image-2 | img2img，统一扁平风格 |

## 三、目录结构

```
console-buy-guide/
├── astro.config.mjs              # Astro 配置
├── package.json
├── public/                       # 图片放这里
│   ├── switch-gen1.webp
│   ├── switch-v2.webp
│   ├── switch-oled.webp
│   ├── switch-lite.webp
│   ├── switch2.webp
│   ├── switch2-jp-lock.webp
│   ├── switch2-keycard.webp
│   ├── guohang-logo.webp
│   └── image-backups/            # 旧版备份
├── src/
│   ├── content/docs/
│   │   ├── index.mdx             # 首页
│   │   └── switch/
│   │       ├── index.md          # 总览
│   │       ├── nintendo_switch_1/
│   │       │   └── nintendo_switch_1.md
│   │       └── nintendo_switch_2/
│   │           └── nintendo_switch_2.md
│   ├── assets/                   # 模板自带资源
│   └── styles/
└── .gitignore
```

## 四、图片规范

| 规则 | 说明 |
|------|------|
| 格式 | **必须 WebP** |
| 质量 | 85 |
| 位置 | `public/` 目录 |
| 引用 | 文章用绝对路径 `![描述](/xxx.webp)` |
| 转换 | `cwebp -q 85 input.png -o output.webp` |
| AI 生图 | 见 `templates/image-style-guide.md` |

## 五、Frontmatter 字段

```markdown
---
title: Nintendo Switch 一代
description: SEO 描述
sidebar:
  order: 1       # 排序（越小越靠前）
---
```

## 六、工作流程

1. 修改 `src/content/docs/` 下的 `.md` 文件
2. 图片放 `public/`，引用用标准 Markdown（❌ 不要 Obsidian wikilink）
3. 本地 `npm run build` 验证
4. **提交前征得同意** → `git add` → `git commit` → `git push`
5. Cloudflare Pages 自动部署（1-2 分钟）

## 七、部署状态

| 项目 | 状态 |
|------|------|
| GitHub 仓库 | ✅ Erza-Shucarlet/console-buy-guide |
| Cloudflare Pages | ✅ 已连接，push 自动部署 |
| 自定义域名 | ✅ chubbyducky.com |
| SSL | ✅ 自动签发 |
