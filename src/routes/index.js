import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import Main from '../screens';
import PatientHome from '../screens/patient/Home';
// PATIENT
import PatientLogin from '../screens/patient/Login';
import PatientSetDiary from '../screens/patient/HalfCalendar';
// PSYCHOLOGIST
import PsychologistCalendar from '../screens/psychologist/Calendar';
import PsychologistForgotPassword from '../screens/psychologist/ForgotPassword';
import PsychologistHome from '../screens/psychologist/Home';
import PsychologistLogin from '../screens/psychologist/Login';
import PsychologistNewConsultation from '../screens/psychologist/NewConsultation';
import PsychologistNewExercise from '../screens/psychologist/NewExercise';
import PsychologistNewPatient from '../screens/psychologist/NewPatient';
import PsychologistNewQuestion from '../screens/psychologist/NewQuestion';
import PsychologistPatient from '../screens/psychologist/Patient';
import PsychologistPatients from '../screens/psychologist/Patients';
import PsychologistSignup from '../screens/psychologist/Signup';
import Test from '../screens/Test';

const authStack = createStackNavigator({
  Test,
  Main,
  PsychologistLogin,
  PsychologistSignup,
  PsychologistForgotPassword,
  PatientLogin,
});

const psychologistStack = createStackNavigator({
  PsychologistHome,
  PsychologistCalendar,
  PsychologistNewConsultation,
  PsychologistPatients,
  PsychologistNewPatient,
  PsychologistPatient,
  PsychologistNewExercise,
  PsychologistNewQuestion,
});

const patientStack = createStackNavigator({
  PatientHome,
});

const patientDiaryStack = createStackNavigator({
  PatientSetDiary,
});

export default createAppContainer(
  createSwitchNavigator({
    authStack,
    psychologistStack,
    patientStack,
    patientDiaryStack,
  }),
);
