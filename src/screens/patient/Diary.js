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

export default function Diary({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [diary, setDiary] = useState({
    action: '',
    createdAt: new Date().getTime(),
    feeling: '',
    humor: 4,
    reason: '',
    thought: '',
    uid: '',
  });

  useEffect(() => {
    const pDiary = navigation.getParam('diary');
    setDiary(pDiary);
  }, []);

  useEffect(() => {
    console.log(diary);
  }, [diary]);

  return (
    <View style={[styles.container]}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={[styles.contentContainer, {justifyContent: 'flex-start'}]}>
        <MiniCalendar date={diary.createdAt} />
        <View style={styles.contentContainer}>
          <Text>{diary.humor}</Text>
        </View>
      </View>
    </View>
  );
}
Diary.navigationOptions = {
  title: 'Diário',
};

const styles = StyleSheet.create({
  ...global,
});
