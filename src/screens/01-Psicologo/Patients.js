import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Picker,
  Alert,
  ScrollView
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
import patient from "../../reducers/patient";

export default function Patients({ navigation }) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [listPatient, setListPatient] = useState();

  useEffect(() => {
    dispatch(actions.fetchPatients());
  }, []);

  useEffect(() => {
    setListPatient(state.psychologistPatient.patients);
  }, [state.psychologistPatient.patients]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <ScrollView pagingEnabled style={{ width: layout.window.width }}>
            {_.toArray(listPatient).map(patient => {
              return (
                <View key={patient.uid}>
                  <NextQuery>
                    <Text style={[styles.patientNameLabel]}>
                      {patient.name}
                    </Text>
                    <Text style={[styles.patientAgeGenderLabel]}>
                      {patient.age}/{patient.gender}
                    </Text>
                    <Button
                      style={{ width: 120 }}
                      textStyle={{ fontSize: 14 }}
                      text="GERAR CÓDIGO"
                      onPress={() => Alert.alert(patient.uid)}
                    ></Button>
                  </NextQuery>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => navigation.navigate("PsicologoNewPatient")}
      >
        <Text style={styles.floatButtonLabel}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
Patients.navigationOptions = {
  title: "Pacientes"
};

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025 // marginTop: 20
  },
  patientNameLabel: {
    color: "#59818b",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  },
  patientAgeGenderLabel: {
    color: "#59818b",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center"
  }
});