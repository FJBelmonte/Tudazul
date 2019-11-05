import * as actions from '../../actions';

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Box, Button, MiniCalendar, NextQuery} from '../../components';
import React, {useEffect, useState} from 'react';
import {global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

//ADICIONAR AVISO DE LISTA VAZIA

export default function Exercise({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [listExercisesGlobal, setListExercisesGlobal] = useState([]);
  const [listExercisesPatient, setListExercisesPatient] = useState([]);

  useEffect(() => {
    setListExercisesGlobal(
      _.toArray(state.authPatient.tudazul.global.exercises),
    );
    setListExercisesPatient(
      _.toArray(state.authPatient.tudazul.patient.exercises),
    );
  }, []);

  return (
    <View style={[styles.container]}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={[styles.contentContainer, {justifyContent: 'flex-start'}]}>
        <MiniCalendar></MiniCalendar>
        <View style={styles.contentContainer}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
            }}>
            <ScrollView
              style={{width: layout.window.width}}
              contentContainerStyle={{alignItems: 'center'}}>
              {listExercisesGlobal.map((exercise, index) => {
                return (
                  <Box
                    key={index}
                    style={{
                      container: {height: 100},
                      contentContainer: {flexDirection: 'column'},
                    }}>
                    <View style={styles.boxTitleContainer}>
                      <Text style={styles.boxTitleLabel}>Exercício</Text>
                    </View>
                    <View style={styles.boxContentContainer}>
                      <Text style={styles.boxContentLabel}>
                        {exercise.note}
                      </Text>
                    </View>
                  </Box>
                );
              })}

              {listExercisesPatient.map((exercise, index) => {
                return (
                  <Box
                    key={index}
                    style={{
                      container: {height: 100},
                      contentContainer: {flexDirection: 'column'},
                    }}>
                    <View style={styles.boxTitleContainer}>
                      <Text style={styles.boxTitleLabel}>Exercício</Text>
                    </View>
                    <View style={styles.boxContentContainer}>
                      <Text style={styles.boxContentLabel}>
                        {exercise.note}
                      </Text>
                    </View>
                  </Box>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}
Exercise.navigationOptions = {
  title: 'Exercícios',
};

const styles = StyleSheet.create({
  ...global,
  boxTitleContainer: {padding: 5},
  boxContentContainer: {
    flex: 1,
  },
  boxTitleLabel: {
    color: '#59818b',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  boxContentLabel: {
    color: '#59818b',

    fontSize: 18,
    textAlign: 'center',
  },
});
