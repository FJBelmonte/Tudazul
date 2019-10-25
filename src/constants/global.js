import {StyleSheet} from 'react-native';
import layout from './layout';

export default global = {
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: layout.window.height * 0.025,
    marginBottom: layout.window.height * 0.015,
  },
  buttonsContainer: {
    alignItems: 'center',
    padding: 5,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 70,
    height: 70,
    backgroundColor: '#59818b',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatButtonLabel: {
    fontSize: 40,
    color: '#fff',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};
