/** @jsxImportSource @emotion/react */

import { css, Theme, useTheme } from "@emotion/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Switch from "react-switch";

import Logo from "../assets/logo.svg";
import { useThemeContext, useThemeUpdate } from "../theme/ThemeContext";

export default function Header() {
  const [switchState, setSwitchState] = useState(useThemeContext());

  const styles = useStyles(useTheme());

  const toggleTheme = useThemeUpdate();

  const onChangeSwitch = () => {
    setSwitchState(!switchState);
    toggleTheme();
  };

  return (
    <div css={styles.container}>
      <Link to="/">
        <img css={styles.image} src={Logo} alt="logo" />
      </Link>
      <Switch
        onChange={onChangeSwitch}
        checked={switchState}
        uncheckedIcon={false}
      />
    </div>
  );
}

const useStyles = ({ colors }: Theme) => {
  return {
    container: css({
      alignItems: "center",
      justifyContent: "space-between",
      display: "flex",
      padding: "0 10vmin",
      borderBottom: "1px solid #ccc ",
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      backgroundColor: colors.background,
    }),
    image: css({
      width: 180,
      height: 90,
      "@media screen and (max-width: 960px)": {
        width: 120,
        height: 60,
      },
    }),
  };
};
