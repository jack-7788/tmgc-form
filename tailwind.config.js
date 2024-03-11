/** @type {import('tailwindcss').Config} */

module.exports = {
  prefix: 't-',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {}
  },
  plugins: [],
  corePlugins: {
    preflight: false // 禁止tailwindcss的默认属性base，防止和ant design vue的样式产生冲突
  }
};
