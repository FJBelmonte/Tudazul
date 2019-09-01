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
    justifyContent: "center",
    paddingHorizontal: layout.window.height * 0.025
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
  }
};
