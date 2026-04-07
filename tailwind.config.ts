import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#08080e',
        teal: { 400: '#5DCAA5', 500: '#1D9E75', 700: '#0F6E56', 900: '#085041' },
        purple: { 200: '#CECBF6', 400: '#AFA9EC', 500: '#7166D1', 800: '#3C3489' },
        coral: '#E24B4A',
        amber: '#EF9F27',
      },
      fontFamily: {
        sans: ['var(--font-syne)'],
        mono: ['var(--font-jetbrains)'],
      },
    },
  },
  plugins: [],
}
export default config
