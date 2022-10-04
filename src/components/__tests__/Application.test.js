import axios from "axios";
import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  getByText,
  fireEvent,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

// axios.defaults.baseURL = "http://localhost:8001";

describe("Application", () => {
  it("renders without crashing", () => {
    console.log(axios);
    render(<Application />);
  });

  xit("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    // return waitForElement(() => getByText("Monday"));
  });
});
