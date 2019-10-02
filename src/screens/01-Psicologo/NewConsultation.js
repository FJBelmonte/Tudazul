import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Picker } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import * as actions from "../../actions";
import { global, layout, color, linearGradient } from "../../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input, Button, Box } from "../../components";
import LinearGradient from "react-native-linear-gradient";
import calendarIcon from "../../assets/icons/ico-calendario.png";

export default function NewConsultation({ navigation }) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [listPatient, setListPatient] = useState();
  const [patient, setPatient] = useState({
    name: "",
    uid: "",
    age: "",
    gender: ""
  });
  const [uid, setUid] = useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [anotation, setAnotation] = useState();
  const [modal, setModal] = useState("");

  useEffect(() => {
    dispatch(actions.fetchPatients());
  }, []);

  useEffect(() => {
    setListPatient(state.psychologistPatient.patients);
  }, [state.psychologistPatient.patients]);

  useEffect(() => {
    _.toArray(listPatient).map((p, index) => {
      if (p.uid === uid) {
        setPatient(p);
      }
    });
  });

  return (
    <View style={styles.container}>
      <LinearGradient colors={linearGradient} style={styles.background} />
      <View style={styles.contentContainer}>
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <Input
            label='Nome'
            value={patient.name}
            placeholder='Nome do paciente'
            icon={calendarIcon}
            onPressIcon={() => {
              setModal("patients");
            }}
          />
          <Input
            label='Data'
            placeholder={`${date.getDate()}/${date.getMonth()}/${date.getUTCFullYear()}`}
            icon={calendarIcon}
            onPressIcon={() => {
              setModal("date");
            }}
          />
          <Input
            label='Hora'
            placeholder={`${date.getHours()}:${date.getMinutes()}`} //bug visual ex 0:8
            icon={calendarIcon}
            onPressIcon={() => {
              setModal("time");
            }}
          />
          <Input label='Tipo' />
          <Input label='Anotações' multiline />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button text='CONFIRMAR'></Button>
      </View>
      {modal === "patients" && (
        <View style={styles.modal}>
          <LinearGradient colors={linearGradient} style={styles.background} />

          <View style={styles.contentContainer}>
            <Box
              style={{
                container: { height: null },
                contentContainer: { flexDirection: null }
              }}>
              <View style={styles.patientCard}>
                <Text style={[styles.patientCardText, { fontSize: 24 }]}>
                  {patient.name ? patient.name : "Paciente"}
                </Text>
                <Text style={styles.patientCardText}>
                  {patient.age ? `${patient.age} anos` : "Idade"} -
                  {patient.gender ? patient.gender : "Gênero"}
                </Text>
              </View>
              <View style={styles.center}>
                <Picker
                  selectedValue={uid}
                  style={{ width: 300 }}
                  onValueChange={(itemValue, itemIndex) => setUid(itemValue)}>
                  {_.toArray(listPatient).map((patient, index) => {
                    return (
                      <Picker.Item
                        label={patient.name}
                        value={patient.uid}
                        key={index}
                      />
                    );
                  })}
                </Picker>
              </View>
            </Box>
          </View>
          <View style={styles.footer}>
            <View style={styles.buttonsContainer}>
              <Button
                text='Selecionar'
                onPress={() => {
                  setModal("");
                }}
              />
            </View>
          </View>
        </View>
      )}
      {modal === "date" && (
        <View style={styles.modal}>
          <LinearGradient colors={linearGradient} style={styles.background} />

          <View style={styles.contentContainer}>
            <Box
              style={{
                container: { height: null },
                contentContainer: { flexDirection: null }
              }}>
              <View style={styles.patientCard}>
                <Text style={[styles.patientCardText, { fontSize: 16 }]}>
                  Selecione a data para consulta
                </Text>
              </View>
              <View style={styles.center}>
                <DateTimePicker
                  style={{ width: 300 }}
                  date={date}
                  value={date}
                  onChangeDate={date => setDate(date)}
                />
              </View>
            </Box>
          </View>

          <View style={styles.footer}>
            <View style={styles.buttonsContainer}>
              <Button
                text='Selecionar'
                onPress={() => {
                  setModal("");
                }}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
NewConsultation.navigationOptions = {
  title: "Nova consulta"
};

const styles = StyleSheet.create({
  ...global,
  buttonsContainer: {
    marginTop: layout.window.height * 0.025 // marginTop: 20
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,1.0)",
    justifyContent: "center",
    alignItems: "center"
  },
  patientCard: {
    width: layout.window.width * 0.85,
    height: layout.window.width * 0.35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.primary,
    borderRadius: 10
  },
  patientCardText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  }
});
