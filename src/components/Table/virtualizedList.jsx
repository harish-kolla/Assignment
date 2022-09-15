import React, { useState, useEffect, useRef } from "react";
import { AddNewRecord } from "../NewRecord";
import { HeaderComponent } from "../Header";
import deleteIcon from "../../icons/delete.svg";
import Table from "react-bootstrap/Table";
import axios from "axios";

export const VirtualizedList = ({
  rowHeight = 40,
  defaultTableHeight = 600,
}) => {
  const [rows, updateItems] = useState([]);
  const [columns, updateColumns] = useState();
  const [scroll, updateScroll] = useState({
    top: 0,
    index: 0,
    end: Math.ceil((defaultTableHeight * 2) / rowHeight),
  });
  const [newRecord, updateRecord] = useState("");
  const [displayRow, updateRow] = useState(false);
  const tableHeight = rowHeight * rows.length;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("data.json").then((res) => {
      updateItems(res?.data); //storing 200k records data in originalData state, So that when we remove record will not update complete list(wil update only items list)
      updateColumns(Object.keys(res?.data[0]));
    });
  };

  const addRecordDetals = () => {
    let valuesExist = false;
    for (let key in newRecord) {
      if (newRecord[key]) {
        valuesExist = true;
      }
    }
    if (valuesExist) {
      let newItems = [...rows];
      newItems.unshift(newRecord);
      updateItems(newItems);
      updateRecord("");
      updateRow(false);
    }
  };

  const onScroll = ({ target }) => {
    let updatedState = { ...scroll };

    let scrollTop = target.scrollTop;
    let index = Math.floor(scrollTop / rowHeight);

    updatedState.index = index;
    updatedState.end = index + Math.ceil((defaultTableHeight * 2) / rowHeight);
    updatedState.top = (scrollTop / rowHeight) * rowHeight;

    updateScroll(updatedState);
  };

  const tableAttrs = {
    style: {
      height:
        defaultTableHeight > tableHeight && tableHeight
          ? tableHeight + 2
          : defaultTableHeight,
    },
  };

  const tbodyAttr = {
    style: {
      position: "relative",
      display: "inline-block",
      height: tableHeight,
      maxHeight: tableHeight,
      width: "100%",
    },
  };

  const dynamicRows = () => {
    let start = scroll.index;
    let end = scroll.end;
    let records = [];

    for (let index = start; index < end; index++) {
      if (index >= rows.length) return;

      const rowAttrs = {
        style: {
          position: "absolute",
          top: displayRow ? (index + 1) * rowHeight : index * rowHeight,
          left: 0,
          height: rowHeight,
          lineHeight: `${rowHeight}px`,
        },
      };

      records.push(
        <tr {...rowAttrs} className={`row ${rows[index].id}`} key={index}>
          {columns?.map((column, j) => {
            if (column === "action") {
              return (
                <td key={`key- ${rows[index].id}`} className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => removeRecord(index)}
                  >
                    <img src={deleteIcon} alt={"Remove"} />
                  </button>
                </td>
              );
            } else if (column !== "id") {
              return (
                <td
                  key={`keysss-${rows[index].id}${rows[index][column]}`}
                  className="col-md-3"
                >
                  {rows[index][column]}
                </td>
              );
            } else return null;
          })}
        </tr>
      );
    }

    return records;
  };

  const inputChangeHandler = (e, field) => {
    let updatedNewRecord = { ...newRecord };
    updatedNewRecord[field] = e.target.value;
    let checkEmptyValues = !Object.values(updatedNewRecord).some(
      (ele) => ele !== null && ele !== ""
    );
    updateRecord(updatedNewRecord);
    checkEmptyValues && updateRecord("");
  };

  const addNewRow = (ref) => {
    scrollToTop(ref);
    updateRecord("");
    updateRow(true);
  };

  const removeRecord = (selectedRecord) => {
    let updatedState = [...rows];
    let newItems = [...rows];
    let start = scroll.index;
    let end = scroll.end;
    let seletedId = newItems[selectedRecord].id;

    //deleting selected record from Visualized list, not searching in the entire list
    let res = newItems.slice(start, end).filter((item, i) => {
      return item.id !== seletedId;
    });

    updatedState.splice(start, end, res);
    updateItems(updatedState.flat());
  };

  const scrollToTop = (ref) => {
    const myRef = ref.current;
    myRef.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollRef = useRef();

  return (
    <div className="Virtualized-list">
      <HeaderComponent
        ref={scrollRef}
        addNewRow={addNewRow}
        scrollToTop={scrollToTop}
      />

      <Table
        className={"virtualized-table"}
        ref={scrollRef}
        striped
        hover
        onScroll={onScroll}
        {...tableAttrs}
      >
        <thead className="sticky-top" id={"visualized-list"}>
          <tr className="row">
            {columns?.map(
              (name, i) =>
                name !== "id" && (
                  <th width="170" className="col-md-3" key={`${i}${name}`}>
                    {name}
                  </th>
                )
            )}
          </tr>
        </thead>

        <tbody {...tbodyAttr} className="row">
          {displayRow && (
            <AddNewRecord
              inputChangeHandler={inputChangeHandler}
              newRecord={newRecord}
              updateRow={updateRow}
              addRecordDetals={addRecordDetals}
            />
          )}
          {dynamicRows()}
        </tbody>
      </Table>
    </div>
  );
};
