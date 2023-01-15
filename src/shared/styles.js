import { StyleSheet } from "react-native";

const sharedStyles = StyleSheet.create({
  ph20: {
    paddingHorizontal: 20,
  },
  mh20: {
    marginHorizontal: 20,
  },
  mv15: {
    marginVertical: 15,
  },
  mv5: {
    marginVertical: 5,
  },
  ml10: {
    marginLeft: 10,
  },
  mb15: {
    marginBottom: 15,
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
  iconoirL: {
    width: 30,
    height: 30,
  },
  profilePhoto: {
    size: 80,
  },
  textAlignR: {
    textAlign: "right",
  },
});

export { sharedStyles };
