/** @type {import('tailwindcss').Config} */

module.exports = {
  prefix: 't-',
  content: ['./src/**/*.{vue,js,jsx}'],
  theme: {
    extend: {},
    colors: {}
  },
  plugins: [],
  corePlugins: {
    preflight: false // 禁止tailwindcss的默认属性base，防止和ant design vue的样式产生冲突
  }
};
