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

export default function Patients({ navigation }) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchPatients());
    console.log(state);
  }, [state]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />

      <View style={styles.contentContainer}>
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <NextQuery>
            <Text>teste</Text>
          </NextQuery>
        </View>
      </View>
      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => navigation.navigate("PsicologoNewConsultation")}
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
  }
});
