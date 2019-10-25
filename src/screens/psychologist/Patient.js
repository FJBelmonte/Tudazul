import * as actions from '../../actions';

import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Box, Button} from '../../components';
import React, {useEffect, useState} from 'react';
import {global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

export default function Patient({navigation}) {
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    gender: '',
    anotation: '',
    uid: '',
    psychologist: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const patient = navigation.getParam('patient');
    setPatient(patient);
  }, []);
  const {name, age, gender, anotation, uid} = patient;
  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <Box>
            <View style={styles.labelContainer}>
              <Text style={styles.labelStyle}>Nome</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>{name}</Text>
            </View>
          </Box>
          <Box>
            <View style={styles.labelContainer}>
              <Text style={styles.labelStyle}>Idade</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>{age}</Text>
            </View>
          </Box>
          <Box>
            <View style={styles.labelContainer}>
              <Text style={styles.labelStyle}>Gênero</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>{gender}</Text>
            </View>
          </Box>
          <Box
            style={{
              container: {flex: 1},
              contentContainer: {flex: 1, flexDirection: null},
            }}>
            <View style={[styles.labelContainer, styles.multiline]}>
              <Text style={styles.labelStyle}>Anotações</Text>
            </View>
            <ScrollView>
              <View style={styles.textContainer}>
                <Text style={styles.textStyle}>{anotation}</Text>
              </View>
            </ScrollView>
          </Box>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <Button
            text="GERAR CÓDIGO"
            onPress={() => {
              dispatch(actions.createPatientCode(patient));
              Alert.alert(uid);
            }}></Button>
        </View>
      </View>
    </View>
  );
}
Patient.navigationOptions = {
  title: 'Paciente',
};
const styles = StyleSheet.create({
  ...global,
  labelStyle: {
    color: '#59818b',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  labelContainer: {
    width: layout.window.width * 0.29, //width: 120,
    height: 46,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  textStyle: {
    color: '#000000',
    fontSize: 16,
  },
  multiline: {
    alignSelf: 'center',
    borderRightWidth: 0,
  },
});
