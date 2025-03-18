import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './CartTabs.style';
import { ScrollView, TouchableOpacity, FlatList, Pressable } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZES } from '../../../constants';


const Tabs = [
  {id: 1, name: 'My Cart'},
  {id: 2, name: 'Current Orders'},
  {id: 3, name: 'Order History'},
]

const CartTabs = ({ selectedTab, setSelectedTab }) => {

  return (
    <View style={styles.container}>
      <View style={styles.tabBox}>

      <FlatList
        data={Tabs}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        bounces
        keyExtractor={(item) => item.id.toString()} // Ensure key is a string
        contentContainerStyle={{
          columnGap: SIZES.small,
          flexGrow: 1,
          justifyContent: 'center',
        }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.tabBtn(selectedTab, item.id)}
            onPress={() => setSelectedTab(item.id)} // This will allow tab switching
          >
            <Text style={styles.tabTitle(selectedTab, item.id)}>{item.name}</Text>
          </Pressable>
        )}
      />
      </View>
    </View>
  )
}

export default CartTabs