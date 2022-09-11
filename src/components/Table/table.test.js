import { render, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

import { CustomTable } from "./table";
import MockedRecords from "../../../public/data.json";

beforeEach(() => {
  axios.get.mockResolvedValueOnce({
    data: MockedRecords,
  });
});

afterEach(() => {
  axios.get.mockClear();
});

test("Snapshot of table", () => {
  const { container } = render(<CustomTable />);
  expect(container.firstChild).toMatchSnapshot();
});

test("Should render Add Row button", () => {
  const { queryByText } = render(<CustomTable />);
  expect(queryByText("Add Row")).toBeTruthy();
});

test("Should render Top Page button", () => {
  const { queryByText } = render(<CustomTable />);
  expect(queryByText("To Top")).toBeTruthy();
});

test("Should render Infinite Scroll with `Loading 50 more records...` text", () => {
  const { queryByText } = render(<CustomTable />);
  expect(queryByText("Loading 50 more records...")).toBeTruthy();
});

test("Should render Table with `Item`,`Item Description`,`Price` and `Delete` column", () => {
  const { queryByText } = render(<CustomTable />);
  expect(queryByText("Item")).toBeTruthy();
  expect(queryByText("Item Description")).toBeTruthy();
  expect(queryByText("Price")).toBeTruthy();
  expect(queryByText("Delete")).toBeTruthy();
});

test("Should render Add New Row component when click on Add Row button", () => {
  const { getByText, getByTestId } = render(<CustomTable />);
  fireEvent.click(getByText("Add Row"));
  expect(getByTestId("add-new-row")).toBeTruthy();
});

test("Should render row based on given data", async () => {
  const { getAllByTestId, queryByTestId } = render(<CustomTable />);
  const rowValues = await waitFor(() =>
    getAllByTestId("row").map((row, index) => {
      return queryByTestId(`item-${index}`).textContent;
    })
  );
  expect(rowValues).toEqual(
    MockedRecords.slice(0, 50).map((data) => data.item)
  );
  expect(axios.get).toHaveBeenCalledWith("data.json");
  expect(axios.get).toHaveBeenCalledTimes(1);
});

test("Should remove row on click of remove button", async () => {
  const { getAllByTestId, queryByTestId } = render(<CustomTable />);
  await waitFor(() => getAllByTestId("row"));
  act(() => {
    fireEvent.click(queryByTestId("remove-1"));
  });
  const rowValues = await waitFor(() =>
    getAllByTestId("row").map((row, index) => {
      return queryByTestId(`item-${index}`).textContent;
    })
  );
  expect(rowValues.length).toEqual(50);
});

test("Should call inputChangeHandler on change new row input", () => {
  const { queryByTestId, getByText, getByDisplayValue } = render(
    <CustomTable />
  );
  fireEvent.click(getByText("Add Row"));
  fireEvent.change(queryByTestId("add-new-price"), { target: { value: "23" } });
  expect(getByDisplayValue("23")).toEqual(queryByTestId("add-new-price"));
});

test("Should call addNewRow on click Add Row button", async () => {
  const { queryByTestId, getByText, getByDisplayValue, getByTestId } = render(
    <CustomTable />
  );
  fireEvent.click(getByText("Add Row"));
  fireEvent.change(queryByTestId("add-new-price"), { target: { value: "23" } });
  expect(getByDisplayValue("23")).toEqual(queryByTestId("add-new-price"));
  fireEvent.click(getByText("Add Row"));
  expect(getByTestId("add-new-row")).toBeTruthy();
});
