import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity
} from "react-native";

import { global, layout, color, linearGradient } from "../../constants";

import {
  Logo,
  Input,
  Button,
  MiniCalendar,
  NextQuery,
  Calendar
} from "../../components";

import LinearGradient from "react-native-linear-gradient";

export default function PsicologoHome({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === "ios"}
    >
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <Calendar />
        <NextQuery></NextQuery>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025 // marginTop: 20
  }
});
