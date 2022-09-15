import React from "react";
import Button from "react-bootstrap/Button";

import { staticKeys } from "../../constants";
import topIcon from "../../icons/arrow-up-circle.svg";

export const HeaderComponent = React.forwardRef((props, ref) => {
  const { addNewRow, scrollToTop } = props;

  return (
    <nav className="navbar sticky-top navbar-light header">
      <Button
        data-testid="add-row-button"
        variant="outline-danger"
        className="add-buttton"
        onClick={() => addNewRow(ref)}
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
        onClick={() => scrollToTop(ref)}
      >
        {staticKeys.topPage} <img src={topIcon} alt="" />
      </button>
    </nav>
  );
});
