import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import RecordsTable from "./RecordsTable";
import useUser from "../hooks/useUser";
import { parseRecord } from "../utils/record";
import { db, getItems } from "../utils/firebase";
import { scrollToBottom } from "../utils/dom";
import { HOME_RECORDS_COUNT } from "../utils/settings";
import styles from "./Home.module.css";

const onTouchStart = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

function Home() {
  const user = useUser();
  const [records, setRecords] = useState(null);
  const [errorLoadingRecords, setErrorLoadingErrors] = useState(null);
  const [newRecordStr, setNewRecordStr] = useState("");
  const [lastRecordStrAdded, setLastRecordStrAdded] = useState("");
  const newRecord = parseRecord(newRecordStr);
  const readyToAdd = newRecord.cursor === null;
  const onDigitClick = (e) => {
    const { digit } = e.target.dataset;
    const { isZeroAllowed, moreDigitsAllowed } = newRecord;

    setNewRecordStr((newRecordStr) => {
      if (!moreDigitsAllowed) {
        return newRecordStr;
      }

      if (digit === "0" && !isZeroAllowed) {
        return newRecordStr;
      }

      return `${newRecordStr}${digit}`;
    });
    scrollToBottom(recordsBodyRef);
  };
  const onDeleteDigit = () => {
    setNewRecordStr((newRecordStr) => newRecordStr.slice(0, -1));
    scrollToBottom(recordsBodyRef);
  };
  const onClear = () => {
    setNewRecordStr("");
    scrollToBottom(recordsBodyRef);
  };
  const onAddRecord = () => {
    const recordToAdd = {
      timestamp: Math.floor(Date.now() / 1000),
      sys: newRecord.sys,
      dia: newRecord.dia,
      pulse: newRecord.pulse,
    };

    setLastRecordStrAdded(newRecordStr);
    setNewRecordStr("");

    db.collection(`users/${user.email}/records`)
      .add(recordToAdd)
      .catch((error) => {
        console.error(
          "Failed to add the following record:",
          JSON.stringify(recordToAdd, null, 2),
          error
        );

        setNewRecordStr(lastRecordStrAdded);
      });
  };
  const recordsBodyRef = useRef();

  useEffect(() => {
    return db
      .collection(`users/${user.email}/records`)
      .orderBy("timestamp")
      .limit(HOME_RECORDS_COUNT)
      .onSnapshot(
        (querySnapshot) => {
          setRecords(getItems(querySnapshot));
          scrollToBottom(recordsBodyRef);
        },
        (error) => {
          setErrorLoadingErrors(error.message);
        }
      );
  }, [user]);

  return (
    <div className={styles.container}>
      {errorLoadingRecords && (
        <div className="errorMessage">Error: {errorLoadingRecords}</div>
      )}
      {records && (
        <>
          <RecordsTable
            records={records}
            newRecord={newRecord}
            bodyRef={recordsBodyRef}
          />
          <div className={styles.buttonsContainer}>
            <div className={styles.numpadContainer}>
              <button
                className={classNames(
                  styles.numpadButton,
                  styles.numpadButtonTopLeft,
                  {
                    [styles.notAllowed]: !newRecord.moreDigitsAllowed,
                  }
                )}
                data-digit="1"
                onClick={onDigitClick}
                /* 
                  onTouchStart allows Mobile Safari to show the active state on the button.
                  See: https://stackoverflow.com/a/33681490/247243
                */
                onTouchStart={onTouchStart}
              >
                1
              </button>
              <button
                className={classNames(styles.numpadButton, {
                  [styles.notAllowed]: !newRecord.moreDigitsAllowed,
                })}
                data-digit="2"
                onClick={onDigitClick}
              >
                2
              </button>
              <button
                className={classNames(
                  styles.numpadButton,
                  styles.numpadButtonTopRight,
                  styles.numpadButtonRight,
                  {
                    [styles.notAllowed]: !newRecord.moreDigitsAllowed,
                  }
                )}
                data-digit="3"
                onClick={onDigitClick}
              >
                3
              </button>
              <button
                className={classNames(styles.numpadButton, {
                  [styles.notAllowed]: !newRecord.moreDigitsAllowed,
                })}
                data-digit="4"
                onClick={onDigitClick}
              >
                4
              </button>
              <button
                className={classNames(styles.numpadButton, {
                  [styles.notAllowed]: !newRecord.moreDigitsAllowed,
                })}
                data-digit="5"
                onClick={onDigitClick}
              >
                5
              </button>
              <button
                className={classNames(
                  styles.numpadButton,
                  styles.numpadButtonRight,
                  {
                    [styles.notAllowed]: !newRecord.moreDigitsAllowed,
                  }
                )}
                data-digit="6"
                onClick={onDigitClick}
              >
                6
              </button>
              <button
                className={classNames(styles.numpadButton, {
                  [styles.notAllowed]: !newRecord.moreDigitsAllowed,
                })}
                data-digit="7"
                onClick={onDigitClick}
              >
                7
              </button>
              <button
                className={classNames(styles.numpadButton, {
                  [styles.notAllowed]: !newRecord.moreDigitsAllowed,
                })}
                data-digit="8"
                onClick={onDigitClick}
              >
                8
              </button>
              <button
                className={classNames(
                  styles.numpadButton,
                  styles.numpadButtonRight,
                  {
                    [styles.notAllowed]: !newRecord.moreDigitsAllowed,
                  }
                )}
                data-digit="9"
                onClick={onDigitClick}
              >
                9
              </button>
              <button
                className={classNames(
                  styles.numpadButton,
                  styles.numpadButtonBottomLeft,
                  styles.numpadButtonBottom,
                  {
                    [styles.notAllowed]: newRecordStr === "",
                  }
                )}
                onClick={onClear}
              >
                clear
              </button>
              <button
                className={classNames(
                  styles.numpadButton,
                  styles.numpadButtonBottom,
                  {
                    [styles.notAllowed]: !newRecord.isZeroAllowed,
                  }
                )}
                data-digit="0"
                onClick={onDigitClick}
              >
                0
              </button>
              <button
                className={classNames(
                  styles.numpadButton,
                  styles.numpadButtonBottomRight,
                  styles.numpadButtonRight,
                  styles.numpadButtonBottom,
                  {
                    [styles.notAllowed]: newRecordStr === "",
                  }
                )}
                onClick={onDeleteDigit}
              >
                <svg
                  viewBox="0 0 24 24"
                  width={28}
                  height={28}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                  <line x1="18" x2="12" y1="9" y2="15" />
                  <line x1="12" x2="18" y1="9" y2="15" />
                </svg>
              </button>
            </div>
            <button
              className={classNames(
                styles.numpadButton,
                styles.addRecordButton
              )}
              disabled={!readyToAdd}
              onClick={onAddRecord}
            >
              {readyToAdd ? "Add Record" : "Type your Blood Pressure"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
