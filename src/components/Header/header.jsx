import React from "react";
import Button from "react-bootstrap/Button";

import { staticKeys } from "../../constants";
import topIcon from "../../icons/arrow-up-circle.svg";

export const HeaderComponent = ({ addNewRow, scrollToTop }) => {
  return (
    <nav className="navbar sticky-top navbar-light header">
      <Button
        data-testid="add-row-button"
        variant="outline-danger"
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
        className="btn btn-link to-top"
        onClick={scrollToTop}
      >
        {staticKeys.topPage} <img src={topIcon} />
      </button>
    </nav>
  );
};
