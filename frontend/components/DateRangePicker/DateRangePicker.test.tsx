import { jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import DateRangePicker from "./DateRangePicker";

test("renders DateRangePicker and handles date selection", () => {
  const mockOnDateChange = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <DateRangePicker onDateChange={mockOnDateChange} />
  );

  const startDateInput = getByPlaceholderText("Start Date");
  const endDateInput = getByPlaceholderText("End Date");
  const filterButton = getByText("Filter");

  // Simulate selecting start and end dates
  fireEvent.change(startDateInput, { target: { value: "2020-01-01" } });
  fireEvent.change(endDateInput, { target: { value: "2020-12-31" } });

  // Click the filter button
  fireEvent.click(filterButton);

  // Assert that the date change handler was called with the correct values
  expect(mockOnDateChange).toHaveBeenCalledWith({
    start: new Date("2020-01-01"),
    end: new Date("2020-12-31"),
  });
});

test("disables filter button if start or end date is missing", () => {
  const mockOnDateChange = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <DateRangePicker onDateChange={mockOnDateChange} />
  );

  const filterButton = getByText("Filter");

  // Initially, the filter button should be disabled
  expect(filterButton).toBeDisabled();

  // Fill in the start date only
  const startDateInput = getByPlaceholderText("Start Date");
  fireEvent.change(startDateInput, { target: { value: "2020-01-01" } });

  // The filter button should still be disabled
  expect(filterButton).toBeDisabled();

  // Fill in the end date
  const endDateInput = getByPlaceholderText("End Date");
  fireEvent.change(endDateInput, { target: { value: "2020-12-31" } });

  // The filter button should now be enabled
  expect(filterButton).toBeEnabled();
});
