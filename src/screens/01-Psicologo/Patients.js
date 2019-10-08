import * as actions from '../../actions';

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, NextQuery} from '../../components';
import React, {useEffect, useState} from 'react';
import {global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

export default function Patients({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [listPatient, setListPatient] = useState();

  useEffect(() => {
    dispatch(actions.fetchPatients());
  }, []);

  useEffect(() => {
    setListPatient(state.psychologistPatient.patients);
  }, [state.psychologistPatient.patients]);

  useEffect(() => {
    _.toArray(listPatient).forEach(patient => {
      if (patient.consultations) {
        console.log(patient);
      }
    });
    //REALIZAR REQUISIÇÃO DAS CONSULTAS
  }, [listPatient]);

  return (
    <View style={[styles.container]}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <ScrollView style={{width: layout.window.width}}>
            {_.toArray(listPatient).map(patient => {
              return (
                <View key={patient.uid}>
                  <NextQuery
                    onPress={() =>
                      navigation.navigate('PsicologoPatient', {patient})
                    }>
                    <Text style={[styles.patientNameLabel]}>
                      {patient.name}
                    </Text>
                    <Text style={[styles.patientAgeGenderLabel]}>
                      {patient.age}/{patient.gender}
                    </Text>
                    <Button
                      style={{width: 120}}
                      textStyle={{fontSize: 14}}
                      text="GERAR CÓDIGO"
                      onPress={() => Alert.alert(patient.uid)}></Button>
                  </NextQuery>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => navigation.navigate('PsicologoNewPatient')}>
        <Text style={styles.floatButtonLabel}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
Patients.navigationOptions = {
  title: 'Pacientes',
};

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025, // marginTop: 20
  },
  patientNameLabel: {
    color: '#59818b',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  patientAgeGenderLabel: {
    color: '#59818b',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});
