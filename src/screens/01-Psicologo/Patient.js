import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { global, layout, linearGradient } from "../../constants";
import { Button, Input } from "../../components";
import LinearGradient from "react-native-linear-gradient";

export default function Patient({ navigation }) {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    anotation: "",
    uid: ""
  });
  useEffect(() => {
    const patient = navigation.getParam("patient");
    setPatient(patient);
  }, []);
  const { name, age, gender, anotation, uid } = patient;
  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <Input
            editable={false}
            label="Paciente"
            placeholder="Nome do paciente"
            value={name}
          />
          <Input editable={false} label="Idade" placeholder="00" value={age} />
          <Input
            editable={false}
            label="Gênero"
            placeholder="Gênero"
            value={gender}
          />
          <Input
            editable={false}
            label="Anotações"
            placeholder="Anote o que achar relevante"
            multiline
            value={anotation}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          text="GERAR CÓDIGO"
          onPress={() => {
            Alert.alert(uid);
          }}
        ></Button>
      </View>
    </View>
  );
}
Patient.navigationOptions = {
  title: "Paciente"
};
const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025 // marginTop: 20
  }
});
