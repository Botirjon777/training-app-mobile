import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { weeklyExercises } from '../data/exercises';
import VerticalDaySelector from '../components/VerticalDaySelector';
import { getCurrentDayNumber } from '../utils/dateHelpers';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [selectedDay, setSelectedDay] = useState(getCurrentDayNumber());
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const currentDayData = weeklyExercises[selectedDay - 1];
  const exercises = currentDayData.exercises;

  // Reset to first exercise when day changes
  useEffect(() => {
    setCurrentExerciseIndex(0);
  }, [selectedDay]);

  const handleDaySelect = (dayNumber) => {
    setSelectedDay(dayNumber);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleExerciseScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const contentWidth = sidebarVisible ? width - 80 : width; // Adjust for sidebar
    const currentIndex = Math.round(offsetX / contentWidth);
    if (currentIndex !== currentExerciseIndex && currentIndex >= 0 && currentIndex < exercises.length) {
      setCurrentExerciseIndex(currentIndex);
    }
  };

  // Get day icon component
  const getDayIcon = (day) => {
    const iconProps = { size: 28, color: '#ffffff' };
    const icons = {
      'Monday': 'fitness',
      'Tuesday': 'flame',
      'Wednesday': 'flash',
      'Thursday': 'trophy',
      'Friday': 'rocket',
      'Saturday': 'star',
      'Sunday': 'heart',
    };
    return <Ionicons name={icons[day] || 'fitness'} {...iconProps} />;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Top Navigation Bar */}
      <View style={styles.topNavBar}>
        <TouchableOpacity 
          onPress={toggleSidebar}
          style={styles.navButton}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={24} color="#ffffff" />
        </TouchableOpacity>
        
        <Text style={styles.appName}>Training App</Text>
        
        <TouchableOpacity 
          style={styles.navButton}
          activeOpacity={0.7}
        >
          <Ionicons name="settings" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        {/* Left Sidebar - Vertical Day Selector */}
        {sidebarVisible && (
          <View style={styles.sidebar}>
            <VerticalDaySelector 
              selectedDay={selectedDay} 
              onDaySelect={handleDaySelect} 
            />
          </View>
        )}

        {/* Right Content Area */}
        <View style={styles.contentArea}>
          {/* Day Header */}
          <View style={styles.dayHeader}>
            <View style={styles.dayHeaderTop}>
              <View style={styles.dayIcon}>
                {getDayIcon(currentDayData.day)}
              </View>
              <View style={styles.dayInfo}>
                <Text style={styles.dayName}>{currentDayData.day}</Text>
                <Text style={styles.daySubtitle}>{exercises.length} exercises today</Text>
              </View>
            </View>
          </View>

          {/* Exercise Swiper */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleExerciseScroll}
            scrollEventThrottle={16}
            style={styles.exerciseScrollView}
          >
            {exercises.map((exercise, index) => (
              <ScrollView
                key={exercise.id}
                style={[
                  styles.exerciseContainer,
                  { width: sidebarVisible ? width - 80 : width }
                ]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.exerciseContent}
              >
                {/* Exercise Counter */}
                <View style={styles.exerciseCounter}>
                  <Text style={styles.counterText}>Exercise {index + 1}/{exercises.length}</Text>
                </View>

                {/* Exercise Title */}
                <Text style={styles.exerciseTitle}>{exercise.name}</Text>

                {/* Exercise Stats */}
                <View style={styles.statsRow}>
                  {exercise.sets && (
                    <View style={styles.statBox}>
                      <Text style={styles.statLabel}>SETS</Text>
                      <Text style={styles.statValue}>{exercise.sets}</Text>
                    </View>
                  )}
                  {exercise.reps && (
                    <View style={styles.statBox}>
                      <Text style={styles.statLabel}>REPS</Text>
                      <Text style={styles.statValue}>{exercise.reps}</Text>
                    </View>
                  )}
                  {exercise.duration && (
                    <View style={styles.statBox}>
                      <Text style={styles.statLabel}>DURATION</Text>
                      <Text style={styles.statValue}>{exercise.duration}</Text>
                    </View>
                  )}
                </View>

                {/* How to perform section */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>How to perform:</Text>
                  <Text style={styles.sectionText}>{exercise.description}</Text>
                </View>

                {/* Video Player */}
                <View style={styles.videoContainer}>
                  <Video
                    source={require('../assets/exercises/train-2.mp4')}
                    style={styles.video}
                    useNativeControls
                    resizeMode="stretch"
                    isLooping
                    shouldPlay={true}
                    isMuted={true}
                  />
                </View>
              </ScrollView>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  topNavBar: {
    height: 60,
    backgroundColor: '#1a1a2e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 80,
    backgroundColor: '#1a1a2e',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.05)',
  },
  contentArea: {
    flex: 1,
  },
  dayHeader: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  dayHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dayIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(102, 126, 234, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayInfo: {
    flex: 1,
  },
  dayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  daySubtitle: {
    fontSize: 13,
    color: '#a0a0c0',
  },
  exerciseScrollView: {
    flex: 1,
  },
  exerciseContainer: {
    // Width is set dynamically based on sidebar visibility
  },
  exerciseContent: {
    padding: 24,
    paddingBottom: 100,
  },
  exerciseCounter: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  counterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#667eea',
    letterSpacing: 1,
  },
  exerciseTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#667eea',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: '#b0b0d0',
    lineHeight: 24,
  },
  videoContainer: {
    backgroundColor: '#000000',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    alignItems: 'center',
  },
  video: {
    width: 270,
    height: 480,
  },
});

