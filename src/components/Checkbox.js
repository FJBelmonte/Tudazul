import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import CheckboxBlankSVG from '../assets/svg/check_box_outline_blank-24px.svg';
import CheckboxSVG from '../assets/svg/check_box-24px.svg';
//import Icon from 'react-native-vector-icons/MaterialIcons';
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
    {selected ? (
      <CheckboxSVG width={size} height={size} fill={color} />
    ) : (
      <CheckboxBlankSVG width={size} height={size} fill={color} />
    )}

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
