import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Habit, HabitLog } from "../pages/Home";
import "../styles/HomePage.css";
import HabitModalItem from "./HabitModalItem";
interface Props {
  handleDeleteHabit: (pk: number) => void;
  habitLog: HabitLog[];
  setHabitLog: React.Dispatch<React.SetStateAction<HabitLog[]>>;
}
const HabitModal = ({ handleDeleteHabit, habitLog, setHabitLog }: Props) => {
  const handleDelete = (habitPK: number) => {
    setHabitLog(habitLog.filter((habit) => habit.habit.pk !== habitPK));
    handleDeleteHabit(habitPK);
  };

  const closeModal = () => {
    const modal = document.getElementById("editModal") as HTMLDivElement;
    if (modal) {
      modal.style.display = "none";
    }
  };
  return (
    <div id="editModal">
      <h1>Edit Habits</h1>
      <button
        onClick={() => {
          closeModal();
        }}
        type="button"
      >
        close
      </button>
      <div className="modal-content">
        {habitLog.map((habit: HabitLog) => (
          <HabitModalItem
            key={habit.habit.pk}
            handleDelete={handleDelete}
            habit={habit.habit}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitModal;
