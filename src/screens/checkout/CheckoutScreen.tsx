import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container} from '../../components';
import {colors} from '../../constants/colors';

const CheckoutScreen = ({navigation}: any) => {
  return (
    <Container
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      title="Thanh toán đơn hàng">
      <Text>CheckoutScreen</Text>
    </Container>
  );
};

export default CheckoutScreen;
