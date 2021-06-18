import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const InputScreen = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const isNumeric = (str) => {
    return (
      !isNaN(str) &&
      !isNaN(parseFloat(str)) &&
      parseInt(str, 10) >= 0 &&
      parseInt(str, 10) < 100
    );
  };

  const handleSubmit = () => {
    if (!isNumeric(value)) {
      setMessage("Enter a number between 0 - 99");
      return;
    }
    setMessage("");
    navigation.navigate("Play", {
      selectedNumber: parseInt(value, 10),
    });
    setValue("");
  };

  const onChangeText = (value) => {
    setValue(value);
    if (isNumeric(value)) setMessage("");
    else setMessage("Enter a number between 0 - 99");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.rulesBox}>
          <Text style={styles.ruleText}>
            Enter a number and proceed to play
          </Text>
          <Text style={styles.ruleText}>
            You will see 9 tiles, you number will be hidden in one of the tiles
          </Text>
          <Text style={styles.ruleText}>
            You will have maximum 3 attemps to guess the right tile
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>ENTER A NUMBER B/W (0 - 99)</Text>
          <TextInput
            maxLength={2}
            keyboardType="numeric"
            value={value}
            onChangeText={onChangeText}
            style={styles.inputBox}
          />
          <Text style={styles.errorMessage}>{message}</Text>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>LET'S PLAY</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InputScreen;

const styles = StyleSheet.create({
  rulesBox: {
    backgroundColor: "#04b386",
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  ruleText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  container: {
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  text: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  inputBox: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 20,
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
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
