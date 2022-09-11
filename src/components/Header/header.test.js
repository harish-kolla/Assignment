import { render, fireEvent } from "@testing-library/react";

import { HeaderComponent } from "./header";

const testProps = {
  addNewRow: jest.fn(),
  scrollToTop: jest.fn(),
};

test("Snapshot of AddNewRecord", () => {
  const { container } = render(<HeaderComponent {...testProps} />);
  expect(container.firstChild).toMatchSnapshot();
});

test("Should render components", () => {
  const { queryByTestId } = render(<HeaderComponent {...testProps} />);
  expect(queryByTestId("add-row-button")).toBeTruthy();
  expect(queryByTestId("virtulized-list")).toBeTruthy();
  expect(queryByTestId("scroll-top-button")).toBeTruthy();
});

test("Should call addNewRow on click add row button", () => {
  const { queryByTestId } = render(<HeaderComponent {...testProps} />);
  fireEvent.click(queryByTestId("add-row-button"));
  expect(testProps.addNewRow).toHaveBeenCalledTimes(1);
});

test("Should call scrollToTop on click scroll to top button", () => {
  const { queryByTestId } = render(<HeaderComponent {...testProps} />);
  fireEvent.click(queryByTestId("scroll-top-button"));
  expect(testProps.scrollToTop).toHaveBeenCalledTimes(1);
});
