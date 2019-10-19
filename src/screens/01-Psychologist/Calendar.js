import {Calendar as CalendarComponent, NextQuery} from '../../components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

export default function Calendar({navigation}) {
  const [pickedDate, setPickedDate] = useState();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <CalendarComponent
          Date={pickedDate ? pickedDate : new Date()}
          onPress={_date => setPickedDate(_date)}
        />
      </View>
      <View style={styles.contentContainer}>
        <NextQuery date={pickedDate ? pickedDate : new Date()} />
      </View>
      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => navigation.navigate('PsychologistNewConsultation')}>
        <Text style={styles.floatButtonLabel}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
Calendar.navigationOptions = {
  title: 'Calendário',
};
const styles = StyleSheet.create({
  ...global,
});
