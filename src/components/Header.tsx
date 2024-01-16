import React, {type FC, memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header: FC = () => {
  return (
    <View style={styles.container}>
      <Text>This is header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 240,
  },
});

export default memo(Header);
