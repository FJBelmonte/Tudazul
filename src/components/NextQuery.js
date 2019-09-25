import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { layout, color } from "../constants";

export default function NextQuery(props) {
  return (
    <View
      style={{
        alignItems: "center"
      }}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.primaryLabelContainer}>
            {props.date ? (
              <React.Fragment>
                <Text style={[styles.primaryLabelStyle, { fontSize: 36 }]}>
                  {props.date.getDate()}
                </Text>

                <Text style={[styles.primaryLabelStyle, { fontSize: 32 }]}>
                  {getLabelDayOfWeek(props.date)}
                </Text>
                <Text style={[styles.primaryLabelStyle, { fontSize: 26 }]}>
                  {getLabelMonth(props.date)}/{props.date.getFullYear()}
                </Text>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Text style={[styles.primaryLabelStyle, { fontSize: 26 }]}>
                  Sem nova consulta
                </Text>
              </React.Fragment>
            )}
          </View>
          <View style={styles.secondaryLabelContainer}>
            {props.next ? (
              <React.Fragment>
                <Text style={[styles.secondaryLabelStyle, { fontSize: 26 }]}>
                  {props.next.hour}
                </Text>
                <Text style={[styles.secondaryLabelStyle, { fontSize: 26 }]}>
                  {props.next.type}
                </Text>
                <Text style={[styles.secondaryLabelStyle, { fontSize: 26 }]}>
                  {props.next.name}
                </Text>
              </React.Fragment>
            ) : props.children ? (
              props.children
            ) : (
              <React.Fragment>
                <Text style={[styles.secondaryLabelStyle, { fontSize: 18 }]}>
                  Não há compromissos marcados
                </Text>
              </React.Fragment>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
NextQuery.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "rgba(245,245,255,0.95)",
    width: layout.window.width * 0.85, //width: 350,
    marginVertical: 5,
    height: 150,
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  primaryLabelContainer: {
    flex: 1,
    width: layout.window.width * 0.29, //width: 120,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.primary,
    borderRadius: 10
  },
  secondaryLabelContainer: {
    flex: 1,
    width: layout.window.width * 0.29, //width: 120,
    height: "100%",
    marginHorizontal: 2,
    justifyContent: "space-around",
    alignItems: "center"
  },
  primaryLabelStyle: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  },
  secondaryLabelStyle: {
    color: "#59818b",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  },
  input: {
    flex: 1,
    paddingHorizontal: 5
  }
});

function getLabelDayOfWeek(date) {
  switch (date.getDay()) {
    case 0:
      return "Dom";
    case 1:
      return "Seg";
    case 2:
      return "Ter";
    case 3:
      return "Qua";
    case 4:
      return "Qui";
    case 5:
      return "Sex";
    case 6:
      return "Sab";
  }
}
function getLabelMonth(date) {
  switch (date.getMonth()) {
    case 0:
      return "Jan";
    case 1:
      return "Fer";
    case 2:
      return "Mar";
    case 3:
      return "Abr";
    case 4:
      return "Mai";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Ago";
    case 8:
      return "Set";
    case 9:
      return "Out";
    case 10:
      return "Nov";
    case 11:
      return "Dez";
  }
}
