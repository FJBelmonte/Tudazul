import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import { layout } from "../constants";

//onPress |> Function
//style |> Object
//textStyle |> Object

export default function Button(props) {
  return (
    <TouchableOpacity
      style={[styles.button, { ...props.style }]}
      onPress={props.onPress}
    >
      <Text style={[styles.buttonText, { ...props.textStyle }]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}
Button.defaultProps = {
  onPress: () => {}
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: "#59818b",
    width: layout.window.width * 0.6, //width: 250,
    marginVertical: 5,
    height: 46,
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
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff"
  }
});
