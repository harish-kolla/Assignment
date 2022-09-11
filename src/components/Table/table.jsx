import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

import { HeaderComponent } from "../Header/header";
import { AddNewRecord } from "../NewRecord/newRecord";
import { staticKeys } from "../../constants";

export const CustomTable = () => {
  const [originalData, updateOriginalData] = useState([]);
  const [items, updateItems] = useState([]);
  const [displayRow, updateRow] = useState(false);
  const [recordsCount, updateRecordsCount] = useState(50);
  const [hasMoreItems, updateMoreItems] = useState(true);
  const [newRecord, updateRecord] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("data.json").then((res) => {
      updateOriginalData(res?.data); //storing 200k records data in originalData state, So that when we remove record will not update complete list(wil update only items list)
      updateItems(res?.data?.slice(0, 50));
    });
  };

  const addNewRow = () => {
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
    if (originalData.length <= recordsCount) {
      updateMoreItems(!hasMoreItems);
    }
    setTimeout(() => {
      updateRecordsCount(recordsCount + 50); // added setTimeout to delay loading response (as we are not triggering API call)
    }, 1000);
  };

  useEffect(() => {
    updateItems(originalData.slice(0, recordsCount)); //loading 50 records at a time, On scroll will load other records
  }, [recordsCount, originalData]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div>
      <HeaderComponent addNewRow={addNewRow} scrollToTop={scrollToTop} />
      <InfiniteScroll
        dataLength={recordsCount}
        next={fetchMoreRecords}
        hasMore={hasMoreItems}
        loader={<h4>{staticKeys.loadMore}</h4>}
      >
        <Table bordered hover>
          <thead>
            <tr>
              <th width="170">{staticKeys.item}</th>
              <th width="170">{staticKeys.itemDesc}</th>
              <th width="170">{staticKeys.price}</th>
              <th width="100">{staticKeys.delete}</th>
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
            {items?.map((record, index) => (
              <tr data-testid="row" key={index}>
                <td data-testid={`item-${index}`}>{record.item}</td>
                <td>{record.itemDesc}</td>
                <td>{record.price}</td>
                <td>
                  <button
                    data-testid={`remove-${index}`}
                    type="button"
                    className="btn btn-link"
                    onClick={() => removeRecord(index)}
                  >
                    {staticKeys.remove}
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
