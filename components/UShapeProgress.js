import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Dynamic scaling based on screen width
const SCALE_FACTOR = screenWidth / 375;
const CURVE_WIDTH = 280 * SCALE_FACTOR; // Slightly wider than background
const radius = CURVE_WIDTH / 2;
const CURVE_HEIGHT = radius + (20 * SCALE_FACTOR); // Height should cover the full arc radius + dot
const U_SHAPE_WIDTH = 220 * SCALE_FACTOR;
const U_SHAPE_HEIGHT = screenHeight * 0.45; // 45% of screen height
const scale = (size) => Math.round(size * SCALE_FACTOR);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function UShapeProgress({ currentExercise, totalExercises }) {
  // Calculate progress (0 to 1)
  // Fix: totalExercises - 1 can be 0 if there's only 1 exercise
  const totalSteps = totalExercises > 1 ? totalExercises - 1 : 1;
  const progress = (currentExercise - 1) / totalSteps;
  
  // Animated value for smooth transitions
  const animatedProgress = useRef(new Animated.Value(progress)).current;
  
  // SVG path for the U-shape curve (bottom arc)
  const strokeWidth = 3;
  const centerX = CURVE_WIDTH / 2;
  const centerY = 0;
  
  // Animate when exercise changes
  useEffect(() => {
    Animated.spring(animatedProgress, {
      toValue: progress,
      useNativeDriver: false,
      tension: 50,
      friction: 7,
    }).start();
  }, [currentExercise, progress]);
  
  // Pre-calculate positions along the arc
  const calculateArcPosition = (index, total) => {
    const steps = total > 1 ? total - 1 : 1;
    const progressVal = index / steps;
    const angle = Math.PI - (progressVal * Math.PI); // 180° to 0°
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };
  
  // Generate positions for all exercises
  const positions = [];
  for (let i = 0; i < totalExercises; i++) {
    positions.push(calculateArcPosition(i, totalExercises));
  }
  
  // Interpolate X/Y position along the arc
  const dotX = animatedProgress.interpolate({
    inputRange: totalExercises > 1 ? positions.map((_, i) => i / (totalExercises - 1)) : [0, 1],
    outputRange: totalExercises > 1 ? positions.map(p => p.x) : [centerX - radius, centerX + radius],
  });
  
  const dotY = animatedProgress.interpolate({
    inputRange: totalExercises > 1 ? positions.map((_, i) => i / (totalExercises - 1)) : [0, 1],
    outputRange: totalExercises > 1 ? positions.map(p => p.y) : [centerY + radius, centerY + radius],
  });

  const dotRadius = 8 * SCALE_FACTOR;
  const dotStrokeWidth = 3;
  const padding = 20; // Extra padding around SVG to prevent clipping

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* Black U-shape Background */}
        <View style={[styles.uShape, { width: U_SHAPE_WIDTH, height: U_SHAPE_HEIGHT, borderBottomLeftRadius: U_SHAPE_WIDTH / 2, borderBottomRightRadius: U_SHAPE_WIDTH / 2 }]} />
        
        {/* Progress curve with dot - wrapped with extra space */}
        <View style={[styles.progressContainer, { marginTop: -scale(15) }]}>
          <Svg 
            width={CURVE_WIDTH + padding * 2} 
            height={CURVE_HEIGHT + padding * 2} 
            style={styles.svg}
          >
            <Path
              d={`M ${padding} ${padding} A ${radius} ${radius} 0 0 0 ${CURVE_WIDTH + padding} ${padding}`}
              stroke="#B0B0B0"
              strokeWidth={strokeWidth}
              fill="none"
            />
            
            <AnimatedCircle
              cx={Animated.add(dotX, padding)}
              cy={Animated.add(dotY, padding)}
              r={dotRadius}
              fill="#ffffff"
              stroke="#000000"
              strokeWidth={dotStrokeWidth}
            />
          </Svg>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    overflow: 'visible',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
    marginTop: -40,
    width: '100%',
    overflow: 'visible',
  },
  uShape: {
    backgroundColor: '#000000',
    marginBottom: -100,
  },
  progressContainer: {
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    overflow: 'visible',
  },
});
