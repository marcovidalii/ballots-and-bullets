/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            fontSize: {
                "2xs": "0.65rem",
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#142b75",
                    secondary: "#FF0000",
                    accent: "#FF0000",
                    neutral: "#FF0000",
                    "base-100": "#FFFFFF",
                    info: "#FF0000",
                    success: "#FF0000",
                    warning: "#FF0000",
                    error: "#ff4b3d",
                },
            },
        ],
    },
};
