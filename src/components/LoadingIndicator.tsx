/** @jsxImportSource @emotion/react */

import { css, keyframes } from "@emotion/react";
import React from "react";

import LoadingImage from "../assets/pokeball.png";

type Props = {
  containerStyle?: React.CSSProperties;
};

export default function LoadingIndicator({ containerStyle }: Props) {
  const styles = useStyles();

  return (
    <div css={styles.container} style={containerStyle}>
      <img css={styles.image} src={LoadingImage} loading="lazy" />
    </div>
  );
}

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const useStyles = () => {
  return {
    container: css({
      display: "flex",
      justifyContent: "center",
    }),
    image: css({
      animation: `${bounce} 1s ease infinite`,
      height: "20vmin",
      "@media (max-width: 960px)": {
        height: "10vmin",
      },
    }),
  };
};
