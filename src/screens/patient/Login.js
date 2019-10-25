import * as actions from '../../actions';

import {Button, Input, Logo} from '../../components';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

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
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
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
            placeholder="Código de acesso"
            value={code}
            onChangeText={value => {
              setCode(value);
            }}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <Button
            text="ENTRAR"
            onPress={() => {
              dispatch(actions.signInPatient(code));
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...global,
});
