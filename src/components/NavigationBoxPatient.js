import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import icoAnotacoes from '../assets/icons/ico-anotacoes.png';
import icoCalendario from '../assets/icons/ico-calendario.png';
import icoDiario from '../assets/icons/ico-diario.png';
import icoExercicios from '../assets/icons/ico-exercicios.png';
import icoHistorico from '../assets/icons/ico-historico.png';
import icoPacientes from '../assets/icons/ico-pacientes.png';
import {layout} from '../constants';

export default function NavigationBoxPatient(props) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.contentContainer,
          {justifyContent: 'space-around', alignSelf: 'stretch'},
        ]}>
        <TouchableOpacity onPress={() => props.onPress0()}>
          <Image source={icoCalendario} style={styles.ico} />
          <Text style={styles.icoLabel}>Calendário</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.onPress1()}>
          <Image source={icoHistorico} style={styles.ico} />
          <Text style={styles.icoLabel}>Histórico</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.onPress2()}>
          <Image source={icoExercicios} style={styles.ico} />
          <Text style={styles.icoLabel}>Exercícios</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.onPress3()}>
          <Image source={icoDiario} style={styles.ico} />
          <Text style={styles.icoLabel}>Diário</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
NavigationBoxPatient.defaultProps = {
  onPress0: () => {},
  onPress1: () => {},
  onPress2: () => {},
  onPress3: () => {},
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'rgba(245,245,255,0.95)',
    width: layout.window.width * 0.85,
    height: 92,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  ico: {
    width: 60,
    height: 60,
  },
  icoLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#59818b',
  },
});
