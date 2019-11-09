import {StyleSheet, Text, View} from 'react-native';
import {global, layout, linearGradient} from '../constants';

import Box from '../components/Box';
import Button from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from './Modal';
import React from 'react';

export default function Datetime(props) {
  return (
    <Modal>
      <View style={styles.contentContainer}>
        <Box
          style={{
            container: {height: null},
            contentContainer: {flexDirection: null},
          }}>
          <View style={styles.card}>
            <Text style={[styles.cardText, {fontSize: 16}]}>
              {props.text && props.text}
            </Text>
          </View>
          <View style={styles.center}>
            <DateTimePicker
              style={{width: 300}}
              mode={props.mode ? props.mode : null}
              date={props.datetime}
              value={props.datetime}
              onChange={(e, value) => props.onChangeDate(e, value)}
            />
          </View>
        </Box>
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <Button text="SELECIONAR" onPress={props.onButtonPress} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  ...global,
  card: {
    width: layout.window.width * 0.85,
    height: layout.window.width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
    borderRadius: 10,
  },
  cardText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
