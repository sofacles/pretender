import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import Ship from "./Ship";

const renderTestContainer = () => {
  //you have to render!! not return;
  render(
    <div>
      <svg>
        <Ship x={4} y={100} />
      </svg>
    </div>
  );
};

test("renders a ship", async () => {
  renderTestContainer();
  const ship = screen.getByTestId("ship");
  expect(ship).toBeInTheDocument();
});
