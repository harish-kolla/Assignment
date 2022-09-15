import React from "react";

import { staticKeys } from "../../constants";
import deleteIcon from "../../icons/delete.svg";
import checkIcon from "../../icons/check-circle-fill.svg";

export const AddNewRecord = ({
  inputChangeHandler,
  newRecord,
  updateRow,
  addRecordDetals,
}) => {
  return (
    <tr data-testid="add-new-row" class="row">
      <td class="col-md-3">
        <input
          data-testid="add-new-item"
          type="text"
          value={newRecord["item"] || ""}
          onChange={(e) => inputChangeHandler(e, "item")}
        />
      </td>

      <td class="col-md-3">
        <input
          data-testid="add-new-itemDesc"
          type="text"
          value={newRecord["itemDesc"] || ""}
          onChange={(e) => inputChangeHandler(e, "itemDesc")}
        />
      </td>
      <td class="col-md-3">
        <input
          data-testid="add-new-price"
          type="text"
          value={newRecord["price"] || ""}
          onChange={(e) => inputChangeHandler(e, "price")}
        />
      </td>
      <td class="col-md-3">
        <button
          data-testid="add-new-row-remove-button"
          type="button"
          className="btn btn-link"
          onClick={() => updateRow(false)}
        >
          <img src={deleteIcon} alt={staticKeys.remove} />
        </button>
        {newRecord ? (
          <button
            data-testid="add-new-row-remove-button"
            type="button"
            className="btn btn-link"
            onClick={addRecordDetals}
          >
            <img src={checkIcon} alt="add" />
          </button>
        ) : null}
      </td>
    </tr>
  );
};
