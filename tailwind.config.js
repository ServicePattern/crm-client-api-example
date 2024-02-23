module.exports = {
    purge: {
        enabled: true,
        content: [
            './src/**/*.html',
            './src/**/*.js',
            './src/**/*.ts',
        ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            height: {
                '40vh': '40vh',
            },
            colors: {
                secondary: '#cccccc45',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
