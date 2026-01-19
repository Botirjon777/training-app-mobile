import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getAllDays, getCurrentDayNumber } from '../utils/dateHelpers';

export default function VerticalDaySelector({ selectedDay, onDaySelect }) {
  const days = getAllDays();
  const currentDay = getCurrentDayNumber();

  return (
    <View style={styles.container}>
      {days.map((day) => {
        const isSelected = selectedDay === day.number;
        const isToday = currentDay === day.number;

        return (
          <TouchableOpacity
            key={day.number}
            activeOpacity={0.7}
            onPress={() => onDaySelect(day.number)}
            style={[
              styles.dayButton,
              isSelected && styles.dayButtonActive,
            ]}
          >
            <Text style={[
              styles.dayShort,
              isSelected && styles.dayShortActive,
            ]}>
              {day.short}
            </Text>
            <Text style={[
              styles.dayNumber,
              isSelected && styles.dayNumberActive,
            ]}>
              {day.number}
            </Text>
            {isToday && !isSelected && <View style={styles.todayIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 8,
    gap: 12,
  },
  dayButton: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a3e',
    position: 'relative',
  },
  dayButtonActive: {
    backgroundColor: '#667eea',
  },
  dayShort: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6a6a8a',
    marginBottom: 2,
  },
  dayShortActive: {
    color: '#ffffff',
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a6a8a',
  },
  dayNumberActive: {
    color: '#ffffff',
  },
  todayIndicator: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#667eea',
  },
});
