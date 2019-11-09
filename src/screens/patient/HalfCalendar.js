import * as actions from '../../actions';

import {Box, Button, MiniCalendar} from '../../components';
import {Feeling, Humor, InputModal} from '../../components/setDiary';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, global, layout, linearGradient} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

import IconRedo from '../../assets/svg/redo-24px.svg';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import humor1 from '../../assets/images/humor/1-01.png';
import humor2 from '../../assets/images/humor/2-01.png';
import humor3 from '../../assets/images/humor/3-01.png';
import humor4 from '../../assets/images/humor/4-01.png';
import humor5 from '../../assets/images/humor/5-01.png';

const humorImageArray = [humor1, humor2, humor3, humor4, humor5];
const humorTextArray = ['Muito mal', 'Mal', 'Neutro', ' Bem', ' Muito bem'];

export default function HalfCalendar({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [reason, setReason] = useState('');
  const [thought, setThought] = useState('');
  const [action, setAction] = useState('');
  const [humor, setHumor] = useState('');
  const [feeling, setFeeling] = useState('');
  const [modal, setModal] = useState('humor');
  const [todayAccess, setTodayAccess] = useState('');

  useEffect(() => {
    const pTodayAcess = navigation.getParam('todayAccess');
    setTodayAccess(pTodayAcess);
  }, []);

  function HandleSubmit() {
    dispatch(actions.setLastAccess(state.authPatient.ref, todayAccess)).then(
      () => {
        dispatch(
          actions.setDiary(state.authPatient.ref, todayAccess, {
            reason,
            thought,
            action,
            humor,
            feeling,
          }),
        ).then(() => {
          dispatch(actions.fetchPatient(state.authPatient.ref)).then(() => {
            setTimeout(() => {
              navigation.navigate('PatientHome');
            }, 2000);
          });
        });
      },
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View
        style={[
          styles.contentContainer,
          {flex: 1, justifyContent: 'space-around'},
        ]}>
        <MiniCalendar />
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
          <View style={styles.icon}>
            <TouchableOpacity onPress={() => setModal('humor')}>
              {
                <IconRedo width={25} height={25} fill={color.primary} />
                //<Icon size={25} color={color.primary} name={'loop'} />
              }
            </TouchableOpacity>
          </View>
        </Box>

        <Text style={styles.label}>
          Ajude a organizar suas emoções descrevendo o que aconteceu
        </Text>
        <Box
          label="Razão"
          style={{
            container: {
              backgroundColor:
                reason !== ''
                  ? 'rgba(200,255,200,0.95)'
                  : 'rgba(255,200,200,0.95)',
            },
            contentContainer: {},
          }}
          onPress={() => setModal('reason')}>
          <View style={styles.innerLabel}>
            <Text style={styles.innerLabelText}>Razão</Text>
          </View>
          <View style={styles.innerLabel2}>
            <Text style={styles.innerLabelText}>O que houve ?</Text>
          </View>
        </Box>
        <Box
          label="Pensamento"
          style={{
            container: {
              backgroundColor:
                thought !== ''
                  ? 'rgba(200,255,200,0.95)'
                  : 'rgba(255,200,200,0.95)',
            },
            contentContainer: {},
          }}
          onPress={() => setModal('thought')}>
          <View style={styles.innerLabel}>
            <Text style={styles.innerLabelText}>Pensamento</Text>
          </View>
          <View style={styles.innerLabel2}>
            <Text style={styles.innerLabelText}>O que você pensou ?</Text>
          </View>
        </Box>
        <Box
          label="Ações"
          style={{
            container: {
              backgroundColor:
                action !== ''
                  ? 'rgba(200,255,200,0.95)'
                  : 'rgba(255,200,200,0.95)',
            },
            contentContainer: {},
          }}
          onPress={() => setModal('action')}>
          <View style={styles.innerLabel}>
            <Text style={styles.innerLabelText}>Ações</Text>
          </View>
          <View style={styles.innerLabel2}>
            <Text style={styles.innerLabelText}>
              O que você fez sobre isso ?
            </Text>
          </View>
        </Box>
        <View style={styles.footer}>
          <View style={styles.buttonsContainer}>
            <Button text="Enviar" onPress={() => HandleSubmit()} />
          </View>
        </View>
      </View>

      {modal === 'humor' && (
        <Humor
          onButtonPress={e => {
            setHumor(e);
            setModal('feeling');
          }}
        />
      )}
      {modal === 'feeling' && (
        <Feeling
          onButtonPress={e => {
            setFeeling(e);
            setModal('');
          }}
        />
      )}
      {modal === 'reason' && (
        <InputModal
          value={reason}
          type="Razão"
          desc="O que houve para desencadear esses sentimentos?"
          onButtonPress={e => {
            setReason(e);
            setModal('');
          }}
        />
      )}
      {modal === 'thought' && (
        <InputModal
          value={thought}
          type="Pensamento"
          desc="Que pensamentos você teve durante o dia"
          onButtonPress={e => {
            setThought(e);
            setModal('');
          }}
        />
      )}
      {modal === 'action' && (
        <InputModal
          value={action}
          type="Ação"
          desc="Que ações você tomou sobre o que aconteceu"
          onButtonPress={e => {
            setAction(e);
            setModal('');
          }}
        />
      )}
    </View>
  );
}
HalfCalendar.navigationOptions = {
  title: `${new Date().getDate()} ${getStringMonth(new Date())}`,
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
