import FoodListItem from '@/components/FoodListItem';
import { Link } from 'expo-router'
import React from 'react'
import { View, Text, FlatList, Button, StyleSheet, Pressable } from 'react-native'


const foodItems = [
    { 
        food: { label: "Pizza", nutrients: { ENERC_KCAL: 70}, brand: "Dominos"} 
    },
    { food: {label: "Calzone", nutrients: {ENERC_KCAL: 250}, brand: "2 Guy's and a Pie"} },
    { food: {label: "Pepperoni Slice", nutrients: {ENERC_KCAL:180}, brand: "Marcos"} },
    { food: {label: "Sushi", nutrients: {ENERC_KCAL: 50}, brand: "Sushi Place" }},
  ];
  
export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.headerRow}>
            <Text style={styles.subtitle}>Calories</Text>
            <Text style={{}}>1770 - 360 = 1692</Text>
        </View>
        <View style={styles.headerRow}>
            <Text style={styles.subtitle}>Today's Logged Food</Text>
            {/* This is different from the example, but <Button> now throws an error within React Native when nested under a Link. */}
            <Link href="/search" asChild>
                <Pressable>
                    <Text style={{color: 'royalblue', fontSize: 18, fontWeight:'bold'}}>ADD FOOD</Text>
                </Pressable>
            </Link>
        </View>
        <FlatList
            data={foodItems}
            contentContainerStyle={{gap: 5}}
            renderItem={({item}) => <FoodListItem item={item} />}
        />

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        flex: 1, 
        padding: 10, 
        gap: 10
    },
    headerRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    subtitle: { 
        fontSize: 18, 
        fontWeight: '500', 
        flex: 1, 
        color: 'dimgray'
    }
})