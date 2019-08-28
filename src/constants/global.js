import { StyleSheet } from "react-native";
import layout from "./layout";

export default (global = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30
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
    paddingHorizontal: 20
  },
  footer: {
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: 0,
    paddingHorizontal: 20,
    marginBottom: layout.window.height * 0.05
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
