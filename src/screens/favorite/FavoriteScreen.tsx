/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {Row, Section, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {sizes} from '../../constants/sizes';
import {FoodModel} from '../../constants/models';

const FavoriteScreen = ({navigation}: any) => {
  const [favorites, setFavorites] = useState<FoodModel[]>([]);

  const userId = auth().currentUser?.uid;

  const getFavoritesMovies = () => {
    firestore()
      .collection('favorites')
      .doc(userId)
      .onSnapshot(item => {
        const existingFavorites = item.data()?.favorites || [];
        setFavorites(existingFavorites);
      });
  };

  useEffect(() => {
    getFavoritesMovies();
  }, []);

  return (
    <Container
      isScroll={false}
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      title="Danh sách yêu thích">
      <Space height={16} />
      {favorites.length > 0 ? (
        <FlatList
          style={{marginHorizontal: 'auto'}}
          numColumns={3}
          data={favorites}
          renderItem={({item, index}) => (
            <Row
              onPress={() => navigation.navigate('FoodDetail', {food: item})}
              key={index}
              justifyContent="flex-start"
              styles={{
                marginHorizontal: 6,
                marginVertical: 6,
                flexDirection: 'column',
              }}>
              <Image
                source={{uri: item.image}}
                width={50}
                height={50}
                style={{width: sizes.width * 0.28, height: 170}}
              />
              <Space height={8} />
              <TextComponent
                styles={{maxWidth: sizes.width * 0.28}}
                size={sizes.title}
                text={item.name}
                color={colors.black}
                font={fontFamilies.mergeRegular}
              />
            </Row>
          )}
          keyExtractor={item => item.name}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Section styles={{marginTop: 20}}>
          <Row styles={{flexDirection: 'column'}}>
            <Image
              source={require('../../assets/favorite.png')}
              width={50}
              height={50}
              style={{width: 250, height: 200}}
            />
            <TextComponent
              font={fontFamilies.mergeRegular}
              size={sizes.bigTitle}
              styles={{textAlign: 'center'}}
              color={colors.black}
              text="Chưa có món ăn yêu thích nào! Hãy thêm món vào nhé!"
            />
          </Row>
        </Section>
      )}
    </Container>
  );
};

export default FavoriteScreen;
