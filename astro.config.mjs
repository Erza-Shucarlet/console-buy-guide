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
						{
							label: '🕹️ 一代回顾',
							items: [{ autogenerate: { directory: 'switch/gen-1' } }],
						},
						{
							label: '🚀 二代详解',
							items: [{ autogenerate: { directory: 'switch/gen-2' } }],
						},
					],
				},
				{ label: '✉️ 联系胖黄鸭', link: '/contact/' },
			],
		}),
	],
});
