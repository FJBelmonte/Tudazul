import {Image, Slider, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {color, global} from '../constants';

import {Button} from '../components';
import {Modal} from './';
import humor1 from '../assets/images/humor/1-01.png';
import humor2 from '../assets/images/humor/2-01.png';
import humor3 from '../assets/images/humor/3-01.png';
import humor4 from '../assets/images/humor/4-01.png';
import humor5 from '../assets/images/humor/5-01.png';

const humorArray = [humor1, humor2, humor3, humor4, humor5];

export default function Humor(props) {
  const [humor, setHumor] = useState(2);
  return (
    <Modal>
      <View style={styles.contentContainer}>
        <Text style={styles.primaryText}>
          Olá, {props.name}, como você está ?
        </Text>
        <Text style={styles.secondaryText}>Selecione o seu humor</Text>
      </View>
      <View style={styles.contentContainer}>
        <Image
          style={[
            styles.imageRezise,
            layout.isSmallDevice
              ? {
                  height: layout.window.width * 0.35,
                  width: layout.window.width * 0.35,
                }
              : {},
          ]}
          source={humorArray[humor]}
        />
      </View>
      <View style={styles.contentContainer}>
        <Slider
          style={{width: 250, height: 40}}
          value={humor}
          onSlidingComplete={value => setHumor(parseInt(value))}
          minimumValue={0}
          maximumValue={4}
          minimumTrackTintColor={color.secondary}
          maximumTrackTintColor={color.primary}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <Button text="SELECIONAR" onPress={humor => props.onButtonPress} />
        </View>
      </View>
    </Modal>
  );
}

Humor.defaultProps = {
  onPress: () => {},
  name: 'Paciente',
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
  imageRezise: {
    height: layout.window.width * 0.5,
    width: layout.window.width * 0.5,
  },
});
