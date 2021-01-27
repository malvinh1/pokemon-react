/** @jsxImportSource @emotion/react */

import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import Switch from "react-switch";

import Logo from "../assets/logo.svg";
import { useThemeUpdate } from "../theme/ThemeContext";

export default function Home() {
  const [switchState, setSwitchState] = useState(false);
  const theme = useTheme();

  const toggleTheme = useThemeUpdate();

  const onChangeSwitch = () => {
    setSwitchState(!switchState);
    toggleTheme();
  };

  return (
    <div
      css={{
        height: "100vh",
        backgroundColor: theme.colors.background,
      }}
    >
      <div
        css={{
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <img src={Logo} alt="logo" width={120} height={60} />
        <Switch
          onChange={onChangeSwitch}
          checked={switchState}
          uncheckedIcon={false}
        />
      </div>
    </div>
  );
}
