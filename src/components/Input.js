import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { layout } from "../constants";

//Label |> String
//Placeholder |> String
//Value |> Var
//onChangeText |> Function
//labelStyle |> Object
//textContentType |> Enum ( same as https://facebook.github.io/react-native/docs/textinput#textcontenttype )
//secureTextEntry |> Boolean
//keyboardType |> Enum ( same as https://facebook.github.io/react-native/docs/textinput#keyboardtype)

export default function Input(props) {
  const error = props.error
    ? { backgroundColor: "rgba(255,200,200,0.95)", color: "#ff0000" }
    : { marginTop: layout.window.height * 0.025 }; // marginTop 20
  return (
    <View
      style={{
        alignItems: "center"
      }}
    >
      {props.error && (
        <Text style={styles.error}>{props.error.errorMessage}</Text>
      )}
      <View
        style={[styles.container, { ...error }, { ...props.styleContainer }]}
      >
        <View style={styles.contentContainer}>
          {props.label && (
            <View style={styles.labelContainer}>
              <Text
                style={[
                  styles.labelStyle,
                  { ...error, marginTop: 0 },
                  { ...props.labelStyle },
                  layout.isSmallDevice && { fontSize: 10 } //TEST IT
                ]}
              >
                {props.label}
              </Text>
            </View>
          )}
          <TextInput
            textContentType={props.textContentType}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={props.placeholder}
            style={styles.input}
            placeholderTextColor="#999"
            value={props.value}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
            onFocus={props.onFocus}
          />
        </View>
      </View>
    </View>
  );
}
Input.defaultProps = {
  value: null,
  onChangeText: () => {},
  placeholder: "",
  labelStyle: {},
  textContentType: "none",
  secureTextEntry: false,
  styleContainer: {},
  keyboardType: "default",
  error: null,
  onFocus: () => {}
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "rgba(245,245,255,0.95)",
    width: layout.window.width * 0.85, //width: 350,
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
  contentContainer: {
    flexDirection: "row"
  },
  labelContainer: {
    width: layout.window.width * 0.29, //width: 120,
    height: 46,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "rgba(0,0,0,0.5)"
  },
  labelStyle: {
    color: "#59818b",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  },
  input: {
    flex: 1,
    paddingHorizontal: 5
  },
  error: {
    color: "#ff0000",
    marginTop: 1,
    marginBottom: 1,
    fontSize: 12
  }
});
