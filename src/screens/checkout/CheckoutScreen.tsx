/* eslint-disable react-native/no-inline-styles */
import {Row, Section, Space} from '@bsdaoquang/rncomponent';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {useCart} from '../../context/CartContext';
import {useShippingForm} from '../../context/ShippingFormContext';
import {globalStyles} from '../../styles/globalStyles';
import {formatVND} from '../../utils/helper';
import CheckoutForm from './components/CheckoutForm';

const CheckoutScreen = ({navigation}: any) => {
  const {cart}: any = useCart();
  const {formData}: any = useShippingForm();

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
      title="Thanh toán đơn hàng">
      <Section styles={{marginTop: 20}}>
        <TextComponent
          styles={{textAlign: 'center'}}
          size={24}
          text="Hoàn tất thanh toán"
        />
        <Space height={16} />
        <CheckoutForm />
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

        <Section styles={[globalStyles.paymentContainer]}>
          <TextComponent size={18} text="Giao hàng tới địa chỉ" />
          <Space height={16} />
          <TextComponent size={16} text={`📞 Tel: ${formData.phone}`} />
          <Space height={6} />
          <TextComponent size={16} text={`🏠 Địa chỉ: ${formData.address}`} />
          <Space height={6} />
          <TextComponent size={16} text={`📧 Email: ${formData.email}`} />
        </Section>

        <Section styles={[globalStyles.paymentContainer]}>
          <TextComponent size={18} text="Phương thức giao hàng" />
          <Space height={8} />
          <TextComponent size={16} text="📦 Giao hàng tận nơi" />
        </Section>
      </Section>
    </Container>
  );
};

export default CheckoutScreen;
