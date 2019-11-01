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
import {Box, Button, Graphic, NextQuery} from '../../components';
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
import {interfaceDeclaration} from '@babel/types';

const humorImageArray = [humor1, humor2, humor3, humor4, humor5];
const humorTextArray = ['Muito mal', 'Mal', 'Neutro', ' Bem', ' Muito bem'];

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

  function setChartData(data) {
    let chartData = [];
    data.map(diary => {
      chartData.push(diary.humor);
    });
    return chartData;
  }

  function setAverageMood(data) {
    let avg = 0;
    let count = 0;
    data.map(diary => {
      avg += diary.humor;
      count++;
    });
    return Math.round(avg / count);
  }

  function getPeriod(data) {
    let minDate = 0;
    let maxDate = 0;
    data.map(diary => {
      if (minDate === 0) {
        minDate = diary.createdAt;
      } else {
        console.log(minDate);
        minDate > diary.createdAt && (minDate = diary.createdAt);
        maxDate < diary.createdAt && (maxDate = diary.createdAt);
      }
    });
    return {minDate: new Date(minDate), maxDate: new Date(maxDate)};
  }

  function returnChart() {
    if (listDiary) {
      return (
        <Graphic data={listDiary ? setChartData(_.toArray(listDiary)) : null} />
      );
    }
    return null;
  }

  function returnAverageMood() {
    const avgMood = setAverageMood(_.toArray(listDiary));
    const {minDate, maxDate} = getPeriod(_.toArray(listDiary));
    if (listDiary) {
      return (
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
              source={humorImageArray[avgMood]}
            />
          </View>
          <View style={styles.box2}>
            <Text style={styles.boxLabelTop}>Humor médio</Text>
            <Text style={styles.boxLabelMid}>{humorTextArray[avgMood]}</Text>
            <Text style={styles.boxLabelBot}>
              {minDate.getDate()} de {getStringMonth(minDate)} -{' '}
              {maxDate.getDate()} de {getStringMonth(maxDate)}
            </Text>
          </View>
        </Box>
      );
    }
    return null;
  }

  return (
    <View style={[styles.container]}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        {returnChart()}
        {returnAverageMood()}
      </View>
    </View>
  );
}
Historic.navigationOptions = {
  title: 'Histórico',
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
});

function getStringMonth(date) {
  switch (date.getMonth()) {
    case 0:
      return 'Janeiro';
    case 1:
      return 'Fervereiro';
    case 2:
      return 'Março';
    case 3:
      return 'Abril';
    case 4:
      return 'Maio';
    case 5:
      return 'Junho';
    case 6:
      return 'Julho';
    case 7:
      return 'Agosto';
    case 8:
      return 'Setembro';
    case 9:
      return 'Outubro';
    case 10:
      return 'Novembro';
    case 11:
      return 'Dezembro';
  }
}
