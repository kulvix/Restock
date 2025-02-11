import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './SuccessfulScreen.styles';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZES } from '../../../../constants';
import { useRouter } from 'expo-router';





const SuccessfulScreen = ({ message, actions }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image source={require('../../../../assets/icons/tick-circle.png')} style={styles.tickImage} />
        <Text style={styles.title}>{message}</Text>

        <View style={styles.btnBox}>
          {actions && actions.map((action, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.btn1}
              onPress={() => router.replace(action.route)}
            >
              <Text style={styles.btn1Text}>{action.actionName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default SuccessfulScreen;
