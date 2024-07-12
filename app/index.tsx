import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import FoodListItem from "@/components/FoodListItem";
import { useState } from "react";

const foodItems = [
  { label: "Pizza", cal: 75, brand: "Dominos" },
  { label: "Calzone", cal: 250, brand: "2 Guy's and a Pie" },
  { label: "Pepperoni Slice", cal: 180, brand: "Marcos" },
  { label: "Sushi", cal: 50, brand: "Sushi Place" },
];

export default function App() {
  const [search, setSearch] = useState("");

  const performSearch = () => {
    console.warn("Searching for: ", search);

    setSearch("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search . . ."
        style={styles.input}
      />

      {search && <Button title="Search" onPress={performSearch} />}

      <FlatList
        data={foodItems}
        renderItem={({ item }) => <FoodListItem item={item} />}
        contentContainerStyle={{ gap: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 20,
  },
});
