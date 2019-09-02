import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const weekLabel = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function MiniCalendar(props) {
  const [date, setDate] = useState(new Date());

  function setLabel(index) {
    if (index === 0) {
      if (date.getDay() !== 0) {
        return new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - date.getDay()
        );
      }
    }
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay() + index
    );
  }

  return (
    <View
      style={{
        alignItems: "center"
      }}
    >
      <View style={[styles.container, { ...props.styleContainer }]}>
        <View style={styles.contentContainer}>
          {weekLabel.map((day, index) => {
            return (
              <View style={styles.labelContainer} key={index}>
                <Text style={[styles.labelStyle, { ...props.labelStyle }]}>
                  {day}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.contentContainer}>
          {weekLabel.map((day, index) => {
            return (
              <View style={styles.labelContainer} key={index}>
                <Text
                  style={[
                    styles.labelStyle,
                    { fontWeight: "bold" },
                    setLabel(index).getDate() === date.getDate() && {
                      color: "red"
                    },
                    { ...props.labelStyle }
                  ]}
                >
                  {setLabel(index).getDate()}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
MiniCalendar.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "rgba(245,245,255,0.95)",
    width: 350,
    marginVertical: 5,
    height: 92,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  contentContainer: {
    flexDirection: "row"
  },
  labelContainer: {
    width: 48,
    height: 46,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  labelStyle: {
    color: "#59818b",
    fontSize: 16,
    textAlign: "center"
  }
});
