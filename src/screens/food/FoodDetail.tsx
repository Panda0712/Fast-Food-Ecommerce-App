/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontFamilies} from '../../constants/fontFamilies';
import {sizes} from '../../constants/sizes';
import {formatVND} from '../../utils/helper';

const FoodDetail = ({navigation, route}: any) => {
  const [quantity, setQuantity] = useState(1);

  const {food} = route.params;

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  return (
    <>
      <Container
        style={{position: 'relative'}}
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
        <View>
          <Image source={{uri: food.image}} width={sizes.width} height={300} />
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
              text={formatVND(food.regularPrice - food.discount).toString()}
              styles={{fontWeight: 500}}
              size={21}
            />
          </Row>

          <TextComponent
            styles={{paddingHorizontal: 12, paddingVertical: 8}}
            size={18}
            text={food.description}
            numberOfLines={2}
          />
        </View>

        <Space height={18} />

        <Section>
          <Row justifyContent="center">
            <TouchableOpacity onPress={() => handleDecrement()}>
              <Row
                justifyContent="center"
                alignItems="center"
                styles={{
                  backgroundColor: colors.orange2,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 6,
                }}>
                <TextComponent size={18} color={colors.white} text="-" />
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
              <TextComponent size={18} text={quantity.toString()} />
            </View>
            <Space width={12} />
            <TouchableOpacity onPress={() => handleIncrement()}>
              <Row
                justifyContent="center"
                alignItems="center"
                styles={{
                  backgroundColor: colors.red,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 6,
                }}>
                <TextComponent size={18} color={colors.white} text="+" />
              </Row>
            </TouchableOpacity>
          </Row>
        </Section>
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
        }}>
        <Row justifyContent="space-between">
          <TextComponent size={18} text="Tổng cộng:" />
          <TextComponent
            color={colors.red}
            font={fontFamilies.mergeBold}
            text={formatVND(
              (food.regularPrice - food.discount) * quantity,
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
            onPress={() => {}}
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
            onPress={() => {}}
          />
        </Row>
      </Section>
    </>
  );
};

export default FoodDetail;
