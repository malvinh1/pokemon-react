import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      background: string;
      buttonBg: string;
      buttonText: string;
      cardShadow: string;
      primary: string;
    };
    spacing: {
      s: number;
      m: number;
      l: number;
      xl: number;
      xxl: number;
    };
  }
}
