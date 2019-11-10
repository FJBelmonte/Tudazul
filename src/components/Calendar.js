import {Calendar as CalendarWix, LocaleConfig} from 'react-native-calendars';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color, layout} from '../constants';

LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro',
    'Fervereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fer.',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul.',
    'Ago',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'br';

export default function Calendar(props) {
  return (
    <View style={styles.container}>
      <CalendarWix
        style={{width: '100%'}}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: 'rgb(245,245,255)',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: 'blue',
          dayTextColor: color.primary,
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: color.primary,
          monthTextColor: color.primary,
          indicatorColor: color.primary,
          //textDayFontFamily: 'Comfortaa-Regular',
          //textMonthFontFamily: 'Comfortaa-Regular',
          //textDayHeaderFontFamily: 'Comfortaa-Regular',
          textDayFontWeight: 'bold',
          //textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        markedDates={props.markedDates}
        onDayPress={props.onDayPress}
      />
    </View>
  );
}
Calendar.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    marginTop: 10, //IPHONE 8
    borderRadius: 10,
    backgroundColor: 'rgb(245,245,255)',
    width: layout.window.width * 0.85,
    //height: 100 * 3.5, //IPHONE 8 3.75 => 3.5
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
