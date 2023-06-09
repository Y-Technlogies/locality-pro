import { StyleSheet, I18nManager, Platform } from "react-native";
import colors from "../../theme/colors";
const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  timeContainer: {
    flexBasis: "20%",
  },
  time: {
    fontSize: 12,
    color: "#aaa",
    fontStyle: "italic",
    textAlign: "center",
  },
  iconContainer: {
    flexBasis: "6%",
    alignItems: "center",
    alignSelf: "stretch",
    marginHorizontal: "5%",
  },
  verticalLine: {
    flex: 1,
    width: 2,
    backgroundColor: colors.lightGray,
  },
  eventContainer: {
    flexBasis: "62%",
    alignItems: "flex-start",
    backgroundColor: "#FFF",
    padding: 16,
    paddingHorizontal: 18,
    borderRadius: 15,
    shadowOffset: { width: I18nManager.isRTL ? 8 : -8, height: 0 },
    shadowColor: "#ccc",
    shadowOpacity: 0.2,
    marginBottom: 10,
    borderTopLeftRadius: 0,
  },
  icon: {
    textAlign: "center",
    width: 24,
    height: 24,
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === "ios" ? 2.5 : 5,
    borderRadius: 12,
    color: "#e0e9ff",
    fontSize: 11,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#e0e9ff",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
    textAlign: "left",
    marginBottom: 5,
    lineHeight: 20,
  },
  description: {
    textAlign: "left",
    fontSize: 11,
    lineHeight: 18,
    paddingBottom: 10,
    color: "#999",
  },
});

export default styles;
