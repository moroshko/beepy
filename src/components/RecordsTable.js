import React from "react";
import classNames from "classnames";
import { format } from "date-fns";
import styles from "./RecordsTable.module.css";

function formatTimestamp(timestamp) {
  return format(new Date(timestamp * 1000), "d/MM HH:mm");
}

function RecordsTable({ records, newRecord, bodyRef }) {
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
            records.map(({ id, timestamp, sys, dia, pulse }) => (
              <div className={styles.row} key={id}>
                <div className={classNames(styles.cell, styles.timeCell)}>
                  {formatTimestamp(timestamp)}
                </div>
                <div className={styles.cell}>{sys}</div>
                <div className={styles.cell}>{dia}</div>
                <div className={classNames(styles.cell, styles.pulseCell)}>
                  {pulse}
                </div>
              </div>
            ))}
          {newRecord && (
            <div className={classNames(styles.row, styles.newRecord)}>
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
          )}
        </>
      </div>
    </div>
  );
}

export default RecordsTable;
