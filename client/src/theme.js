import { createTheme } from "@mui/material";
export const theme = createTheme({

    palette: {
        primary: {
            main: "#07A0C3",// light blue
            light: "skyblue",
            w:	"#FFFFFF"
        },
        secondary: {
            main: '#FFFFFF',
        },
        background:{
            default: "#FFFFFF",
            bg2:"#07A0C3",// light blue
            bg3:"#CAF0F8",// light blue 2
            bg4:"#086788",//dark blue 
            bgw:"#FFFFFF" // Corrected background color value
        }
        // You can define other Material-UI palette colors here if needed
    },
    // Define additional custom colors outside of the palette object
    otherColor: {
        main: "#999",
    },
    // Define additional custom colors within the palette object
    customPalette: {
        red: '#ff0000', // Red color
        customColor2: '#00ff00', // Green color
        customColor3: '#0000ff', // Blue color
        // Add more custom colors as needed
    }
});
