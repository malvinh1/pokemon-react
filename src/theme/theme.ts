export const lightTheme = {
  colors: {
    background: "#fff",
    buttonBg: "#ffcb05",
    buttonText: "#806600",
    cardShadow: "rgb(49 53 59 / 12%)",
    primary: "#000",
  },
  spacing: {
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 30,
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    background: "#000",
    buttonBg: "#ffcb05",
    buttonText: "#FFFAF0",
    cardShadow: "rgb(238 232 170 / 80%)",
    primary: "#fff",
  },
};
