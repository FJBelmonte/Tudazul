import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { layout } from "../constants";

export default function Box(props) {
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      style={[styles.container, { ...props.style.container }]}
      onPress={props.onPress}
    >
      <View
        style={[styles.contentContainer, { ...props.style.contentContainer }]}
      >
        {props.children ? props.children : null}
      </View>
    </TouchableOpacity>
  );
}
Box.defaultProps = {
  onPress: () => {},
  style: { container: {}, contentContainer: {} }
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "rgba(245,245,255,0.95)",
    width: layout.window.width * 0.85, //width: 350,
    marginVertical: 5,
    height: 46,
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
  }
});
