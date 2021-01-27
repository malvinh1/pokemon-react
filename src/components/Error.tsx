/** @jsxImportSource @emotion/react */

import { css, Theme, useTheme } from "@emotion/react";
import React from "react";

import LoadingIndicator from "./LoadingIndicator";

export default function Error() {
  const styles = useStyles(useTheme());
  return (
    <div>
      <LoadingIndicator />
      <p css={styles.text}>No Data Found</p>
    </div>
  );
}

const useStyles = (theme: Theme) => {
  return {
    text: css({
      textAlign: "center",
      color: theme.colors.primary,
      fontWeight: 700,
      marginTop: 16,
    }),
  };
};
