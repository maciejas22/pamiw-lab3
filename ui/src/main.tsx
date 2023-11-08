import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, Router } from "@tanstack/react-router";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { routeTree } from "./routes/route-tree";

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement?.innerHTML) {
  const root = ReactDOM.createRoot(rootElement!);
  root.render(
    <StrictMode>
      <MantineProvider defaultColorScheme="dark">
        <QueryClientProvider client={queryClient}>
          <Notifications />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>
  );
}
