/** @jsxImportSource @emotion/react */

import { css, Theme, useTheme } from "@emotion/react";
import React from "react";

import { Pokemon_pokemon_types } from "../../../generated/server/Pokemon";

type Props = {
  id: number;
  name: string;
  types?: Array<Pokemon_pokemon_types | null> | null;
};

export default function DetailsHeader({ id, name, types }: Props) {
  const styles = useStyles(useTheme());
  return (
    <div css={styles.detailsHeader}>
      <img
        css={styles.image}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      />
      <form css={styles.detailsNameContainer}>
        <input css={styles.detailsName} value={name} onChange={() => {}} />
      </form>
      <div css={styles.detailsTypeContainer}>
        {types?.map((item) => (
          <div key={Math.random()} css={styles.detailsValues}>
            {item?.type?.name}
          </div>
        ))}
      </div>
    </div>
  );
}

const useStyles = ({ colors }: Theme) => {
  return {
    detailsHeader: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: 16,
    }),
    detailsNameContainer: css({
      display: "flex",
      alignItems: "center",
    }),
    detailsTypeContainer: css({
      display: "flex",
      justifyContent: "center",
    }),
    detailsName: css({
      border: 0,
      fontSize: "2rem",
      fontWeight: 700,
      textTransform: "capitalize",
      marginTop: "-1rem",
      padding: 16,
      borderRadius: "1rem",
      backgroundColor: "#fff",
      textAlign: "center",
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      "@media screen and (max-width: 960px)": {
        fontSize: "1.2rem",
      },
    }),
    detailsValues: css({
      padding: 16,
      margin: 16,
      borderRadius: "2rem",
      backgroundColor: "#fd7d24",
      textTransform: "capitalize",
      color: "#fff",
      fontWeight: 700,
      "@media screen and (max-width: 960px)": {
        fontSize: ".8rem",
        padding: 8,
      },
    }),
    image: css({
      height: 260,
      borderRadius: "15rem",
      backgroundColor: "#f5f5f5",
      "@media (max-width: 960px)": {
        height: 240,
      },
    }),
  };
};
