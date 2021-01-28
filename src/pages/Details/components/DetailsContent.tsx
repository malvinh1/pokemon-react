/** @jsxImportSource @emotion/react */

import { css, Theme, useTheme } from "@emotion/react";
import React from "react";

import { Pokemon_pokemon } from "../../../generated/server/Pokemon";

type DetailsSectionProps = {
  pokemonData?: Pokemon_pokemon;
};

export default function DetailsContent({ pokemonData }: DetailsSectionProps) {
  const styles = useStyles(useTheme());

  return (
    <div css={styles.details}>
      <div css={styles.detailsPokemonContainer}>
        <div css={styles.detailsTitle}>ABILITIES</div>
        <div css={{ display: "flex", flexWrap: "wrap" }}>
          {pokemonData?.abilities?.map((item) => (
            <div key={Math.random()} css={styles.detailsAbilitiesAndMoves}>
              {item?.ability?.name}
            </div>
          ))}
        </div>
      </div>

      <div css={styles.detailsPokemonContainer}>
        <div css={styles.detailsTitle}>MOVES</div>
        <div css={{ display: "flex", flexWrap: "wrap" }}>
          {pokemonData?.moves?.map((item) => (
            <div key={Math.random()} css={styles.detailsAbilitiesAndMoves}>
              {item?.move?.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const useStyles = ({ colors }: Theme) => {
  return {
    details: css({
      display: "flex",
      borderLeft: "1px solid #ccc ",
      margin: 16,
      justifyContent: "center",
      "@media screen and (max-width: 960px)": {
        borderLeft: "none",
        borderTop: "1px solid #ccc ",
        flexDirection: "column",
      },
    }),
    detailsPokemonContainer: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: 16,
    }),
    detailsTitle: css({
      color: "#D4AF37",
      margin: 16,
      fontSize: "1.5rem",
      fontWeight: 700,
      "@media screen and (max-width: 960px)": {
        fontSize: "1rem",
      },
    }),
    detailsAbilitiesAndMoves: css({
      padding: 16,
      margin: 16,
      borderRadius: "2rem",
      backgroundColor: "#fff",
      textTransform: "capitalize",
      textAlign: "center",
      fontWeight: 700,
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      "@media screen and (max-width: 960px)": {
        fontSize: ".8rem",
        padding: 8,
      },
    }),
  };
};
