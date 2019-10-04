import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { global, layout, linearGradient } from "../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Box } from "../components";
import LinearGradient from "react-native-linear-gradient";

export default function Datetime(props) {
  return (
    <View style={styles.modal}>
      <View style={styles.contentContainer}>
        <Box
          style={{
            container: { height: null },
            contentContainer: { flexDirection: null }
          }}>
          <View style={styles.card}>
            <Text style={[styles.cardText, { fontSize: 16 }]}>
              {props.text && props.text}
            </Text>
          </View>
          <View style={styles.center}>
            <DateTimePicker
              style={{ width: 300 }}
              mode={props.mode ? props.mode : null}
              date={props.datetime}
              value={props.datetime}
              onChangeDate={props.onChangeDate}
            />
          </View>
        </Box>
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <Button text='SELECIONAR' onPress={props.onButtonPress} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025 // marginTop: 20
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center"
  },

  card: {
    width: layout.window.width * 0.85,
    height: layout.window.width * 0.35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.primary,
    borderRadius: 10
  },
  cardText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  }
});
