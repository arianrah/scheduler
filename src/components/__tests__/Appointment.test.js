import React from "react";
import { render } from "@testing-library/react";
import Application from "components/application";

describe("Appointment", () => {
  it("should render without crashing", () => {
    render(<Appointment />);
  });
});
