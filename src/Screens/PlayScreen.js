import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";

import { tileNumbergenerator } from "../Utilities/tileNumberGenrator";

import TileComponent from "../Components/TileComponent";
import StatusComponent from "../Components/StatusComponent";

const PlayScreen = ({ route, navigation }) => {
  const { selectedNumber } = route.params;

  const [tilesList, setTilesList] = useState([]);
  const [visibleTiles, setVisibleTiles] = useState([]);

  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    tileNumbergenerator(selectedNumber, setTilesList);
  }, []);

  useEffect(() => {
    if (visibleTiles.length <= 3) {
      let isWin = false;
      visibleTiles.forEach((index) => {
        if (tilesList[index].value === selectedNumber) isWin = true;
      });
      if (isWin) {
        setIsWon(true);
      } else if (visibleTiles.length === 3 && !isWin) {
        setIsWon(false);
      }
    }
  }, [visibleTiles]);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusComponent
          navigation={navigation}
          visibleTiles={visibleTiles}
          isWon={isWon}
          selectedNumber={selectedNumber}
        />
        <View style={styles.container}>
          <FlatList
            data={tilesList}
            renderItem={({ item }) => (
              <TileComponent
                visibleTiles={visibleTiles}
                setVisibleTiles={setVisibleTiles}
                item={item}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={3}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  tileBox: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 4,
  },
  tileText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
