import { wp } from "../utils/screens";

const nativeBaseTheme = {
  components: {
    Button: {
      // Can simply pass default props to change default behaviour of components.
      // defaultProps: {
      //   w: wp("92%"),
      // },
    },
    Input: {
      // Can simply pass default props to change default behaviour of components.
      defaultProps: {
        w: wp("92%"),
        borderRadius: "lg",
      },
    },
    Select: {
      defaultProps: {
        w: wp("92%"),
        borderRadius: "lg",
      },
    },
    TextArea: {
      defaultProps: {
        w: wp("92%"),
        borderRadius: "lg",
      },
    },
  },
  colors: {
    // Add new color
    primary: {
      100: "#cce9ed",
      200: "#99d3db",
      300: "#66bdca",
      400: "#33a7b8",
      500: "#0091a6",
      600: "#007485",
      700: "#005764",
      800: "#003a42",
      900: "#001d21",
    },
  },
  fontConfig: {
    Roboto: {
      100: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
      },
      200: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
      },
      300: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
      },
      400: {
        normal: "Roboto-Regular",
        italic: "Roboto-Italic",
      },
      500: {
        normal: "Roboto-Medium",
      },
      600: {
        normal: "Roboto-Medium",
        italic: "Roboto-MediumItalic",
      },
      700: {
        normal: "Roboto-Bold",
      },
      800: {
        normal: "Roboto-Bold",
        italic: "Roboto-BoldItalic",
      },
      900: {
        normal: "Roboto-ExtraBold",
        italic: "Roboto-ExtraBoldItalic",
      },
    },
  },

  fonts: {
    heading: "Roboto",
    body: "Roboto",
    mono: "Roboto",
  },
};
export default nativeBaseTheme;
