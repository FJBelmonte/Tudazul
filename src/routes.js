import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import Main from './screens';
import PatientLogin from './screens/02-Patient/Login';
import PsychologistCalendar from './screens/01-Psychologist/Calendar';
import PsychologistForgotPassword from './screens/01-Psychologist/ForgotPassword';
import PsychologistHome from './screens/01-Psychologist/Home';
import PsychologistLogin from './screens/01-Psychologist/Login';
import PsychologistNewConsultation from './screens/01-Psychologist/NewConsultation';
import PsychologistNewExercise from './screens/01-Psychologist/NewExercise';
import PsychologistNewPatient from './screens/01-Psychologist/NewPatient';
import PsychologistNewQuestion from './screens/01-Psychologist/NewQuestion';
import PsychologistPatient from './screens/01-Psychologist/Patient';
import PsychologistPatients from './screens/01-Psychologist/Patients';
import PsychologistSignup from './screens/01-Psychologist/Signup';
import Test from './screens/Test';

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

export default createAppContainer(
  createSwitchNavigator({
    authStack,
    psychologistStack,
  }),
);
