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
        primary: '#1b2b46',
        buttonPrimary: '#897ecd',
        buttonPrimaryHover: '#616cc2',
      },
      borderColor: {
        Primary: '#a7c8dd',
        PrimaryHover: '#616cc2',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
