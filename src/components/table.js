import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { HeaderComponent } from "./header";
import { AddNewRecord } from "./newRecord";

const tableData = [
  {
    item: "item 1",
    itemDesc: "item",
    price: 200,
    id: 1,
  },
  {
    item: "item 2",
    itemDesc: "item",
    price: 200,
    id: 2,
  },
  {
    item: "item 3",
    itemDesc: "item",
    price: 200,
    id: 3,
  },
  {
    item: "item 4",
    itemDesc: "item",
    price: 200,
    id: 4,
  },
  {
    item: "item 5",
    itemDesc: "item",
    price: 200,
    id: 5,
  },
  {
    item: "item 6",
    itemDesc: "item",
    price: 200,
    id: 6,
  },
  {
    item: "item 7",
    itemDesc: "item",
    price: 200,
    id: 7,
  },
];

export const CustomTable = () => {
  const [items, updateItems] = useState(tableData);
  const [displayRow, updateRow] = useState(false);
  const [recordsCount, updateRecordsCount] = useState(50);
  const [hasMoreItems, updateMoreItems] = useState(true);
  const [newRecord, updateRecord] = useState("");

  const addNewRow = (e) => {
    scrollToTop();
    if (newRecord) {
      addRecordDetals();
    }
    updateRecord("");
    updateRow(true);
  };

  const addRecordDetals = () => {
    let newItems = [...items];
    newItems.unshift(newRecord);
    updateItems(newItems);
    updateRecord("");
    updateRow(false);
  };

  const inputChangeHandler = (e, field) => {
    let updatedNewRecord = { ...newRecord };
    updatedNewRecord[field] = e.target.value;
    updateRecord(updatedNewRecord);
  };

  const removeRecord = (index) => {
    let newItems = [...items];
    newItems.splice(index, 1);
    updateItems(newItems);
  };

  const fetchMoreRecords = () => {
    if (items.length <= recordsCount) {
      updateMoreItems(!hasMoreItems);
    }
    setTimeout(() => {
      updateRecordsCount(recordsCount + 50);
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div>
      <HeaderComponent
        addNewRow={addNewRow}
        scrollToTop={scrollToTop}
        itemsCount={items?.length}
      />
      <InfiniteScroll
        dataLength={recordsCount}
        next={fetchMoreRecords}
        hasMore={hasMoreItems}
        loader={<h4>Loading 50 more records...</h4>}
      >
        <Table bordered hover>
          <thead>
            <tr>
              <th width="170">Item</th>
              <th width="170">Item Description</th>
              <th width="170">Price</th>
              <th width="100">Delete</th>
            </tr>
          </thead>
          <tbody>
            {displayRow && (
              <AddNewRecord
                inputChangeHandler={inputChangeHandler}
                newRecord={newRecord}
                updateRow={updateRow}
              />
            )}
            {items?.slice(0, recordsCount).map((record, index) => (
              <tr key={index}>
                <td>{record.item}</td>
                <td>{record.itemDesc}</td>
                <td>{record.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => removeRecord(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </InfiniteScroll>
    </div>
  );
};
