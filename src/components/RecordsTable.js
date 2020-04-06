import React, { useState } from "react";
import classNames from "classnames";
import { format } from "date-fns";
import styles from "./RecordsTable.module.css";

function formatTimestamp(timestamp) {
  return format(new Date(timestamp * 1000), "dd/MM HH:mm");
}

function RecordRow({ record, isEditing, setEditRecordId }) {
  const { id, timestamp, sys, dia, pulse } = record;
  const onClick = (e) => {
    const row = e.currentTarget;
    const newEditRecordId = isEditing ? null : id;

    setEditRecordId(newEditRecordId);

    if (newEditRecordId !== null) {
      /*
        Without the setTimeout, it doesn't always scroll to the right place 
        since we add a new DOM element and start scrolling at the same time.
        By adding the setTimeout, we first add the new DOM element, and then 
        start scrolling on the next tick.
      */
      setTimeout(() => {
        row.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  return (
    <>
      <button
        className={classNames(styles.row, {
          [styles.rowEditing]: isEditing,
        })}
        onClick={onClick}
      >
        {/* 
          The reason we need `.rowInner` is because we can't set `display: flex` 
          on the button itself because it's not supported in some browsers (e.g. Chrome). 
          See: https://stackoverflow.com/a/35466231/247243
        */}
        <span className={styles.rowInner}>
          <span className={classNames(styles.cell, styles.timeCell)}>
            {formatTimestamp(timestamp)}
          </span>
          <span className={styles.cell}>{sys}</span>
          <span className={styles.cell}>{dia}</span>
          <span className={classNames(styles.cell, styles.pulseCell)}>
            {pulse}
          </span>
        </span>
      </button>
      {isEditing && <div className={styles.editContainer}>Coming soon!</div>}
    </>
  );
}

function RecordsTable({ records, newRecord, bodyRef }) {
  const [editRecordId, setEditRecordId] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={classNames(styles.cell, styles.timeCell)}>TIME</div>
        <div className={styles.cell}>SYS</div>
        <div className={styles.cell}>DIA</div>
        <div className={classNames(styles.cell, styles.pulseCell)}>PULSE</div>
      </div>
      <div className={styles.body} ref={bodyRef}>
        <>
          {records &&
            records.map((record) => (
              <RecordRow
                record={record}
                isEditing={record.id === editRecordId}
                setEditRecordId={setEditRecordId}
                key={record.id}
              />
            ))}
          {newRecord && (
            <div className={classNames(styles.row, styles.newRecord)}>
              <div className={styles.rowInner}>
                <div className={classNames(styles.cell, styles.timeCell)} />
                <div className={styles.cell}>
                  <div
                    className={classNames({
                      [styles.withCursor]: newRecord.cursor === "sys",
                    })}
                  >
                    {newRecord.sys}
                  </div>
                </div>
                <div className={styles.cell}>
                  <div
                    className={classNames({
                      [styles.withCursor]: newRecord.cursor === "dia",
                    })}
                  >
                    {newRecord.dia}
                  </div>
                </div>
                <div className={classNames(styles.cell, styles.pulseCell)}>
                  <div
                    className={classNames({
                      [styles.withCursor]: newRecord.cursor === "pulse",
                    })}
                  >
                    {newRecord.pulse}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default RecordsTable;
