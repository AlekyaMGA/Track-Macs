import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import FoodLogListItem from "@/components/FoodLogListItem";

const query = gql`
  query foodLogsForDate($date: Date!, $user_id: String!) {
    foodLogsForDate(date: $date, user_id: $user_id) {
      food_id
      created_at
      user_id
      id
      kcal
      label
    }
  }
`;

export default function HomeScreen() {
  const user_id = "Bob";
  const { data, loading, error } = useQuery(query, {
    variables: {
      date: dayjs().format("YYYY-MM-DD"),
      user_id,
    },
  });
  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch data</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("@/assets/images/TastyIncPic.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>Calories</Text>
        <Text style={{}}>1770 - 360 = 1692</Text>
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>Today's Logged Food</Text>
        {/* This is different from the example, but <Button> now throws an error within React Native when nested under a Link. */}
        <Link href="/search" asChild>
          <Pressable>
            <Text
              style={{ color: "royalblue", fontSize: 18, fontWeight: "bold" }}
            >
              ADD FOOD
            </Text>
          </Pressable>
        </Link>
      </View>
      <FlatList
        data={data.foodLogsForDate}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => <FoodLogListItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    gap: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
    color: "dimgray",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 20,
  },
  image: {
    width: 70,
    height: 70,
  },
});
