import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { format } from "date-fns";
import useUser from "../hooks/useUser";
import { parseRecord } from "../utils/record";
import { db } from "../utils/firebase";
import styles from "./Home.module.css";

function formatTimestamp(timestamp) {
  return format(new Date(timestamp * 1000), "d/MM HH:mm");
}

function Home() {
  const user = useUser();
  const [records, setRecords] = useState(null);
  const [newRecordStr, setNewRecordStr] = useState("");
  const [lastRecordStrAdded, setLastRecordStrAdded] = useState("");
  const newRecord = parseRecord(newRecordStr);
  const readyToAdd = newRecord.cursor === null;
  const onDigitClick = e => {
    const { digit } = e.target.dataset;
    const { isZeroAllowed, moreDigitsAllowed } = newRecord;

    setNewRecordStr(newRecordStr => {
      if (!moreDigitsAllowed) {
        return newRecordStr;
      }

      if (digit === "0" && !isZeroAllowed) {
        return newRecordStr;
      }

      return `${newRecordStr}${digit}`;
    });
    scrollToBottom();
  };
  const onDeleteDigit = () => {
    setNewRecordStr(newRecordStr => newRecordStr.slice(0, -1));
    scrollToBottom();
  };
  const onClear = () => {
    setNewRecordStr("");
    scrollToBottom();
  };
  const onAddRecord = () => {
    const recordToAdd = {
      timestamp: Math.floor(Date.now() / 1000),
      sys: newRecord.sys,
      dia: newRecord.dia,
      pulse: newRecord.pulse
    };

    setLastRecordStrAdded(newRecordStr);
    setNewRecordStr("");

    db.collection(`users/${user.email}/records`)
      .add(recordToAdd)
      .catch(error => {
        console.error(
          "Failed to add the following record:",
          JSON.stringify(recordToAdd, null, 2),
          error
        );

        setNewRecordStr(lastRecordStrAdded);
      });
  };
  const recordsContainerRef = useRef();
  const scrollToBottom = () => {
    recordsContainerRef.current.scrollTop =
      recordsContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    return db
      .collection(`users/${user.email}/records`)
      .orderBy("timestamp")
      .limit(100)
      .onSnapshot(querySnapshot => {
        const records = [];

        querySnapshot.forEach(doc => {
          records.push({
            id: doc.id,
            ...doc.data()
          });
        });

        setRecords(records);
        scrollToBottom();
      });
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.recordsHeader}>
        <div className={classNames(styles.recordCell, styles.recordTimeCell)}>
          TIME
        </div>
        <div className={styles.recordCell}>SYS</div>
        <div className={styles.recordCell}>DIA</div>
        <div className={classNames(styles.recordCell, styles.recordPulseCell)}>
          PULSE
        </div>
      </div>
      <div className={styles.recordsContainer} ref={recordsContainerRef}>
        {records && (
          <>
            {records.map(({ id, timestamp, sys, dia, pulse }) => (
              <div className={styles.record} key={id}>
                <div
                  className={classNames(
                    styles.recordCell,
                    styles.recordTimeCell
                  )}
                >
                  {formatTimestamp(timestamp)}
                </div>
                <div className={styles.recordCell}>{sys}</div>
                <div className={styles.recordCell}>{dia}</div>
                <div
                  className={classNames(
                    styles.recordCell,
                    styles.recordPulseCell
                  )}
                >
                  {pulse}
                </div>
              </div>
            ))}
            <div className={classNames(styles.record, styles.newRecord)}>
              <div
                className={classNames(styles.recordCell, styles.recordTimeCell)}
              />
              <div className={styles.recordCell}>
                <div
                  className={classNames({
                    [styles.withCursor]: newRecord.cursor === "sys"
                  })}
                >
                  {newRecord.sys}
                </div>
              </div>
              <div className={styles.recordCell}>
                <div
                  className={classNames({
                    [styles.withCursor]: newRecord.cursor === "dia"
                  })}
                >
                  {newRecord.dia}
                </div>
              </div>
              <div
                className={classNames(
                  styles.recordCell,
                  styles.recordPulseCell
                )}
              >
                <div
                  className={classNames({
                    [styles.withCursor]: newRecord.cursor === "pulse"
                  })}
                >
                  {newRecord.pulse}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.numpadContainer}>
          <button
            className={classNames(styles.numpadButton, {
              notAllowed: !newRecord.moreDigitsAllowed
            })}
            data-digit="1"
            onClick={onDigitClick}
          >
            1
          </button>
          <button
            className={classNames(styles.numpadButton, {
              notAllowed: !newRecord.moreDigitsAllowed
            })}
            data-digit="2"
            onClick={onDigitClick}
          >
            2
          </button>
          <button
            className={classNames(styles.numpadButton, styles.borderRight, {
              notAllowed: !newRecord.moreDigitsAllowed
            })}
            data-digit="3"
            onClick={onDigitClick}
          >
            3
          </button>
          <button
            className={classNames(styles.numpadButton, {
              notAllowed: !newRecord.moreDigitsAllowed
            })}
            data-digit="4"
            onClick={onDigitClick}
          >
            4
          </button>
          <button
            className={classNames(styles.numpadButton, {
              notAllowed: !newRecord.moreDigitsAllowed
            })}
            data-digit="5"
            onClick={onDigitClick}
          >
            5
          </button>
          <button
            className={classNames(styles.numpadButton, styles.borderRight, {
              notAllowed: !newRecord.moreDigitsAllowed
            })}
            data-digit="6"
            onClick={onDigitClick}
          >
            6
          </button>
          <button
            className={classNames(styles.numpadButton, {
              notAllowed: !newRecord.moreDigitsAllowed
            })}
            data-digit="7"
            onClick={onDigitClick}
          >
            7
          </button>
          <button
            className={classNames(styles.numpadButton, {
              notAllowed: !newRecord.moreDigitsAllowed
            })}
            data-digit="8"
            onClick={onDigitClick}
          >
            8
          </button>
          <button
            className={classNames(styles.numpadButton, styles.borderRight, {
              notAllowed: !newRecord.moreDigitsAllowed
            })}
            data-digit="9"
            onClick={onDigitClick}
          >
            9
          </button>
          <button
            className={classNames(styles.numpadButton, styles.borderBottom, {
              notAllowed: newRecordStr === ""
            })}
            onClick={onClear}
          >
            clear
          </button>
          <button
            className={classNames(styles.numpadButton, styles.borderBottom, {
              notAllowed: !newRecord.isZeroAllowed
            })}
            data-digit="0"
            onClick={onDigitClick}
          >
            0
          </button>
          <button
            className={classNames(
              styles.numpadButton,
              styles.borderRight,
              styles.borderBottom,
              {
                notAllowed: newRecordStr === ""
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
          className={classNames(styles.numpadButton, styles.addRecordButton)}
          disabled={!readyToAdd}
          onClick={onAddRecord}
        >
          {readyToAdd ? "Add Record" : "Type your Blood Pressure"}
        </button>
      </div>
    </div>
  );
}

export default Home;
