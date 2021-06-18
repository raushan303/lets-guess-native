import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const PlayScreen = ({ route, navigation }) => {
  const { selectedNumber } = route.params;

  const [tilesList, setTilesList] = useState([]);
  const [visibleTiles, setVisibleTiles] = useState([]);

  const [isWon, setIsWon] = useState(false);

  const tileNumbergenerator = (value) => {
    const tempTilesList = [];
    while (tempTilesList.length < 9) {
      const randomNumber = Math.floor(Math.random() * 100 + 1);
      if (value === randomNumber || tempTilesList.includes(randomNumber))
        continue;
      tempTilesList.push({ id: tempTilesList.length, value: randomNumber });
    }
    const randomIndex = Math.floor(Math.random() * 9);
    tempTilesList[randomIndex].value = value;
    setTilesList(tempTilesList);
  };

  const onShowClick = (index) => {
    if (!isWon && visibleTiles.length < 3)
      setVisibleTiles((prevState) => [...prevState, index]);
  };

  useEffect(() => {
    tileNumbergenerator(selectedNumber);
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

  const onReset = () => {
    navigation.navigate("Input");
  };

  const renderItem = ({ item }) => {
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
      <TouchableOpacity onPress={() => onShowClick(item.id, false)}>
        {getTiles("TAP")}
      </TouchableOpacity>
    );
  };

  const getType = () => {
    if (visibleTiles.length < 3 && !isWon) return "pending";
    else if (isWon) return "success";
    else return "failure";
  };

  const gamestatus = (type, attempt) => {
    const totalAttempt = 3;

    const playAgainCta = (
      <TouchableOpacity onPress={onReset}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>PLAY AGAIN</Text>
        </View>
      </TouchableOpacity>
    );

    switch (type) {
      case "pending":
        return (
          <View style={styles.status}>
            <Image
              style={styles.icon}
              source={require("../../assets/info.jpeg")}
            />
            <Text style={styles.statusText}>
              Attempts remaining : {totalAttempt - attempt}
            </Text>
          </View>
        );
      case "success":
        return (
          <View>
            <View style={styles.status}>
              <Image
                style={styles.icon}
                source={require("../../assets/success.png")}
              />
              <Text style={styles.statusText}>Hurray! You Won</Text>
            </View>
            {playAgainCta}
          </View>
        );
      case "failure":
        return (
          <View>
            <View style={styles.status}>
              <Image
                style={styles.icon}
                source={require("../../assets/error.png")}
              />
              <Text style={styles.statusText}>
                You failed! Better luck next time
              </Text>
            </View>

            {playAgainCta}
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView>
        <View style={styles.statusBox}>
          {gamestatus(getType(), visibleTiles.length)}
        </View>
        <View style={styles.container}>
          <FlatList
            data={tilesList}
            renderItem={renderItem}
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
  status: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 30,
    width: 30,
    margin: 0,
    padding: 0,
  },
  statusBox: {
    padding: 50,
  },
  statusText: {
    fontSize: 18,
  },

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
  btn: {
    margin: 20,
    backgroundColor: "#ee575a",
    alignItems: "center",
    borderRadius: 4,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    padding: 15,
  },
  statusText: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});
