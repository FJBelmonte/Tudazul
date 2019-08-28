import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import _ from "lodash";
import LinearGradient from "react-native-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions";
import { global, layout, color, linearGradient } from "../../constants";
import { Logo, Input, Button } from "../../components";

export default function PsicologoLogin({ navigation }) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("fernando.belmonte@live.com");
  const [password, setPassword] = useState("123456");
  const [inputError, setInputError] = useState({
    email: null,
    password: null
  });
  const [authErrorFirebase, setAuthErrorFirebase] = useState({
    code: null,
    errorMessage: null
  });

  useEffect(() => {
    if (
      authErrorFirebase.code !== null &&
      authErrorFirebase.code !== state.auth.authError.signIn.code
    )
      verifyCamps();
  }, [state.auth.authError.signIn]);

  useEffect(() => {
    if (state.auth.isLoggedIn) {
      navigation.navigate("PsicologoHome");
    }
  }, [state.auth.isLoggedIn]);

  useEffect(() => {
    if (state.auth.resetedPassword) {
      Alert.alert("Foi enviado um email para redefinição de senha");
    }
  }, [state.auth.resetedPassword]);

  function verifyCamps() {
    let errorInput = { ...inputError };
    if (email === "") {
      errorInput.email = {
        code: "auth/blank-email",
        errorMessage: "Campo Email não pode ficar em branco"
      };
    } else {
      errorInput.email = null;
    }
    if (password === "") {
      errorInput.password = {
        code: "auth/blank-password",
        errorMessage: "Campo senha não pode ficar em branco"
      };
    } else {
      errorInput.password = null;
    }
    // verificar andamento das verificações abaixo

    if (authErrorFirebase.code !== state.auth.authError.signIn.code) {
      setAuthErrorFirebase(state.auth.authError.signIn);
    }

    if (authErrorFirebase.code !== "") {
      if (state.auth.authError.signIn.code === "auth/invalid-email") {
        errorInput.email = {
          code: "auth/blank-email",
          errorMessage: "Formatação do email inválida"
        };
      }
      if (state.auth.authError.signIn.code === "auth/user-disabled") {
        errorInput.email = {
          code: "auth/user-disabled",
          errorMessage: "Este usuário foi desativado"
        };
      }
      if (state.auth.authError.signIn.code === "auth/user-not-found") {
        errorInput.email = {
          code: "auth/user-not-found",
          errorMessage: "Este usuário não foi encontrado"
        };
      }
      if (state.auth.authError.signIn.code === "auth/wrong-password") {
        errorInput.password = {
          code: "auth/wrong-password",
          errorMessage: "Senha inválida"
        };
      }
    }

    let nErrs = _.toArray(errorInput).length;
    _.forEach(errorInput, err => {
      err === null && nErrs--;
    });
    if (nErrs === 0) {
      return true;
    } else {
      setInputError(errorInput);
    }
  }

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
        <Input
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
        <Input
          placeholder="Senha"
          value={password}
          error={inputError.password}
          onFocus={() => {
            setInputError({ ...inputError, password: null });
          }}
          textContentType="password"
          secureTextEntry={true}
          onChangeText={e => setPassword(e)}
        />

        <View style={styles.footer}>
          <View style={styles.buttonsContainer}>
            <Button
              text="ENTRAR"
              onPress={() => {
                console.log("Login - ButtonEntrar PRESSED");
                const credentials = { email, password };
                if (verifyCamps()) {
                  dispatch(actions.signIn(credentials));
                }
              }}
            />
            <Button
              text="CADASTRAR"
              style={{ backgroundColor: "#d5d5d5" }}
              onPress={() => {
                console.log("Login - ButtonCadastrar PRESSED");
                navigation.navigate("PsicologoSignup");
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log("Login - TouchableOpacityForgotPassword PRESSED");
              navigation.navigate("PsicologoForgotPassword");
            }}
          >
            <Text style={styles.footerText}> Esqueceu sua senha ? </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

PsicologoLogin.navigationOptions = {
  title: "Psicólogo"
};

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: 20
  },
  footerText: {
    marginTop: 5,
    color: color.primary
  }
});
