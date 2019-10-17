import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import Main from './screens/Main';
import PacienteLogin from './screens/02-Paciente/Login';
import PsicologoCalendar from './screens/01-Psicologo/Calendar';
import PsicologoForgotPassword from './screens/01-Psicologo/ForgotPassword';
import PsicologoHome from './screens/01-Psicologo/Home';
import PsicologoLogin from './screens/01-Psicologo/Login';
import PsicologoNewConsultation from './screens/01-Psicologo/NewConsultation';
import PsicologoNewExercise from './screens/01-Psicologo/NewExercise';
import PsicologoNewPatient from './screens/01-Psicologo/NewPatient';
import PsicologoNewQuestion from './screens/01-Psicologo/NewQuestion';
import PsicologoPatient from './screens/01-Psicologo/Patient';
import PsicologoPatients from './screens/01-Psicologo/Patients';
import PsicologoSignup from './screens/01-Psicologo/Signup';
import Test from './screens/Test';

const authStack = createStackNavigator({
  Test,
  Main,
  PsicologoLogin,
  PsicologoSignup,
  PsicologoForgotPassword,
  PacienteLogin,
});

const psicologoStack = createStackNavigator({
  PsicologoHome,
  PsicologoCalendar,
  PsicologoNewConsultation,
  PsicologoPatients,
  PsicologoNewPatient,
  PsicologoPatient,
  PsicologoNewExercise,
  PsicologoNewQuestion,
});

export default createAppContainer(
  createSwitchNavigator({
    authStack,
    psicologoStack,
  }),
);
