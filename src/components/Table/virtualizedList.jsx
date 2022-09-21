import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

import { AddNewRecord } from "../NewRecord";
import { HeaderComponent } from "../Header";
import { staticKeys } from "../../constants";
import deleteIcon from "../../icons/delete.svg";

const emptyRecord = {
  id: null,
  item: "",
  itemDesc: "",
  action: "",
};

export const VirtualizedList = ({
  rowHeight = staticKeys.rowHeight,
  defaultTableHeight = staticKeys.defaultTableHeight,
}) => {
  const [rows, updateItems] = useState([]);
  const [columns, updateColumns] = useState();
  const [scroll, updateScroll] = useState({
    index: 0,
    end: Math.ceil((defaultTableHeight * 2) / rowHeight),
  });
  const [newRecord, updateRecord] = useState(emptyRecord);
  const [displayRow, updateRow] = useState(false);
  const tableHeight = rowHeight * rows.length;

  const getData = () => {
    axios.get("data.json").then((res) => {
      updateColumns(Object.keys(res?.data[0])); //Taking only first record to display column names
      updateItems(res?.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const addRecordDetails = () => {
    let newItems = [...rows];
    newRecord.id = newItems.length + 1;
    newItems.unshift(newRecord);
    updateItems(newItems);
    updateRecord(emptyRecord);
    updateRow(false);
  };

  const getLastIndexOnViewPort = (startIndexOfViewPort) => {
    let height = Math.ceil((defaultTableHeight * 2) / rowHeight);
    return startIndexOfViewPort + height;
  };

  const onScroll = ({ target }) => {
    let updatedState = { ...scroll };

    let scrollTop = target.scrollTop;
    let startIndexOfViewPort = Math.floor(scrollTop / rowHeight);

    updatedState.index = startIndexOfViewPort;
    updatedState.end = getLastIndexOnViewPort(startIndexOfViewPort);

    updateScroll(updatedState);
  };

  const tableAttrs = {
    style: {
      height:
        tableHeight && defaultTableHeight > tableHeight
          ? tableHeight + 2
          : defaultTableHeight,
    },
  };

  const tbodyAttr = {
    style: {
      height: tableHeight,
      maxHeight: tableHeight,
    },
  };

  const getTopValue = (index) => {
    return displayRow ? (index + 1) * rowHeight : index * rowHeight;
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
          top: getTopValue(index),
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
                <td key={`row- ${rows[index].id}`} className="col-md-3">
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
                  key={`row-${rows[index].id}${rows[index][column]}`}
                  className="col-md-3 kkkk"
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

    updateRecord(updatedNewRecord);
  };

  const addNewRow = (ref) => {
    scrollToTop(ref);
    updateRecord(emptyRecord);
    updateRow(true);
  };

  const removeRecord = (selectedRecord) => {
    let updatedState = [...rows];
    let newItems = [...rows];
    let start = scroll.index;
    let end = scroll.end;
    let seletedId = newItems[selectedRecord].id;

    // Deleting selected record from visual records (not searching in the entire list)
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
        <thead className="sticky-top">
          <tr className="row">
            {columns?.map(
              (name, i) =>
                name !== "id" && (
                  <th width="170" className="col-md-3" key={`${i}${name}`}>
                    {staticKeys[name] || name}
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
              addRecordDetails={addRecordDetails}
            />
          )}
          {dynamicRows()}
        </tbody>
      </Table>
    </div>
  );
};
