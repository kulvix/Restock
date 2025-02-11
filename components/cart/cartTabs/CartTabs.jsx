import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './CartTabs.style';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZES } from '../../../constants';


const Tabs = [
  {id: 1, name: 'My Cart'},
  {id: 2, name: 'Current Orders'},
]

const CartTabs = ({ selectedTab, setSelectedTab }) => {

  return (
    <View style={styles.container}>
      <View style={styles.tabBox}>

      <FlatList
          data={Tabs}
          horizontal={true}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          bounces={true}
          keyExtractor={(item) => item.id}
          contentContainerStyle= {{columnGap: SIZES.small, flexGrow: 1, justifyContent: 'center'}}
          renderItem={({ item }) => 
            <TouchableOpacity style={styles.tabBtn (selectedTab, item.id)} 
              onPress={() => {
                setSelectedTab(item.id)
                }}>
              <Text style={styles.tabTitle(selectedTab, item.id)}>{item.name}</Text>
            </TouchableOpacity>
              
        } />
      </View>
    </View>
  )
}

export default CartTabs