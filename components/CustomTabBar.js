import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function CustomTabBar({ state, descriptors, navigation }) {
  const getTabIcon = (routeName, isFocused) => {
    const iconColor = isFocused ? '#ffffff' : '#6a6a8a';
    const iconSize = routeName === 'Train' ? 28 : 22;

    const iconNames = {
      'Profile': 'person',
      'Stats': 'stats-chart',
      'Train': 'fitness',
      'Calendar': 'calendar',
      'Settings': 'settings',
    };

    return <Ionicons name={iconNames[routeName] || 'fitness'} size={iconSize} color={iconColor} />;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.tabBar}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index;
          const isTrainButton = route.name === 'Train';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (isTrainButton) {
            return (
              <TouchableOpacity
                key={route.key}
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.trainButtonContainer}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.trainButton}
                >
                  {getTabIcon(route.name, true)}
                  <Text style={styles.trainButtonText}>Train</Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.7}
              onPress={onPress}
              style={styles.tab}
            >
              {getTabIcon(route.name, isFocused)}
              <Text
                style={[
                  styles.tabLabel,
                  isFocused && styles.tabLabelActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    flexDirection: 'row',
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 11,
    color: '#6a6a8a',
    fontWeight: '600',
    marginTop: 4,
  },
  tabLabelActive: {
    color: '#ffffff',
  },
  trainButtonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: -20,
  },
  trainButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  trainButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 2,
  },
});
