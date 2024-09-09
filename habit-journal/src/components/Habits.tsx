import React, { useEffect, useRef, useState } from "react";
import { Habit, HabitLog } from "../pages/Home";
import apiClient from "../services/api-client";
import "../styles/HomePage.css";
import HabitModal from "./HabitModal";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

interface Props {
  habits: HabitLog[];
  date: Date;
}

const Habits = ({ habits, date }: Props) => {
  const dateToday = new Date();
  const today = new Date(
    dateToday.getFullYear(),
    dateToday.getMonth(),
    dateToday.getDate()
  );
  const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const [habitLog, setHabitLog] = useState<HabitLog[]>(habits || []);
  const habitRef = useRef<HTMLInputElement>(null);
  const updateHabit = async (e: HTMLInputElement, habit: HabitLog) => {
    apiClient
      .put(`/api/habit_log/${habit.pk}`, {
        ...habit,
        completed: e.checked,
      })
      .then((res) => {
        setHabitLog(
          habitLog.map((h) =>
            h.pk === habit.pk ? { ...h, completed: e.checked } : h
          )
        );
      })
      .catch((err) => console.log(err));
  };
  console.log(habits);

  const createHabit = async (habit: string) => {
    apiClient
      .post(`/api/habits/`, {
        name: habit,
      })
      .then((res) => {
        console.log(res);
        const newHabit = res.data;
        setHabitLog([...habitLog, newHabit]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteHabit = (pk: number) => {
    setHabitLog(habitLog.filter((habit) => habit.habit.pk !== pk));
  };

  useEffect(() => {
    console.log("Habits", habitLog);
    if (habits) {
      setHabitLog(habits);
    }
  }, [habits]);

  return (
    <div>
      <HabitModal
        habitLog={habitLog}
        setHabitLog={setHabitLog}
        handleDeleteHabit={handleDeleteHabit}
      />
      <h1>Habits</h1>
      <div className="habit-list-container">
        <ul id="habit-list">
          {habitLog.map((habit) => (
            <li key={habit.pk}>
              <span className="habit-title">{habit["habit"].name}</span>
              <input
                type="checkbox"
                defaultChecked={habit.completed}
                onChange={(e) => {
                  console.log(habit);
                  updateHabit(e.currentTarget, habit);
                  console.log(e.currentTarget.checked);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      {newDate >= today && (
        <span>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (habitRef.current) createHabit(habitRef.current.value);
            }}
          >
            <input
              ref={habitRef}
              type="text"

              placeholder="Enter new habit"
              maxLength={100}
            ></input>
            <button className="btn__secondary"type="submit">Create Habit</button>
          </form>
          <button
            onClick={() => {
              const modal = document.getElementById(
                "editModal"
              ) as HTMLDivElement;
              if (modal) {
                modal.style.display = "block";
              }
            }}
            type="button"
            className="btn__secondary"
          >
            Edit Habits
          </button>
        </span>
      )}
    </div>
  );
};

export default Habits;
