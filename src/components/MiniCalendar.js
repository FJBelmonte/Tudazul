import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MiniCalendar(props) {
  return (
    <View
      style={{
        alignItems: "center"
      }}
    >
      <View style={[styles.container, { ...props.styleContainer }]}>
        <View style={styles.contentContainer}>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelStyle, { ...props.labelStyle }]}>D</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelStyle, { ...props.labelStyle }]}>S</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelStyle, { ...props.labelStyle }]}>T</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelStyle, { ...props.labelStyle }]}>Q</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelStyle, { ...props.labelStyle }]}>Q</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelStyle, { ...props.labelStyle }]}>S</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelStyle, { ...props.labelStyle }]}>S</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelStyle, { ...props.labelStyle }]}>28</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelStyle, { ...props.labelStyle }]}>29</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelStyle, { ...props.labelStyle }]}>30</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelStyle, { ...props.labelStyle }]}>31</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelStyle, { ...props.labelStyle }]}>1</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelStyle, { ...props.labelStyle }]}>2</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelStyle, { ...props.labelStyle }]}>3</Text>
          </View>
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
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  }
});
