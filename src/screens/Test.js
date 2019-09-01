import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
  Text
} from "react-native";

import { global, linearGradient, layout } from "../constants";

import { Button } from "../components";

import LinearGradient from "react-native-linear-gradient";

export default function Main({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === "ios"}
    >
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View>
            <Text>Height: {layout.window.height}</Text>
            <Text>Width: {layout.window.width}</Text>
          </View>

          <View style={{ marginTop: layout.window.height * 0.025 }}>
            <Text>Input width: {layout.window.width * 0.85}</Text>
            <Text>Input label width: {layout.window.width * 0.29}</Text>
            <Text>Button width: {layout.window.width * 0.6}</Text>
            <Text>Padding (width): {layout.window.width * 0.075}</Text>
            <Text>MarginTop: {layout.window.height * 0.025}</Text>
          </View>
        </View>
        <View
          style={[styles.footer, { marginTop: layout.window.height * 0.025 }]}
        >
          <Button
            text="Continuar"
            onPress={() => navigation.navigate("Main")}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

Main.navigationOptions = {
  header: null,
  title: "TEST"
};

const styles = StyleSheet.create({
  ...global
});
