import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Calendar,
  Input,
  Logo,
  MiniCalendar,
  NavigationBox,
  NextQuery,
} from '../../components';
import React, {useEffect, useState} from 'react';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

export default function PatientHome({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <MiniCalendar onPress={() => {}} />
      </View>

      <View style={styles.contentContainer}></View>
      <View style={styles.contentContainer}></View>
      <View style={styles.contentContainer}></View>
    </View>
  );
}
PatientHome.navigationOptions = {
  title: 'Paciente',
};

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025, // marginTop: 20
  },
  welcomeLabelStyle: {
    color: color.primary,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
});
