import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function UShapeProgress({ currentExercise, totalExercises }) {
  // Calculate progress (0 to 1)
  const progress = (currentExercise - 1) / (totalExercises - 1);
  
  // Animated value for smooth transitions
  const animatedProgress = useRef(new Animated.Value(progress)).current;
  
  // SVG path for the U-shape curve (bottom arc)
  const curveWidth = 280;
  const curveHeight = 80;
  const strokeWidth = 3;
  const radius = curveWidth / 2;
  const centerX = curveWidth / 2;
  const centerY = 0;
  
  // Animate when exercise changes
  useEffect(() => {
    Animated.spring(animatedProgress, {
      toValue: progress,
      useNativeDriver: false,
      tension: 50,
      friction: 7,
    }).start();
  }, [currentExercise]);
  
  // Pre-calculate positions along the arc for 6 exercises
  // Arc goes from 180° (left) to 0° (right)
  const calculateArcPosition = (index, total) => {
    const progressVal = index / (total - 1);
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
  
  // Interpolate X position along the arc
  const dotX = animatedProgress.interpolate({
    inputRange: positions.map((_, i) => i / (totalExercises - 1)),
    outputRange: positions.map(p => p.x),
  });
  
  // Interpolate Y position along the arc
  const dotY = animatedProgress.interpolate({
    inputRange: positions.map((_, i) => i / (totalExercises - 1)),
    outputRange: positions.map(p => p.y),
  });

  return (
    <View style={styles.container}>
      {/* Black U-shape */}
      <View style={styles.uShape} />
      
      {/* Progress curve with dot */}
      <View style={styles.progressContainer}>
        <Svg width={curveWidth} height={curveHeight} style={styles.svg}>
          {/* Gray background curve */}
          <Path
            d={`M 0 0 A ${radius} ${radius} 0 0 0 ${curveWidth} 0`}
            stroke="#B0B0B0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* Animated Progress dot */}
          <AnimatedCircle
            cx={dotX}
            cy={dotY}
            r={8}
            fill="#000000"
            stroke="#FFFFFF"
            strokeWidth={3}
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 40,
  },
  uShape: {
    width: 239,
    height: 433,
    backgroundColor: '#000000',
    borderBottomLeftRadius: 119.5,
    borderBottomRightRadius: 119.5,
    marginBottom: -110,
  },
  progressContainer: {
    marginTop: 0,
  },
  svg: {
    overflow: 'visible',
  },
});
