import React from "react";

import { staticKeys } from "../../constants";
import deleteIcon from "../../icons/delete.svg";
import checkIcon from "../../icons/check-circle-fill.svg";

export const AddNewRecord = ({
  inputChangeHandler,
  newRecord,
  updateRow,
  addRecordDetails,
}) => {
  //checking atleast one record has value, If value exists then add row (tick mark) will be visible to add the record
  let checkEmptyValues = !Object.values(newRecord).some(
    (ele) => ele !== null && ele !== ""
  );
  return (
    <tr data-testid="add-new-row" className="row">
      <td className="col-md-3">
        <input
          data-testid="add-new-item"
          type="text"
          value={newRecord["item"] || ""}
          onChange={(e) => inputChangeHandler(e, "item")}
        />
      </td>

      <td className="col-md-3">
        <input
          data-testid="add-new-itemDesc"
          type="text"
          value={newRecord["itemDesc"] || ""}
          onChange={(e) => inputChangeHandler(e, "itemDesc")}
        />
      </td>
      <td className="col-md-3">
        <input
          data-testid="add-new-price"
          type="text"
          value={newRecord["price"] || ""}
          onChange={(e) => inputChangeHandler(e, "price")}
        />
      </td>
      <td className="col-md-3">
        <button
          data-testid="add-new-row-remove-button"
          type="button"
          className="btn btn-link"
          onClick={() => updateRow(false)}
        >
          <img src={deleteIcon} alt={staticKeys.remove} />
        </button>
        {!checkEmptyValues ? (
          <button
            data-testid="add-new-row-remove-button"
            type="button"
            className="btn btn-link"
            onClick={addRecordDetails}
          >
            <img src={checkIcon} alt="add" />
          </button>
        ) : null}
      </td>
    </tr>
  );
};
