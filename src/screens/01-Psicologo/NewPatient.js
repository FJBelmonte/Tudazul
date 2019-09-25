import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Picker
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions";
import _ from "lodash";

import { global, layout, color, linearGradient } from "../../constants";

import {
  Logo,
  Input,
  Button,
  MiniCalendar,
  NextQuery,
  Calendar,
  NavigationBox
} from "../../components";

import LinearGradient from "react-native-linear-gradient";

import calendarIcon from "../../assets/icons/ico-calendario.png";

export default function NewPatient({ navigation }) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [anotation, setAnotation] = useState("");
  const [inputError, setInputError] = useState({
    name: null,
    age: null,
    gender: null
  });

  function verifyCamps() {
    let errorInput = { ...inputError };
    if (name === "") {
      errorInput.name = {
        code: "patient/blank-name",
        errorMessage: "Campo Paciente é obrigatório"
      };
    } else {
      errorInput.name = null;
    }
    if (age === "") {
      errorInput.age = {
        code: "patient/blank-age",
        errorMessage: "Campo Idade é obrigatório"
      };
    } else {
      errorInput.age = null;
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
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <Input
            label="Paciente"
            placeholder="Nome do paciente"
            value={name}
            error={inputError.name}
            onFocus={() => {
              setInputError({ ...inputError, name: null });
            }}
            textContentType="name"
            onChangeText={value => {
              setName(value);
            }}
          />
          <Input
            label="Idade"
            placeholder="00"
            value={age}
            onChangeText={value => {
              setAge(value);
            }}
          />
          <Input
            label="Gênero"
            placeholder="Gênero"
            value={gender}
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
          text="Cadastrar"
          onPress={() => {
            const patient = {
              name,
              age,
              gender,
              anotation
            };
            if (verifyCamps()) {
              dispatch(actions.createPatient(patient));
            }
          }}
        ></Button>
      </View>
    </View>
  );
}
NewPatient.navigationOptions = {
  title: "Novo paciente"
};

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025 // marginTop: 20
  }
});
