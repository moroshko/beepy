import React from "react";
import { render, screen, waitForElement } from "@testing-library/react";
import App from "./App";

it("renders login successfully", async () => {
  render(<App />);
  screen.getByText(/beepy/i);
  await waitForElement(() => screen.getByText(/login/i));
});
