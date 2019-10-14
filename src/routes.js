import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import Main from './screens/Main';
import PacienteLogin from './screens/02-Paciente/Login';
import PsicologoCalendar from './screens/01-Psicologo/Calendar';
import PsicologoExercises from './screens/01-Psicologo/Exercises';
import PsicologoForgotPassword from './screens/01-Psicologo/ForgotPassword';
import PsicologoHome from './screens/01-Psicologo/Home';
import PsicologoLogin from './screens/01-Psicologo/Login';
import PsicologoNewConsultation from './screens/01-Psicologo/NewConsultation';
import PsicologoNewPatient from './screens/01-Psicologo/NewPatient';
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
  PsicologoExercises,
});

export default createAppContainer(
  createSwitchNavigator({
    authStack,
    psicologoStack,
  }),
);
