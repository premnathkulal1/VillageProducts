import * as React from 'react';
import { Button, View, Text } from 'react-native';

function Products({name}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{name}</Text>
    </View>
  );
}

export default Products;