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
    _.toArray(state.patient.patients).map(({consultation}) => {
      const date = new Date(consultation.dateTime);
      const objName = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`;

      let obj = make_object_path([objName], {
        marked: true,
        dotColor: 'blue',
        activeOpacity: 0,
      });
      Object.assign(objMarkedDates, obj);
    });
    setMarkedDates(objMarkedDates);
  }, []);
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

        {_.toArray(state.patient.patients).map((patient, index) => {
          let d = new Date(patient.consultation.dateTime);
          let d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
          if (d2.getTime() === pickedDate.getTime()) {
            return (
              <NextQuery
                key={index}
                date={pickedDate ? pickedDate : new Date()}
                next={{
                  hour: patient.consultation.time,
                  type: patient.consultation.type,
                  name: patient.name,
                }}
              />
            );
          }
        })}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <Button
            text="NOVA CONSULTA"
            onPress={() => {
              navigation.navigate('PsychologistNewConsultation');
            }}></Button>
        </View>
      </View>
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
