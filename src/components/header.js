import React from "react";
import Button from "react-bootstrap/Button";

export const HeaderComponent = ({ addNewRow, scrollToTop, itemsCount }) => {
  return (
    <nav
      className="navbar sticky-top navbar-light "
      style={{ background: "#e3f2fd" }}
    >
      {/* <span>
        {"Total Items: "} {itemsCount}
      </span> */}
      <Button variant="primary" className="add-buttton" onClick={addNewRow}>
        {"Add Row"}
      </Button>
      <button type="button" className="btn btn-link" onClick={scrollToTop}>
        Top Page
      </button>
      {/* <span onClick={scrollToTop}>Top Page</span> */}
    </nav>
  );
};
