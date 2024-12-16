/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import StarRating from 'react-native-star-rating-widget';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../../components/InputComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {
  FoodLikes,
  FoodModel,
  Ratings,
  RatingsField,
  Reviews,
} from '../../constants/models';
import {sizes} from '../../constants/sizes';
import {useCart} from '../../context/CartContext';
import {getFoods, getRelatedFoods, updateSpecificFood} from '../../lib/actions';
import {formatVND, parseTime} from '../../utils/helper';

const FoodDetail = ({navigation, route}: any) => {
  const [foods, setFoods] = useState<FoodModel[]>([]);
  const [relatedFoods, setRelatedFoods] = useState<FoodModel[]>([]);
  const [favorites, setFavorites] = useState<FoodModel[]>([]);
  const [foodLikes, setFoodLikes] = useState<FoodLikes>();
  const [commentValue, setCommentValue] = useState('');
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [rating, setRating] = useState(0);
  const [ratingsData, setRatingsData] = useState<RatingsField[]>([]);

  const user = auth().currentUser;
  const userId = auth().currentUser?.uid;
  const {food} = route.params;
  const foodName = food.name;
  const foodId = food.id;
  const {cart, addToCart, handleDecrement, handleIncrement}: any = useCart();

  const checkCart = cart.filter((item: any) => item.id === food.id);
  const isInCart = checkCart.length > 0;

  const handleGetComments = () => {
    firestore()
      .collection('reviews')
      .where('name', '==', foodName)
      .onSnapshot((snapshot: any) => {
        const items = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(items);
      });
  };

  const getFoodRating = () => {
    firestore()
      .collection('ratings')
      .where('name', '==', foodName)
      .onSnapshot((snapshot: any) => {
        const items = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRatingsData(items);
        const ratingUser = items[0].ratings.filter(
          (item: any) => item.userId === userId,
        );
        setRating(ratingUser[0].userRating ?? 0);
      });
  };

  const getFavoritesMovies = () => {
    firestore()
      .collection('favorites')
      .doc(userId)
      .onSnapshot(item => {
        const existingFavorites = item.data()?.favorites || [];
        setFavorites(existingFavorites);
      });
  };

  const getFoodLikes = () => {
    firestore()
      .collection('foods')
      .doc(food.name)
      .onSnapshot((item: any) => {
        setFoodLikes(item.data() || []);
      });
  };

  const handlePostComments = async () => {
    if (!commentValue) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Vui lòng nhập bình luận của bạn',
      });
      return;
    }

    const commentData = {
      user: user?.displayName,
      userComments: commentValue,
      userId: user?.uid,
      photoUrl: user?.photoURL ?? '',
      timestamp: new Date(),
    };

    if (reviews.length > 0) {
      await firestore()
        .doc(`reviews/${reviews[0].id}`)
        .update({
          comments: firestore.FieldValue.arrayUnion(commentData),
        });
    } else {
      await firestore()
        .collection('reviews')
        .add({
          name: foodName,
          comments: [commentData],
        });
    }
    setCommentValue('');
  };

  const handleRatingChange = async (ratingValue: number) => {
    setRating(ratingValue);

    const ratingData = {
      user: user?.displayName,
      userRating: ratingValue,
      userId: user?.uid,
      photoUrl: user?.photoURL ?? '',
      timestamp: new Date(),
    };

    const updatedFood = {...food};

    if (ratingsData?.length > 0) {
      const existingRatings: any = ratingsData[0].ratings;

      const updatedRatings: any = existingRatings.map((item: Ratings) =>
        item.userId === userId ? {...item, userRating: ratingValue} : item,
      );

      const isUserRated = existingRatings.some(
        (item: Ratings) => item.userId === userId,
      );
      if (!isUserRated) {
        updatedRatings.push(ratingData);
      }

      const allRatingValue = updatedRatings.reduce(
        (acc: number, ratingCur: any) => acc + ratingCur.userRating,
        0,
      );

      const ratingAverage = allRatingValue / updatedRatings.length;

      updatedFood.rating = ratingAverage;
      updatedFood.reviews_count = updatedFood.reviews_count
        ? updatedFood.reviews_count + 1
        : 1;

      await updateSpecificFood(updatedFood, foodId);

      await firestore().doc(`ratings/${ratingsData[0].id}`).update({
        ratings: updatedRatings,
      });
    } else {
      await firestore()
        .collection('ratings')
        .add({
          name: foodName,
          ratings: [ratingData],
        });

      updatedFood.rating = ratingValue;
      updatedFood.reviews_count = updatedFood.reviews_count
        ? updatedFood.reviews_count + 1
        : 1;

      await updateSpecificFood(updatedFood, foodId);
    }
  };

  const handleDeleteComment = async (index: number, reviewsData: Reviews) => {
    try {
      await firestore()
        .collection('reviews')
        .doc(reviewsData.id)
        .update({
          comments: firestore.FieldValue.arrayRemove(
            reviewsData.comments[index],
          ),
        });
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Xóa bình luận thành công',
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Xóa bình luận thất bại',
      });
    }
  };

  const addLikeFood = async (name: string, userIdProp: string | undefined) => {
    if (!userId) {
      return;
    }

    const userRef = firestore().collection('foods').doc(food.name);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      const existingLikes = userDoc.data()?.likes || [];
      const specificUser = existingLikes.filter(
        (item: string) => item === userId,
      );
      const updatedLikes =
        specificUser.length > 0
          ? existingLikes.filter((item: string) => item !== userIdProp)
          : [...existingLikes, userIdProp];
      await userRef.update({likes: updatedLikes});
    } else {
      await userRef.set({
        name,
        likes: [userIdProp],
      });
    }
  };

  const addFavoriteMovie = async (foodItem: FoodModel) => {
    if (!userId) {
      return;
    }
    const userRef = firestore().collection('favorites').doc(userId);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      const existingFavorites = userDoc.data()?.favorites || [];
      const specificItem = existingFavorites.filter(
        (item: FoodModel) => item.name === foodItem.name,
      );
      const updatedFavorites =
        specificItem.length > 0
          ? existingFavorites.filter(
              (item: FoodModel) => item.name !== foodItem.name,
            )
          : [...existingFavorites, foodItem];
      await userRef.update({favorites: updatedFavorites});
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2:
          specificItem.length > 0
            ? 'Xóa khỏi danh sách thành công'
            : 'Thêm vào danh sách yêu thích thành công',
      });
    } else {
      await userRef.set({
        id: userId,
        favorites: [foodItem],
      });
    }
  };

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
    handleGetComments();
    handleGetSpecificFoods();
    handleGetFoods();
    getFavoritesMovies();
    getFoodLikes();
    getFoodRating();
  }, []);

  let filterFoods = [...relatedFoods];

  if (relatedFoods.length <= 0) {
    filterFoods = foods.filter(item => item.id !== Number(food.id)).slice(0, 8);
  }

  console.log('ratings: ', ratingsData);
  console.log('reviews: ', reviews);

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
                  <Row
                    styles={{
                      flexDirection: 'column',
                      borderTopColor: colors.grey2,
                      borderTopWidth: 2,
                      paddingTop: 16,
                    }}
                    alignItems="flex-start">
                    <TextComponent
                      text="Đánh giá"
                      size={sizes.bigTitle}
                      color={colors.black}
                    />
                    <Space height={8} />
                    <StarRating
                      rating={rating}
                      onChange={ratingValue => handleRatingChange(ratingValue)}
                    />
                  </Row>
                </Section>

                <Space height={8} />

                <Section>
                  <Row
                    justifyContent="flex-start"
                    styles={{
                      borderTopColor: colors.grey2,
                      borderTopWidth: 2,
                      borderBottomColor: colors.grey2,
                      borderBottomWidth: 2,
                      paddingVertical: 20,
                    }}>
                    <Row
                      alignItems="center"
                      styles={{flexDirection: 'column', gap: 2}}>
                      <TouchableOpacity
                        onPress={() => addLikeFood(food.name, userId)}>
                        {foodLikes &&
                        foodLikes?.likes?.filter(
                          (item: string) => item === userId,
                        ).length > 0 ? (
                          <AntDesign
                            name="heart"
                            size={32}
                            color={colors.red}
                          />
                        ) : (
                          <AntDesign
                            name="heart"
                            size={32}
                            color={colors.black}
                          />
                        )}
                      </TouchableOpacity>
                      <TextComponent
                        size={sizes.title}
                        color={colors.black}
                        text={`${foodLikes?.likes?.length ?? 0}`}
                      />
                    </Row>

                    <Space width={24} />

                    <Row
                      alignItems="center"
                      styles={{flexDirection: 'column', gap: 2}}>
                      <TouchableOpacity onPress={() => addFavoriteMovie(food)}>
                        {favorites.filter(
                          (item: FoodModel) => item.name === food.name,
                        ).length > 0 ? (
                          <Entypo name="check" size={32} color={colors.black} />
                        ) : (
                          <Entypo name="plus" size={32} color={colors.black} />
                        )}
                      </TouchableOpacity>
                      <TextComponent
                        size={sizes.title}
                        color={colors.black}
                        text="Danh sách"
                      />
                    </Row>
                  </Row>

                  <Space height={20} />

                  <Row
                    alignItems="flex-start"
                    styles={{
                      flexDirection: 'column',
                      borderBottomColor: colors.grey2,
                      borderBottomWidth: 2,
                      paddingBottom: 8,
                    }}>
                    <TextComponent
                      text="Bình luận"
                      font={fontFamilies.mergeRegular}
                      size={sizes.title}
                      color={colors.black}
                    />
                    <Space height={12} />
                    <Row justifyContent="flex-start" styles={{width: '100%'}}>
                      <Input
                        bordered={false}
                        color="transparent"
                        styles={{
                          width: sizes.width - 40,
                          paddingHorizontal: 0,
                        }}
                        value={commentValue}
                        onChange={setCommentValue}
                        placeholderColor={colors.black}
                        inputStyles={{color: colors.black}}
                        placeholder="Nhập bình luận"
                        prefix={
                          user?.photoURL ? (
                            <Row
                              styles={{
                                position: 'relative',
                                borderRadius: 100,
                                width: 30,
                                height: 30,
                                overflow: 'hidden',
                              }}>
                              <Image
                                source={{uri: user.photoURL}}
                                width={20}
                                height={20}
                                style={{width: 30, height: 30}}
                              />
                            </Row>
                          ) : (
                            <FontAwesome6
                              name="circle-user"
                              color={colors.black}
                              size={30}
                            />
                          )
                        }
                        affix={
                          <TouchableOpacity onPress={handlePostComments}>
                            <Ionicons
                              name="send"
                              color={colors.black}
                              size={24}
                            />
                          </TouchableOpacity>
                        }
                      />
                    </Row>
                    <Space height={4} />
                    {reviews?.length > 0 ? (
                      <View>
                        <Row
                          alignItems="flex-start"
                          styles={{flexDirection: 'column'}}>
                          {reviews[0]?.comments.map((item, index) => (
                            <Row
                              styles={{
                                position: 'relative',
                                marginBottom: 10,
                                width: sizes.width - 50,
                              }}
                              alignItems="flex-start"
                              justifyContent="space-between"
                              key={index}>
                              <Row alignItems="flex-start">
                                {item?.photoUrl ? (
                                  <Row
                                    styles={{
                                      position: 'relative',
                                      borderRadius: 100,
                                      width: 30,
                                      height: 30,
                                      overflow: 'hidden',
                                    }}>
                                    <Image
                                      source={{uri: item.photoUrl}}
                                      width={20}
                                      height={20}
                                      style={{width: 30, height: 30}}
                                    />
                                  </Row>
                                ) : (
                                  <FontAwesome6
                                    name="circle-user"
                                    color={colors.white}
                                    size={30}
                                  />
                                )}
                                <Space width={12} />
                                <Row
                                  alignItems="flex-start"
                                  styles={{flexDirection: 'column'}}>
                                  <TextComponent
                                    font={fontFamilies.mergeRegular}
                                    color={colors.black}
                                    text={item.user}
                                  />
                                  <TextComponent
                                    styles={{maxWidth: sizes.width * 0.5}}
                                    color={colors.black}
                                    text={item.userComments}
                                  />
                                </Row>
                              </Row>
                              <Row>
                                <TextComponent
                                  styles={{
                                    textAlign: 'right',
                                  }}
                                  color={colors.black}
                                  text={parseTime(item.timestamp)}
                                />
                                {item?.userId === user?.uid && (
                                  <>
                                    <Space width={8} />
                                    <TouchableOpacity
                                      onPress={() =>
                                        handleDeleteComment(index, reviews[0])
                                      }>
                                      <TextComponent
                                        font={fontFamilies.mergeRegular}
                                        text="Xóa"
                                        color={colors.red}
                                      />
                                    </TouchableOpacity>
                                  </>
                                )}
                              </Row>
                            </Row>
                          ))}
                        </Row>
                      </View>
                    ) : (
                      <Section>
                        <Row>
                          <TextComponent
                            font={fontFamilies.mergeRegular}
                            color={colors.black}
                            text="Chưa có bình luận nào"
                          />
                        </Row>
                      </Section>
                    )}
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
