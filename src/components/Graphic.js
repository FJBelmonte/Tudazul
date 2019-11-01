import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';

import React from 'react';
import {layout} from '../constants';

const data = [0, 1, 2, 3, 4, 0, 1];

const contentInset = {top: 20, bottom: 20};

export default function Graphic(props) {
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      style={styles.container}
      onPress={props.onPress}>
      <View style={styles.contentContainer}>
        <View
          style={{
            flex: 1,
            width: layout.window.width * 0.85,
            flexDirection: 'row',
          }}>
          <YAxis
            data={data}
            contentInset={contentInset}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={5}
            formatLabel={value => `${getFeeling(value)}`}
          />
          <LineChart
            style={{flex: 1, marginLeft: 16}}
            data={data}
            svg={{stroke: 'rgb(134, 65, 244)'}}
            contentInset={contentInset}>
            <Grid />
          </LineChart>
        </View>
      </View>
    </TouchableOpacity>
  );
}
Graphic.defaultProps = {
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'rgba(245,245,255,0.95)',
    width: layout.window.width * 0.85, //width: 350,
    marginVertical: 5,
    height: layout.window.width * 0.85,
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
    flex: 1,
  },
});

function getFeeling(e) {
  const f = ['Muito triste', 'Triste', 'Neutro', 'Feliz', 'Muito feliz'];
  return f[e];
}
