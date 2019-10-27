import {Button, Input} from '../../components';
import {Image, Slider, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {color, global} from '../../constants';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Modal} from '../';

export default function InputModal(props) {
  const [input, setInput] = useState(props.value ? props.value : '');
  return (
    <Modal>
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
          <Text style={styles.type}>{props.type ? props.type : null}</Text>
          <Text style={styles.desc}>{props.desc ? props.desc : null}</Text>
          <Input
            label={props.label ? props.label : null}
            multiline
            value={input}
            onChangeText={value => {
              setInput(value);
            }}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <Button
            text="SELECIONAR"
            onPress={() => props.onButtonPress(input)}
          />
        </View>
      </View>
    </Modal>
  );
}

InputModal.defaultProps = {
  onButtonPress: () => {},
};

const styles = StyleSheet.create({
  ...global,
  type: {
    color: color.primary,
    fontSize: 22,
    textAlign: 'center',
    padding: 10,
  },
  desc: {
    fontSize: 14,
    textAlign: 'center',
    padding: 5,
    color: '#59818b',
  },
});
