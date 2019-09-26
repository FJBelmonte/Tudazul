import { StyleSheet } from "react-native";
import layout from "./layout";

export default global = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: layout.window.width * 0.075
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
    //paddingHorizontal: layout.window.height * 0.025
  },
  footer: {
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: 0,
    paddingHorizontal: layout.window.height * 0.025,
    marginBottom: layout.window.height * 0.05
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  floatButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 80,
    height: 80,
    backgroundColor: "#59818b",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  floatButtonLabel: {
    fontSize: 40,
    color: "#fff"
  },
  buttonsContainer: {
    marginTop: layout.window.height * 0.025 // marginTop: 20
  }
};
