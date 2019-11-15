import * as actions from '../../actions';

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
import {ScrollView} from 'react-native-gesture-handler';
import _ from 'lodash';

export default function PsychologistHome({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const user = state.auth.user;

  const [listPatient, setListPatient] = useState([]);
  const [listConsults, setListConsults] = useState([]);

  useEffect(() => {
    dispatch(actions.fetchPatients());
  }, []);

  useEffect(() => {
    setListPatient(state.patient.patients);
  }, [state.patient.patients]);

  useEffect(() => {}, [listPatient]);

  //
  useEffect(() => {
    if (navigation.getParam('patientCreated')) {
      Alert.alert('Paciente criado com sucesso');
    }
  }, [state.patient.lastCreated]);
  //
  //
  useEffect(() => {
    if (navigation.getParam('consultationCreated')) {
      Alert.alert('Consulta criada com sucesso');
    }
  }, [state.consult.lastCreated]);
  //
  //
  useEffect(() => {
    if (navigation.getParam('exerciseCreated')) {
      Alert.alert('Exercício/ Lembrete criado com sucesso');
    }
  }, [state.exercise.lastCreated]);
  //
  //
  useEffect(() => {
    if (navigation.getParam('questionCreated')) {
      Alert.alert('Frase/ Pergunta criada com sucesso');
    }
  }, [state.question.lastCreated]);
  //

  function returnNext() {
    return (
      <React.Fragment>
        {_.toArray(listPatient).map((patient, index) => {
          if (patient.consultation) {
            let d = new Date(patient.consultation.dateTime);
            let d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            let t = new Date();
            let t2 = new Date(t.getFullYear(), t.getMonth(), t.getDate());

            if (d2.getTime() === t2.getTime()) {
              return (
                <View
                  style={{
                    width: layout.window.width,
                  }}
                  key={index}>
                  <NextQuery
                    date={new Date()}
                    next={{
                      hour: patient.consultation.time,
                      type: patient.consultation.type,
                      name: patient.name,
                    }}
                  />
                </View>
              );
            }
          }
        })}
        <View
          style={{
            width: layout.window.width,
          }}>
          <NextQuery date={new Date()} />
        </View>
      </React.Fragment>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <MiniCalendar
          onPress={() => navigation.navigate('PsychologistCalendar')}
        />
      </View>

      <View style={[styles.contentContainer, {padding: 0}]}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          persistentScrollbar
          horizontal
          pagingEnabled>
          {returnNext()}
        </ScrollView>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeLabelStyle}>
          Olá, Doutor(a) {user.name} !
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <NavigationBox
          onPress0={() => navigation.navigate('PsychologistCalendar')}
          onPress1={() => navigation.navigate('PsychologistPatients')}
          onPress2={() => navigation.navigate('PsychologistExercises')}
          onPress3={() => navigation.navigate('PsychologistQuestions')}
        />
      </View>
    </View>
  );
}
PsychologistHome.navigationOptions = {
  title: 'Psicólogo',
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
