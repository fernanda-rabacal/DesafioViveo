import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: "#6ee1dc",
          dark: "#0f4b55"
        },
        gray: {
          primary: "#273444",
          dark: "#273444",
          light: "#d3dce6"
        },
        white: "#fff",
        black: "#000",
        error: "#fe4e4e",
        link: "#0045ab"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        'address-form': '1fr 3fr 1fr',
      }
    },
  },
  plugins: [],
}
export default config
