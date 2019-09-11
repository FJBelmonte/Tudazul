import React from "react";
import { Text, StyleSheet, Image, View } from "react-native";

import { color, layout } from "../constants";

import logo from "../assets/logo.png";

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image style={styles.logoRezise} source={logo} />
      {!layout.isSmallDevice && (
        <View style={styles.brand}>
          <Text style={[styles.font, { color: color.primary }]}>tud</Text>
          <Text style={[styles.font, { color: color.secondary }]}>azul</Text>
          <Text style={[styles.font, { color: color.primary }]}>!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  logoRezise: {
    height: layout.window.width * 0.35,
    width: layout.window.width * 0.35
  },
  brand: {
    flexDirection: "row"
  },
  font: {
    fontFamily: "Comfortaa-Regular",
    fontSize: 52
  }
});
