import React from "react";

import { staticKeys } from "../../constants";

export const AddNewRecord = ({ inputChangeHandler, newRecord, updateRow }) => {
  return (
    <tr data-testid="add-new-row">
      <td>
        <input
          data-testid="add-new-item"
          type="text"
          value={newRecord["item"] || ""}
          onChange={(e) => inputChangeHandler(e, "item")}
        />
      </td>

      <td>
        <input
          data-testid="add-new-itemDesc"
          type="text"
          value={newRecord["itemDesc"] || ""}
          onChange={(e) => inputChangeHandler(e, "itemDesc")}
        />
      </td>
      <td>
        <input
          data-testid="add-new-price"
          type="text"
          value={newRecord["price"] || ""}
          onChange={(e) => inputChangeHandler(e, "price")}
        />
      </td>
      <td>
        <button
          data-testid="add-new-row-remove-button"
          type="button"
          className="btn btn-link"
          onClick={() => updateRow(false)}
        >
          {staticKeys.remove}
        </button>
      </td>
    </tr>
  );
};
