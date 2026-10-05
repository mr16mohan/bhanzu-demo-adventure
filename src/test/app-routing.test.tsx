import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { missionCelebration, missionName } from "@/lib/demo";

function renderAt(path: string) {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  return render(<RouterProvider router={router} />);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// Assert only that the router mounts and paints, never page content:
// routes are rewritten as the app is built and this must keep passing.
describe("App routing", () => {
  it("renders the index route", async () => {
    const { container } = renderAt("/");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the not-found route", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const { container } = renderAt("/this-route-does-not-exist");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });
});

describe("Demo rules", () => {
  it("uses a 60-minute live session on the schedule page", async () => {
    const { getByText, queryByText } = renderAt("/schedule");

    await waitFor(() => expect(getByText("60-minute live session")).toBeTruthy());
    expect(queryByText("45-minute live session")).toBeNull();
  });

  it("names each mission from its progress number", () => {
    expect(missionName(1)).toBe("first");
    expect(missionName(2)).toBe("second");
  });

  it("uses the matching mission name in celebration messages", () => {
    expect(missionCelebration("Aarav", 2)).toContain("completed the second mission");
  });
});
