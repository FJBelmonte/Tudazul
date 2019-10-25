import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Button,
  Calendar,
  Input,
  Logo,
  MiniCalendar,
  NavigationBox,
  NextQuery,
  Box,
} from '../../components';
import React, {useEffect, useState} from 'react';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function PatientHome({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [reason, setReason] = useState('');
  const [thought, setThought] = useState('');
  const [action, setAction] = useState('');

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <KeyboardAwareScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.contentContainer}>
            <MiniCalendar onPress={() => {}} />
          </View>
          <View style={styles.contentContainer}>
            <Box
              style={{
                container: {height: layout.window.width * 0.35},
                contentContainer: {flexDirection: null},
              }}>
              <View style={{flex: 1}}></View>
            </Box>
          </View>

          <View style={styles.contentContainer}>
            <Text style={{textAlign: 'center'}}>
              Ajude a organizar suas emoções descrevendo o que aconteceu
            </Text>
            <Input label="Razão"></Input>
            <Input label="Pensamento"></Input>
            <Input label="Ações"></Input>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
PatientHome.navigationOptions = {
  title: 'Paciente',
};

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025, // marginTop: 20
  },
  welcomeLabelStyle: {
    color: color.primary,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
});
