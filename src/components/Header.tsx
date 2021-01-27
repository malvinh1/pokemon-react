/** @jsxImportSource @emotion/react */

import { css, Interpolation } from "@emotion/react";
import React, { useState } from "react";
import Switch from "react-switch";

import Logo from "../assets/logo.svg";
import { useThemeUpdate } from "../theme/ThemeContext";

export default function Header() {
  const [switchState, setSwitchState] = useState(false);

  const toggleTheme = useThemeUpdate();

  const onChangeSwitch = () => {
    setSwitchState(!switchState);
    toggleTheme();
  };

  return (
    <div css={styles.container}>
      <img src={Logo} alt="logo" width={120} height={60} />
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
  }),
};
