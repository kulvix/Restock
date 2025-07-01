import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image';
import styles from './screenheader.style'

const ScreenHeaderBtn = ({iconUrl, dimension, handlePress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image 
        source={iconUrl}
        contentFit="cover"
        style={styles.btnImg(dimension)}
        />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn