import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const TileComponent = ({ visibleTiles, setVisibleTiles, item }) => {
  const onShowClick = () => {
    setVisibleTiles((prevState) => [...prevState, item.id]);
  };

  const getTiles = (text, show) => (
    <View
      style={[
        styles.tileBox,
        { backgroundColor: show ? "#018765" : "#04b386" },
      ]}
    >
      <Text style={styles.tileText}>{text}</Text>
    </View>
  );

  if (visibleTiles.includes(item.id)) return getTiles(item.value, true);
  return (
    <TouchableOpacity onPress={onShowClick}>
      {getTiles("TAP", false)}
    </TouchableOpacity>
  );
};

export default TileComponent;

const styles = StyleSheet.create({
  tileBox: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 4,
  },
});
