/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: { color: '#111827', textDecoration: 'underline' },
            'h1,h2,h3,h4': { color: '#111827' },
            code: { color: '#111827' },
          },
        },
        invert: {
          css: {
            color: '#d1d5db',
            a: { color: '#f9fafb' },
            'h1,h2,h3,h4': { color: '#f9fafb' },
            code: { color: '#f9fafb' },
          },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
