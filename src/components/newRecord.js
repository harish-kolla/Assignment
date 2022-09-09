import React from "react";

export const AddNewRecord = ({ inputChangeHandler, newRecord, updateRow }) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          value={newRecord["item"] || ""}
          onChange={(e) => inputChangeHandler(e, "item")}
        />
      </td>

      <td>
        <input
          type="text"
          value={newRecord["itemDesc"] || ""}
          onChange={(e) => inputChangeHandler(e, "itemDesc")}
        />
      </td>
      <td>
        <input
          type="text"
          value={newRecord["price"] || ""}
          onChange={(e) => inputChangeHandler(e, "price")}
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => updateRow(false)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};
