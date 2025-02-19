import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        h1: {
            fontSize: "4.25rem", // 40px
        },
        h2: {
            fontSize: "3.75rem", // 36px
        },
        h3: {
            fontSize: "3rem", // 28px
        },
        h4: {
            fontSize: "2.5rem", // 24px
        },
        h5: {
            fontSize: "2rem", // 20px
        },
        h6: {
            fontSize: "1.5rem", // 16px
        },
        body1: {
            fontSize: "1.5rem", // 16px (Default body text)
        },
        body2: {
            fontSize: "1.2rem", // 14px
        },
        subtitle1: {
            fontSize: "1rem", // 16px
        },
        subtitle2: {
            fontSize: "0.875rem", // 14px
        },
        button: {
            fontSize: "0.875rem", // 14px
            textTransform: "none", // Prevents uppercase transformation
        },
        caption: {
            fontSize: "0.75rem", // 12px
        },
        overline: {
            fontSize: "0.75rem", // 12px
            textTransform: "uppercase",
        },
    },

    components: {

        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: "1rem", // Adjust button text size
                    textTransform: "uppercase",
                    "&.Mui-disabled": {
                        color: "#333", // ✅ Change text color when disabled
                    },
                },
            },
        },

        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: "1.2rem", // Adjusts font size for input text
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: "1rem", // Adjusts font size for label text
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: "1rem", // Default font size for table cells
                },
                head: {
                    fontSize: "1.5rem", // Font size for table headers
                    fontWeight: "bold",
                },
                body: {
                    fontSize: "1.2rem", // Font size for table body
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: "#f5f5f5", // Light gray background for table header
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    "&:nth-of-type(odd)": {
                        backgroundColor: "#fafafa", // Zebra striping effect
                    },
                },
            },
        },
        MuiModal: {
            styleOverrides: {
                root: {
                    fontSize: "1rem", // Default font size for modal content
                },
            },
        },
    },
});

export default theme;
