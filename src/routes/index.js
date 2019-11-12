import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import Main from '../screens';
import PatientCalendar from '../screens/patient/Calendar';
import PatientDiary from '../screens/patient/Diary';
import PatientExercise from '../screens/patient/Exercise';
import PatientHistoric from '../screens/patient/Historic';
import PatientHome from '../screens/patient/Home';
import PatientListDiary from '../screens/patient/ListDiary';
// PATIENT
import PatientLogin from '../screens/patient/Login';
import PatientSetDiary from '../screens/patient/HalfCalendar';
// PSYCHOLOGIST
import PsychologistCalendar from '../screens/psychologist/Calendar';
import PsychologistExercises from '../screens/psychologist/Exercises';
import PsychologistForgotPassword from '../screens/psychologist/ForgotPassword';
import PsychologistHome from '../screens/psychologist/Home';
import PsychologistLogin from '../screens/psychologist/Login';
import PsychologistManagerPatient from '../screens/psychologist/ManagerPatient';
import PsychologistNewConsultation from '../screens/psychologist/NewConsultation';
import PsychologistNewExercise from '../screens/psychologist/NewExercise';
import PsychologistNewPatient from '../screens/psychologist/NewPatient';
import PsychologistNewQuestion from '../screens/psychologist/NewQuestion';
import PsychologistPatient from '../screens/psychologist/Patient';
import PsychologistPatients from '../screens/psychologist/Patients';
import PsychologistQuestions from '../screens/psychologist/Questions';
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
  PsychologistManagerPatient,
  PsychologistExercises,
  PsychologistQuestions,
});

const patientStack = createStackNavigator({
  PatientHome,
  PatientListDiary,
  PatientHistoric,
  PatientCalendar,
  PatientExercise,
  PatientDiary,
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
