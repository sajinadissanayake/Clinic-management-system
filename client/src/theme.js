import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#086788",
            light: "skyblue",
        },
        secondary: {
            main: '#FFFFFF',
        },
        
        // You can define other Material-UI palette colors here if needed
    },
    // Define additional custom colors outside of the palette object
    otherColor: {
        main: "#999",
    },
    // Define additional custom colors within the palette object
    customPalette: {
        customColor1: '#ff0000', // Red color
        customColor2: '#00ff00', // Green color
        customColor3: '#0000ff', // Blue color
        // Add more custom colors as needed
    }
});
