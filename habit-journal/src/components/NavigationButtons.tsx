import { useEffect, useState } from "react";
import "../App.css";
import "../styles/HomePage.css";
import apiClient from "../services/api-client";
import select from "../assets/PixelSelect.png";
// interface Date {
//   year: number;
//   month: number;
//   day: number;
// }

interface Props {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const NavigationButtons = ({ date, setDate }: Props) => {
  const dateToday = new Date();
  const today = new Date(
    dateToday.getFullYear(),
    dateToday.getMonth(),
    dateToday.getDate()
  );
  const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const changeDate = (daysToChange: number) => {
    const n = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    n.setDate(n.getDate() + daysToChange);
    const updatedDate = {
      year: n.getFullYear(),
      month: n.getMonth() + 1,
      day: n.getDate(),
    };
    setDate(n);
  };
  return (
    <div className="nav-btn__container">
      <button
        type="button"
        className="arrow-btn"
        onClick={() => {
          changeDate(-1);
        }}
      >
        <img className="flip" src={select} />
      </button>
      {newDate < today && newDate !== today && (
        <button
          type="button"
          className="arrow-btn"
          onClick={() => {
            changeDate(1);
          }}
        >
          <img src={select} />
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
