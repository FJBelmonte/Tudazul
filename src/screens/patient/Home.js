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
import {NavigationBoxPatient, NextQuery} from '../../components';
import React, {useEffect, useState} from 'react';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

export default function PatientHome({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [patient, setPatient] = useState({consultation: ''});
  const [psychologistName, setPsychologistName] = useState('');
  const [todayAccess] = useState(
    `${('0000' + new Date().getUTCFullYear()).slice(-4)}` +
      `${('00' + new Date().getMonth()).slice(-2)}` +
      `${('00' + new Date().getDate()).slice(-2)}`,
  );

  useEffect(() => {
    if (state.authPatient) {
      dispatch(actions.fetchPatient(state.authPatient.ref));
    }
  }, []);

  useEffect(() => {
    if (state.authPatient.ref) {
      dispatch(actions.fetchPatientPsychologist(state.authPatient.ref));
    }
  }, [state.authPatient.ref]);

  useEffect(() => {
    if (state.authPatient.user) {
      setPatient(state.authPatient.user);
      setPsychologistName(state.authPatient.psychologist.name);
      if (state.authPatient.user.lastAccess !== todayAccess) {
        navigation.navigate('PatientSetDiary', {
          todayAccess,
        });
      }
    }
  }, [state.authPatient]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeLabelStyle}>
          Olá {patient ? patient.name : 'Paciente'}
        </Text>
        <Text style={styles.quote}>
          Exemplo: Não se esqueça de prestar atenção na sua respiração
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <NextQuery
          date={
            patient.consultation && new Date(patient.consultation.dateTime)
          }>
          <Text style={styles.NextQueryTop}>{patient.consultation.time}</Text>
          <Text style={styles.NextQueryMid}>Consulta</Text>
          <Text style={styles.NextQueryBot}>Dr(a). {psychologistName}</Text>
        </NextQuery>
      </View>
      <View style={styles.contentContainer}>
        <NavigationBoxPatient
          onPress3={() =>
            navigation.navigate('PatientDiary')
          }></NavigationBoxPatient>
      </View>
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
  quote: {
    color: color.primary,
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  NextQueryTop: {
    color: '#59818b',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  NextQueryMid: {
    color: '#59818b',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  NextQueryBot: {
    color: '#59818b',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
