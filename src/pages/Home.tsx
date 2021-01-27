/** @jsxImportSource @emotion/react */

import { useQuery } from "@apollo/client";
import { css, useTheme } from "@emotion/react";
import React from "react";

import Card from "../components/Card";
import Header from "../components/Header";
import LoadingIndicator from "../components/LoadingIndicator";
import { Pokemons, PokemonsVariables } from "../generated/server/Pokemons";
import { POKEMONS } from "../graphql/server/pokemon";

export default function Home() {
  const theme = useTheme();
  const styles = useStyles();

  const { loading, data } = useQuery<Pokemons, PokemonsVariables>(POKEMONS, {
    variables: {
      limit: 20,
      offset: 0,
    },
  });

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div
      css={{
        height: "100%",
        backgroundColor: theme.colors.background,
      }}
    >
      <Header />
      <div
        css={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {data?.pokemons?.results?.map((item) => (
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

const useStyles = () => {
  return {
    cardContainer: css({
      margin: 16,
      "@media screen and (max-width: 960px)": {
        margin: 4,
      },
    }),
  };
};
