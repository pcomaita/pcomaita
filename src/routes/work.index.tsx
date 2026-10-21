import { createFileRoute, redirect } from "@tanstack/react-router";

// There is no page listing all projects: /work sends visitors to the homepage grid.
export const Route = createFileRoute("/work/")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "work" });
  },
});
