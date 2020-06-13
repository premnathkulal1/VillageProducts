import * as React from 'react';
import { Button, View, Text } from 'react-native';


function ProductScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.popToTop()}
        title="Go to Home"
      />
    </View>
  );
}

export default ProductScreen;