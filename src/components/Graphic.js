import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Image,
  Line,
  LinearGradient,
  Mask,
  Path,
  Pattern,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Symbol,
  TSpan,
  Text,
  TextPath,
  Use,
} from 'react-native-svg';

import React from 'react';
import {layout} from '../constants';

export default function Graphic(props) {
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      style={styles.container}
      onPress={props.onPress}>
      <View style={styles.contentContainer}></View>
      <View
        style={[
          StyleSheet.absoluteFill,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <Svg height="50%" width="50%" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="blue"
            strokeWidth="2.5"
            fill="green"
          />
          <Rect
            x="15"
            y="15"
            width="70"
            height="70"
            stroke="red"
            strokeWidth="2"
            fill="yellow"
          />
        </Svg>
      </View>
    </TouchableOpacity>
  );
}
Graphic.defaultProps = {
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'rgba(245,245,255,0.95)',
    width: layout.window.width * 0.85, //width: 350,
    marginVertical: 5,
    height: layout.window.width * 0.85,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
});
