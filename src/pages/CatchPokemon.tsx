/** @jsxImportSource @emotion/react */

import { css, keyframes, Theme, useTheme } from "@emotion/react";
import React, { useMemo, useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { useHistory } from "react-router-dom";

import Gotcha from "../assets/gotcha.png";
import PokemonRun from "../assets/pokemon-run.png";

type Props = {
  location: {
    state: {
      name: string;
      nickname: string;
      image: string;
      release?: boolean;
    };
  };
};

export default function CatchPokemon({ location }: Props) {
  const styles = useStyles(useTheme());
  const history = useHistory();
  const { add } = useIndexedDB("pokemons");

  const [nickname, setNickname] = useState(location.state.nickname);
  const [showSetNickname, setShowSetNickname] = useState(false);

  const success = useMemo(() => {
    let result = Math.floor(Math.random() * 2) + 0;
    return result === 1 ? true : false;
  }, []);

  const onClickButton = () => {
    if (success) {
      setShowSetNickname(!showSetNickname);
    } else {
      history.push("/");
    }
  };

  const onSubmit = () => {
    add({
      name: location.state.name,
      nickname: nickname,
      image: location.state.image,
    }).then(
      () => {
        console.log("pokemon catched!");
      },
      (error) => {
        console.log(error);
      }
    );
    history.push("/");
  };

  if (location.state.release) {
    return (
      <div css={styles.container}>
        <img css={styles.image} src={PokemonRun} />
        <div css={styles.title}>RELEASED!</div>
        <div css={styles.subtitle}>Good bye friend!</div>
        <div
          css={styles.button}
          onClick={() => {
            history.push("/");
          }}
        >
          <div css={styles.buttonText}>{"<"}</div>
        </div>
      </div>
    );
  }

  return (
    <div css={styles.container}>
      {!showSetNickname ? (
        <>
          <img css={styles.image} src={success ? Gotcha : PokemonRun} />
          <div css={styles.title}>{success ? "SUCCESSFUL!" : "FAILED"}</div>
          <div css={styles.subtitle}>
            {success ? "Gotta catch em' all!" : "It ran away..."}
          </div>
          <div css={styles.button} onClick={onClickButton}>
            <div css={styles.buttonText}>{success ? "Set Nickname" : "<"}</div>
          </div>
        </>
      ) : (
        <>
          <img css={styles.pokemonImage} src={location.state.image} />
          <form css={styles.detailsNameContainer} onSubmit={onSubmit}>
            <input
              css={styles.detailsName}
              type="text"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
            <input css={styles.submitButton} value="Submit" type="submit" />
          </form>
        </>
      )}
    </div>
  );
}

const Zoom = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    container: css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh",
      backgroundColor: colors.background,
    }),
    image: css({
      animation: `${Zoom} 1s ease 1`,
      height: "50vmin",
      "@media screen and (max-width: 960px)": {
        height: "75vmin",
      },
    }),
    pokemonImage: css({
      height: 260,
      borderRadius: "15rem",
      backgroundColor: "#f5f5f5",
      "@media (max-width: 960px)": {
        height: 240,
      },
    }),
    title: css({
      fontWeight: 700,
      textAlign: "center",
      fontSize: "5vmin",
      color: colors.primary,
    }),
    subtitle: css({
      fontWeight: 700,
      textAlign: "center",
      fontSize: "3vmin",
      color: colors.primary,
    }),
    button: css({
      textDecoration: "none",
      backgroundColor: "#ffcb05",
      boxShadow: "0 1px 6px 0 rgb(49 53 59 / 12%)",
      padding: spacing.l,
      marginTop: spacing.l,
      borderRadius: 10,
      cursor: "pointer",
      transform: "matrix(1,0,0,1,0,0)",
      transition: ".25s ease",
    }),
    buttonText: css({
      fontWeight: 700,
      fontSize: "2rem",
      margin: "0 10px",
    }),
    detailsNameContainer: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }),
    detailsName: css({
      border: 0,
      fontSize: "2rem",
      fontWeight: 700,
      textTransform: "capitalize",
      marginTop: "-1rem",
      padding: spacing.l,
      borderRadius: "1rem",
      backgroundColor: "#fff",
      textAlign: "center",
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      "@media screen and (max-width: 960px)": {
        fontSize: "1.2rem",
      },
    }),
    submitButton: css({
      padding: spacing.l,
      fontWeight: 700,
      borderRadius: "1rem",
      fontSize: "1.5rem",
      marginTop: spacing.l,
      cursor: "pointer",
      outline: "none",
      border: "none",
      color: "#D4AF37",
      backgroundColor: "#fff",
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      "@media screen and (max-width: 960px)": {
        fontSize: "1.2rem",
      },
    }),
  };
};
