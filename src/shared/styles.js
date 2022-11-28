import { StyleSheet } from "react-native";

const sharedStyles = StyleSheet.create({
  flxSBtwn: {
    justifyContent: "space-between",
  },
  flxJCCenter: {
    justifyContent: "center",
  },
  flxACenter: {
    alignItems: "center",
  },
  flxCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  flxRow: {
    flexDirection: "row",
  },
  fullHeight: {
    height: "100%",
  },
  fullWidth: {
    width: "100%",
  },
  fullSize: {
    height: "100%",
    width: "100%",
  },
  fullSizeCenter: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  iconoirS: {
    width: 15,
    height: 15,
  },
  iconoirM: {
    width: 25,
    height: 25,
  },
});

export { sharedStyles };
