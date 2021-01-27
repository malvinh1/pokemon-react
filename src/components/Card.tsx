/** @jsxImportSource @emotion/react */

import { css, Theme, useTheme } from "@emotion/react";
import React from "react";

type Props = {
  name: string;
  imgUrl: string;
  pokemonOwned: number;
};

export default function Card({ name, imgUrl, pokemonOwned }: Props) {
  const styles = useStyles(useTheme());

  return (
    <div css={styles.container}>
      <img css={styles.image} src={imgUrl} />
      <p css={styles.cardTitle}>{name}</p>
      <div css={styles.cardOwnedText}>{`Owned: ${pokemonOwned}`}</div>
    </div>
  );
}

const useStyles = ({ colors }: Theme) => {
  return {
    container: css({
      borderRadius: 12,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "hidden",
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      maxWidth: 192,
      padding: 16,
      transform: "matrix(1,0,0,1,0,0)",
      "&:hover": {
        transform: "matrix(1,0,0,1,0,2)",
        transition: ".25s ease",
      },
      "@media (max-width: 960px)": {
        maxWidth: 96,
        padding: 8,
      },
    }),
    cardTitle: css({
      color: colors.primary,
      fontWeight: 700,
      marginTop: 16,
      textTransform: "capitalize",
      "@media (max-width: 960px)": {
        fontSize: ".8rem",
      },
    }),
    cardOwnedText: css({
      color: colors.buttonText,
      fontWeight: 700,
      backgroundColor: colors.buttonBg,
      borderRadius: "1rem",
      padding: 8,
      "@media (max-width: 960px)": {
        fontSize: ".5rem",
      },
    }),
    image: css({
      height: 160,
      "@media (max-width: 960px)": {
        height: 80,
      },
    }),
  };
};
