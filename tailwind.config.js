/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html'],
    theme: {
        extend: {
            colors: {
                'spd-red': '#DF1A22',
                'spd-blue': '#111827'
            }
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
        },
        plugins: [require('@tailwindcss/forms')]
    }
}
