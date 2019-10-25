import {StyleSheet, View} from 'react-native';
import {global, linearGradient} from '../constants';

import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

export default function Modal(props) {
  return (
    <View style={styles.modal}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      {props.children ? props.children : null}
    </View>
  );
}
Modal.defaultProps = {};

const styles = StyleSheet.create({
  ...global,
  modal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,1.0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
