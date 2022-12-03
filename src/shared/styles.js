import { StyleSheet } from "react-native";

const sharedStyles = StyleSheet.create({
  screenPadding: {
    paddingHorizontal: 20,
  },
  flx: {
    flex: 1,
  },
  flxRow: {
    flexDirection: "row",
  },
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
    flex: 1,
  },
  iconoirS: {
    width: 15,
    height: 15,
  },
  iconoirM: {
    width: 25,
    height: 25,
  },
  profilePhoto: {
    size: 80,
  },
});

export { sharedStyles };
