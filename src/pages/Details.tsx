/** @jsxImportSource @emotion/react */

import { useTheme } from "@emotion/react";
import React from "react";

import Header from "../components/Header";

export default function Details() {
  const theme = useTheme();

  console.log("details page", theme);
  return (
    <div>
      <Header />
      <h1>DETAILS</h1>
    </div>
  );
}
