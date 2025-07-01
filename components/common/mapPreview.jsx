import React, { useState } from 'react';
import { View, Modal, Pressable, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SIZES } from '../../constants';

const MapPreview = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <View>
      {/* Thumbnail Preview */}
      <Pressable onPress={() => setIsFullscreen(true)}>
        <Image
          source={require("../../assets/images/restock-map.png")}
          style={{
            width: '100%',
            height: 250,
            borderRadius: SIZES.small,
          }}
          resizeMode="cover"
        />
      </Pressable>

      {/* Fullscreen Modal */}
      <Modal visible={isFullscreen} transparent>
        <TouchableWithoutFeedback onPress={() => setIsFullscreen(false)}>
          <View style={styles.modalBackground}>
            <Image
              source={require("../../assets/images/restock-map.png")}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
  },
});

export default MapPreview;
