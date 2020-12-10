module.exports = {
    purge: ["./src/**/*.tsx"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ["Roboto", "Helvetica", "sans-serif"],
            },
            colors: {
                ivy: "#1984B8",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
