import React, { useContext } from "react";
import { ShipDataContext, ShipDataProvider } from "./useShipData";
import useAnimationFrame from "./useAnimationFrame";
import { useMultipleKeys } from "./useMultipleKeys";
//import fireEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";

//jest.mock("react", () => {});

const Harness = () => {
  const { shipState } = useContext(ShipDataContext);
  const { resetAnimationTimer, changeShipY } = useAnimationFrame();

  const { onKeyDown, onKeyUp } = useMultipleKeys({
    changeShipYHandler: changeShipY,
    resetAnimationHandler: resetAnimationTimer,
  });

  return (
    <ShipDataProvider>
      <div
        data-testid="shipContainer"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        width="1000px"
      >
        <div id="reporter">
          <span data-testid="shipY">{shipState.offsetY}</span>
        </div>
      </div>
    </ShipDataProvider>
  );
};

describe("useShipData", () => {
  beforeEach(() => {
    render(<Harness />);
  });
  test("when the UP key is pressed", async () => {
    const container = screen.getByTestId("shipContainer");

    fireEvent.keyDown(container, { key: "tab", code: "KeyTab" });
    await new Promise((r) => setTimeout(r, 800));
    fireEvent.keyUp(container, { key: "tab", code: "KeyTab" });

    const yValueReadout = screen.getByTestId("shipY");

    expect(yValueReadout).toHaveTextContent("300");
  });
});
