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
import _ from "lodash";
import * as actions from "../../actions";
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

export default function NewConsultation({ navigation }) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [listPatient, setListPatient] = useState();

  const [patient, setPatient] = useState({
    name: "Paciente",
    uid: "",
    age: "Idade",
    gender: "Gênero"
  });
  const [uid, setUid] = useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [anotation, setAnotation] = useState();
  const [modalPatients, setModalPatients] = useState(false);

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

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />

      <View style={styles.contentContainer}>
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <Input
            label="Nome"
            value={patient.name}
            placeholder="Nome do paciente"
            icon={calendarIcon}
            onPressIcon={() => {
              setModalPatients(!modalPatients);
            }}
          ></Input>
          <Input
            label="Data"
            placeholder={`${date.getDate()}/${date.getMonth()}/${date.getUTCFullYear()}`}
            icon={calendarIcon}
          ></Input>
          <Input
            label="Hora"
            placeholder={`${date.getHours()}:${date.getMinutes()}`} //bug visual ex 0:8
            icon={calendarIcon}
          ></Input>
          <Input label="Tipo"></Input>
          <Input label="Anotações" multiline></Input>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button text="Confirmar"></Button>
      </View>
      {modalPatients && (
        <View style={styles.modal}>
          <View style={styles.patientCard}>
            <Text style={[styles.patientCardText, { fontSize: 16 }]}>
              {patient.name}
            </Text>
            <Text style={styles.patientCardText}>
              {patient.age} anos/{patient.gender}
            </Text>
          </View>
          <Picker
            selectedValue={uid}
            style={{ height: 300, width: 300 }}
            onValueChange={(itemValue, itemIndex) => setUid(itemValue)}
          >
            {_.toArray(listPatient).map((patient, index) => {
              return (
                <Picker.Item
                  label={patient.name}
                  value={patient.uid}
                  key={index}
                ></Picker.Item>
              );
            })}
          </Picker>
          <Button
            text="Selecionar"
            onPress={() => {
              setModalPatients(!modalPatients);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
}
NewConsultation.navigationOptions = {
  title: "Nova consulta"
};

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025 // marginTop: 20
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,1.0)",
    justifyContent: "center",
    alignItems: "center"
  },
  patientCard: {
    width: layout.window.width * 0.7, //width: 120,
    height: layout.window.width * 0.35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.primary,
    borderRadius: 10
  },
  patientCardText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center"
  }
});
