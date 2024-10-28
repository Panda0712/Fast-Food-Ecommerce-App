import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container} from '../../components';
import {colors} from '../../constants/colors';

const ShippingScreen = ({navigation}: any) => {
  return (
    <Container
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      title="Thông tin mua hàng">
      <Text>ShippingScreen</Text>
    </Container>
  );
};

export default ShippingScreen;
