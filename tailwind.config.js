/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	mode: 'jit',
	important: 'html body',
	corePlugins: {
		preflight: false,
	},
	content: ['./src/**/*.{html,ts}'],
	theme: {
		extend: {
			colors: {
				main: '#0F0512CC',
				second: '#B12EFF',
				'border-second': '#2F0D41',
				text: '#EBEBEB',
			},
			width: {
				main: '840px',
			},
			backgroundImage: {
				'main-img': "url('/assets/images/background.png')",
				'modal-img': "url('/assets/images/bg-modal.png')",
			},
		},
	},
	plugins: [],
};