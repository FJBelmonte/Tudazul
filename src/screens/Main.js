import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, Platform, View } from "react-native";

import { color, global, linearGradient } from "../constants";

import { Logo, Button } from "../components";

import LinearGradient from "react-native-linear-gradient";

export default function Main({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === "ios"}
    >
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={[styles.footer, { marginTop: 20 }]}>
        <Button
          text="SOU PACIENTE"
          onPress={() => navigation.navigate("PacienteLogin")}
        />
        <Button
          text="SOU PSICÓLOGO"
          onPress={() => navigation.navigate("PsicologoLogin")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

Main.navigationOptions = {
  header: null,
  title: "Início"
};

const styles = StyleSheet.create({
  ...global,
  button: { backgroundColor: color.primary },
  buttonText: {}
});
