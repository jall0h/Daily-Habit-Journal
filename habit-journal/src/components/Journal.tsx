import React, { useEffect, useRef, useState } from "react";
import apiClient from "../services/api-client";
import "../styles/HomePage.css";
import { JournalEntry } from "../pages/Home";

interface Props {
  journal: JournalEntry | null;
}

const Journal = ({ journal }: Props) => {
  const getInitialEntry = () => {
    if (journal) return journal.entry;
    else return "";
  };

  const [entry, setEntry] = useState<string>(getInitialEntry);
  const [text, setText] = useState<string>(getInitialEntry);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const saveJournal = async () => {
    const newEntry = text;
    apiClient
      .put(`/api/journal/${journal?.pk}`, {
        entry: newEntry,
      })
      .then((res) => {
        console.log(res);
        setCanEdit(false);
        setEntry(res["data"]["entry"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("Journal", journal);
    console.log("Entry", entry);
    if (journal) {
      setEntry(journal?.entry);
      setText(journal?.entry);
      setCanEdit(false);
    }
  }, [journal]);

  return (
    <>
      <h3>Journal Entry</h3>
      <div className="text__container">
        <textarea
          id="text-bar"
          disabled={!canEdit}
          value={text}
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
        ></textarea>
        <div className="btn__primary">
          <button
            onClick={() => {
              setCanEdit(true);
            }}
            className="btn__secondary"
            disabled={canEdit}
            type="button"
          >
            EDIT
          </button>
          <button
            onClick={() => {
              setCanEdit(false);
              setText(entry);
            }}
            type="reset"
            disabled={!canEdit}
            className="btn__secondary"
          >
            CANCEL
          </button>
          <button
            onClick={() => {
              saveJournal();
              setCanEdit(false);
            }}
            type="button"
            className="btn__secondary"
            disabled={!canEdit}
          >
            SAVE
          </button>
        </div>
      </div>
    </>
  );
};

export default Journal;
