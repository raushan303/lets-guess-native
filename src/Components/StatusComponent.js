import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const statusComponent = ({
  navigation,
  visibleTiles,
  isWon,
  selectedNumber,
}) => {
  const onReset = () => {
    navigation.navigate("Input");
  };

  const getType = () => {
    if (visibleTiles.length < 3 && !isWon) return "pending";
    else if (isWon) return "success";
    else return "failure";
  };

  const playAgainCta = (
    <TouchableOpacity onPress={onReset}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>PLAY AGAIN</Text>
      </View>
    </TouchableOpacity>
  );

  const totalAttempt = 3;
  const attempt = visibleTiles.length;

  

  switch (getType()) {
    case "pending":
      return (
        <View style={styles.statusBox}>
          <View style={styles.status}>
            <Image
              style={styles.icon}
              source={require("../../assets/info.jpeg")}
            />
            <Text style={styles.statusText}>Try to find {selectedNumber}</Text>
            <Text style={styles.statusText}>
              Attempts remaining : {totalAttempt - attempt}
            </Text>
          </View>
        </View>
      );
    case "success":
      return (
        <View style={styles.statusBox}>
          <View style={styles.status}>
            <Image
              style={styles.icon}
              source={require("../../assets/success.png")}
            />
            <Text style={styles.statusText}>Hurray! You Won</Text>
          </View>
          {playAgainCta}
          <Text style={styles.infoText}>You can open other Tiles too</Text>
        </View>
      );
    case "failure":
      return (
        <View style={styles.statusBox}>
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
          <Text style={styles.infoText}>You can open other Tiles too</Text>
        </View>
      );
  }
};

export default statusComponent;

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
    marginTop: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  infoText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: -25
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
});
