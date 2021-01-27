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
      <img src={imgUrl} />
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
      maxWidth: 96,
      padding: 8,
      "&:hover": {
        transform: "matrix(1,0,0,1,0,2)",
        transition: ".25s ease",
      },
    }),
    cardTitle: css({
      color: colors.primary,
      fontSize: ".8rem",
      fontWeight: 700,
      textTransform: "capitalize",
    }),
    cardOwnedText: css({
      color: colors.buttonText,
      fontWeight: 700,
      fontSize: ".5rem",
      backgroundColor: colors.buttonBg,
      borderRadius: "1rem",
      padding: 8,
    }),
  };
};
