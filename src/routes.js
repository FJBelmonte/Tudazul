import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import Test from "./screens/Test";

import Main from "./screens/Main";

import PsicologoLogin from "./screens/01-Psicologo/Login";
import PacienteLogin from "./screens/02-Paciente/Login";

import PsicologoSignup from "./screens/01-Psicologo/Signup";
import PsicologoForgotPassword from "./screens/01-Psicologo/ForgotPassword";

import PsicologoHome from "./screens/01-Psicologo/Home";
import PsicologoCalendar from "./screens/01-Psicologo/Calendar";
import PsicologoNewConsultation from "./screens/01-Psicologo/NewConsultation";
import PsicologoPatients from "./screens/01-Psicologo/Patients";
import PsicologoNewPatient from "./screens/01-Psicologo/NewPatient";

const authStack = createStackNavigator({
  Test,
  Main,
  PsicologoLogin,
  PsicologoSignup,
  PsicologoForgotPassword,
  PacienteLogin
});

const psicologoStack = createStackNavigator({
  PsicologoHome,
  PsicologoCalendar,
  PsicologoNewConsultation,
  PsicologoPatients,
  PsicologoNewPatient
});

export default createAppContainer(
  createSwitchNavigator({
    authStack,
    psicologoStack
  })
);
