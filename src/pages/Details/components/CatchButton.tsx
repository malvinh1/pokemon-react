/** @jsxImportSource @emotion/react */

import { css, Theme, useTheme } from "@emotion/react";
import React from "react";

import Pokeball from "../../../assets/pokeball.png";

export default function CatchButton() {
  const styles = useStyles(useTheme());

  return (
    <div css={styles.detailsButton}>
      <img css={styles.pokeballImage} src={Pokeball} alt="Catch em all!" />
      <div css={styles.detailsButtonText}>CATCH</div>
    </div>
  );
}

const useStyles = ({ colors }: Theme) => {
  return {
    detailsButton: css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      padding: 16,
      borderRadius: 10,
      backgroundColor: "#fff",
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      cursor: "pointer",
      filter: "grayscale(100%)",
      width: "15vmin",
      position: "sticky",
      bottom: 0,
      "&:hover": {
        filter: "none",
        backgroundColor: "grey",
        color: "#fff",
        transition: ".25s ease",
        transform: "matrix(1,0,0,1,0,-10)",
      },
    }),
    detailsButtonText: css({
      fontSize: "1rem",
      fontWeight: 700,
      marginTop: 6,
    }),
    pokeballImage: css({
      height: "15vmin",
      "@media (max-width: 960px)": {
        height: "10vmin",
      },
    }),
  };
};
