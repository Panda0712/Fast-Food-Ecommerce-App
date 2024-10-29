/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Row, Section, Space} from '@bsdaoquang/rncomponent';
import {SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {FoodModel} from '../../constants/models';
import {sizes} from '../../constants/sizes';
import {getFoods} from '../../lib/actions';
import {formatVND} from '../../utils/helper';

import auth from '@react-native-firebase/auth';
import Swiper from 'react-native-swiper';
import Cart from '../../components/Cart';

const HomeScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState<FoodModel[]>([]);

  const user = auth().currentUser;

  const handleGetFoods = async () => {
    const items: any = await getFoods();
    setFoods(items.foods);
  };

  useEffect(() => {
    handleGetFoods();
  }, []);

  return (
    <Container isScroll={false} style={{backgroundColor: colors.white}}>
      <Cart />
      <Section
        styles={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: colors.red,
        }}>
        <Row justifyContent="space-between">
          <Row styles={{flexDirection: 'column', alignItems: 'flex-start'}}>
            <TextComponent
              font={fontFamilies.mergeBold}
              color={colors.white}
              size={20}
              text="Khách hàng"
            />
            <TextComponent
              color={colors.white}
              size={20}
              text={`Xin chào, ${user?.displayName ?? ''}`}
            />
          </Row>
          <Image
            source={require('../../assets/logo.png')}
            width={40}
            height={40}
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              borderColor: colors.white,
              borderWidth: 2,
            }}
          />
        </Row>
      </Section>

      <Section styles={{marginTop: 16}}>
        <Row justifyContent="space-between" alignItems="center">
          <View>
            <TextComponent size={28} text="Tìm thức ăn nhanh" />
            <TextComponent
              color={colors.orange}
              size={28}
              text="Chất lượng nhất"
            />
            <TextComponent size={28} text="Gần bạn" />
          </View>
          <TextComponent size={80} text="🍟" />
        </Row>
      </Section>

      <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
        <Section>
          <Input
            color={colors.grey}
            disable={true}
            styles={{backgroundColor: colors.grey}}
            value={searchQuery}
            onChange={val => setSearchQuery(val)}
            placeholder="Tìm kiếm..."
            placeholderColor={colors.grey3}
            clear
            affix={
              <TouchableOpacity>
                <SearchNormal1 size="28" color={colors.black} />
              </TouchableOpacity>
            }
          />
        </Section>
      </TouchableOpacity>

      <Section styles={{marginBottom: 20}}>
        <Row justifyContent="space-between">
          <TextComponent size={18} text="Món ngon phải thử" />
          <TouchableOpacity onPress={() => navigation.navigate('FoodTab')}>
            <TextComponent size={16} text="Xem tất cả" />
          </TouchableOpacity>
        </Row>
      </Section>

      <Swiper horizontal autoplay activeDotColor={colors.black3} height={200}>
        {foods.map(food => (
          <Row
            justifyContent="flex-start"
            key={food.id}
            styles={{
              overflow: 'hidden',
              borderRadius: 10,
              elevation: 3,
              backgroundColor: colors.white,
              marginHorizontal: 'auto',
              width: sizes.width - 40,
            }}>
            <Image
              source={{uri: food.image}}
              style={{
                borderRadius: 10,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              width={150}
              height={120}
            />
            <Space width={15} />
            <View>
              <TextComponent
                numberOfLines={2}
                size={17}
                font={fontFamilies.mergeBold}
                text={food.name}
              />
              <TextComponent
                color={colors.red}
                font={fontFamilies.mergeBold}
                text={formatVND(food.regularPrice - food.discount).toString()}
                styles={{fontWeight: 500}}
                size={16}
              />
              <Space height={15} />
              <Button
                radius={5}
                color={colors.red}
                textStyleProps={{
                  fontSize: 13,
                  fontFamily: fontFamilies.mergeBold,
                }}
                styles={{paddingHorizontal: 30, maxWidth: 150, flex: 0}}
                size="small"
                title="Mua ngay"
                onPress={() => navigation.navigate('FoodDetail', {food: food})}
              />
            </View>
          </Row>
        ))}
      </Swiper>

      <Space height={16} />

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

      <Space height={16} />
    </Container>
  );
};

export default HomeScreen;
