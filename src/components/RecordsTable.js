import React, { useState, useReducer, useEffect, useRef } from "react";
import classNames from "classnames";
import { format } from "date-fns";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import useUser from "../hooks/useUser";
import { db } from "../utils/firebase";
import styles from "./RecordsTable.module.css";

function formatTimestamp(timestamp) {
  return format(new Date(timestamp * 1000), "dd/MM HH:mm");
}

function deleteReducer(state, action) {
  switch (action.type) {
    case "RESET": {
      return {
        ...state,
        state: "initial",
      };
    }

    case "DELETE": {
      return {
        ...state,
        state: "confirm",
      };
    }

    default: {
      throw new Error(`Unknown action type: "${action.type}"`);
    }
  }
}

const RecordRow = React.memo(({ record, isEditing, setEditRecordId }) => {
  const { id, timestamp, sys, dia, pulse } = record;
  const user = useUser();
  const [deleteRecord, dispatch] = useReducer(deleteReducer, {
    state: "initial",
  });
  const onRowClick = () => {
    setEditRecordId(isEditing ? null : id);
  };
  const onDeleteClick = () => {
    dispatch({ type: "DELETE" });
  };
  const onDeleteConfirmClick = () => {
    const recordPath = `users/${user.email}/records/${id}`;

    db.doc(recordPath)
      .delete()
      .catch((error) => {
        console.error(
          "Failed to delete the following record:",
          recordPath,
          error
        );
      });
  };
  const onDeleteCancelClick = () => {
    dispatch({ type: "RESET" });
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch({ type: "RESET" });
    }
  }, [isEditing]);

  return (
    <>
      <button
        className={classNames(styles.row, {
          [styles.rowEditing]: isEditing,
        })}
        onClick={onRowClick}
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
      {isEditing && (
        <div className={styles.editContainer}>
          {deleteRecord.state === "initial" && (
            <button
              className={classNames(
                styles.dangerButton,
                styles.deleteRecordButton
              )}
              onClick={onDeleteClick}
            >
              Delete Record
            </button>
          )}
          {deleteRecord.state === "confirm" && (
            <>
              <button
                className={classNames(
                  styles.dangerButton,
                  styles.deleteConfirmButton
                )}
                onClick={onDeleteConfirmClick}
              >
                Confirm
              </button>
              <button
                className={classNames(
                  styles.ghostButton,
                  styles.deleteCancelButton
                )}
                onClick={onDeleteCancelClick}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
});

function RecordsTable({ records, newRecord, bodyRef }) {
  const [editRecordId, setEditRecordId] = useState(null);
  const targetElement = useRef(null);

  useEffect(() => {
    targetElement.current = bodyRef.current;

    disableBodyScroll(targetElement.current);

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [bodyRef]);

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
