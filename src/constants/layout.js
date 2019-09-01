import { Dimensions, Platform } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default layout = {
  window: {
    width,
    height
  },
  tabBarHeight: 54,
  navBarHeight: Platform.OS === "ios" ? 64 : 54,
  statusBarHeight: Platform.OS === "ios" ? 20 : 0,
  baseRadius: 3,
  isSmallDevice: width < 375 ? true : false
};
