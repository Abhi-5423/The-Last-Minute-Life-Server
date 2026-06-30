import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#151515',
        ember: '#ff5a3d',
        mint: '#39d98a',
        signal: '#2f80ed'
      },
      boxShadow: {
        soft: '0 24px 80px rgba(21, 21, 21, 0.12)'
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        pulseSoft: 'pulseSoft 2.8s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.65' },
          '50%': { opacity: '1' }
        }
      }
    }
  },
  plugins: []
};

export default config;
