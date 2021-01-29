/** @jsxImportSource @emotion/react */

import { useQuery } from "@apollo/client";
import { css, Theme, useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { useHistory } from "react-router-dom";

import Button from "../components/Button";
import Card from "../components/Card";
import Error from "../components/Error";
import LoadingIndicator from "../components/LoadingIndicator";
import {
  Pokemons,
  Pokemons_pokemons_results,
  PokemonsVariables,
} from "../generated/server/Pokemons";
import { POKEMONS } from "../graphql/server/pokemon";

export default function Home() {
  const styles = useStyles(useTheme());
  const { colors } = useTheme();
  const { getAll } = useIndexedDB("pokemons");
  const history = useHistory();

  const [pokemonData, setPokemonData] = useState<
    Array<Pokemons_pokemons_results | null>
  >([]);
  const [pokemonDb, setPokemonDb] = useState();
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

  useEffect(() => {
    getAll().then(
      (
        db: Array<{ id: number; name: string; nickname: string; image: string }>
      ) => {
        const map: any = {};

        db.forEach((item) => {
          if (!map[item.name]) {
            map[item.name] = 1;
          } else {
            map[item.name] += 1;
          }
        });
        setPokemonDb(map);
      }
    );
  }, []);

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
    return (
      <LoadingIndicator
        containerStyle={{
          paddingTop: 100,
          height: "100vh",
          backgroundColor: colors.background,
        }}
      />
    );
  }

  if (error) {
    return (
      <Error
        containerStyle={{
          paddingTop: 100,
          height: "100vh",
          backgroundColor: colors.background,
        }}
      />
    );
  }

  return (
    <div css={styles.container}>
      <div css={styles.contentContainer}>
        {pokemonData.map((item) => (
          <div css={styles.cardContainer} key={item?.id}>
            <Card
              name={item?.name || ""}
              imgUrl={item?.image || ""}
              pokemonOwned={pokemonDb?.[item?.name || ""] || 0}
              onClick={() =>
                history.push({
                  pathname: "/pokemon-details",
                  state: {
                    name: item?.name,
                  },
                })
              }
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
