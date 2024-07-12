import { StyleSheet, Text, View, FlatList } from "react-native";
import FoodListItem from "@/components/FoodListItem";

const foodItems = [
  { label: "Pizza", cal: 75, brand: "Dominos" },
  { label: "Calzone", cal: 250, brand: "2 Guy's and a Pie" },
  { label: "Pepperoni Slice", cal: 180, brand: "Marcos" },
  { label: "Sushi", cal: 50, brand: "Sushi Place" },
];

export default function App() {
  return (
    <View style={styles.container}>
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
  },
});
