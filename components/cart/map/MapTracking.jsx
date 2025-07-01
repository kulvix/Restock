import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './MapTracking.style';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZES } from '../../../constants';

// import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';



const MapTracking = () => {

  const [location, setLocation] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       console.log("Permission to access location was denied");
  //       return;
  //     }

  //     let userLocation = await Location.getCurrentPositionAsync({});
  //     setLocation(userLocation.coords);
  //   })();
  // }, []);
  
  return (
    <View style={styles.container}>
      <Text>Map is coming...</Text>
      {/* <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : 6.4076, // Default fallback
          longitude: location ? location.longitude : 7.5547,
          latitudeDelta: 0.01, // Zoom level (smaller values = closer zoom)
          longitudeDelta: 0.01,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
          />
        )}
      </MapView> */}
    </View>
  )
}

export default MapTracking