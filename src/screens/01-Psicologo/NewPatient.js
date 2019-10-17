import * as actions from '../../actions';

import {Button, Input} from '../../components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

export default function NewPatient({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [anotation, setAnotation] = useState('');
  const [inputError, setInputError] = useState({
    name: null,
    age: null,
    gender: null,
  });
  const [lastActionId, setLastActionId] = useState(null);

  // BEGIN - REDIRECT TO HOME SCREEN WITH PARAMS
  useEffect(() => {
    if (state.psychologistPatient.lastCreated) {
      if (state.psychologistPatient.lastCreated === lastActionId) {
        navigation.navigate('PsicologoHome', {patientCreated: true});
      }
    }
  }, [state.psychologistPatient.lastCreated]);
  // END

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

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <Input
            label="Paciente"
            placeholder="Nome do paciente"
            value={name}
            error={inputError.name}
            onFocus={() => {
              setInputError({...inputError, name: null});
            }}
            textContentType="name"
            onChangeText={value => {
              setName(value);
            }}
          />
          <Input
            label="Idade"
            placeholder="Idade"
            value={age}
            error={inputError.age}
            onFocus={() => {
              setInputError({...inputError, age: null});
            }}
            onChangeText={value => {
              setAge(value);
            }}
          />
          <Input
            label="Gênero"
            placeholder="Gênero"
            value={gender}
            error={inputError.gender}
            onFocus={() => {
              setInputError({...inputError, gender: null});
            }}
            onChangeText={value => {
              setGender(value);
            }}
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
          text="CADASTRAR"
          onPress={() => {
            const actionId = `${uuidv4()}`;
            const patient = {
              name,
              age,
              gender,
              anotation,
              createdAt: new Date().getTime(),
              actionId,
            };
            if (verifyCamps()) {
              setLastActionId(actionId);
              dispatch(actions.createPatient(patient));
            }
          }}></Button>
      </View>
    </View>
  );
}
NewPatient.navigationOptions = {
  title: 'Novo paciente',
};

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025, // marginTop: 20
  },
});

// generate uid
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
