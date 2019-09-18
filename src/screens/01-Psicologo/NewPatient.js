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

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <Input label="Paciente" placeholder="Nome do paciente" />
          <Input label="Idade" placeholder="00" />
          <Input label="Gênero" placeholder="Gênero" />
          <Input
            label="Anotações"
            placeholder="Anote o que achar relevante"
            multiline
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button text="Cadastrar"></Button>
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
