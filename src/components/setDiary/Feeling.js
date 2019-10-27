import {Button, CheckBox} from '../../components';
import {Image, ScrollView, Slider, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {color, global} from '../../constants';

import {Modal} from '../';

const feelingArray = [
  'Calmo',
  'Ansioso',
  'Otimismo',
  'Orgulhoso',
  'Apaixonado',
  'Esperançoso',
  'Especial',
];

export default function Feeling(props) {
  const [feeling, setFeeling] = useState('');
  return (
    <Modal>
      <View style={styles.contentContainer}>
        <Text style={styles.secondaryText}>
          Selecione as emoções que está sentindo e aperte “confirmar”.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          backgroundColor: 'rgba(230,240,240,1.0)',
          justifyContent: 'center',
          width: 300,
          padding: 10,
          borderRadius: 25,
        }}>
        {feelingArray.map((f, index) => (
          <CheckBox
            key={index}
            textStyle={styles.list}
            selected={f === feeling ? true : false}
            onPress={() => setFeeling(f)}
            text={f}
            icon={{
              selected: 'check-box',
              unselected: 'check-box-outline-blank',
            }}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <Button
            text="SELECIONAR"
            onPress={() => props.onButtonPress(feeling)}
          />
        </View>
      </View>
    </Modal>
  );
}

Feeling.defaultProps = {
  onButtonPress: () => {},
};

const styles = StyleSheet.create({
  ...global,
  primaryText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 20,
    textAlign: 'center',
    color: color.primary,
    padding: 5,
  },
  secondaryText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
    padding: 5,
  },
  list: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    color: color.primary,
  },
});
