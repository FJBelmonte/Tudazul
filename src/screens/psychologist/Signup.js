import * as actions from '../../actions';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Input} from '../../components';
import React, {useEffect, useState} from 'react';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

export default function PsychologistSignup({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [name, setName] = useState('Fernando');
  const [crp, setCrp] = useState('123');
  const [email, setEmail] = useState('fernando.belmonte@live.com');
  const [cellphone, setCellphone] = useState('123 99999 8888');
  const [password, setPassword] = useState('123456');
  const [rePassword, setRePassword] = useState('123456');
  const [inputError, setInputError] = useState({
    name: null,
    email: null,
    password: null,
    rePassword: null,
    cellphone: null,
    crp: null,
  });
  const [authErrorFirebase, setAuthErrorFirebase] = useState({
    code: '',
    errorMessage: '',
  });
  useEffect(() => {
    if (
      authErrorFirebase.code !== '' &&
      authErrorFirebase.code !== state.auth.authError.signUp.code
    )
      verifyCamps();
  }, [state.auth.authError.signUp]);

  useEffect(() => {
    if (state.auth.userCreated) {
      navigation.navigate('PsychologistLogin');
    }
  }, [state.auth.userCreated]);

  function verifyCamps() {
    let errorInput = {...inputError};
    if (name === '') {
      errorInput.name = {
        code: 'auth/blank-name',
        errorMessage: 'Campo Nome é obrigatório',
      };
    } else {
      errorInput.name = null;
    }
    if (email === '') {
      errorInput.email = {
        code: 'auth/blank-email',
        errorMessage: 'Campo Email é obrigatório',
      };
    } else {
      errorInput.email = null;
    }
    if (password === '') {
      errorInput.password = {
        code: 'auth/blank-password',
        errorMessage: 'Campo senha é obrigatório',
      };
    } else {
      errorInput.password = null;
    }
    if (rePassword === '') {
      errorInput.rePassword = {
        code: 'auth/blank-rePassword',
        errorMessage: 'Campo de repetição de senha é obrigatório',
      };
    } else if (password !== rePassword) {
      errorInput.password = {
        code: 'auth/password-dont-match',
        errorMessage: 'A senha e confirmação de senha não coincidem',
      };
      errorInput.rePassword = {
        code: 'auth/password-dont-match',
        errorMessage: '',
      };
    } else {
      errorInput.rePassword = null;
    }
    if (cellphone === '') {
      errorInput.cellphone = {
        code: 'auth/blank-cellphone',
        errorMessage: 'Campo do número do celular é obrigatório',
      };
    } else {
      errorInput.cellphone = null;
    }
    if (crp === '') {
      errorInput.crp = {
        code: 'auth/blank-crp',
        errorMessage: 'Campo CRP é obrigatório',
      };
    } else {
      errorInput.crp = null;
    }
    // verificar andamento das verificações abaixo

    if (authErrorFirebase.code !== state.auth.authError.signUp.code) {
      setAuthErrorFirebase(state.auth.authError.signUp);
    }

    if (authErrorFirebase.code !== '') {
      if (state.auth.authError.signUp.code === 'auth/invalid-email') {
        errorInput.email = {
          code: 'auth/blank-email',
          errorMessage: 'Formatação do email inválida',
        };
      }
      if (state.auth.authError.signUp.code === 'auth/email-already-in-use') {
        errorInput.email = {
          code: 'auth/blank-email',
          errorMessage: 'Email já esta em uso',
        };
      }
      if (state.auth.authError.signUp.code === 'auth/weak-password') {
        errorInput.password = {
          code: 'auth/blank-email',
          errorMessage: 'Senha fraca',
        };
        errorInput.rePassword = {
          code: 'auth/blank-email',
          errorMessage: '',
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
    //verificar caminho ao apertar botão várias vezes

    setInputError(errorInput);
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, {padding: 0}]}
      behavior="padding"
      enabled={Platform.OS === 'ios'}>
      <LinearGradient colors={linearGradient} style={styles.background} />

      <View style={{flex: 3, marginTop: 10}}>
        <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
          <Input
            label="Nome"
            value={name}
            error={inputError.name}
            onFocus={() => {
              setInputError({...inputError, name: null});
            }}
            textContentType="name"
            onChangeText={e => setName(e)}
          />
          <Input
            label="CRP"
            value={crp}
            error={inputError.crp}
            onFocus={() => {
              setInputError({...inputError, crp: null});
            }}
            onChangeText={e => setCrp(e)}
          />
          <Input
            label="E-mail"
            value={email}
            error={inputError.email}
            onFocus={() => {
              setInputError({...inputError, email: null});
            }}
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={e => setEmail(e)}
          />
          <Input
            label="Celular"
            value={cellphone}
            error={inputError.cellphone}
            onFocus={() => {
              setInputError({...inputError, cellphone: null});
            }}
            keyboardType="phone-pad"
            onChangeText={e => setCellphone(e)}
          />
          <Input
            label="Senha"
            value={password}
            error={inputError.password}
            onFocus={() => {
              setInputError({...inputError, password: null});
            }}
            textContentType="password"
            secureTextEntry={true}
            onChangeText={e => setPassword(e)}
          />
          <Input
            label="Confirme a senha"
            value={rePassword}
            error={inputError.rePassword}
            onFocus={() => {
              setInputError({...inputError, rePassword: null});
            }}
            textContentType="password"
            secureTextEntry={true}
            onChangeText={e => setRePassword(e)}
          />
        </ScrollView>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.footer}>
          <Button
            text="Enviar"
            onPress={() => {
              const credentials = {
                name,
                crp,
                email,
                cellphone,
                password,
              };
              if (verifyCamps()) {
                dispatch(actions.signUp(credentials));
              }
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

PsychologistSignup.navigationOptions = {
  title: 'Psicólogo Cadastro',
};

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025, //marginTop: 20,
  },
  footerText: {
    textAlign: 'center',
    color: color.primary,
  },
});
