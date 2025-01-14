import React, {useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Text from './Text';

interface BottomMenuProps {
  visible: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

const BottomMenu: React.FC<BottomMenuProps> = ({
  visible,
  onEdit,
  onDelete,
  onCancel,
}) => {
  const translateY = useSharedValue(300);
  const fadeOpacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = visible ? 0 : 300;
    fadeOpacity.value = visible ? 1 : 0;
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: withTiming(translateY.value, {duration: 300})}],
  }));

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: withTiming(fadeOpacity.value, {duration: 300}),
  }));

  return (
    <>
      {/* Black Fade Background */}
      <Animated.View
        style={[styles.fadeBackground, fadeStyle]}
        pointerEvents={visible ? 'auto' : 'none'}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={onCancel}
        />
      </Animated.View>

      {/* Bottom Menu */}
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={{borderRadius: 12, overflow: 'hidden'}}>
          <TouchableOpacity
            style={[
              styles.button,
              {borderBottomWidth: 1, borderBottomColor: '#70707047'},
            ]}
            onPress={onEdit}>
            <Text style={[styles.text, {color: '#05AEFF'}]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onDelete}>
            <Text style={[styles.text, styles.deleteText]}>Delete</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, {marginTop: 10, borderRadius: 12}]}
          onPress={onCancel}>
          <Text style={[styles.text, {color: '#05AEFF'}]}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  fadeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 99,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
    zIndex: 100,
  },
  button: {
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
  deleteText: {
    color: '#E51B38',
  },
});

export default BottomMenu;
