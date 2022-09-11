import { render, fireEvent } from "@testing-library/react";

import { AddNewRecord } from "./newRecord";

const testProps = {
  newRecord: {
    id: 0,
    item: "item no 0",
    itemDesc: "item description of 0",
    price: 100,
  },
  inputChangeHandler: jest.fn(),
  updateRow: jest.fn(),
};

const hasInputValue = (getByDisplayValue, e, inputValue) => {
  return getByDisplayValue(inputValue) === e;
};

test("Snapshot of AddNewRecord", () => {
  const { container } = render(<AddNewRecord {...testProps} />);
  expect(container.firstChild).toMatchSnapshot();
});

test("Should render components", () => {
  const { queryByTestId } = render(<AddNewRecord {...testProps} />);
  expect(queryByTestId("add-new-item")).toBeTruthy();
  expect(queryByTestId("add-new-itemDesc")).toBeTruthy();
  expect(queryByTestId("add-new-price")).toBeTruthy();
  expect(queryByTestId("add-new-row-remove-button")).toBeTruthy();
});

test("Should have currect input values", () => {
  const { queryByTestId, getByDisplayValue } = render(
    <AddNewRecord {...testProps} />
  );
  expect(
    hasInputValue(
      getByDisplayValue,
      queryByTestId("add-new-item"),
      testProps.newRecord.item
    )
  ).toBe(true);
  expect(
    hasInputValue(
      getByDisplayValue,
      queryByTestId("add-new-itemDesc"),
      testProps.newRecord.itemDesc
    )
  ).toBe(true);
  expect(
    hasInputValue(
      getByDisplayValue,
      queryByTestId("add-new-price"),
      testProps.newRecord.price
    )
  ).toBe(true);
});

test("Should call inputChangeHandler on change item input", () => {
  const { queryByTestId } = render(<AddNewRecord {...testProps} />);
  fireEvent.change(queryByTestId("add-new-item"), { target: { value: "23" } });
  expect(testProps.inputChangeHandler).toHaveBeenCalledTimes(1);
});

test("Should call inputChangeHandler on change itemDesc input", () => {
  const { queryByTestId } = render(<AddNewRecord {...testProps} />);
  fireEvent.change(queryByTestId("add-new-itemDesc"), {
    target: { value: "23" },
  });
  expect(testProps.inputChangeHandler).toHaveBeenCalledTimes(1);
});

test("Should call inputChangeHandler on change price input", () => {
  const { queryByTestId } = render(<AddNewRecord {...testProps} />);
  fireEvent.change(queryByTestId("add-new-price"), { target: { value: "23" } });
  expect(testProps.inputChangeHandler).toHaveBeenCalledTimes(1);
});

test("Should call updateRow on click remove button", () => {
  const { queryByTestId } = render(<AddNewRecord {...testProps} />);
  fireEvent.click(queryByTestId("add-new-row-remove-button"));
  expect(testProps.updateRow).toHaveBeenCalledTimes(1);
});
