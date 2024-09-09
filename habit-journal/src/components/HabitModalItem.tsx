import React from "react";
import { Habit } from "../pages/Home";
import "../styles/HomePage.css";
import apiClient from "../services/api-client";
interface Props {
  habit: Habit;
  handleDelete: (pk: number) => void;
}
const HabitModalItem = ({ habit, handleDelete }: Props) => {
  const date = new Date(habit.date_created);
  const deletehabit = () => {
    apiClient
      .delete(`/api/habits/${habit.pk}`)
      .then((res) => {
        console.log(res);
        handleDelete(habit.pk);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <span className="modal-item-title">
        <p>{habit.name} </p>
        <p>
          Date Created: {date.getDate()}/{date.getMonth() + 1}/
          {date.getFullYear()}
        </p>
      </span>
      <div>
        <button
          onClick={() => {
            deletehabit();
          }}
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default HabitModalItem;
