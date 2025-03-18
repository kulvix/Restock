import React, { useRef, useContext, useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './ProfileDetails.style';
import { ScrollView, Pressable, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../../constants';
import { AuthContext } from '../../../components/contexts/AuthContext';


// const visible = useRef();

const ProfileDetails = () => {

  const { user, logout } = useContext(AuthContext);
  const name = user.first_name + ' ' + user.last_name;

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    const initials = words.slice(0, 2).map(word => word[0]).join('').toUpperCase();
    return initials;
  };
  return (
    <View style={styles.container}>
      <View style={styles.profilePicSection}>
        <View style={styles.profilePicBox}>
          <Text style={styles.profilePicText}>{getInitials(name)}</Text>
        </View>
        <Text style={styles.profileName}>{user ? name : ""}</Text>
      </View>

      <View style={styles.walletSection}>
        <View style={styles.walletBox}>
          <Pressable style={styles.eyeBtn}>
            <Ionicons name='eye-outline' size={20} color={COLORS.white} />
          </Pressable>

          <View style={styles.walletInnerBox}>
            <Text style={styles.walletTitleText}>******</Text>
            <Text style={styles.walletSubtitleText}>Wallet balance</Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.walletBox}>
          <Pressable style={styles.eyeBtn}>
            <Ionicons name='eye' size={20} color={COLORS.white} />
          </Pressable>

          
          <View style={styles.walletInnerBox}>
            <Text style={styles.walletTitleText}>1230</Text>
            <Text style={styles.walletSubtitleText}>Point balance</Text>
          </View>
        </View>
      </View>


      <View style={styles.actionBtnSection}>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}><Ionicons name='add' /> Add money</Text>
        </Pressable>

        <Pressable style={styles.btn}>
          <Text style={styles.btnText}><Ionicons name='send' /> Transfer</Text>
        </Pressable>

        <Pressable style={styles.btn}>
          <Text style={styles.btnText}><Ionicons name='pencil' /> Edit profile</Text>
        </Pressable>
      </View>

      <View style={styles.ProfileDetailsSection}>
        <Text style={styles.detailtext}><Ionicons name='location' />{' '} {user?.address ? user.address : "xxx xxx xxxx xx"}</Text>
        <View style={styles.lowerSection}>
          <Text style={styles.detailtext}><Ionicons name='call' />{' '} {user?.phone ? user.phone : "xxx xxx xxxx xx"}</Text>
          <Text style={styles.detailtext}><Ionicons name='mail' />{' '} {user?.email ? user.email : ""}</Text>
        </View>
      </View>

    </View>
  )
}

export default ProfileDetails