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
import {colors, global, layout, linearGradient} from '../../constants';
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

  const {humor, feeling, action, thought, reason} = diary;
  return (
    <View style={[styles.container]}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={[styles.contentContainer, {justifyContent: 'flex-start'}]}>
        <MiniCalendar date={diary.createdAt} />

        <View style={styles.contentContainer}>
          <Box
            style={{
              container: {height: layout.window.width * 0.35},
              contentContainer: {flexDirection: 'row'},
            }}>
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
                source={humorImageArray[humor]}
              />
            </View>
            <View style={styles.box2}>
              <Text style={styles.boxLabelTop}>{humorTextArray[humor]}</Text>
              <Text style={styles.boxLabelBot}>{feeling}</Text>
            </View>
          </Box>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <ScrollView style={{width: '100%'}}>
              <Box
                style={{
                  container: {...styles.boxContainer},
                  contentContainer: {
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 5,
                  },
                }}>
                <Text style={{fontSize: 18, color: color.primary}}> Ação</Text>

                <Text>{action !== '' ? action : 'Não foi inserido'}</Text>
              </Box>
              <Box
                style={{
                  container: {...styles.boxContainer},
                  contentContainer: {
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 5,
                  },
                }}>
                <Text style={{fontSize: 18, color: color.primary}}>
                  Pensamento
                </Text>

                <Text>{thought !== '' ? thought : 'Não foi inserido'}</Text>
              </Box>
              <Box
                style={{
                  container: {...styles.boxContainer},
                  contentContainer: {
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 5,
                  },
                }}>
                <Text style={{fontSize: 18, color: color.primary}}> Razão</Text>

                <Text>{reason !== '' ? reason : 'Não foi inserido'}</Text>
              </Box>
            </ScrollView>
          </View>
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
    padding: 15,
  },
  box2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxLabelTop: {
    color: '#59818b',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  boxLabelBot: {
    color: '#59818b',
    fontSize: 14,
    textAlign: 'center',
    padding: 5,
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
  },
  boxContainer: {
    height: null,
  },
});
