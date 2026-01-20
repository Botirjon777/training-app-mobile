import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';
import { weeklyExercises } from '../data/exercises';
import ExerciseNavigationButtons from '../components/ExerciseNavigationButtons';
import UShapeProgress from '../components/UShapeProgress';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const dayScrollRef = useRef(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const currentDayData = weeklyExercises[selectedDayIndex];
  const currentExercise = currentDayData.exercises[currentExerciseIndex];

  // Animate content when exercise changes
  useEffect(() => {
    // Fade out and slide
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset and fade in
      slideAnim.setValue(20);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [currentExerciseIndex]);

  // Handle day swipe
  const handleDayScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    if (newIndex !== selectedDayIndex && newIndex >= 0 && newIndex < weeklyExercises.length) {
      setSelectedDayIndex(newIndex);
      setCurrentExerciseIndex(0); // Reset to first exercise when day changes
    }
  };

  // Handle exercise navigation
  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < currentDayData.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E7E9E8" />
      
      {/* Day Swiper */}
      <ScrollView
        ref={dayScrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleDayScroll}
        scrollEventThrottle={16}
        style={styles.dayScrollView}
      >
        {weeklyExercises.map((dayData, dayIndex) => (
          <View key={dayData.dayNumber} style={[styles.dayContainer, { width }]}>
            {/* Vertical Day Name Background */}
            <Text style={styles.verticalDayName}>{dayData.day.toUpperCase()}</Text>
            
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
            >
              {/* Exercise Card */}
              <View style={styles.exerciseCard}>
                {/* U-Shape with Progress */}
                <UShapeProgress 
                  currentExercise={currentExerciseIndex + 1}
                  totalExercises={currentDayData.exercises.length}
                />

                {/* Animated Exercise Content */}
                <Animated.View 
                  style={[
                    styles.exerciseContent,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: slideAnim }],
                    },
                  ]}
                >
                  {/* Sets/Reps Display */}
                  <Text style={styles.setsRepsText}>
                    {currentExercise.sets}-{currentExercise.reps || currentExercise.duration}
                  </Text>

                  {/* Exercise Name */}
                  <Text style={styles.exerciseName}>{currentExercise.name}</Text>

                  {/* Exercise Description */}
                  <Text style={styles.exerciseDescription}>{currentExercise.description}</Text>
                </Animated.View>
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <ExerciseNavigationButtons
        currentIndex={currentExerciseIndex}
        totalExercises={currentDayData.exercises.length}
        onPrevious={handlePreviousExercise}
        onNext={handleNextExercise}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E9E8',
  },
  dayScrollView: {
    flex: 1,
  },
  dayContainer: {
    position: 'relative',
  },
  verticalDayName: {
    position: 'absolute',
    left: -130,
    top: '40%',
    fontSize: 75,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
    opacity: 0.05,
    transform: [{ rotate: '-90deg' }, { translateY: -150 }],
    zIndex: 1,
    width: 650,
    textAlign: 'right',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  exerciseCard: {
    backgroundColor: '#E7E9E8',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 600,
  },
  exerciseContent: {
    alignItems: 'center',
    width: '100%',
  },
  setsRepsText: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  exerciseDescription: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#555555',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 40,
    maxWidth: 500,
  },
});
