/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  mode: "jit",
  important: "html body",
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
