import {Box, Button} from '../components';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {global, layout, linearGradient} from '../constants';

import LinearGradient from 'react-native-linear-gradient';

export default function Main({navigation}) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === 'ios'}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{marginTop: layout.window.height * 0.025}}>
            <Box
              style={{
                container: {height: null},
                contentContainer: {flexDirection: null},
              }}>
              <View style={{padding: 20}}>
                <Text>{Platform.OS === 'ios' ? 'IOS' : 'Android'}</Text>

                <Text>
                  {layout.isSmallDevice
                    ? 'WARNING SMALL DEVICE'
                    : 'Default Device'}
                </Text>
                <Text>Height: {layout.window.height}</Text>
                <Text>Width: {layout.window.width}</Text>
                <Text>Input width: {layout.window.width * 0.85}</Text>
                <Text>Input label width: {layout.window.width * 0.29}</Text>
                <Text>Button width: {layout.window.width * 0.6}</Text>
                <Text>Padding (width): {layout.window.width * 0.075}</Text>
                <Text>MarginTop: {layout.window.height * 0.025}</Text>
              </View>
            </Box>
          </View>
        </View>
        <View
          style={[styles.footer, {marginTop: layout.window.height * 0.025}]}>
          <Button
            text="Continuar"
            onPress={() => navigation.navigate('Main')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

Main.navigationOptions = {
  header: null,
  title: 'TEST',
};

const styles = StyleSheet.create({
  ...global,
});
