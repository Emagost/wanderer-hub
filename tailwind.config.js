/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        primary: '#1a1e25',
        buttonPrimary: '#61a6f6',
        buttonPrimaryHover: '#429bf5',
      },
      borderColor: {
        Primary: '#61a6f6',
        PrimaryHover: '#429bf5',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
