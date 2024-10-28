/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {useCart} from '../../context/CartContext';
import {fontFamilies} from '../../constants/fontFamilies';
import {formatVND} from '../../utils/helper';

const CartScreen = ({navigation}: any) => {
  const {cart, handleDecrement, handleIncrement}: any = useCart();

  const totalPrice = cart.reduce(
    (acc: any, cur: any) => acc + cur.totalPrice * cur.quantity,
    0,
  );

  return (
    <Container
      isScroll={false}
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      title="Giỏ hàng của bạn">
      <Section>
        <Space height={16} />
        {cart.length === 0 ? (
          <>
            <Row>
              <Image
                source={require('../../assets/spiderman.webp')}
                width={50}
                height={50}
                style={{width: 180, height: 180}}
              />
            </Row>
            <Space height={16} />
            <TextComponent
              size={24}
              styles={{textAlign: 'center'}}
              text="Những món ăn tốt nhất luôn được chúng tôi phục vụ khách hàng"
            />
            <TextComponent
              color={colors.grey4}
              styles={{textAlign: 'center'}}
              size={18}
              text="Giỏ hàng của bạn đang trống"
            />
            <TextComponent
              color={colors.grey4}
              styles={{textAlign: 'center'}}
              size={18}
              text="Thêm sản phẩm vào thực đơn đã nhé ❤️"
            />
            <Space height={28} />
            <Row>
              <Button
                textStyleProps={{
                  fontFamily: fontFamilies.mergeBold,
                  fontSize: 16,
                }}
                color={colors.orange}
                radius={12}
                title="🍕 Khám phá thực đơn ngay 🍔"
                onPress={() => navigation.navigate('FoodTab')}
              />
            </Row>
          </>
        ) : (
          <>
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: colors.white,
              }}>
              <Space height={8} />
              <Row styles={{flexDirection: 'column', alignItems: 'flex-end'}}>
                <Row justifyContent="space-between" styles={{width: '100%'}}>
                  <TextComponent size={18} text="Tổng cộng: " />
                  <TextComponent
                    font={fontFamilies.mergeBold}
                    size={20}
                    color={colors.red}
                    text={formatVND(totalPrice)}
                  />
                </Row>
                <Space height={4} />
                <Row styles={{width: '100%'}} justifyContent="space-between">
                  <TextComponent size={24} text="➡️➡️➡️➡️" />
                  <Space width={24} />
                  <Button
                    radius={7}
                    textStyleProps={{
                      fontSize: 13,
                      fontFamily: fontFamilies.mergeBold,
                    }}
                    styles={{marginVertical: 12, paddingHorizontal: 20}}
                    title="Thanh Toán Ngay"
                    color={colors.red}
                    onPress={() => navigation.navigate('ShippingScreen')}
                  />
                </Row>
              </Row>
            </View>
            <FlatList
              style={{height: Dimensions.get('window').height * 0.6}}
              data={cart}
              keyExtractor={item => item.id.toString()}
              renderItem={({item, index}) => (
                <Section
                  styles={{
                    paddingVertical: 16,
                    marginTop: 12,
                    marginBottom: index === cart.length - 1 ? 24 : 4,
                    backgroundColor: colors.white,
                    elevation: 2,
                    borderRadius: 6,
                  }}>
                  <Row justifyContent="space-between">
                    <Row alignItems="flex-start">
                      <Image
                        source={{uri: item.image}}
                        width={50}
                        height={50}
                        style={{width: 100, height: 100, borderRadius: 4}}
                      />
                      <Space width={12} />
                      <Row
                        alignItems="flex-start"
                        styles={{flexDirection: 'column', marginTop: 2}}>
                        <TextComponent size={18} text={item.foodName} />
                        <TextComponent
                          size={16}
                          font={fontFamilies.mergeBold}
                          color={colors.red}
                          text={`${formatVND(item.totalPrice)}`}
                        />
                      </Row>
                    </Row>
                    <Row styles={{flexDirection: 'column'}}>
                      <TouchableOpacity
                        onPress={() => handleDecrement(item.id)}>
                        <TextComponent
                          color={colors.white}
                          styles={{
                            borderColor: colors.red,
                            borderWidth: 2,
                            borderRadius: 2,
                            backgroundColor: colors.red,
                            width: 28,
                            height: 25,
                            textAlign: 'center',
                            lineHeight: 25,
                          }}
                          text="-"
                        />
                      </TouchableOpacity>
                      <Space width={8} height={4} />
                      <TextComponent
                        styles={{
                          borderColor: colors.black,
                          borderWidth: 1,
                          borderRadius: 4,
                          width: 28,
                          height: 25,
                          textAlign: 'center',
                          lineHeight: 25,
                        }}
                        text={item.quantity}
                      />
                      <Space width={8} height={4} />
                      <TouchableOpacity
                        onPress={() => handleIncrement(item.id)}>
                        <TextComponent
                          color={colors.white}
                          styles={{
                            borderColor: colors.red,
                            backgroundColor: colors.red,
                            borderWidth: 2,
                            borderRadius: 2,
                            width: 28,
                            height: 25,
                            textAlign: 'center',
                            lineHeight: 25,
                          }}
                          text="+"
                        />
                      </TouchableOpacity>
                    </Row>
                  </Row>
                </Section>
              )}
            />
          </>
        )}
      </Section>
    </Container>
  );
};

export default CartScreen;
