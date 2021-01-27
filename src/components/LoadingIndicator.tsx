/** @jsxImportSource @emotion/react */

import { css, keyframes } from "@emotion/react";
import React from "react";

import LoadingImage from "../assets/pokeball.png";

export default function LoadingIndicator() {
  const styles = useStyles();

  return (
    <div css={styles.container}>
      <img css={styles.loading} src={LoadingImage} />
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
      marginTop: 100,
    }),
    loading: css({
      animation: `${bounce} 1s ease infinite`,
      "@media (max-width: 960px)": {
        height: "10vmin",
      },
    }),
  };
};
