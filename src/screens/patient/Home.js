import * as actions from '../../actions';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Box,
  Button,
  Calendar,
  Feeling,
  Humor,
  Input,
  Logo,
  MiniCalendar,
  NavigationBox,
  NextQuery,
} from '../../components';
import React, {useEffect, useState} from 'react';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

export default function PatientHome({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [patient, setPatient] = useState({consultation: ''});
  const [modal, setModal] = useState('');

  useEffect(() => {
    if (state.authPatient) {
      dispatch(actions.fetchPatient(state.authPatient.ref));
    }
  }, []);

  useEffect(() => {
    if (state.authPatient.user) {
      setPatient(state.authPatient.user);
    }
  }, [state.authPatient]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeLabelStyle}>
          Olá {patient ? patient.name : 'Paciente'}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <NextQuery
          date={
            patient.consultation && new Date(patient.consultation.dateTime)
          }>
          <Text style={null}>{patient.consultation.time}</Text>
          <Text style={null}>Sua próxima consulta</Text>
          <Text style={null}>Sua próxima consulta</Text>
        </NextQuery>
      </View>

      {modal === 'humor' && <Humor />}
      {modal === 'feeling' && <Feeling />}
    </View>
  );
}
PatientHome.navigationOptions = {
  title: 'Paciente',
};

const styles = StyleSheet.create({
  ...global,
  welcomeLabelStyle: {
    color: color.primary,
    fontSize: 22,
    textAlign: 'center',
  },
});
