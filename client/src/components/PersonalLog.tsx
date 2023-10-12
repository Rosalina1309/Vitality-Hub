import React, { useState, useEffect } from "react";
import styles from "@/styles/personalLog.module.css";
import { PersonalLogData } from "@/interfaces/PersonalLog";

const PersonalLog: React.FC = () => {
  const [personalLogs, setPersonalLogs] = useState<PersonalLogData[]>([]);

  useEffect(() => {
    const hardcodedData = [
      {
        date: "23.03.1998",
        food: "Breakfast: Scrambled eggs, Lunch: Grilled chicken salad",
        exercises: "Morning jog, Evening yoga",
      },
      {
        date: "24.03.1998",
        food: "Breakfast: Oatmeal, Lunch: Vegetable stir-fry",
        exercises: "Gym workout",
      },
      {
        date: "25.03.1998",
        food: "Breakfast: Greek yogurt, Lunch: Quinoa and roasted vegetables",
        exercises: "Cycling",
      },
      {
        date: "23.03.1998",
        food: "Breakfast: Scrambled eggs, Lunch: Grilled chicken salad",
        exercises: "Morning jog, Evening yoga",
      },
      {
        date: "24.03.1998",
        food: "Breakfast: Oatmeal, Lunch: Vegetable stir-fry",
        exercises: "Gym workout",
      },
    ];

    setPersonalLogs(hardcodedData); // TODO: exclude todays 
  }, []);

  return (
    <div>
      <div className={styles.logscontainer}>
        {personalLogs.map((log, index) => (
          <div className={styles.singlelogcontainer} key={index}>
            <div className={styles.logdatecontainer}>
              <p className={styles.logdate}>{log.date}</p>
            </div>
            <div className={styles.personallog}>
              <div className={styles.food}>
                <p>Food user ate:</p>
                <p>{log.food}</p>
              </div>
              <div>
                <p>Exercises done:</p>
                <p>{log.exercises}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalLog;
