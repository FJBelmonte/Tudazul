import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import Box from "./Box";

import { layout } from "../constants";

export default function InputBox(props) {
  const error = props.error
    ? { backgroundColor: "rgba(255,200,200,0.95)", color: "#ff0000" }
    : { marginTop: layout.window.height * 0.025 };
  return (
    <View style={{ alignItems: "center" }}>
      {props.error && (
        <Text style={styles.error}>{props.error.errorMessage}</Text>
      )}
      <Box style={props.style}>
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
          multiline={props.multiline}
          numberOfLines={props.multiline ? 4 : 1}
        />

        <View
          style={[styles.childrenContainer, { ...props.childrenContainer }]}
        >
          {props.children}
        </View>
      </Box>
    </View>
  );
}
InputBox.defaultProps = {
  style: {
    container: {},
    contentContainer: {}
  },
  onPress: () => {},

  value: null,
  onChangeText: () => {},
  placeholder: "",
  labelStyle: {},
  textContentType: "none",
  secureTextEntry: false,
  styleContainer: {},
  keyboardType: "default",
  error: null,
  multiline: false,
  type: "default",
  onFocus: () => {},
  editable: true
};

const styles = StyleSheet.create({
  labelContainer: {
    width: layout.window.width * 0.29,
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
    alignSelf: "stretch",
    paddingHorizontal: 5
  },
  error: {
    color: "#ff0000",
    marginTop: 1,
    marginBottom: 1,
    fontSize: 12
  },
  childrenContainer: {
    justifyContent: "center",
    alignContent: "center",
    padding: 2
  }
});
