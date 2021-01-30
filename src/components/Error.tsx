/** @jsxImportSource @emotion/react */

import { css, Theme, useTheme } from "@emotion/react";
import React from "react";

import LoadingIndicator from "./LoadingIndicator";

type Props = {
  containerStyle?: React.CSSProperties;
};

export default function Error({ containerStyle }: Props) {
  const styles = useStyles(useTheme());
  return (
    <div style={containerStyle}>
      <LoadingIndicator />
      <p css={styles.text}>No Data Found</p>
    </div>
  );
}

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    text: css({
      textAlign: "center",
      color: colors.primary,
      fontWeight: 700,
      marginTop: spacing.l,
    }),
  };
};
