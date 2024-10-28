/* eslint-disable react-native/no-inline-styles */
import {Row} from '@bsdaoquang/rncomponent';
import React, {useState} from 'react';
import {colors} from '../constants/colors';
import TextComponent from './TextComponent';
import CartModal from './CartModal';
import {useCart} from '../context/CartContext';

const Cart = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {cart}: any = useCart();

  return (
    <>
      <Row
        onPress={() => setIsModalVisible(true)}
        styles={{
          position: 'absolute',
          backgroundColor: colors.black4,
          right: 10,
          bottom: 90,
          paddingHorizontal: 8,
          paddingVertical: 8,
          borderRadius: 200,
          zIndex: 100,
        }}>
        <TextComponent size={30} color={colors.white} text="🧺" />
        <TextComponent
          size={12}
          color={colors.white}
          styles={{
            position: 'absolute',
            borderRadius: 100,
            backgroundColor: colors.red,
            paddingVertical: 4,
            paddingHorizontal: 8,
            transform: 'translate(-12px,-38px)',
          }}
          text={cart.length.toString()}
        />
      </Row>
      <CartModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default Cart;
