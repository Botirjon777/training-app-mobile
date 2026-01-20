import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { weeklyExercises } from '../data/exercises';
import ExerciseNavigationButtons from '../components/ExerciseNavigationButtons';
import UShapeProgress from '../components/UShapeProgress';

const { width, height } = Dimensions.get('window');

// Responsive scaling
const SCALE = width / 375;
const scale = (size) => Math.round(size * SCALE);

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
        toValue: -15,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset and fade in
      slideAnim.setValue(15);
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

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
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
            <Text style={[styles.verticalDayName, { fontSize: scale(60), left: scale(-130) }]}>
              {dayData.day.toUpperCase()}
            </Text>
            
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
    </View>
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
    top: '50%',
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
    paddingHorizontal: scale(20),
    paddingBottom: scale(40),
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
    fontSize: scale(40),
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: scale(20),
    marginBottom: scale(15),
  },
  exerciseDescription: {
    fontSize: scale(16),
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
    textAlign: 'center',
    lineHeight: scale(22),
    paddingHorizontal: scale(40),
    maxWidth: 500,
  },
});
