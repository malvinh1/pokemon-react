/** @jsxImportSource @emotion/react */

import { css, Theme, useTheme } from "@emotion/react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Switch from "react-switch";

import Backpack from "../assets/backpack.png";
import Logo from "../assets/logo.svg";
import { useThemeContext, useThemeUpdate } from "../theme/ThemeContext";

export default function Header() {
  const [switchState, setSwitchState] = useState(useThemeContext());
  const location = useLocation();

  const theme = useTheme();
  const styles = useStyles(theme);

  const toggleTheme = useThemeUpdate();

  const onChangeSwitch = () => {
    setSwitchState(!switchState);
    toggleTheme();
  };

  return (
    <div css={styles.container}>
      <Link to="/">
        <img css={styles.logo} src={Logo} alt="logo" />
      </Link>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/my-pokemon-list"
          style={{ display: "flex", alignSelf: "flex-end" }}
        >
          <img
            css={styles.image}
            style={{
              backgroundColor:
                location.pathname === "/my-pokemon-list"
                  ? theme.colors.buttonBg
                  : "transparent",
            }}
            src={Backpack}
            alt="my-pokemon-list"
          />
        </Link>
        <Switch
          onChange={onChangeSwitch}
          checked={switchState}
          uncheckedIcon={false}
        />
      </div>
    </div>
  );
}

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    container: css({
      alignItems: "center",
      justifyContent: "space-between",
      display: "flex",
      padding: "0 5vmin",
      borderBottom: "1px solid #ccc ",
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      backgroundColor: colors.background,
      position: "sticky",
      top: 0,
      zIndex: 1,
    }),
    logo: css({
      width: 180,
      height: 90,
      "@media screen and (max-width: 960px)": {
        width: 120,
        height: 60,
      },
    }),
    image: css({
      width: 80,
      height: 80,
      marginRight: spacing.xxxl,
      padding: spacing.s,
      "&:active; &:hover": {
        backgroundColor: colors.buttonBg,
      },
      "@media screen and (max-width: 960px)": {
        width: 50,
        height: 50,
        marginRight: spacing.s,
      },
    }),
  };
};
