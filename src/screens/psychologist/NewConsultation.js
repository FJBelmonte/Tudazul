import * as actions from '../../actions';

import {Box, Button, DateTime, Input} from '../../components';
import {Picker, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import calendarIcon from '../../assets/icons/ico-calendario.png';

export default function NewConsultation({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const labelDateTime = new Date();
  const [consultation, setConsultation] = useState({date: '', time: ''});
  const [listPatient, setListPatient] = useState();
  const [patient, setPatient] = useState({
    name: '',
    uid: '',
    age: '',
    gender: '',
  });
  const [uid, setUid] = useState();
  const [date, setDate] = useState(labelDateTime);
  const [time, setTime] = useState(labelDateTime);
  const [type, setType] = useState('');
  const [anotation, setAnotation] = useState('');
  const [modal, setModal] = useState('');
  const [inputError, setInputError] = useState({
    name: null,
    data: null,
    time: null,
  });
  const [lastActionId, setLastActionId] = useState(null);

  useEffect(() => {
    dispatch(actions.fetchPatients());
  }, []);

  useEffect(() => {
    setListPatient(state.patient.patients);
  }, [state.patient.patients]);

  useEffect(() => {
    _.toArray(listPatient).map((p, index) => {
      if (p.uid === uid) {
        setPatient(p);
      }
    });
  });

  // BEGIN - REDIRECT TO HOME SCREEN WITH PARAMS
  useEffect(() => {
    if (state.consult.lastCreated) {
      if (state.consult.lastCreated === lastActionId) {
        navigation.navigate('PsychologistHome', {consultationCreated: true});
      }
    }
  }, [state.consult.lastCreated]);
  // END

  // BEGIN - VERIFY CAMPS (verify inputs, set state of obj inputError and returns true if has been founded errors)
  function verifyCamps() {
    let errorInput = {...inputError};
    if (patient.uid === '') {
      errorInput.name = {
        code: 'patient/blank-name',
        errorMessage: 'Campo Paciente é obrigatório',
      };
    } else {
      errorInput.name = null;
    }
    if (date === '') {
      errorInput.date = {
        code: 'patient/blank-date',
        errorMessage: 'Campo data é obrigatório',
      };
    } else {
      errorInput.date = null;
    }
    if (time === '') {
      errorInput.time = {
        code: 'patient/blank-time',
        errorMessage: 'Campo hora é obrigatório',
      };
    } else {
      errorInput.time = null;
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
  //END

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <Input
            label="Nome"
            value={patient.name}
            error={inputError.name}
            onFocus={() => {
              setInputError({...inputError, name: null});
            }}
            placeholder="Nome do paciente"
            icon={calendarIcon}
            onPressIcon={() => {
              setModal('patients');
            }}
            button
          />
          <Input
            label="Data"
            value={
              consultation.date
                ? `${('00' + consultation.date.getDate()).slice(-2)}/` +
                  `${('00' + (consultation.date.getMonth() + 1)).slice(-2)}/` +
                  `${('0000' + consultation.date.getUTCFullYear()).slice(-4)}`
                : null
            }
            placeholder={
              `${('00' + date.getDate()).slice(-2)}/` +
              `${('00' + (date.getMonth() + 1)).slice(-2)}/` +
              `${('0000' + date.getUTCFullYear()).slice(-4)}`
            }
            error={inputError.date}
            onFocus={() => {
              setInputError({...inputError, date: null});
            }}
            icon={calendarIcon}
            onPressIcon={() => {
              setModal('date');
            }}
            button
          />
          <Input
            label="Hora"
            value={
              consultation.time
                ? `${('00' + consultation.time.getHours()).slice(-2)}:` +
                  `${('00' + consultation.time.getMinutes()).slice(-2)}`
                : null
            }
            placeholder={
              `${('00' + date.getHours()).slice(-2)}:` +
              `${('00' + date.getMinutes()).slice(-2)}`
            } //bug visual ex 0:8
            error={inputError.time}
            onFocus={() => {
              setInputError({...inputError, time: null});
            }}
            icon={calendarIcon}
            onPressIcon={() => {
              setModal('time');
            }}
            button
          />
          <Input
            label="Tipo"
            placeholder="Tipo de consulta"
            value={type}
            onChangeText={value => setType(value)}
          />
          <Input
            label="Anotações"
            placeholder="Anote o que achar relevante"
            multiline
            value={anotation}
            onChangeText={value => {
              setAnotation(value);
            }}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          text="CONFIRMAR"
          onPress={() => {
            const actionId = `${uuidv4()}`;
            const consult = {
              patient: uid,
              date,
              time,
              type,
              anotation,
              dateTime: new Date(
                consultation.date.getUTCFullYear(),
                consultation.date.getMonth(),
                consultation.date.getDate(),
                consultation.time.getHours(),
                consultation.time.getMinutes(),
                0,
                0,
              ).getTime(),
              createdAt: new Date().getTime(),
              actionId,
            };
            if (verifyCamps()) {
              setLastActionId(actionId);
              dispatch(actions.createConsult(consult));
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
      {modal === 'date' && (
        <DateTime
          mode="date"
          text="Selecione a data para a consulta"
          datetime={date}
          value={date}
          onChangeDate={(e, value) => {
            setDate(value);
          }}
          onButtonPress={() => {
            setConsultation({...consultation, date});
            setModal('');
          }}
        />
      )}
      {modal === 'time' && (
        <DateTime
          mode="time"
          text="Selecione a hora para a consulta"
          datetime={time}
          value={time}
          onChangeDate={(e, value) => {
            setTime(value);
          }}
          onButtonPress={() => {
            setConsultation({...consultation, time});
            setModal('');
          }}
        />
      )}
    </View>
  );
}
NewConsultation.navigationOptions = {
  title: 'Nova consulta',
};

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025, // marginTop: 20
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

// BEGIN - GENERATE UID (for use in lastActionId)
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
// END
