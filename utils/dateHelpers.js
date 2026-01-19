// Date helper utilities for the training app

/**
 * Get the current day of the week as a number (1-7)
 * 1 = Monday, 7 = Sunday
 */
export const getCurrentDayNumber = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
  
  // Convert to Monday = 1, Sunday = 7
  return dayOfWeek === 0 ? 7 : dayOfWeek;
};

/**
 * Get the current day name
 */
export const getCurrentDayName = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  return days[today.getDay()];
};

/**
 * Map day number to day name
 * @param {number} dayNumber - Day number (1-7)
 */
export const getDayName = (dayNumber) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days[dayNumber - 1];
};

/**
 * Get the index of a day in the weeklyExercises array
 * @param {number} dayNumber - Day number (1-7)
 */
export const getDayIndex = (dayNumber) => {
  return dayNumber - 1;
};

/**
 * Get all days of the week with their numbers
 */
export const getAllDays = () => {
  return [
    { number: 1, name: 'Monday', short: 'Mon' },
    { number: 2, name: 'Tuesday', short: 'Tue' },
    { number: 3, name: 'Wednesday', short: 'Wed' },
    { number: 4, name: 'Thursday', short: 'Thu' },
    { number: 5, name: 'Friday', short: 'Fri' },
    { number: 6, name: 'Saturday', short: 'Sat' },
    { number: 7, name: 'Sunday', short: 'Sun' },
  ];
};
