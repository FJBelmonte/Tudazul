import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { global, layout, color, linearGradient } from "../../constants";
import { NextQuery, Calendar as CalendarComponent } from "../../components";
import LinearGradient from "react-native-linear-gradient";

export default function Calendar({ navigation }) {
  const [pickedDate, setPickedDate] = useState();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <CalendarComponent
          Date={pickedDate ? pickedDate : new Date()}
          onPress={_date => setPickedDate(_date)}
        />
      </View>
      <View style={styles.contentContainer}>
        <NextQuery
          next={pickedDate ? { date: pickedDate } : { date: new Date() }}
        />
      </View>
      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => navigation.navigate("PsicologoNewConsultation")}
      >
        <Text style={styles.floatButtonLabel}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
Calendar.navigationOptions = {
  title: "Calendário"
};
const styles = StyleSheet.create({
  ...global,
  floatButtonLabel: { fontSize: 40, color: "#fff" }
});
