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

export default function PsicologoHome({ navigation }) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const user = state.auth.user;

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <MiniCalendar
          onPress={() => navigation.navigate("PsicologoCalendar")}
        />
      </View>

      <View style={styles.contentContainer}>
        <NextQuery date={new Date()} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeLabelStyle}>
          Olá, Doutor(a) {user.name} !
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <NavigationBox
          onPress0={() => navigation.navigate("PsicologoCalendar")}
          onPress1={() => navigation.navigate("PsicologoPatients")}
        />
      </View>
    </View>
  );
}
PsicologoHome.navigationOptions = {
  title: "Psicólogo"
};

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025 // marginTop: 20
  },
  welcomeLabelStyle: {
    color: color.primary,
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center"
  }
});
