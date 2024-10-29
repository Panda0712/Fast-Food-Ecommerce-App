/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Row, Section, Space} from '@bsdaoquang/rncomponent';
import {SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {FoodModel} from '../../constants/models';
import {getFoods} from '../../lib/actions';
import {fontFamilies} from '../../constants/fontFamilies';
import {formatVND} from '../../utils/helper';
import {useCart} from '../../context/CartContext';
import Cart from '../../components/Cart';

const SearchScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState<FoodModel[]>([]);

  const {handleCart}: any = useCart();

  const handleGetFoods = async () => {
    const {foods: foodsApi}: any = await getFoods();
    setFoods(foodsApi);
  };

  const handleSearch = () => {
    if (!searchQuery) {
      handleGetFoods();
      return;
    }

    const filterFoods = foods.filter(
      (food: any) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFoods(filterFoods);
  };

  useEffect(() => {
    handleGetFoods();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <Container
      isScroll={false}
      title="Tìm kiếm món ăn"
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }>
      <Cart />
      <Space height={20} />
      <Section>
        <Input
          value={searchQuery}
          onChange={val => setSearchQuery(val)}
          placeholder="Tìm kiếm..."
          placeholderColor={colors.grey3}
          clear
          affix={
            <TouchableOpacity onPress={handleSearch}>
              <SearchNormal1 size="28" color={colors.black} />
            </TouchableOpacity>
          }
        />
      </Section>

      <View style={{paddingBottom: 120}}>
        <FlatList
          numColumns={2}
          data={foods}
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
                  onPress={() => handleCart(item)}
                />
              </Row>
            </TouchableOpacity>
          )}
        />
      </View>
    </Container>
  );
};

export default SearchScreen;
