// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://chubbyducky.com',
	integrations: [
		starlight({
			title: '🎮 胖黄鸭的游戏机选购指南',
			customCss: ['/src/styles/custom.css'],
			// 自定义组件：目录标题降级为 role=heading（不占 H2）、页脚加政策链接、
			// <head> 追加 Article / BreadcrumbList 结构化数据
			components: {
				TableOfContents: './src/components/TableOfContents.astro',
				Footer: './src/components/Footer.astro',
				Head: './src/components/Head.astro',
			},
			defaultLocale: 'root',
			locales: {
				root: { label: '简体中文', lang: 'zh-CN' },
			},
			favicon: '/favicon.png',
			head: [
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' } },
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' } },
			],
			sidebar: [
				{
					label: '🎮 Nintendo Switch',
					items: [
						{ label: '📋 选购指南', link: '/switch/switch-index/' },
						{ label: '⚖️ 一代二代对比', link: '/switch/compare/' },
						{ label: '🌍 区域与版本', link: '/switch/region/' },
						{
							label: '🕹️ 一代回顾',
							items: [{ autogenerate: { directory: 'switch/gen-1' } }],
						},
						{
							label: '🚀 二代详解',
							items: [{ autogenerate: { directory: 'switch/gen-2' } }],
						},
						{
							label: '🎮 游戏与购买',
							items: [{ autogenerate: { directory: 'switch/games' } }],
						},
						{ label: '🔧 故障与维修', link: '/switch/repair/' },
						{
							label: '🧪 技术观察',
							items: [{ autogenerate: { directory: 'switch/tech' } }],
						},
						{
							label: '🔍 二手专区',
							items: [
								{ label: '二手验机指南', link: '/switch/used/' },
								{ label: '二手价格与砍价', link: '/switch/used/price/' },
							],
						},
						{ label: '📜 编辑立场', link: '/editorial-policy/' },
					],
				},
				{ label: '✉️ 联系胖黄鸭', link: '/contact/' },
			],
		}),
	],
});
