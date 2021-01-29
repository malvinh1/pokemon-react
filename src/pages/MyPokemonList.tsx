/** @jsxImportSource @emotion/react */

import { css, Theme, useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { useHistory } from "react-router-dom";

import Card from "../components/Card";

export default function MyPokemonList() {
  const styles = useStyles(useTheme());
  const { getAll } = useIndexedDB("pokemons");
  const history = useHistory();

  const [pokemonData, setPokemonData] = useState<
    Array<{
      id: number;
      name: string;
      nickname: string;
      image: string;
    }>
  >();

  useEffect(() => {
    getAll().then((db) => {
      setPokemonData(db);
    });
  }, []);

  return (
    <div css={styles.container}>
      <div css={styles.contentContainer}>
        {pokemonData?.map((item) => (
          <div css={styles.cardContainer} key={item?.id}>
            <Card
              name={item?.nickname || ""}
              imgUrl={item?.image || ""}
              pokemonOwned={0}
              mode="release"
              onClick={() =>
                history.push({
                  pathname: "/pokemon-details",
                  state: {
                    name: item.name,
                  },
                })
              }
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
      height: "90vh",
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
