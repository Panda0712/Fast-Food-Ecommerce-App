/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import {useCart} from '../context/CartContext';
import {globalStyles} from '../styles/globalStyles';
import {formatVND} from '../utils/helper';
import TextComponent from './TextComponent';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export type RootStackParamList = {
  FoodTab: undefined;
  ShippingScreen: undefined;
};

const CartModal = ({visible, onClose}: Props) => {
  const {cart, removeFromCart, handleDecrement, handleIncrement}: any =
    useCart();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const totalPrice = cart.reduce(
    (acc: any, cur: any) => acc + cur.totalPrice * cur.quantity,
    0,
  );

  return (
    <Modal
      style={[globalStyles.modal]}
      visible={visible}
      transparent
      animationType="slide">
      <Section styles={[globalStyles.modalContainer]}>
        <Row
          justifyContent="flex-start"
          styles={[
            globalStyles.modalContent,
            {
              position: 'relative',
              flexDirection: 'column',
              height: Dimensions.get('window').height * 0.7,
              overflow: 'scroll',
            },
          ]}>
          <View style={{width: '100%'}}>
            <Row
              justifyContent="space-between"
              styles={{
                paddingBottom: 8,
                borderBottomColor: colors.grey2,
                borderBottomWidth: 2,
              }}>
              <TextComponent size={20} text="Món ăn đã chọn" />
              <TouchableOpacity onPress={onClose}>
                <TextComponent size={18} text="❌" />
              </TouchableOpacity>
            </Row>
            <Space height={16} />
            {cart.length === 0 ? (
              <TextComponent
                styles={{textAlign: 'center'}}
                size={20}
                text="Không có sản phẩm"
              />
            ) : (
              <FlatList
                style={{
                  height: Dimensions.get('window').height * 0.48,
                  paddingBottom: 200,
                }}
                data={cart}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <Section
                    styles={{
                      marginTop: 15,
                      borderBottomColor: colors.grey4,
                      borderBottomWidth: 1,
                    }}>
                    <Row justifyContent="space-between">
                      <Image
                        source={{uri: item.image}}
                        width={50}
                        height={50}
                        style={{width: 80, height: 80, borderRadius: 4}}
                      />
                      <Row
                        alignItems="flex-end"
                        styles={{flexDirection: 'column'}}>
                        <TextComponent
                          font={fontFamilies.mergeBold}
                          size={16}
                          numberOfLines={2}
                          text={item.foodName}
                        />
                        <TextComponent
                          font={fontFamilies.mergeBold}
                          size={16}
                          color={colors.red}
                          text={formatVND(item.totalPrice)}
                        />
                      </Row>
                    </Row>

                    <Space height={8} />

                    <Row justifyContent="space-between">
                      <Row>
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
                        <Space width={8} />
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
                        <Space width={8} />
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
                      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                        <TextComponent
                          styles={{
                            width: 35,
                            height: 35,
                            borderRadius: 100,
                            textAlign: 'center',
                            lineHeight: 35,
                            backgroundColor: colors.grey5,
                          }}
                          size={18}
                          text="🗑️"
                        />
                      </TouchableOpacity>
                    </Row>
                  </Section>
                )}
              />
            )}
          </View>

          <View
            style={{
              width: '100%',
              borderTopColor: colors.grey2,
              borderTopWidth: 2,
              backgroundColor: colors.white,
              position: 'absolute',
              bottom: 0,
            }}>
            <Space height={8} />
            <Row styles={{flexDirection: 'column', zIndex: 1000}}>
              <Row justifyContent="space-between" styles={{width: '100%'}}>
                <TextComponent size={18} text="Tổng cộng: " />
                <TextComponent
                  font={fontFamilies.mergeBold}
                  size={20}
                  color={colors.red}
                  text={formatVND(totalPrice)}
                />
              </Row>

              <Row>
                <Button
                  radius={7}
                  textStyleProps={{
                    fontSize: 13,
                    fontFamily: fontFamilies.mergeBold,
                    flex: 1,
                  }}
                  styles={{marginVertical: 12, paddingHorizontal: 20}}
                  title="Thêm món"
                  color={colors.yellow}
                  onPress={() => {
                    navigation.navigate('FoodTab');
                    onClose();
                  }}
                />
                <Space width={8} />
                <Button
                  radius={7}
                  textStyleProps={{
                    fontSize: 13,
                    fontFamily: fontFamilies.mergeBold,
                    flex: 1,
                  }}
                  styles={{marginVertical: 12, paddingHorizontal: 20}}
                  title="Thanh Toán Ngay"
                  color={colors.red}
                  onPress={() => navigation.navigate('ShippingScreen')}
                />
              </Row>
            </Row>
          </View>
        </Row>
      </Section>
    </Modal>
  );
};

export default CartModal;
