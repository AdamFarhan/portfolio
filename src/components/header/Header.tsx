import React from "react";
import { createClient } from "@/prismicio";
import { NavBar } from "./NavBar";

export const Header = async () => {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4 mt-5 md:mt-0 shadow-lg">
      <NavBar settings={settings} />
    </header>
  );
};
