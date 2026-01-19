import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Image display removed to fix build issues


export default function ExerciseDetailScreen({ route, navigation }) {
  const { exercise } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.header}
      >
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{exercise.name}</Text>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >


        <View style={styles.contentContainer}>
          <LinearGradient
            colors={['#4facfe', '#00f2fe']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statsCard}
          >
            <View style={styles.statsRow}>
              {exercise.sets && (
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{exercise.sets}</Text>
                  <Text style={styles.statLabel}>Sets</Text>
                </View>
              )}
              {exercise.reps && (
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{exercise.reps}</Text>
                  <Text style={styles.statLabel}>Reps</Text>
                </View>
              )}
              {exercise.duration && (
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{exercise.duration}</Text>
                  <Text style={styles.statLabel}>Duration</Text>
                </View>
              )}
            </View>
          </LinearGradient>

          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionTitle}>How to Perform</Text>
            <Text style={styles.descriptionText}>{exercise.description}</Text>
          </View>

          <LinearGradient
            colors={['#fa709a', '#fee140']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.tipsCard}
          >
            <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
            <Text style={styles.tipsText}>
              • Focus on proper form over speed{'\n'}
              • Breathe consistently throughout{'\n'}
              • Rest 60-90 seconds between sets{'\n'}
              • Stay hydrated
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    color: '#a0a0c0',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  exerciseImage: {
    width: '100%',
    height: 300,
  },
  contentContainer: {
    padding: 20,
  },
  statsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  descriptionCard: {
    backgroundColor: '#1e1e2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#c0c0d0',
    lineHeight: 24,
  },
  tipsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    elevation: 6,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 15,
    color: '#ffffff',
    lineHeight: 24,
    opacity: 0.95,
  },
});
