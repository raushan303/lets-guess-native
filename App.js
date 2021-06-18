import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import InputScreen from "./src/Screens/InputScreen";
import PlayScreen from "./src/Screens/PlayScreen";

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Input"
          component={InputScreen}
          options={{ headerLeft: () => null, title: "Guessing Game" }}
        />
        <RootStack.Screen
          name="Play"
          component={PlayScreen}
          options={{ headerLeft: () => null, title: "Let's Play" }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
