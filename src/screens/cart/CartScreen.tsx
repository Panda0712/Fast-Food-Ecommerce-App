import {Section} from '@bsdaoquang/rncomponent';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container} from '../../components';
import {colors} from '../../constants/colors';

const CartScreen = ({navigation}: any) => {
  return (
    <Container
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      title="Giỏ hàng của bạn">
      <Section></Section>
    </Container>
  );
};

export default CartScreen;
