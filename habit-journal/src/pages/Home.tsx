import { useEffect, useState } from "react";
import "../App.css";
import "../styles/HomePage.css";
import apiClient from "../services/api-client";
import select from "../assets/PixelSelect.png";
import NavigationButtons from "../components/NavigationButtons";
import Journal from "../components/Journal";
import Habits from "../components/Habits";
import HabitModal from "../components/HabitModal";

// export interface Date {
//   year: number;
//   month: number;
//   day: number;
// }
export interface JournalEntry {
  pk: number;
  entry: string;
}

export interface User {
  pk: number;
  username: string;
}
export interface Habit {
  pk: number;
  name: string;
  date_created: Date;
  user: User;
}
export interface HabitLog {
  pk: number;
  habit: Habit;
  completed: boolean;
}

const Home = () => {
  const getInitialDate = () => {
    let newDate = new Date();
    return newDate;
  };
  const [date, setDate] = useState<Date>(getInitialDate);
  const [journal, setJournal] = useState<JournalEntry | null>(null);
  const [habits, setHabits] = useState<HabitLog[]>([]);
  const [error, setError] = useState<string>("");

  const getDailyLog = async (date: Date) => {
    console.log(date.getMonth());

    apiClient
      .get(
        `/api/daily_log/${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()}`
      )
      .then((res) => {
        console.log(res);
        setHabits(res["data"]["habit_logs"]);
        setJournal(res["data"]["journal_entry"]);
        setError("");
      })
      .catch((err) => {
        setHabits([]);
        setJournal(null);
        console.log(err);
        setError(err["response"]["data"]["error"]);
      });
  };

  useEffect(() => {
    getDailyLog(date);
    // setJournal(journal);
    // setHabits(habits);
    console.log(error);
  }, [date]);

  return (
    <>
      <h1>
        Date: {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
      </h1>
      <NavigationButtons date={date} setDate={setDate} />
      {error && <h1>{error}</h1>}
      {habits.length === 0 && !journal && <h2>No log available</h2>}
      {error.length === 0 && habits && <Habits date={date} habits={habits} />}
      {error.length === 0 && journal && <Journal journal={journal} />}
    </>
  );
};
export default Home;
