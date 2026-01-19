import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAllDays, getCurrentDayNumber } from '../utils/dateHelpers';

export default function WeekDaySelector({ selectedDay, onDaySelect }) {
  const days = getAllDays();
  const currentDay = getCurrentDayNumber();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {days.map((day) => {
          const isSelected = selectedDay === day.number;
          const isToday = currentDay === day.number;

          return (
            <TouchableOpacity
              key={day.number}
              activeOpacity={0.7}
              onPress={() => onDaySelect(day.number)}
            >
              {isSelected ? (
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.dayButton}
                >
                  <Text style={styles.dayShort}>{day.short}</Text>
                  <Text style={styles.dayNumber}>{day.number}</Text>
                  {isToday && <View style={styles.todayIndicator} />}
                </LinearGradient>
              ) : (
                <View style={[styles.dayButton, styles.dayButtonInactive]}>
                  <Text style={styles.dayShortInactive}>{day.short}</Text>
                  <Text style={styles.dayNumberInactive}>{day.number}</Text>
                  {isToday && <View style={styles.todayIndicatorInactive} />}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  dayButton: {
    width: 60,
    height: 70,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dayButtonInactive: {
    backgroundColor: '#2a2a3e',
  },
  dayShort: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  dayShortInactive: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6a6a8a',
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dayNumberInactive: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a6a8a',
  },
  todayIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  todayIndicatorInactive: {
    position: 'absolute',
    bottom: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#667eea',
  },
});
