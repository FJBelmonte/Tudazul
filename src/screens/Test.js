import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
  Text
} from "react-native";

import { global, linearGradient, layout } from "../constants";

import { Button, Box, InputBox, Input } from "../components";

import LinearGradient from "react-native-linear-gradient";

export default function Main({ navigation }) {
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [inputError, setInputError] = useState({
    email: {
      code: "auth/blank-email",
      errorMessage: "Campo Email é obrigatório"
    },
    email2: null
  });
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === "ios"}
    >
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ marginTop: layout.window.height * 0.025 }}>
            <Box
              style={{
                container: { height: null },
                contentContainer: { flexDirection: null }
              }}
            >
              <Text>Height: {layout.window.height}</Text>
              <Text>Width: {layout.window.width}</Text>
              <Text>Input width: {layout.window.width * 0.85}</Text>
              <Text>Input label width: {layout.window.width * 0.29}</Text>
              <Text>Button width: {layout.window.width * 0.6}</Text>
              <Text>Padding (width): {layout.window.width * 0.075}</Text>
              <Text>MarginTop: {layout.window.height * 0.025}</Text>
            </Box>

            <InputBox
              label="EMAIL"
              placeholder="E-mail"
              value={email}
              error={inputError.email}
              onFocus={() => {
                setInputError({ ...inputError, email: null });
              }}
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={e => setEmail(e)}
            >
              <Text>Tainha</Text>
            </InputBox>
            <Input
              label="Email"
              placeholder="E-mail"
              value={email}
              error={inputError.email}
              onFocus={() => {
                setInputError({ ...inputError, email: null });
              }}
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={e => setEmail(e)}
            />
            <InputBox
              label="EMAIL2"
              placeholder="E-mail2"
              value={email2}
              error={inputError.email2}
              onFocus={() => {
                setInputError({ ...inputError, email2: null });
              }}
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={e => setEmail2(e)}
            >
              <Text>Tainha</Text>
            </InputBox>
            <Input
              label="Email2"
              placeholder="E-mail2"
              value={email2}
              error={inputError.email2}
              onFocus={() => {
                setInputError({ ...inputError, email2: null });
              }}
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={e => setEmail2(e)}
            />
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
