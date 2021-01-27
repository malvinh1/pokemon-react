/** @jsxImportSource @emotion/react */

import { useQuery } from "@apollo/client";
import { css, Theme, useTheme } from "@emotion/react";
import React, { useState } from "react";

import Button from "../components/Button";
import Card from "../components/Card";
import Error from "../components/Error";
import Header from "../components/Header";
import LoadingIndicator from "../components/LoadingIndicator";
import {
  Pokemons,
  Pokemons_pokemons_results,
  PokemonsVariables,
} from "../generated/server/Pokemons";
import { POKEMONS } from "../graphql/server/pokemon";

export default function Home() {
  const styles = useStyles(useTheme());

  const [pokemonData, setPokemonData] = useState<
    Array<Pokemons_pokemons_results | null>
  >([]);
  const [offset, setOffset] = useState(0);

  const { loading, error, data, fetchMore } = useQuery<
    Pokemons,
    PokemonsVariables
  >(POKEMONS, {
    variables: {
      limit: 20,
      offset: offset,
    },
    onCompleted: ({ pokemons }) => {
      setPokemonData((oldData) => [...oldData].concat(pokemons?.results || []));
    },
  });

  const onClickLoadMore = () => {
    fetchMore({
      variables: {
        limit: 20,
        offset: offset + 20,
      },
    });
    setOffset(offset + 20);
  };

  if (loading && pokemonData.length === 0) {
    return <LoadingIndicator containerStyle={{ marginTop: 100 }} />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div css={styles.container}>
      <Header />
      <div css={styles.contentContainer}>
        {pokemonData.map((item) => (
          <div css={styles.cardContainer} key={item?.id}>
            <Card
              name={item?.name || ""}
              imgUrl={item?.image || ""}
              pokemonOwned={0}
            />
          </div>
        ))}
      </div>
      {loading && pokemonData.length >= 0 ? (
        <LoadingIndicator containerStyle={{ marginTop: 20 }} />
      ) : pokemonData.length !== data?.pokemons?.count ? (
        <Button label="Load more" onClick={onClickLoadMore} />
      ) : null}
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
