import {Button, Logo} from '../components';
import {Platform, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, global, linearGradient} from '../constants';

import LinearGradient from 'react-native-linear-gradient';

export default function Main({navigation}) {
  return (
    <View
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === 'ios'}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={[styles.footer, {marginTop: 20}]}>
        <Button
          text="SOU PACIENTE"
          onPress={() => navigation.navigate('PacienteLogin')}
        />
        <Button
          text="SOU PSICÓLOGO"
          onPress={() => navigation.navigate('PsicologoLogin')}
        />
      </View>
    </View>
  );
}

Main.navigationOptions = {
  header: null,
  title: 'Início',
};

const styles = StyleSheet.create({
  ...global,
  button: {backgroundColor: color.primary},
  buttonText: {},
});
