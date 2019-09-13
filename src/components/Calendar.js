import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { layout } from "../constants";

const weekLabel = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function Calendar(props) {
  const date = props.Date;

  function setLabelDate(index) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay() + index
    );
  }

  function setColumns(index) {}

  function setColumn(index) {
    const _date = setLabelDate(index);
    return (
      <TouchableOpacity onPress={() => props.onPress(_date)}>
        <View style={styles.labelContainer}>
          <View
            style={[
              setLabelDate(index).getDate() === date.getDate() &&
                date.getMonth() === setLabelDate(index).getMonth() && {
                  backgroundColor: "gray",
                  position: "absolute",
                  width: 40,
                  height: 40,
                  borderRadius: 100
                },
              setLabelDate(index).getDate() === new Date().getDate() &&
                setLabelDate(index).getMonth() === new Date().getMonth() && {
                  backgroundColor: "#59818b",
                  position: "absolute",
                  width: 40,
                  height: 40,
                  borderRadius: 100
                }
            ]}
          />
          <Text
            style={[
              styles.labelStyle,
              { fontWeight: "bold" },
              setLabelDate(index).getDate() === date.getDate() &&
                date.getMonth() === setLabelDate(index).getMonth() && {
                  color: "#ffffff"
                },
              date.getMonth() !== setLabelDate(index).getMonth() && {
                color: "gray"
              },
              setLabelDate(index).getDate() === new Date().getDate() &&
                setLabelDate(index).getMonth() === new Date().getMonth() && {
                  color: "#ffffff"
                },
              { ...props.labelStyle }
            ]}
          >
            {setLabelDate(index).getDate()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, { ...props.styleContainer }]}>
      <Text
        style={[styles.labelStyle, { fontWeight: "bold", marginBottom: 10 }]}
      >
        {getStringMonth(date)} | {date.getFullYear()}
      </Text>
      <View style={styles.contentContainer}>
        {weekLabel.map((day, index) => {
          return (
            <View key={index}>
              <View style={[styles.labelContainer, { marginBottom: 10 }]}>
                <Text
                  style={[
                    styles.labelStyle,
                    { fontSize: 14 },
                    { ...props.labelStyle }
                  ]}
                >
                  {day}
                </Text>
              </View>

              {setColumn(index - 14)}
              {setColumn(index - 7)}
              {setColumn(index)}
              {setColumn(index + 7)}
              {setColumn(index + 14)}
            </View>
          );
        })}
      </View>
    </View>
  );
}
Calendar.defaultProps = {
  Date: new Date(),
  onPress: () => {}
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "rgba(245,245,255,0.95)",
    width: layout.window.width * 0.85,
    height: 92 * 4,
    alignItems: "center",
    padding: 20,
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
    width: layout.window.height * 0.055,
    height: layout.window.height * 0.055,
    justifyContent: "center",
    alignItems: "center"
  },
  labelStyle: {
    color: "#59818b",
    fontSize: 16,
    textAlign: "center"
  }
});

function getStringMonth(date) {
  switch (date.getMonth()) {
    case 0:
      return "Janeiro";
    case 1:
      return "Fervereiro";
    case 2:
      return "Março";
    case 3:
      return "Abril";
    case 4:
      return "Maio";
    case 5:
      return "Junho";
    case 6:
      return "Julho";
    case 7:
      return "Agosto";
    case 8:
      return "Setembro";
    case 9:
      return "Outubro";
    case 10:
      return "Novembro";
    case 11:
      return "Dezembro";
  }
}

function getMaxDaysMonth(month, year) {
  switch (month) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 11:
      return 31;
    case 3:
    case 5:
    case 8:
    case 10:
      return 30;
    case 1:
      return leapYear(year) ? 29 : 28;
  }
}

function leapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}
