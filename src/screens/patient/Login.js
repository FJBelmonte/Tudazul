import * as actions from '../../actions';

import {Button, Input, Logo} from '../../components';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

import LinearGradient from 'react-native-linear-gradient';
import {statement} from '@babel/template';

export default function PacienteLogin({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [code, setCode] = useState('38cf2259-27f2-4e12-82c7-eca111605ec6');

  useEffect(() => {
    console.log(state.authPatient);
    if (state.authPatient.ref) {
      navigation.navigate('PatientHome');
    }
  }, [state.authPatient]);

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
          placeholder="Código de acesso"
          value={code}
          onChangeText={value => {
            setCode(value);
          }}
        />

        <View style={styles.buttonsContainer}>
          <Button
            text="ENTRAR"
            onPress={() => {
              dispatch(actions.signInPatient(code));
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025,
  },
});
