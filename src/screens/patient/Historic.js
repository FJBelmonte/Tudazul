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
import {Button, Graphic, NextQuery} from '../../components';
import React, {useEffect, useState} from 'react';
import {global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

//ADICIONAR AVISO DE LISTA VAZIA

export default function Historic({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [listDiary, setListDiary] = useState(null);

  //BEGIN - ==================>
  useEffect(() => {
    dispatch(actions.fetchDiary(state.authPatient.ref));
  }, []);
  // END

  useEffect(() => {
    setListDiary(state.authPatient.diary);
  }, [state.authPatient.diary]);

  return (
    <View style={[styles.container]}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <Graphic></Graphic>
      </View>
    </View>
  );
}
Historic.navigationOptions = {
  title: 'Histórico',
};

const styles = StyleSheet.create({
  ...global,
});
