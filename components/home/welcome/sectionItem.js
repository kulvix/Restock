import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform, Pressable} from 'react-native';
import { SIZES } from '../../../constants';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;


export default function SectionItem ({ item, scrollX, index, SPACING, ITEM_SIZE, EMPTY_ITEM_SIZE }) {
  const router = useRouter();
  const inputRange = [
    (index - 2) * ITEM_SIZE, // Previous slide
    (index - 1) * ITEM_SIZE, // Current slide
    index * ITEM_SIZE, // Next slide
    
    // All on the same line
    // (index - 2) * ITEM_SIZE,
    // (index - 2) * ITEM_SIZE,
    // (index - 2) * ITEM_SIZE,
  ];

  const translateY = scrollX.interpolate({
    inputRange,
    // outputRange: [250, 150, 250],
    outputRange: [30, 5, 30],
    extrapolate: 'clamp',
  });

  if (!item.image) {
    return <View style={{ width: EMPTY_ITEM_SIZE }} />;
  }

	return (
		<View style={[styles.sectionContainer, {width: ITEM_SIZE}]}>
			<Animated.View style={{ 
				marginHorizontal: SPACING, 
				padding: SPACING * 1.5,
				// transform: [{translateY}], makes the image move up and down
				backgroundColor: 'white',
				height: ITEM_SIZE * 0.25,
        borderRadius: SIZES.large,
				marginBottom: SIZES.xxLarge * 2,
				}}>
				<Pressable
          onPress={() =>
            router.push({
              pathname: "/promo",
              params: { item: JSON.stringify(item)},
            })
          }
        >
					<Image source={item.image} style={[styles.image]} />
				</Pressable>
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	sectionContainer: {
		justifyContent: "flex-start",
	},
	image: {
		borderRadius: SIZES.large,
		width: '100%',
		borderColor: '#fff',
		height: ITEM_SIZE * 0.5,
		resizeMode: 'cover',
		margin: 0,
		// marginBottom: 10,
	},
})