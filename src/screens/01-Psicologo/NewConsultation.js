import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity
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

export default function NewConsultation({ navigation }) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [anotation, setAnotation] = useState();

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <Input label="Nome" placeholder="Nome do paciente"></Input>

        <Input
          label="Data"
          placeholder={`${date.getDate()}/${date.getMonth()}/${date.getUTCFullYear()}`}
          icon={calendarIcon}
        ></Input>

        <Input label="Hora"></Input>

        <Input label="Tipo"></Input>

        <Input label="Anotações" multiline></Input>
      </View>
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
  }
});
