import * as actions from '../../actions';

import {Box, Button, CheckBox, Input} from '../../components';
import {Picker, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import calendarIcon from '../../assets/icons/ico-calendario.png';

export default function Exercises({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [checkBoxReminderExercise, setCheckBoxReminderExercise] = useState(
    false,
  );
  const [checkBoxNPatients, setCheckBoxNPatients] = useState(false);
  const [inputError, setInputError] = useState({name: null});
  const [uid, setUid] = useState();
  const [listPatient, setListPatient] = useState();
  const [patient, setPatient] = useState({
    name: '',
    uid: '',
    age: '',
    gender: '',
  });
  const [reminder, setReminder] = useState('');
  const [modal, setModal] = useState('');

  useEffect(() => {
    dispatch(actions.fetchPatients());
  }, []);

  useEffect(() => {
    setListPatient(state.psychologistPatient.patients);
  }, [state.psychologistPatient.patients]);

  useEffect(() => {
    _.toArray(listPatient).map((p, index) => {
      if (p.uid === uid) {
        setPatient(p);
      }
    });
  });

  function verifyCamps() {
    let errorInput = {...inputError};
    if (patient.uid === '' && checkBoxNPatients) {
      errorInput.name = {
        code: 'patient/blank-name',
        errorMessage: 'Campo Paciente é obrigatório neste caso (1 Paciente)',
      };
    } else {
      errorInput.name = null;
    }
    let nErrs = _.toArray(errorInput).length;
    _.forEach(errorInput, err => {
      err === null && nErrs--;
    });
    if (nErrs === 0) {
      return true;
    } else {
      setInputError(errorInput);
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <View style={styles.box}>
            <Box>
              <View style={styles.box1Container}>
                <CheckBox
                  textStyle={styles.checkboxText}
                  selected={checkBoxReminderExercise}
                  onPress={() => {
                    setCheckBoxReminderExercise(!checkBoxReminderExercise);
                  }}
                  text="Lembrete"
                />
              </View>
              <View style={[styles.box1Container, {borderRightWidth: 0}]}>
                <CheckBox
                  textStyle={styles.checkboxText}
                  selected={!checkBoxReminderExercise}
                  onPress={() => {
                    setCheckBoxReminderExercise(!checkBoxReminderExercise);
                  }}
                  text="Exercício"
                />
              </View>
            </Box>
          </View>
          <View style={styles.box}>
            <Box>
              <View style={styles.box1Container}>
                <CheckBox
                  textStyle={styles.checkboxText}
                  selected={checkBoxNPatients}
                  onPress={() => {
                    setCheckBoxNPatients(!checkBoxNPatients);
                  }}
                  text="1 Paciente"
                />
              </View>
              <View style={[styles.box1Container, {borderRightWidth: 0}]}>
                <CheckBox
                  textStyle={styles.checkboxText}
                  selected={!checkBoxNPatients}
                  onPress={() => {
                    setInputError({name: null});
                    setCheckBoxNPatients(!checkBoxNPatients);
                  }}
                  text="Todos"
                />
              </View>
            </Box>
          </View>
          <View>
            <Input
              label="Paciente"
              value={!checkBoxNPatients ? 'Todos' : patient.name}
              placeholder="Selecione o paciente"
              error={inputError.name}
              onFocus={() => {
                setInputError({name: null});
              }}
              icon={calendarIcon}
              onPressIcon={() => {
                setInputError({name: null});
                setModal('patients');
              }}
              button
            />
            <Input
              label="Lembrete"
              placeholder="Escreva o lembrete que será mostrada ao seu paciente (ex: lembre-se de procurar sobre mindfulness, pesquise exercício, etc.)"
              multiline
              value={reminder}
              onChangeText={value => {
                setReminder(value);
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          text="CONFIRMAR"
          onPress={() => {
            if (verifyCamps()) {
              if (checkBoxNPatients) {
                const exerciseReminder = {
                  type: checkBoxReminderExercise ? 'reminder' : 'exercises',
                  note: reminder,
                  patient: uid,
                  createdAt: new Date().getTime(),
                };
                dispatch(actions.createExerciseOne(exerciseReminder));
                console.log('ONE');
                console.log(exerciseReminder);
                //1 paciente
              } else {
                const exerciseReminder = {
                  type: checkBoxReminderExercise ? 'reminder' : 'exercises',
                  note: reminder,
                  createdAt: new Date().getTime(),
                };
                dispatch(actions.createExerciseAll(exerciseReminder));
                console.log('ALL');
                console.log(exerciseReminder);
                //todos
              }
            }
          }}></Button>
      </View>
      {modal === 'patients' && (
        <View style={styles.modal}>
          <LinearGradient colors={linearGradient} style={styles.background} />

          <View style={styles.contentContainer}>
            <Box
              style={{
                container: {height: null},
                contentContainer: {flexDirection: null},
              }}>
              <View style={styles.patientCard}>
                <Text style={[styles.patientCardText, {fontSize: 24}]}>
                  {patient.name ? patient.name : 'Paciente'}
                </Text>
                <Text style={styles.patientCardText}>
                  {patient.age ? `${patient.age} anos` : 'Idade'} -
                  {patient.gender ? patient.gender : 'Gênero'}
                </Text>
              </View>
              <View style={styles.center}>
                <Picker
                  selectedValue={uid}
                  style={{width: 300}}
                  onValueChange={(itemValue, itemIndex) => setUid(itemValue)}>
                  {_.toArray(listPatient).map((patient, index) => {
                    return (
                      <Picker.Item
                        label={patient.name}
                        value={patient.uid}
                        key={index}
                      />
                    );
                  })}
                </Picker>
              </View>
            </Box>
          </View>
          <View style={styles.footer}>
            <View style={styles.buttonsContainer}>
              <Button
                text="Selecionar"
                onPress={() => {
                  setModal('');
                }}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
Exercises.navigationOptions = {
  title: 'Exercícios',
};

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025, // marginTop: 20
  },
  box1Container: {
    width: '50%', //width: 120,
    height: 46,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  box: {
    marginTop: 18,
  },
  checkboxText: {
    color: color.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,1.0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientCard: {
    width: layout.window.width * 0.85,
    height: layout.window.width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
    borderRadius: 10,
  },
  patientCardText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});