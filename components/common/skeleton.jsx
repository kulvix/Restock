import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

const LoadingSkeleton = ({ loading, children }) => {
  if (loading) {
    return (
      <ScrollView style={styles.container}>
        <ContentLoader
          speed={1}
          width={'100%'}
          height={180}
          // viewBox="0 0 300 400"
          backgroundColor="#eeeeee"
          foregroundColor="#ffffff"
        >
          {/* Image - full width */}
          <Rect x="0" y="0" rx="10" ry="10" width="100%" height="100" />
          {/* Avatar */}
          <Circle cx="30" cy="145" r="30" />
          {/* Title */}
          <Rect x="70" y="120" rx="4" ry="4" width="120" height="20" />
          {/* Subtitle */}
          <Rect x="70" y="150" rx="4" ry="4" width="80" height="15" />
          {/* Button next to subtitle */}
          <Rect x="260" y="120" rx="10" ry="10" width="120" height="50" />
        </ContentLoader>
      </ScrollView>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default LoadingSkeleton;
