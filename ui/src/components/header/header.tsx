import { Link } from "@tanstack/react-router";
import { Group } from "@mantine/core";
import classes from "./header.module.css";

export function Header() {
  return (
    <header className={classes.header}>
      <Group h="100%" justify="center">
        <Link to="/books" className={classes.link}>
          Books
        </Link>
        <Link to="/authors" className={classes.link}>
          Authors
        </Link>
      </Group>
    </header>
  );
}
