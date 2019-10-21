import * as actions from '../../actions';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Input, Logo} from '../../components';
import React, {useEffect, useState} from 'react';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

export default function PsychologistForgotPassword({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [inputError, setInputError] = useState({
    email: null,
  });
  const [authErrorFirebase, setAuthErrorFirebase] = useState({
    code: '',
    errorMessage: '',
  });
  useEffect(() => {
    if (
      authErrorFirebase.code !== '' &&
      authErrorFirebase.code !== state.auth.authError.forgotPassword.code
    )
      verifyCamps();
  }, [state.auth.authError.forgotPassword]);

  useEffect(() => {
    if (state.auth.resetedPassword) {
      navigation.navigate('PsychologistLogin');
    }
  });
  function verifyCamps() {
    let errorInput = {...inputError};
    if (email === '') {
      errorInput.email = {
        code: 'auth/blank-email',
        errorMessage: 'Campo Email não pode ficar em branco',
      };
    } else {
      errorInput.email = null;
    }

    // verificar andamento das verificações abaixo

    if (authErrorFirebase.code !== state.auth.authError.forgotPassword.code) {
      setAuthErrorFirebase(state.auth.authError.forgotPassword);
    }

    if (authErrorFirebase.code !== '') {
      if (state.auth.authError.forgotPassword.code === 'auth/invalid-email') {
        errorInput.email = {
          code: 'auth/blank-email',
          errorMessage: 'Formatação do email inválida',
        };
      }
    }

    let nErrs = _.toArray(errorInput).length;
    _.forEach(errorInput, err => {
      err === null && nErrs--;
    });
    if (nErrs === 0) {
      return true;
    }
    setInputError(errorInput);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === 'ios'}>
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
            setInputError({...inputError, email: null});
          }}
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={e => setEmail(e)}
        />

        <View style={styles.footer}>
          <View style={styles.buttonsContainer}>
            <Button
              text="Enviar"
              onPress={() => {
                const credentials = {email};
                verifyCamps() === true &&
                  dispatch(actions.forgotPasswordEmail(credentials));
              }}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

PsychologistForgotPassword.navigationOptions = {
  title: 'Redefinir senha',
};

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025, //marginTop: 20,
  },
  footerText: {
    marginTop: layout.window.height * 0.00625, //marginTop: 5,
    color: color.primary,
  },
});
