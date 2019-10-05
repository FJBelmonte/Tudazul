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
  const platform = Platform.OS === 'ios' ? 'IOS' : 'Android'; //UTILIZAR PARA RETIRAR BUG VISUAL NO ANDROID

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
  // BEGIN ALTERAR
  function verifyCamps() {
    let errorInput = {...inputError};
    if (name === '') {
      errorInput.name = {
        code: 'patient/blank-name',
        errorMessage: 'Campo Paciente é obrigatório',
      };
    } else {
      errorInput.name = null;
    }
    if (age === '') {
      errorInput.age = {
        code: 'patient/blank-age',
        errorMessage: 'Campo Idade é obrigatório',
      };
    } else {
      errorInput.age = null;
    }
    if (gender === '') {
      errorInput.gender = {
        code: 'patient/blank-gender',
        errorMessage: 'Campo Gênero é obrigatório',
      };
    } else {
      errorInput.gender = null;
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
  //END ALTERAR
  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <Input
            label="Nome"
            value={patient.name}
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
                ? `${consultation.date.getDate()}/${consultation.date.getMonth()}/${consultation.date.getUTCFullYear()}`
                : null
            }
            placeholder={`${date.getDate()}/${date.getMonth()}/${date.getUTCFullYear()}`}
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
                ? `${consultation.date.getHours()}:${consultation.date.getMinutes()}`
                : null
            }
            placeholder={`${date.getHours()}:${date.getMinutes()}`} //bug visual ex 0:8
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
        <Button text="CONFIRMAR"></Button>
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
