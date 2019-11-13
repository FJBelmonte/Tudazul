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

import EditSVG from '../../assets/svg/edit-24px.svg';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

//ADICIONAR AVISO DE LISTA VAZIA

export default function Exercises({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [listExercisesGlobal, setListExercisesGlobal] = useState([]);
  const [listReminder, setListReminder] = useState([]);

  useEffect(() => {
    dispatch(actions.fetchExercises());
  }, []);

  useEffect(() => {
    setListExercisesGlobal(_.toArray(state.exercise.exercises));
    setListReminder(_.toArray(state.exercise.reminders));
  }, [state.exercise]);

  function handleEditPress(data, type) {
    console.log(data);
    console.log(type);
  }
  return (
    <View style={[styles.container]}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={[styles.contentContainer, {justifyContent: 'flex-start'}]}>
        <View style={styles.contentContainer}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
            }}>
            <ScrollView
              style={{width: layout.window.width}}
              contentContainerStyle={{alignItems: 'center'}}>
              {listExercisesGlobal.map((tudazul, index) => {
                return (
                  <Box
                    key={index}
                    style={{
                      container: {height: null},
                      contentContainer: {alignItems: 'center'},
                    }}>
                    <View style={styles.boxTitleContainer}>
                      <Text style={styles.boxTitleLabel}>Exercício</Text>
                    </View>
                    <View style={styles.boxContentContainer}>
                      <Text style={styles.boxContentLabel}>{tudazul.note}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleEditPress(tudazul, 'exercise')}
                      style={{justifyContent: 'center'}}>
                      <EditSVG width={25} height={25} fill={color.primary} />
                    </TouchableOpacity>
                  </Box>
                );
              })}
              {listReminder.map((tudazul, index) => {
                return (
                  <Box
                    key={index}
                    style={{
                      container: {height: null},
                      contentContainer: {alignItems: 'center'},
                    }}>
                    <View style={styles.boxTitleContainer}>
                      <Text style={styles.boxTitleLabel}>Lembrete</Text>
                    </View>
                    <View style={styles.boxContentContainer}>
                      <Text style={styles.boxContentLabel}>{tudazul.note}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleEditPress(tudazul, 'reminder')}
                      style={{justifyContent: 'center'}}>
                      <EditSVG width={25} height={25} fill={color.primary} />
                    </TouchableOpacity>
                  </Box>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <Button
            text="ADICIONAR"
            onPress={() => {
              navigation.navigate('PsychologistNewExercise');
            }}></Button>
        </View>
      </View>
    </View>
  );
}
Exercises.navigationOptions = {
  title: 'Exercícios e Lembretes',
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
    width: layout.window.width * 0.29, //width: 125,
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
  label: {
    fontSize: 14,
    textAlign: 'center',
    padding: 5,
    color: '#59818b',
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
  imageRezise: {
    height: layout.window.width * 0.225,
    width: layout.window.width * 0.225,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  box2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxLabelTop: {
    color: '#59818b',
    fontSize: 14,
    textAlign: 'center',
    padding: 5,
  },
  boxLabelMid: {
    color: '#59818b',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  boxLabelBot: {
    color: '#59818b',
    fontSize: 12,
    textAlign: 'center',
    padding: 5,
  },
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
    fontSize: 16,
    textAlign: 'center',
  },
});
