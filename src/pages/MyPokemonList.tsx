/** @jsxImportSource @emotion/react */

import { css, Theme, useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db";

import Card from "../components/Card";

export default function MyPokemonList() {
  const styles = useStyles(useTheme());
  const { getAll } = useIndexedDB("pokemons");

  const [pokemonData, setPokemonData] = useState<any>();

  useEffect(() => {
    getAll().then((db) => {
      setPokemonData(db);
    });
  }, []);

  return (
    <div css={styles.container}>
      <div css={styles.contentContainer}>
        {pokemonData?.map((item: any) => (
          <div css={styles.cardContainer} key={item?.id}>
            <Card
              name={item?.name || ""}
              imgUrl={item?.image || ""}
              pokemonOwned={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    container: css({
      height: "100%",
      backgroundColor: colors.background,
    }),
    contentContainer: css({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }),
    cardContainer: css({
      margin: spacing.l,
      "@media screen and (max-width: 960px)": {
        margin: spacing.xs,
      },
    }),
  };
};
