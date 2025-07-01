// import React from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import MapView, { Circle, Marker } from 'react-native-maps';
import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const DeliveryMapScreen = () => {
return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
  // return (
  //   <View style={styles.container}>
  //     <MapView
  //       provider={PROVIDER_DEFAULT}
  //       style={styles.map}
  //       initialRegion={{
  //         latitude: 6.43583,
  //         longitude: 7.52537,
  //         // latitudeDelta: 0.07,
  //         // longitudeDelta: 0.07,
  //       }}
  //     >
  //       <Marker coordinate={{ latitude: 6.43583, longitude: 7.52537 }} title="Center" />
  //       <Circle
  //         center={{ latitude: 6.43583, longitude: 7.52537 }}
  //         radius={7000}
  //         strokeColor="green"
  //         fillColor="rgba(0,255,0,0.1)"
  //       />
  //     </MapView>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
export default DeliveryMapScreen;



// import React, {useState, useEffect} from 'react';
// import { View, Text, StyleSheet, Dimensions } from "react-native";
// // import MapView, { Circle, Marker } from "react-native-maps";
// import MapView, { Marker } from 'react-native-maps';

// import styles from './DeliveryMapScreen.style';
// import * as Location from 'expo-location';


// const DeliveryMapScreen = () => {

//    const [location, setLocation] = useState(null);
  
//     useEffect(() => {
//       (async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           console.log("Permission to access location was denied");
//           return;
//         }
  
//         let userLocation = await Location.getCurrentPositionAsync({});
//         setLocation(userLocation.coords);
//       })();
//     }, []);
    
//     return (
//       <View style={{ flex: 1 }}>
//         <Text>Map is coming...</Text>
//         <MapView
//           // provider={PROVIDER_GOOGLE}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: location ? location.latitude : 6.4076, // Default fallback
//             longitude: location ? location.longitude : 7.5547,
//             latitudeDelta: 0.01, // Zoom level (smaller values = closer zoom)
//             longitudeDelta: 0.01,
//           }}
//         >
//           {location && (
//             <Marker
//               coordinate={{
//                 latitude: location.latitude,
//                 longitude: location.longitude,
//               }}
//               title="You are here"
//             />
//           )}
//         </MapView>
//       </View>
//     )
  // const CENTER = {
  //   latitude: 6.43583,
  //   longitude: 7.52537,
  // };

  // return (
  //   <View 
  //   style={{ flex: 1 }}
  //   // style={styles.container}
  //   >
  //     <MapView
  //       style={{ flex: 1 }}
  //       // style={styles.map}
  //       initialRegion={{
  //         ...CENTER,
  //         latitudeDelta: 0.07,
  //         longitudeDelta: 0.07,
  //       }}
  //     >
  //       <Marker coordinate={CENTER} title="Independence Layout" />
        
  //       <Circle
  //         center={CENTER}
  //         radius={7000} // 7 km radius
  //         strokeColor="green"
  //         fillColor="rgba(0,255,0,0.1)"
  //         strokeWidth={2}
  //       />
  //     </MapView>
  //   </View>
  // );
// };

// export default DeliveryMapScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });