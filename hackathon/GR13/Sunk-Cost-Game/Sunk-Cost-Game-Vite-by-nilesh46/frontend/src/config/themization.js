const light = {
    palette: {
        mode: "light",
        color: "#000",
        primary: {
            main: "#7e317f",
            dark: "#60266d",
            light: "#9b4e96",
        },
        background: {
            paper: "#fff",
            navbar: "#7e317f",
            default: "#fff",
        },
        heading: "#2A323C",
        button: {
            primary: "#237b60",
        },
        white: "#fff",
        borderColor: "rgba(126, 49, 127, .8)",
    },
};

const dark = {
    palette: {
        mode: "dark",
        color: "#fff",
        background: {
            paper: "#121212",
            navbar: "#272727",
            default: "#121212",
            light: "#272727",
        },
        button: {
            primary: "#237b60",
        },
        heading: "#303130",
        white: "#fff",
        borderColor: "rgba(18, 18, 18, .8)",
    },
};

module.exports = {
    light: light,
    dark: dark,
};
