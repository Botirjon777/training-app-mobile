import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import Svg, { Path, Circle } from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Fixed dimensions for the U-shape
const U_SHAPE_WIDTH = 239;
const U_SHAPE_HEIGHT = 433;

// Dynamic scaling for the progress curve based on U-shape width
const CURVE_WIDTH = U_SHAPE_WIDTH + 40; // Slightly wider for the curve
const radius = CURVE_WIDTH / 2;
const CURVE_HEIGHT = radius + 20; // Height should cover the full arc radius + dot
const SCALE_FACTOR = screenWidth / 375;
const scale = (size) => Math.round(size * SCALE_FACTOR);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function UShapeProgress({ currentExercise, totalExercises, videoSource, videoKey }) {
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const totalSteps = totalExercises > 1 ? totalExercises - 1 : 1;
  const progress = (currentExercise - 1) / totalSteps;
  
  const animatedProgress = useRef(new Animated.Value(progress)).current;
  
  const strokeWidth = 3;
  const centerX = CURVE_WIDTH / 2;
  const centerY = 0;
  
  useEffect(() => {
    Animated.spring(animatedProgress, {
      toValue: progress,
      useNativeDriver: false,
      tension: 50,
      friction: 7,
    }).start();
  }, [currentExercise, progress]);
  
  const calculateArcPosition = (index, total) => {
    const steps = total > 1 ? total - 1 : 1;
    const progressVal = index / steps;
    const angle = Math.PI - (progressVal * Math.PI);
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };
  
  const positions = [];
  for (let i = 0; i < totalExercises; i++) {
    positions.push(calculateArcPosition(i, totalExercises));
  }
  
  const dotX = animatedProgress.interpolate({
    inputRange: totalExercises > 1 ? positions.map((_, i) => i / (totalExercises - 1)) : [0, 1],
    outputRange: totalExercises > 1 ? positions.map(p => p.x) : [centerX - radius, centerX + radius],
  });
  
  const dotY = animatedProgress.interpolate({
    inputRange: totalExercises > 1 ? positions.map((_, i) => i / (totalExercises - 1)) : [0, 1],
    outputRange: totalExercises > 1 ? positions.map(p => p.y) : [centerY + radius, centerY + radius],
  });

  const dotRadius = 8;
  const dotStrokeWidth = 3;
  const padding = 20;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* Black U-shape Background */}
        <View
          style={[
            styles.uShape,
            {
              width: U_SHAPE_WIDTH,
              height: U_SHAPE_HEIGHT,
              borderBottomLeftRadius: U_SHAPE_WIDTH / 2,
              borderBottomRightRadius: U_SHAPE_WIDTH / 2,
            },
          ]}
        >
          {videoSource ? (
            <Video
              key={videoKey}
              source={videoSource}
              style={StyleSheet.absoluteFill}
              shouldPlay
              isMuted
              isLooping
              resizeMode={ResizeMode.COVER}
              onLoadStart={() => setIsVideoLoading(true)}
              onReadyForDisplay={() => setIsVideoLoading(false)}
            />
          ) : null}
          {isVideoLoading ? (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          ) : null}
        </View>
        
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
    paddingHorizontal: 20, // Add horizontal padding to prevent overflow
  },
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: -40,
    width: '100%',
    maxWidth: U_SHAPE_WIDTH + 60, // Ensure container fits the U-shape with some margin
    overflow: 'visible',
  },
  uShape: {
    backgroundColor: '#000000',
    marginBottom: -120,
    overflow: 'hidden',
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
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
