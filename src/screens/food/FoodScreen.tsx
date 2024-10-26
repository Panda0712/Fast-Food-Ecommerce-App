/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {icons} from '../../constants/icons';
import {CategoryModel, FoodModel} from '../../constants/models';
import {getCategories, getFoods} from '../../lib/actions';
import {formatVND} from '../../utils/helper';

const FoodScreen = ({navigation}: any) => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [foods, setFoods] = useState<FoodModel[]>([]);

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
    <Container
      isScroll={false}
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      title="Thực đơn">
      <Section styles={{marginTop: 24}}>
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
                <TextComponent
                  text={icons[index].name}
                  size={28}
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

        <Space height={16} />

        <View style={{paddingBottom: 200}}>
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
                    onPress={() => {}}
                  />
                </Row>
              </TouchableOpacity>
            )}
          />
        </View>
      </Section>
    </Container>
  );
};

export default FoodScreen;
