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
import {Box, Button, Graphic} from '../../components';
import React, {useEffect, useState} from 'react';
import {global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import EditSVG from '../../assets/svg/edit-24px.svg';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import humor1 from '../../assets/images/humor/1-01.png';
import humor2 from '../../assets/images/humor/2-01.png';
import humor3 from '../../assets/images/humor/3-01.png';
import humor4 from '../../assets/images/humor/4-01.png';
import humor5 from '../../assets/images/humor/5-01.png';

const humorImageArray = [humor1, humor2, humor3, humor4, humor5];
const humorTextArray = ['Muito mal', 'Mal', 'Neutro', ' Bem', ' Muito bem'];

export default function ManagerPatient({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    gender: '',
    anotation: '',
    uid: '',
    psychologist: '',
  });
  useEffect(() => {
    const patient = navigation.getParam('patient');
    setPatient(patient);
  }, []);
  const {name, age, gender, anotation, uid} = patient;
  const [listDiary, setListDiary] = useState(null);
  const [listTudazul, setListTudazul] = useState([]);

  useEffect(() => {
    setListDiary(patient.diary);
    setListTudazul(patient.tudazul);
  }, [patient]);

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
    return (
      <Box>
        <Text>Usuário ainda não entrou no aplicativo</Text>
      </Box>
    );
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
              {`${minDate.getDate()} de ` +
                `${getStringMonth(minDate)} - ` +
                `${maxDate.getDate()} de ` +
                `${getStringMonth(maxDate)}`}
            </Text>
          </View>
        </Box>
      );
    }
    return null;
  }

  function returnTudazul() {
    if (listTudazul) {
      return (
        <React.Fragment>
          {listTudazul.exercises &&
            _.toArray(listTudazul.exercises).map((tudazul, index) => {
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
                    <EditSVG width={30} height={30} fill={color.primary} />
                  </TouchableOpacity>
                </Box>
              );
            })}
          {listTudazul.phrase &&
            _.toArray(listTudazul.phrase).map((tudazul, index) => {
              return (
                <Box
                  key={index}
                  style={{
                    container: {height: null},
                    contentContainer: {alignItems: 'center'},
                  }}>
                  <View style={styles.boxTitleContainer}>
                    <Text style={styles.boxTitleLabel}>Frase</Text>
                  </View>
                  <View style={styles.boxContentContainer}>
                    <Text style={styles.boxContentLabel}>{tudazul.note}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleEditPress(tudazul, 'phrase')}
                    style={{justifyContent: 'center'}}>
                    <EditSVG width={30} height={30} fill={color.primary} />
                  </TouchableOpacity>
                </Box>
              );
            })}
          {listTudazul.question &&
            _.toArray(listTudazul.question).map((tudazul, index) => {
              return (
                <Box
                  key={index}
                  style={{
                    container: {height: null},
                    contentContainer: {alignItems: 'center'},
                  }}>
                  <View style={styles.boxTitleContainer}>
                    <Text style={styles.boxTitleLabel}>Pergunta</Text>
                  </View>
                  <View style={styles.boxContentContainer}>
                    <Text style={styles.boxContentLabel}>{tudazul.note}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleEditPress(tudazul, 'question')}
                    style={{justifyContent: 'center'}}>
                    <EditSVG width={30} height={30} fill={color.primary} />
                  </TouchableOpacity>
                </Box>
              );
            })}
          {listTudazul.reminder &&
            _.toArray(listTudazul.reminder).map((tudazul, index) => {
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
                    <EditSVG width={30} height={30} fill={color.primary} />
                  </TouchableOpacity>
                </Box>
              );
            })}
        </React.Fragment>
      );
    }
    return (
      <Box>
        <Text>Nenhuma ação registrada para o paciente</Text>
      </Box>
    );
  }

  function handleEditPress(data, type) {
    console.log(data);
    console.log(type);
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <ScrollView
          style={{width: layout.window.width}}
          contentContainerStyle={{alignItems: 'center'}}>
          <Box>
            <View style={styles.labelContainer}>
              <Text style={styles.labelStyle}>Paciente</Text>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>{name}</Text>
            </View>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => {
                handleEditPress(patient, 'patient');
              }}>
              <EditSVG width={30} height={30} fill={color.primary} />
            </TouchableOpacity>
          </Box>
          {returnChart()}
          {returnAverageMood()}
          {returnTudazul()}
        </ScrollView>
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
ManagerPatient.navigationOptions = {
  title: 'Gerenciar paciente',
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
