import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, Platform, View } from "react-native";

import { global, layout, color, linearGradient } from "../../constants";

import { Logo, Input, Button } from "../../components";

import LinearGradient from "react-native-linear-gradient";

export default function PacienteLogin({ navigation }) {
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
      <View style={styles.contentContainer}>
        <Input placeholder="Código de acesso" />

        <View style={styles.buttonsContainer}>
          <Button text="ENTRAR" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: 20
  }
});
