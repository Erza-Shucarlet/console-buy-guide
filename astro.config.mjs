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
			defaultLocale: 'zh-CN',
			sidebar: [
				{
					label: '🎮 Nintendo Switch',
					items: [
						{ label: '📋 选购指南', link: '/switch/' },
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
