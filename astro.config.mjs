// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://chubbyducky.com',
	integrations: [
		starlight({
			title: '游戏机选购指南',
			defaultLocale: 'zh-CN',
			sidebar: [
				{
					label: 'Nintendo Switch',
					autogenerate: { directory: 'switch' },
				},
			],
		}),
	],
});
