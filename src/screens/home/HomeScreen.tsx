/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Row, Section} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import {Firstline, SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {icons} from '../../constants/icons';
import {CategoryModel, FoodModel} from '../../constants/models';
import {getCategories, getFoods} from '../../lib/actions';

const HomeScreen = () => {
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
    <Container>
      <Section styles={{paddingHorizontal: 16, paddingVertical: 16}}>
        <Row justifyContent="space-between">
          <TextComponent
            size={20}
            text={`Xin chào, ${user?.displayName ?? ''}`}
          />
          <TouchableOpacity>
            <Firstline size="36" color={colors.black} />
          </TouchableOpacity>
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
              backgroundColor:
                icons[index].type === selectedCategory
                  ? colors.yellow
                  : colors.grey,
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
            }}>
            <MaterialCommunityIcons
              name={icons[index].name}
              size={24}
              color={
                icons[index].type === selectedCategory
                  ? colors.black
                  : colors.orange
              }
            />
            <TextComponent
              text={item.name}
              size={15}
              styles={{textAlign: 'center'}}
            />
          </TouchableOpacity>
        )}
      />

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
          <TouchableOpacity>
            <Row
              styles={{
                width: 160,
                flexDirection: 'column',
                marginHorizontal: 12,
                borderRadius: 10,
                overflow: 'hidden',
                backgroundColor: colors.grey,
                elevation: 2,
              }}>
              <Image
                source={{uri: item.image}}
                style={{width: '100%', height: 100}}
              />
              <TextComponent
                size={18}
                text={item.name}
                styles={{
                  width: 120,
                  height: 45,
                  marginTop: 4,
                  textAlign: 'center',
                }}
              />

              <TextComponent text={item.regularPrice.toString()} size={15} />
              <Button
                size="small"
                styles={{marginVertical: 12}}
                title="Thêm vào giỏ"
                color={colors.yellow2}
                onPress={() => {}}
              />
            </Row>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default HomeScreen;
