/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Space} from '@bsdaoquang/rncomponent';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {TextComponent} from '../../../components';
import {useCart} from '../../../context/CartContext';
import {useShippingForm} from '../../../context/ShippingFormContext';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {
  insertMultipleOrders,
  insertOrder,
  insertUser,
} from '../../../lib/actions';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  SuccessScreen: undefined;
};

const CheckoutForm = () => {
  const [payment, setPayment] = useState('cash');
  const [orderData, setOrderData] = useState<any>([]);

  const {formData}: any = useShippingForm();
  const {cart, resetCart}: any = useCart();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // const totalPrice = cart.reduce(
  //   (acc: any, cur: any) => acc + cur.totalPrice * cur.quantity,
  //   0,
  // );

  const handleChangePaymentMethod = (value: string) => {
    setPayment(value);
  };

  const handleInsertOrder = async (orderFormData: any) => {
    let updateData = [...orderFormData];

    if (!formData.id) {
      const guestData = {
        fullName: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
      };
      const {userData} = await insertUser(guestData);
      updateData = updateData.map(data => ({
        ...data,
        guestId: userData[0].id,
      }));
      formData.id = userData[0].id;
    }

    const orderTime = new Date(Date.now() + 7 * 60 * 60 * 1000)
      .toISOString()
      .replace('T', ' ')
      .replace('Z', '');
    updateData = updateData.map(data => ({...data, orderTime: orderTime}));
    updateData = updateData.map(data =>
      payment !== 'cash' ? {...data, status: 'paid', isPaid: true} : data,
    );
    setOrderData(updateData);

    if (updateData.length > 1) {
      await insertMultipleOrders(updateData);
    } else {
      await insertOrder(updateData[0]);
    }
    resetCart();
  };

  const handlePayment = async () => {
    if (cart.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2:
          'Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.',
      });
      return;
    }

    if (payment === 'cash') {
      handleInsertOrder(orderData);
      navigation.navigate('SuccessScreen');
    }
  };

  useEffect(() => {
    if (cart.length > 0) {
      if (cart.length > 1) {
        const cartOrderData: any = [];
        cart.map((cartItem: any) => {
          const orderFormData = {
            numFood: cartItem.quantity,
            foodPrice: cartItem.regularPrice,
            totalPrice: cartItem.totalPrice * cartItem.quantity,
            status: 'unpaid',
            isPaid: false,
            observations: formData.observations,
            foodId: cartItem.id,
            guestId: formData.id,
          };
          cartOrderData.push(orderFormData);
          setOrderData(cartOrderData);
        });
      } else {
        const cartOrderData: any = {
          numFood: cart[0].quantity,
          foodPrice: cart[0].regularPrice,
          totalPrice: cart[0].totalPrice * cart[0].quantity,
          status: 'unpaid',
          isPaid: false,
          observations: formData.observations,
          foodId: cart[0].id,
          guestId: formData.id,
        };
        setOrderData([cartOrderData]);
      }
    }
  }, [cart, formData]);

  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 12,
      }}>
      <TextComponent size={18} text="Phương thức thanh toán" />
      <Space height={6} />
      <Row justifyContent="flex-start">
        <RadioButton
          value="cash"
          status={payment === 'cash' ? 'checked' : 'unchecked'}
          onPress={() => handleChangePaymentMethod('cash')}
        />
        <TextComponent size={16} text="Tiền mặt" />
      </Row>
      <Space height={12} />
      <Row justifyContent="flex-end">
        <Button
          radius={6}
          textStyleProps={{
            fontFamily: fontFamilies.mergeBold,
            fontSize: 14,
          }}
          styles={{paddingHorizontal: 25, paddingVertical: 5}}
          color={colors.red}
          onPress={handlePayment}
          title="Đặt hàng"
        />
      </Row>
    </View>
  );
};

export default CheckoutForm;
