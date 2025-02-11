import React, { useContext } from 'react'
import { View, Text, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, useRouter, Link } from 'expo-router';
import { COLORS, icons, images, SIZES, FONT } from '../../../constants';
import { AuthContext } from '../../../components/contexts/AuthContext';

import styles from './SearchBar.style'
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchBar = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);  

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {user && (
          <Text style={styles.welcomeText}>
            Hi {user.first_name || user.last_name || ""}
          </Text>
        )}
        <View style={styles.searchWrapper}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={SIZES.large} color={COLORS.gray} />
            <TextInput style={styles.searchInput} placeholder='Search item' />
          </View>

          <TouchableOpacity style={styles.filterBtn} onPress={() => {router.push({pathname: "/(tabs)/home/filter"})}}>
            <Ionicons name='filter' size={SIZES.large} color={COLORS.white} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default SearchBar