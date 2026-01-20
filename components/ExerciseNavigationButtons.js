import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ExerciseNavigationButtons({ 
  currentIndex, 
  totalExercises, 
  onPrevious, 
  onNext 
}) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalExercises - 1;

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        {/* Left Arrow Button */}
        <TouchableOpacity
          style={[styles.sideButton, styles.leftButton, isFirst && styles.buttonDisabled]}
          onPress={onPrevious}
          disabled={isFirst}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={isFirst ? '#999999' : '#000000'} 
          />
        </TouchableOpacity>

        {/* Center Indicator */}
        <View style={styles.indicator}>
          <Text style={styles.indicatorText}>{currentIndex + 1}</Text>
        </View>

        {/* Right Arrow Button */}
        <TouchableOpacity
          style={[styles.sideButton, styles.rightButton, isLast && styles.buttonDisabled]}
          onPress={onNext}
          disabled={isLast}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color={isLast ? '#999999' : '#000000'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#E7E9E8',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 5,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  sideButton: {
    width: 70,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButton: {
    marginRight: -5,
  },
  rightButton: {
    marginLeft: -5,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  indicator: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  indicatorText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
  },
});
