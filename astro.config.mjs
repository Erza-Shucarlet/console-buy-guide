// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://chubbyducky.com',
	integrations: [
		starlight({
			title: '胖黄鸭的游戏机选购指南',
			defaultLocale: 'zh-CN',
			sidebar: [
				{
					label: 'Nintendo Switch',
					items: [{ autogenerate: { directory: 'switch' } }],
				},
			],
		}),
	],
});
