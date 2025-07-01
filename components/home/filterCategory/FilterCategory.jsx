import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './FilterCategory.style';
import { ScrollView, Pressable, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../../constants';



const FilterCategory = () => {
  const [selected, setSelected] = useState(false);

  const controlBtns = () => {
    if (selected) {
      setSelected(false)
    }
    if (!selected) {
      
      setSelected(true)
    }
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>Category</Text>
        {/* <Pressable style={styles.sectionHeaderBtn}>
          <Text style={styles.sectionHeaderBtnText}>See more <Ionicons name="chevron-forward" /></Text>
        </Pressable> */}
      </View>

      <View style={styles.categoryBtnBox}>
        <Pressable style={styles.categoryBtn(selected)} onPress={controlBtns}>
          <Text style={styles.categoryBtnText(selected)}>Grains</Text>
        </Pressable>
        <Pressable style={styles.categoryBtn(selected)} onPress={controlBtns}>
          <Text style={styles.categoryBtnText(selected)}>Beverages</Text>
        </Pressable>
        <Pressable style={styles.categoryBtn(selected)} onPress={controlBtns}>
          <Text style={styles.categoryBtnText(selected)}>Vegetables</Text>
        </Pressable>
        <Pressable style={styles.categoryBtn(selected)} onPress={controlBtns}>
          <Text style={styles.categoryBtnText(selected)}>Toiletries</Text>
        </Pressable>
        <Pressable style={styles.categoryBtn(selected)} onPress={controlBtns}>
          <Text style={styles.categoryBtnText(selected)}>Sachet food</Text>
        </Pressable>
        <Pressable style={styles.categoryBtn(selected)} onPress={controlBtns}>
          <Text style={styles.categoryBtnText(selected)}>Tubers</Text>
        </Pressable>
        <Pressable style={styles.categoryBtn(selected)} onPress={controlBtns}>
          <Text style={styles.categoryBtnText(selected)}>Fruits</Text>
        </Pressable>
      </View>

    </View>
  )
}

export default FilterCategory