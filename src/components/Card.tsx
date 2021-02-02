/** @jsxImportSource @emotion/react */

import { css, Theme, useTheme } from "@emotion/react";
import React from "react";

import OpenedPokeball from "../assets/open_pokeball.png";

type Props = {
  name: string;
  imgUrl: string;
  pokemonOwned: number;
  mode?: "normal" | "release";
  onClick?: () => void;
};

export default function Card({
  name,
  imgUrl,
  pokemonOwned,
  mode = "normal",
  onClick,
}: Props) {
  const styles = useStyles(useTheme());

  return (
    <div css={styles.container} onClick={onClick}>
      <img css={styles.image} src={imgUrl} alt="pokemon-image" loading="lazy" />
      <p css={styles.cardTitle}>{name}</p>

      {mode === "normal" ? (
        <div css={styles.cardOwnedText}>{`Owned: ${pokemonOwned}`}</div>
      ) : (
        <>
          <div css={styles.cardReleaseText}>
            <img
              css={styles.pokeballImage}
              src={OpenedPokeball}
              alt="pokemon-image"
              loading="lazy"
            />
            <div>RELEASE</div>
          </div>
        </>
      )}
    </div>
  );
}

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    container: css({
      borderRadius: 12,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "hidden",
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      maxWidth: 192,
      padding: spacing.l,
      transform: "matrix(1,0,0,1,0,0)",
      cursor: "pointer",
      "&:hover": {
        transform: "matrix(1,0,0,1,0,2)",
        transition: ".25s ease",
      },
      "@media (max-width: 960px)": {
        maxWidth: 96,
        padding: spacing.s,
      },
    }),
    cardTitle: css({
      color: colors.primary,
      fontWeight: 700,
      marginTop: spacing.l,
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
      padding: spacing.s,
      "@media (max-width: 960px)": {
        fontSize: ".5rem",
      },
    }),
    cardReleaseText: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "black",
      fontWeight: 700,
      backgroundColor: colors.buttonBg,
      borderRadius: "1rem",
      padding: spacing.s,
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
    pokeballImage: css({
      height: 20,
      padding: "5px 40px",
      "@media (max-width: 960px)": {
        padding: "5px 20px",
      },
    }),
  };
};
