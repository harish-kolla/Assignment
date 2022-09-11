import React from "react";
import Button from "react-bootstrap/Button";

import { staticKeys } from "../../constants";

export const HeaderComponent = ({ addNewRow, scrollToTop }) => {
  return (
    <nav
      className="navbar sticky-top navbar-light "
      style={{ background: "#e3f2fd" }}
    >
      <Button
        data-testid="add-row-button"
        variant="primary"
        className="add-buttton"
        onClick={addNewRow}
      >
        {staticKeys.addRow}
      </Button>

      <span data-testid="virtulized-list" className="virtulized-list">
        {staticKeys.virtualizedList}
      </span>
      <button
        data-testid="scroll-top-button"
        type="button"
        className="btn btn-link"
        onClick={scrollToTop}
      >
        {staticKeys.topPage}
      </button>
    </nav>
  );
};
