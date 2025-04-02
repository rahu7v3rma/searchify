import { render, screen } from "@testing-library/react";
import Test from "./index";

test("renders Test component", () => {
  render(<Test />);
  expect(screen.getByText("Test")).toBeInTheDocument();
});
