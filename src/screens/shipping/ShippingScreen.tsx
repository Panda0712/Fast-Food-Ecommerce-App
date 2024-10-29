/* eslint-disable react-native/no-inline-styles */
import {Row, Section, Space} from '@bsdaoquang/rncomponent';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import ShippingForm from './components/ShippingForm';
import {useCart} from '../../context/CartContext';
import {formatVND} from '../../utils/helper';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';

const ShippingScreen = ({navigation}: any) => {
  const {cart}: any = useCart();

  const totalPrice = cart.reduce(
    (acc: any, cur: any) => acc + cur.totalPrice * cur.quantity,
    0,
  );

  return (
    <Container
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      title="Thông tin mua hàng">
      <Section styles={{marginTop: 20}}>
        <Section styles={[globalStyles.paymentContainer]}>
          <TextComponent size={18} text="Chi tiết đơn hàng" />
          <Space height={16} />
          {cart.map((food: any) => (
            <Row
              key={food.id}
              justifyContent="flex-start"
              styles={{marginBottom: 12}}>
              <Image
                source={{uri: food.image}}
                width={50}
                height={50}
                style={{width: 70, height: 70}}
              />
              <Space width={20} />
              <Row alignItems="flex-start" styles={{flexDirection: 'column'}}>
                <TextComponent size={16} text={food.foodName} />
                <TextComponent text={`x${food.quantity}`} />
                <TextComponent
                  size={16}
                  font={fontFamilies.mergeBold}
                  color={colors.red}
                  text={formatVND(food.totalPrice)}
                />
              </Row>
            </Row>
          ))}
          <Row justifyContent="space-between">
            <TextComponent size={18} text="Tổng cộng:" />
            <TextComponent
              size={18}
              color={colors.red}
              font={fontFamilies.mergeBold}
              text={formatVND(totalPrice)}
            />
          </Row>
        </Section>
        <Space height={16} />
        <ShippingForm />
      </Section>
    </Container>
  );
};

export default ShippingScreen;
