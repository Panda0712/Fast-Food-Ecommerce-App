/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';

import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontFamilies} from '../../constants/fontFamilies';
import {FoodModel} from '../../constants/models';
import {sizes} from '../../constants/sizes';
import {useCart} from '../../context/CartContext';
import {getFoods, getRelatedFoods} from '../../lib/actions';
import {formatVND} from '../../utils/helper';

const FoodDetail = ({navigation, route}: any) => {
  const [foods, setFoods] = useState<FoodModel[]>([]);
  const [relatedFoods, setRelatedFoods] = useState<FoodModel[]>([]);

  const {food} = route.params;
  const {cart, addToCart, handleDecrement, handleIncrement}: any = useCart();

  const checkCart = cart.filter((item: any) => item.id === food.id);
  const isInCart = checkCart.length > 0;

  const handleError = () => {
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: 'Thêm sản phẩm vào giỏ hàng đã nhé 😘',
    });
  };

  const handleCart = (item: any) => {
    addToCart({
      id: item.id,
      foodName: item.name,
      regularPrice: item.regularPrice,
      discount: item.discount,
      totalPrice: item.regularPrice - item.discount,
      image: item.image,
      quantity: 1,
    });
    Toast.show({
      type: 'success',
      text1: 'Thông báo',
      text2: 'Thêm vào giỏ hàng thành công',
    });
  };

  const handleGetSpecificFoods = async () => {
    const {relatedFoods: relatedFoodsApi}: any = await getRelatedFoods(
      food.category,
      food.id,
    );
    setRelatedFoods(relatedFoodsApi);
  };

  const handleGetFoods = async () => {
    const {foods: foodsApi}: any = await getFoods();
    setFoods(foodsApi);
  };

  useEffect(() => {
    handleGetSpecificFoods();
    handleGetFoods();
  }, []);

  let filterFoods = [...relatedFoods];

  if (relatedFoods.length <= 0) {
    filterFoods = foods.filter(item => item.id !== Number(food.id)).slice(0, 8);
  }

  return (
    <>
      <Container
        isScroll={false}
        nestedFlatList={true}
        style={{
          position: 'relative',
        }}
        back={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={colors.white} />
          </TouchableOpacity>
        }
        title="Chi tiết món ăn"
        right={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <TextComponent size={16} color={colors.white} text="Quay lại" />
          </TouchableOpacity>
        }>
        <View style={{flex: 1}}>
          <FlatList
            ListHeaderComponent={() => (
              <>
                <View>
                  <Image
                    source={{uri: food.image}}
                    width={sizes.width}
                    height={300}
                  />
                  <Row
                    justifyContent="space-between"
                    alignItems="center"
                    styles={{paddingHorizontal: 12, paddingVertical: 8}}>
                    <TextComponent
                      font={fontFamilies.mergeBold}
                      numberOfLines={2}
                      size={21}
                      text={food.name}
                      styles={{
                        maxWidth: 250,
                        textAlign: 'center',
                        fontWeight: 500,
                      }}
                    />
                    <TextComponent
                      color={colors.red}
                      font={fontFamilies.mergeBold}
                      text={formatVND(
                        food.regularPrice - food.discount,
                      ).toString()}
                      styles={{fontWeight: 500}}
                      size={21}
                    />
                  </Row>

                  <TextComponent
                    styles={{paddingHorizontal: 12, paddingVertical: 8}}
                    size={18}
                    text={food.description}
                  />
                </View>

                <Space height={18} />

                <Section>
                  <Row justifyContent="center">
                    <TouchableOpacity
                      onPress={() =>
                        isInCart ? handleDecrement(food.id) : handleError()
                      }>
                      <Row
                        justifyContent="center"
                        alignItems="center"
                        styles={{
                          backgroundColor: colors.orange2,
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          borderRadius: 6,
                        }}>
                        <TextComponent
                          size={18}
                          color={colors.white}
                          text="-"
                        />
                      </Row>
                    </TouchableOpacity>
                    <Space width={12} />
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: colors.black,
                        paddingHorizontal: 36,
                        paddingVertical: 8,
                        borderRadius: 6,
                      }}>
                      <TextComponent
                        size={18}
                        text={checkCart[0]?.quantity.toString() ?? '1'}
                      />
                    </View>
                    <Space width={12} />
                    <TouchableOpacity
                      onPress={() =>
                        isInCart ? handleIncrement(food.id) : handleError()
                      }>
                      <Row
                        justifyContent="center"
                        alignItems="center"
                        styles={{
                          backgroundColor: colors.red,
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          borderRadius: 6,
                        }}>
                        <TextComponent
                          size={18}
                          color={colors.white}
                          text="+"
                        />
                      </Row>
                    </TouchableOpacity>
                  </Row>
                </Section>

                <Space height={8} />

                <Section>
                  <TextComponent size={21} text="Các mặt hàng liên quan" />
                </Section>
              </>
            )}
            data={filterFoods}
            numColumns={2}
            contentContainerStyle={{
              paddingBottom: 150,
            }}
            columnWrapperStyle={{
              justifyContent: 'center',
              paddingHorizontal: 8,
              gap: 20,
              marginTop: 24,
            }}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('FoodDetail', {food: item})}>
                <Row
                  styles={{
                    width: 160,
                    flexDirection: 'column',
                    marginHorizontal: 12,
                    borderRadius: 10,
                    overflow: 'hidden',
                    borderBottomColor: colors.grey3,
                    borderBottomWidth: 1,
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: '100%', height: 130, borderRadius: 10}}
                  />
                  <TextComponent
                    font={fontFamilies.mergeBold}
                    numberOfLines={2}
                    size={18}
                    text={item.name}
                    styles={{
                      width: 120,
                      height: 42,
                      marginTop: 4,
                      textAlign: 'center',
                      fontWeight: 500,
                    }}
                  />

                  <TextComponent
                    text={item.description}
                    styles={{textAlign: 'center', height: 40}}
                    numberOfLines={2}
                  />

                  <TextComponent
                    color={colors.red}
                    font={fontFamilies.mergeBold}
                    text={formatVND(
                      item.regularPrice - item.discount,
                    ).toString()}
                    styles={{fontWeight: 500}}
                    size={16}
                  />
                  <Button
                    size="small"
                    radius={7}
                    textStyleProps={{
                      fontSize: 13,
                      fontFamily: fontFamilies.mergeBold,
                    }}
                    styles={{marginVertical: 12}}
                    title="Thêm vào giỏ"
                    color={colors.yellow}
                    onPress={() => handleCart(item)}
                  />
                </Row>
              </TouchableOpacity>
            )}
          />
        </View>
      </Container>

      <Section
        styles={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingVertical: 12,
          borderTopColor: colors.black3,
          borderTopWidth: 1,
          backgroundColor: colors.white,
        }}>
        <Row justifyContent="space-between">
          <TextComponent size={18} text="Tổng cộng:" />
          <TextComponent
            color={colors.red}
            font={fontFamilies.mergeBold}
            text={formatVND(
              isInCart
                ? (food.regularPrice - food.discount) * checkCart[0]?.quantity
                : food.regularPrice - food.discount,
            ).toString()}
            styles={{fontWeight: 500}}
            size={21}
          />
        </Row>
        <Row justifyContent="space-between">
          <Button
            radius={7}
            textStyleProps={{
              fontSize: 13,
              fontFamily: fontFamilies.mergeBold,
              flex: 1,
            }}
            styles={{marginVertical: 12, paddingHorizontal: 40}}
            title="Thêm vào giỏ"
            color={colors.yellow}
            onPress={() => handleCart(food)}
          />
          <Space width={8} />
          <Button
            radius={7}
            textStyleProps={{
              fontSize: 13,
              fontFamily: fontFamilies.mergeBold,
              flex: 1,
            }}
            styles={{marginVertical: 12, paddingHorizontal: 40}}
            title="Thanh Toán Ngay"
            color={colors.red}
            onPress={() =>
              isInCart ? navigation.navigate('ShippingScreen') : handleError()
            }
          />
        </Row>
      </Section>
    </>
  );
};

export default FoodDetail;
