import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {layout} from '../constants';

const weekLabel = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export default function MiniCalendar(props) {
  const [date] = useState(new Date());

  function setLabel(index) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay() + index,
    );
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {weekLabel.map((day, index) => {
            return (
              <View key={index}>
                <View style={styles.labelContainer}>
                  <Text style={[styles.labelStyle, {fontSize: 14}]}>{day}</Text>
                </View>
                <View style={styles.labelContainer}>
                  <View
                    style={
                      setLabel(index).getDate() === date.getDate() && {
                        backgroundColor: '#59818b',
                        position: 'absolute',
                        width: 35,
                        height: 35,
                        borderRadius: 100,
                      }
                    }
                  />
                  <Text
                    style={[
                      styles.labelStyle,
                      {fontWeight: 'bold'},
                      setLabel(index).getDate() === date.getDate() && {
                        color: '#ffffff',
                      },
                    ]}>
                    {setLabel(index).getDate()}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
}
MiniCalendar.defaultProps = {
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'rgba(245,245,255,0.95)',
    width: layout.window.width * 0.85,
    //height: 92,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  labelContainer: {
    width: layout.window.height * 0.055,
    height: layout.window.height * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    color: '#59818b',
    fontSize: 14,
    textAlign: 'center',
  },
});
