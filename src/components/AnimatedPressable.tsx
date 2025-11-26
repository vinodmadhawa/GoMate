import React, { useRef } from 'react';
import { Pressable, Animated, PressableProps, ViewStyle, Platform } from 'react-native';

interface AnimatedPressableProps extends PressableProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  scaleValue?: number;
  animationType?: 'scale' | 'bubble' | 'bounce';
}

const AnimatedPressable: React.FC<AnimatedPressableProps> = ({
  children,
  style,
  scaleValue = 0.95,
  animationType = 'scale',
  onPress,
  ...props
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const useNativeDriver = Platform.OS !== 'web';

  const handlePressIn = () => {
    if (animationType === 'bubble') {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver,
        }),
      ]).start();
    } else if (animationType === 'bounce') {
      Animated.spring(scaleAnim, {
        toValue: scaleValue,
        friction: 3,
        tension: 40,
        useNativeDriver,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: scaleValue,
        duration: 100,
        useNativeDriver,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (animationType === 'bounce') {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver,
      }).start();
    }
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      {...props}
    >
      <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedPressable;
