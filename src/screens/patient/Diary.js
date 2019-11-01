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
import {Button, NextQuery} from '../../components';
import React, {useEffect, useState} from 'react';
import {global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import humor1 from '../../assets/images/humor/1-01.png';
import humor2 from '../../assets/images/humor/2-01.png';
import humor3 from '../../assets/images/humor/3-01.png';
import humor4 from '../../assets/images/humor/4-01.png';
import humor5 from '../../assets/images/humor/5-01.png';

const humorImageArray = [humor1, humor2, humor3, humor4, humor5];
const humorTextArray = ['Muito mal', 'Mal', 'Neutro', ' Bem', ' Muito bem'];

//ADICIONAR AVISO DE LISTA VAZIA

export default function Diary({navigation}) {
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
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <ScrollView style={{width: layout.window.width}}>
            {_.reverse(_.toArray(listDiary)).map(diary => {
              return (
                <View key={diary.uid}>
                  <NextQuery
                    date={diary.createdAt && new Date(diary.createdAt)}>
                    <View style={styles.box}>
                      <Image
                        style={[
                          styles.imageRezise,
                          layout.isSmallDevice
                            ? {
                                height: layout.window.width * 0.2,
                                width: layout.window.width * 0.2,
                              }
                            : {},
                        ]}
                        source={humorImageArray[diary.humor]}
                      />
                    </View>
                    <View style={styles.box2}>
                      <Text style={styles.boxLabelTop}>
                        {humorTextArray[diary.humor]}
                      </Text>
                      <Text style={styles.boxLabelBot}>{diary.feeling}</Text>
                    </View>
                  </NextQuery>
                </View>
              );
            })}
          </ScrollView>
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
  imageRezise: {
    height: layout.window.width * 0.15,
    width: layout.window.width * 0.15,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  box2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxLabelTop: {
    color: '#59818b',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 2,
  },
  boxLabelBot: {
    color: '#59818b',
    fontSize: 14,
    textAlign: 'center',
    padding: 2,
  },
});
