/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 1.4s infinite'
      },
      keyframes: {
        bounce: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' }
        }
      }
    }
  }
}
