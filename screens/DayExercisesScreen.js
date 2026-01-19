import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DayExercisesScreen({ route, navigation }) {
  const { dayData } = route.params;

  const renderExerciseCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
    >
      <LinearGradient
        colors={['#f093fb', '#f5576c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.exerciseCard}
      >
        <View style={styles.cardLeft}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <View style={styles.detailsRow}>
            {item.sets && (
              <View style={styles.detailBadge}>
                <Text style={styles.detailText}>{item.sets} sets</Text>
              </View>
            )}
            {item.reps && (
              <View style={styles.detailBadge}>
                <Text style={styles.detailText}>{item.reps} reps</Text>
              </View>
            )}
            {item.duration && (
              <View style={styles.detailBadge}>
                <Text style={styles.detailText}>{item.duration}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>▶</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>{dayData.day}</Text>
        <Text style={styles.headerSubtitle}>
          {dayData.exercises.length} exercises to complete
        </Text>
      </LinearGradient>

      <FlatList
        data={dayData.exercises}
        renderItem={renderExerciseCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: '#a0a0c0',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#a0a0c0',
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  exerciseCard: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 6,
    shadowColor: '#f5576c',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cardLeft: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  detailText: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '600',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  icon: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
