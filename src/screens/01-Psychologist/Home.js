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

export default function PsychologistHome({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const user = state.auth.user;

  //
  useEffect(() => {
    if (navigation.getParam('patientCreated')) {
      Alert.alert('Paciente criado com sucesso');
    }
  }, [state.psychologistPatient.lastCreated]);
  //
  //
  useEffect(() => {
    if (navigation.getParam('consultationCreated')) {
      Alert.alert('Consulta criada com sucesso'); //W
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

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <MiniCalendar
          onPress={() => navigation.navigate('PsychologistCalendar')}
        />
      </View>

      <View style={styles.contentContainer}>
        <NextQuery date={new Date()} />
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
          onPress2={() => navigation.navigate('PsychologistNewExercise')}
          onPress3={() => navigation.navigate('PsychologistNewQuestion')}
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
