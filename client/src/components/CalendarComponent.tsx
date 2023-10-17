import React, { useState } from 'react';
import styles from '../styles/calendarComponent.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { toggle } from '@/slices/calendarSlice';

const CalendarComponent: React.FC = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [notification, setNotification] = useState<string>('');
  const isOpen = useAppSelector(state => state.calendar.isOpen);

  const dispatch = useAppDispatch();

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    setNotification(
      `Reminder: Take a pill on ${day}-${selectedMonth + 1}-${selectedYear}`
    );
  };

  function toggleCalendar() {
    dispatch(toggle());
  }

  const renderCalendarDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    const calendarDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(
        <div
          key={i}
          onClick={() => handleDateClick(i)}
          className={i === selectedDate ? styles.selectedDate : ''}>
          {i}
        </div>
      );
    }
    const emptyDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      emptyDays.push(
        <div key={`empty-${i}`} className={styles.emptyDays}></div>
      );
    }
    return [...emptyDays, ...calendarDays];
  };

  const months = Array.from({ length: 12 }, (_, index) => index);
  const years = Array.from({ length: 10 }, (_, index) => currentYear + index);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value, 10));
  };

  return (
    <div className={`${styles.calendarContainer} ${isOpen ? styles.open : ''}`}>
      <button
        className={styles['icon-calendar']}
        onClick={toggleCalendar}></button>
      <div className={styles.dropdowns}>
        <div className={styles.selectItem}>
          <select value={selectedMonth} onChange={handleMonthChange}>
            {months.map(month => (
              <option key={month} value={month}>
                {new Date(0, month).toLocaleString('default', {
                  month: 'long',
                })}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.selectItem}>
          <select value={selectedYear} onChange={handleYearChange}>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.calendar}>
        <h2>
          {new Date(selectedYear, selectedMonth).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <div className={styles.daysheader}>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className={styles.calendarDays}>{renderCalendarDays()}</div>
        {selectedDate && (
          <div className={styles.notification}>
            <strong>Notification:</strong> {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
