import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
// import { TouchableOpacity } from 'react-native';
import styles from './screenheader.style'

const ScreenHeaderBtn = ({iconUrl, dimension, handlePress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image 
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
        />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn