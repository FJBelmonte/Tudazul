import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from "./types";

import firebase from "../services/firebase";

//armazenar User em caso de LOGIN_SUCESS

export const signIn = ({ email, password }) => async dispatch => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch({ type: LOGIN_SUCCESS });
    })
    .catch(err => {
      const error = err.code;
      let { errorMessage } = "";
      switch (error) {
        case "auth/invalid-email":
          errorMessage = "Formatação do email inválida";
          break;
        case "auth/user-disabled":
          errorMessage = "Este usuário foi desativado";
          break;
        case "auth/user-not-found":
          errorMessage = "Email não encontrado";
          break;
        case "auth/wrong-password":
          errorMessage = "Senha inválida";
          break;
      }
      dispatch({
        type: LOGIN_FAIL,
        payload: { err: { ...err, errorMessage } }
      });
    });
};

export const signUp = ({
  name,
  email,
  password,
  cellphone,
  crp
}) => async dispatch => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      let user = firebase.auth().currentUser;
      console.log(user);
      let db = firebase.database();
      db.ref(`psicologo/${user.uid}`)
        .set({
          name,
          email,
          cellphone,
          crp,
          pacientes: {}
        })
        .then(() => {
          dispatch({
            type: CREATE_USER_SUCCESS,
            payload: {
              user: { uid: user.uid, name, email, cellphone, crp }
            }
          });
        })
        .catch(err => {
          dispatch({
            type: CREATE_USER_FAIL,
            payload: { err }
          });
        });
      //USUARIO ESTÁ AUTENTICADO NESSE PONTO
      //user.sendEmailVerification().then(()=>{ Email Sent}).catch(err=> Erro )
      //tratar todos dados recebidos aqui, enviar email de confirmação e dar logout no usuário
    })
    .catch(err => {
      const error = err.code;
      let { errorMessage } = "";
      switch (error) {
        case "auth/invalid-email":
          errorMessage = "Formatação do email inválida";
          break;
        case "auth/email-already-in-use":
          errorMessage = "E-mail já está em uso";
          break;
        case "auth/weak-password":
          errorMessage = "Senha fraca";
          break;
      }
      dispatch({
        type: CREATE_USER_FAIL,
        payload: { err: { ...err, errorMessage } }
      });
    });
};

export const forgotPasswordEmail = ({ email }) => async dispatch => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("SUCESS");
      dispatch({ type: RESET_PASSWORD_SUCCESS });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: RESET_PASSWORD_FAIL, payload: { err } });
    });
};

//Criar forgotPasswordCellphone
