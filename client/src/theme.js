import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#2980B9",
            light: "skyblue",
            background:"linear-gradient(167deg, rgba(55,124,170,1) 7%, rgba(37,124,181,1) 35%, rgba(24,87,129,1) 86%)" 
        },
        secondary: {
            main: '#15c630',
        },
        // You can define other Material-UI palette colors here if needed
    },
    // Define additional custom colors outside of the palette object
    otherColor: {
        main: "#999",
    }
});
