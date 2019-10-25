import {Button, Logo} from '../components';
import {Platform, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, global, linearGradient} from '../constants';

import LinearGradient from 'react-native-linear-gradient';

export default function Main({navigation}) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
      </View>

      <View style={[styles.footer, {marginTop: 20}]}>
        <View style={styles.buttonsContainer}>
          <Button
            text="SOU PACIENTE"
            onPress={() => navigation.navigate('PatientLogin')}
          />
          <Button
            text="SOU PSICÓLOGO"
            onPress={() => navigation.navigate('PsychologistLogin')}
          />
        </View>
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
});
