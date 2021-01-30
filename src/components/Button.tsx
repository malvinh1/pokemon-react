/** @jsxImportSource @emotion/react */

import { css, Theme, useTheme } from "@emotion/react";
import React from "react";

type Props = {
  label: string;
  onClick?: () => void;
};

export default function Button({ label, onClick }: Props) {
  const styles = useStyles(useTheme());

  return (
    <div css={styles.container}>
      <button css={styles.button} onClick={onClick}>
        {label}
      </button>
    </div>
  );
}

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    container: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    button: css({
      cursor: "pointer",
      border: 0,
      outline: "none",
      borderRadius: 10,
      margin: spacing.l,
      padding: spacing.l,
      fontWeight: 700,
      fontSize: "1.1rem",
      backgroundColor: colors.buttonBg,
      boxShadow: "0 1px 6px 0 rgb(49 53 59 / 12%)",
      "@media (max-width: 960px)": {
        margin: spacing.s,
        padding: spacing.s,
        fontSize: "1rem",
      },
    }),
  };
};
