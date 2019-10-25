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

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />

      <KeyboardAwareScrollView
        contentContainerStyle={null}
        onKeyboardWillShow={frames => {
          console.log('Keyboard event', frames);
        }}
        onKeyboardWillHide={frames => {
          console.log('Keyboard event', frames);
        }}
        enableOnAndroid>
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Logo />
          </View>
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
        </View>
      </KeyboardAwareScrollView>
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
  );
}

PsychologistForgotPassword.navigationOptions = {
  title: 'Redefinir senha',
};

const styles = StyleSheet.create({
  ...global,
  footerText: {
    marginTop: layout.window.height * 0.00625, //marginTop: 5,
    color: color.primary,
  },
});
