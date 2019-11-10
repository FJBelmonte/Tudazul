import {Calendar as CalendarComponent, NextQuery} from '../../components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';

export default function PatientCalendar({navigation}) {
  const [pickedDate, setPickedDate] = useState();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <ScrollView>
        <View style={styles.contentContainer}>
          <CalendarComponent
            Date={pickedDate ? pickedDate : new Date()}
            onPress={_date => setPickedDate(_date)}
          />
        </View>

        <View style={styles.contentContainer}></View>
      </ScrollView>
    </View>
  );
}
PatientCalendar.navigationOptions = {
  title: 'Calendário',
};
const styles = StyleSheet.create({
  ...global,
});
