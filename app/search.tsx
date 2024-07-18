import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import FoodListItem from "@/components/FoodListItem";
import { useEffect, useState } from "react";
import { gql, useLazyQuery } from '@apollo/client';
import React from "react";
import { Ionicons } from '@expo/vector-icons';
// import { Camera } from 'expo-camera';
import { Camera, CameraType } from 'expo-camera/legacy';


const query = gql`
  query MyQuery($ingr: String, $upc: String) {
  search(ingr: $ingr, upc: $upc) {
    text
    hints {
    food {
      label
      brand
      foodId
      nutrients {
      ENERC_KCAL
      }
    }
    }
  }
  } `




export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [scannerEnabled, setScannerEnabled] = useState(false);

  const [runSearch, { data, loading, error }] = useLazyQuery(query, { variables: { ingr: search } });
  // const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // requestPermission();

  const performSearch = () => {
    runSearch({ variables: { ingr: search } });

  };

  if (error) {
    return <Text>Failed to Search</Text>;
  }

  if (scannerEnabled) {
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ width: '100%', height: '100%' }} onBarCodeScanned={(data) => {
            console.log(data);
            runSearch({ variables: { upc: data.data } });
            setScannerEnabled(false);
          }}
        />
        <Ionicons
          onPress={() => setScannerEnabled(false)}
          name="close"
          size={30}
          color="dimgray"
          style={{ position: 'absolute', right: 10, top: 10 }}
        />
      </View>
    );
  }

  const items = data?.search?.hints || [];

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search . . ."
          style={styles.input}
        />

        <Ionicons onPress={() => setScannerEnabled(true)}
          name="barcode-outline" size={32} color="dimgray" />
      </View>
      {search && <Button title="Search" onPress={performSearch} />}

      {loading && <ActivityIndicator />}
      <FlatList
        data={items}
        renderItem={({ item }) => <FoodListItem item={item} />}
        ListEmptyComponent={() => <Text>Search a food</Text>}
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
    flex: 1,
  },
});

function setHasPermission(arg0: boolean) {
  throw new Error("Function not implemented.");
}

