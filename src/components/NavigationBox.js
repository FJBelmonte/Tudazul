import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { layout } from "../constants";

import icoCalendario from "../assets/icons/ico-calendario.png";
import icoPacientes from "../assets/icons/ico-pacientes.png";
import icoExercicios from "../assets/icons/ico-exercicios.png";
import icoAnotacoes from "../assets/icons/ico-anotacoes.png";

export default function NavigationBox(props) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.contentContainer,
          { justifyContent: "space-around", alignSelf: "stretch" }
        ]}
      >
        <TouchableOpacity onPress={() => props.onPress0()}>
          <Image source={icoCalendario} style={styles.ico} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.onPress1()}>
          <Image source={icoPacientes} style={styles.ico} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.onPress2()}>
          <Image source={icoExercicios} style={styles.ico} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.onPress3()}>
          <Image source={icoAnotacoes} style={styles.ico} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
NavigationBox.defaultProps = {
  onPress0: () => {},
  onPress1: () => {},
  onPress2: () => {},
  onPress3: () => {}
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "rgba(245,245,255,0.95)",
    width: layout.window.width * 0.85,
    height: 92,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  contentContainer: {
    flexDirection: "row"
  },
  ico: {
    width: 60,
    height: 60
  }
});
