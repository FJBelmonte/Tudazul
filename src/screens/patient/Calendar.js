import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Calendar as CalendarComponent,
  NextQuery,
} from '../../components';
import React, {useEffect, useState} from 'react';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import _ from 'lodash';

export default function Calendar({navigation}) {
  const [markedDates, setMarkedDates] = useState({});
  const [pickedDate, setPickedDate] = useState(new Date());

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    let objMarkedDates = {};
    const date = new Date(state.authPatient.user.consultation.dateTime);
    const objName = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;

    let obj = make_object_path([objName], {
      marked: true,
      dotColor: 'blue',
      activeOpacity: 0,
    });
    Object.assign(objMarkedDates, obj);

    setMarkedDates(objMarkedDates);
  }, []);

  function returnConsult() {
    let d = new Date(state.authPatient.user.consultation.dateTime);
    let d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    if (d2.getTime() === pickedDate.getTime()) {
      return (
        <NextQuery
          date={pickedDate ? pickedDate : new Date()}
          next={{
            hour: state.authPatient.user.consultation.time,
            type: state.authPatient.user.consultation.type,
            name: state.authPatient.user.name,
          }}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <ScrollView>
        <View style={styles.contentContainer}>
          <CalendarComponent
            markedDates={markedDates}
            onDayPress={e => {
              let nDate = new Date(e.timestamp);
              let objMarkedDates = {...markedDates};
              const objName = `${nDate.getFullYear()}-${nDate.getMonth() +
                1}-${nDate.getDate() + 1}`;

              let obj = make_object_path([objName], {
                selected: true,
                selectedColor: color.primary,
              });

              Object.assign(objMarkedDates, obj);
              setPickedDate(
                new Date(
                  nDate.getFullYear(),
                  nDate.getMonth(),
                  nDate.getDate() + 1,
                ),
              );
              //setMarkedDates(objMarkedDates);
            }}
          />
        </View>

        {returnConsult()}
      </ScrollView>
    </View>
  );
}
Calendar.navigationOptions = {
  title: 'Calendário',
};
const styles = StyleSheet.create({
  ...global,
});

function make_object_path(path, value) {
  var curr = value;
  for (var i = path.length - 1; i >= 0; i--) {
    var o = {};
    o[path[i]] = curr;
    curr = o;
  }
  return curr;
}
