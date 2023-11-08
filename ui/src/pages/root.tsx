import { Header } from "../components/header/header";
import { Outlet } from "@tanstack/react-router";

export function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
