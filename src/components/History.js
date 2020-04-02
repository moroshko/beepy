import React, { useState, useEffect, useRef } from "react";
import RecordsTable from "./RecordsTable";
import useUser from "../hooks/useUser";
import { db, getItems } from "../utils/firebase";
import { scrollToBottom } from "../utils/dom";
import { HISTORY_RECORDS_COUNT } from "../utils/settings";
import styles from "./History.module.css";

function History() {
  const user = useUser();
  const [records, setRecords] = useState(null);
  const recordsBodyRef = useRef();

  useEffect(() => {
    return db
      .collection(`users/${user.email}/records`)
      .orderBy("timestamp")
      .limit(HISTORY_RECORDS_COUNT)
      .onSnapshot((querySnapshot) => {
        setRecords(getItems(querySnapshot));
        scrollToBottom(recordsBodyRef);
      });
  }, [user]);

  return (
    <div className={styles.container}>
      <RecordsTable records={records} bodyRef={recordsBodyRef} />
    </div>
  );
}

export default History;
