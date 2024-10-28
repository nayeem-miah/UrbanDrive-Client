import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // for the "toBeInTheDocument" matcher
import CarDetails from "../Pages/CarDetails/CarDetails";
// import your component

describe("CarRental Component", () => {
  it("renders the car rental component", () => {
    render(<CarDetails />);

    // Check if the component renders a title or some content
    const headingElement = screen.getByRole("heading", {
      name: /Car Rental/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
