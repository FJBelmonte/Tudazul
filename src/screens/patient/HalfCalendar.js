import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Box,
  Button,
  Calendar,
  Feeling,
  Humor,
  Input,
  Logo,
  MiniCalendar,
  NavigationBox,
  NextQuery,
} from '../../components';
import React, {useEffect, useState} from 'react';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

export default function HalfCalendar({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [reason, setReason] = useState('');
  const [thought, setThought] = useState('');
  const [action, setAction] = useState('');

  const [modal, setModal] = useState('');

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View
        style={[
          styles.contentContainer,
          {flex: 1, justifyContent: 'space-around'},
        ]}>
        <MiniCalendar onPress={() => {}} />
        <Box
          style={{
            container: {height: layout.window.width * 0.35},
            contentContainer: {flexDirection: null},
          }}
        />

        <Text style={styles.label}>
          Ajude a organizar suas emoções descrevendo o que aconteceu
        </Text>
        <Box label="Razão">
          <View style={styles.innerLabel}>
            <Text style={styles.innerLabelText}>Razão</Text>
          </View>
          <View style={styles.innerLabel2}>
            <Text style={styles.innerLabelText}>O que houve ?</Text>
          </View>
        </Box>
        <Box label="Pensamento">
          <View style={styles.innerLabel}>
            <Text style={styles.innerLabelText}>Pensamento</Text>
          </View>
          <View style={styles.innerLabel2}>
            <Text style={styles.innerLabelText}>O que você pensou ?</Text>
          </View>
        </Box>
        <Box label="Ações">
          <View style={styles.innerLabel}>
            <Text style={styles.innerLabelText}>Ações</Text>
          </View>
          <View style={styles.innerLabel2}>
            <Text style={styles.innerLabelText}>
              O que você fez sobre isso ?
            </Text>
          </View>
        </Box>
      </View>
    </View>
  );
}
HalfCalendar.navigationOptions = {
  title: 'HalfCalendar',
};

const styles = StyleSheet.create({
  ...global,
  label: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
    padding: 5,
  },
  innerLabel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerLabel2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerLabelText: {
    textAlign: 'center',
    color: color.primary,
  },
});
