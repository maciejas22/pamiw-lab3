import { Route, RootRoute } from "@tanstack/react-router";
import { Root } from "../pages/root";
import { BooksList } from "../pages/book-list";
import { AuthorList } from "../pages/author-list";

const rootRoute = new RootRoute({
  component: Root,
});

const bookListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/books",
  component: BooksList,
});

const authorListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/authors",
  component: AuthorList,
});

export const routeTree = rootRoute.addChildren([
  bookListRoute,
  authorListRoute,
]);
