import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const CheckBox = ({
  selected,
  onPress,
  style,
  textStyle,
  size = 30,
  color = '#59818b',
  text = '',
  ...props
}) => (
  <TouchableOpacity
    style={[styles.checkBox, style]}
    onPress={onPress}
    {...props}>
    <Icon
      size={size}
      color={color}
      name={
        selected
          ? !props.icon
            ? 'radio-button-checked'
            : props.icon.selected
          : !props.icon
          ? 'radio-button-unchecked'
          : props.icon.unselected
      }
    />

    <Text style={textStyle}> {text} </Text>
  </TouchableOpacity>
);

export default CheckBox;

const styles = StyleSheet.create({
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
