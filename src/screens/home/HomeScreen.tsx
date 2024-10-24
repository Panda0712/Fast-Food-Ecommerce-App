/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Row, Section, Space} from '@bsdaoquang/rncomponent';
import {SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {icons} from '../../constants/icons';
import {CategoryModel, FoodModel} from '../../constants/models';
import {sizes} from '../../constants/sizes';
import {getCategories, getFoods} from '../../lib/actions';
import {formatVND} from '../../utils/helper';

import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [foods, setFoods] = useState<FoodModel[]>([]);

  const user = auth().currentUser;

  const handleGetCategories = async () => {
    const items: any = await getCategories();
    setCategories(items.categories);
  };

  const handleGetFoods = async () => {
    const items: any = await getFoods();
    setFoods(items.foods);
  };

  useEffect(() => {
    handleGetCategories();
    handleGetFoods();
  }, []);

  let filterFoods = [];

  if (selectedCategory === 'all') {
    filterFoods = [...foods];
  } else {
    filterFoods = foods.filter(
      food => food.category.toLowerCase() === selectedCategory,
    );
  }

  return (
    <Container style={{backgroundColor: colors.white}}>
      <Section styles={{paddingHorizontal: 16, paddingVertical: 16}}>
        <Row justifyContent="space-between">
          <TextComponent
            size={20}
            text={`Xin chào, ${user?.displayName ?? ''}`}
          />
          <Image
            source={require('../../assets/logo.png')}
            width={40}
            height={40}
            style={{width: 60, height: 60}}
          />
        </Row>
      </Section>

      <Section styles={{marginTop: 8}}>
        <TextComponent size={28} text="Tìm thức ăn nhanh" />
        <TextComponent color={colors.orange} size={28} text="Chất lượng nhất" />
        <TextComponent size={28} text="Gần bạn" />
      </Section>

      <Section>
        <Input
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
              style={{borderRadius: 10}}
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

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 8}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(icons[index].type)}
              style={{
                backgroundColor: colors.grey,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                padding: 4,
                marginRight: 12,
                shadowColor: '#000',
                shadowOffset: {width: 2, height: 2},
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 2,
                width: 100,
                borderBottomColor:
                  icons[index].type === selectedCategory ? colors.black : '',
                borderBottomWidth:
                  icons[index].type === selectedCategory ? 2 : 0,
              }}>
              <MaterialCommunityIcons
                name={icons[index].name}
                size={24}
                color={colors.orange}
              />
              <TextComponent
                text={item.name}
                size={15}
                styles={{textAlign: 'center'}}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <View>
        <FlatList
          numColumns={2}
          data={filterFoods}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 8,
            paddingVertical: 24,
            gap: 20,
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
                  style={{width: '100%', height: 100}}
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
                  text={formatVND(item.regularPrice - item.discount).toString()}
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
                  onPress={() => {}}
                />
              </Row>
            </TouchableOpacity>
          )}
        />
      </View>
    </Container>
  );
};

export default HomeScreen;
