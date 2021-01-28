/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useState } from "react";
import Switch from "react-switch";

import Logo from "../assets/logo.svg";
import { useThemeContext, useThemeUpdate } from "../theme/ThemeContext";

export default function Header() {
  const [switchState, setSwitchState] = useState(useThemeContext());

  const toggleTheme = useThemeUpdate();

  const onChangeSwitch = () => {
    setSwitchState(!switchState);
    toggleTheme();
  };

  return (
    <div css={styles.container}>
      <img css={styles.image} src={Logo} alt="logo" />
      <Switch
        onChange={onChangeSwitch}
        checked={switchState}
        uncheckedIcon={false}
      />
    </div>
  );
}

const styles = {
  container: css({
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    padding: "0 10vmin",
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
