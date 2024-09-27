import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const ImageLoading = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 400],
  });

  return (
    <View style={styles.container}>
      <View style={styles.skeletonItem}>
        {/* <View style={styles.avatar} /> */}
        <View style={styles.textContainer}>
          <View style={styles.image} />
          <View style={[styles.textLine,]} />
          <View style={[styles.textLine, styles.shortLine]} />
        </View>
      </View>

      {/* Shimmer Effect */}
      <Animated.View
        style={[
          styles.shimmer,
          { transform: [{ translateX: translateX }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5,
  },
  skeletonItem: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  // avatar: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   backgroundColor: '#e0e0e0',
  //   marginRight: 15,
  // },
  textContainer: {
    flex: 1,
  },
  image: {
    height: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    marginBottom: 10,
  },
  textLine: {
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    marginBottom: 10,
  },
  shortLine: {
    width: '50%',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    opacity: 0.7,
  },
});
 
export default ImageLoading

