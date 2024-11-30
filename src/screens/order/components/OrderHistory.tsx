/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, View} from 'react-native';
import {TextComponent} from '../../../components';
import {colors} from '../../../constants/colors';
import {FoodModel, OrderModel} from '../../../constants/models';
import {HISTORY_PAGE_SIZE} from '../../../constants/sizes';
import {
  getOrdersCount,
  getPaginationOrders,
  getSpecificFoods,
} from '../../../lib/actions';
import {parseDateTime} from '../../../utils/helper';

type RootStackParamList = {
  FoodDetail: {
    food: FoodModel | Record<string, never>;
  };
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FoodDetail'
>;

const DEFAULT_FOOD_IMAGE = 'https://via.placeholder.com/120';

const OrderHistory = ({guestData}: any) => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [foodsData, setFoodsData] = useState<FoodModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);

  const navigation = useNavigation<NavigationProp>();

  const handleGetOrders = async (page: number) => {
    if (!hasMoreData || loading) {
      return;
    }

    try {
      setLoading(true);
      const start = (page - 1) * HISTORY_PAGE_SIZE;
      const end = start + HISTORY_PAGE_SIZE - 1;

      if (page === 1) {
        const {count}: any = await getOrdersCount(guestData.id);
        setTotalOrders(count);
      }

      const {paginationOrders}: any = await getPaginationOrders(
        guestData.id,
        start,
        end,
      );

      if (paginationOrders?.length) {
        const foodIds = paginationOrders.map((order: any) => order.foodId);
        const {foods}: any = await getSpecificFoods(foodIds);

        if (page === 1) {
          setOrders(paginationOrders);
          setFoodsData(foods);
        } else {
          setOrders(prevOrders => [...prevOrders, ...paginationOrders]);
          setFoodsData(prevFoods => [...prevFoods, ...foods]);
        }

        setHasMoreData(paginationOrders.length === HISTORY_PAGE_SIZE);
      } else {
        if (page === 1) {
          setOrders([]);
          setFoodsData([]);
        }
        setHasMoreData(false);
      }
    } catch (error) {
      console.error('Error fetching page data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMoreData && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      handleGetOrders(nextPage);
    }
  };

  useEffect(() => {
    if (guestData?.id) {
      handleGetOrders(1);
    }
  }, [guestData?.id]);

  return (
    <Section styles={{paddingBottom: 150}}>
      <TextComponent
        styles={{textAlign: 'center'}}
        size={18}
        text={`Có ${totalOrders.toString()} đơn hàng trong lịch sử mua hàng của bạn 📆`}
      />
      <Space height={24} />
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                width: '90%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {loading && <ActivityIndicator size={'large'} />}
            </View>
          );
        }}
        renderItem={({item, index}) => (
          <Section key={index}>
            <Row justifyContent="flex-start" alignItems="flex-start">
              <Image
                source={{
                  uri:
                    foodsData.find(food => food.id === item.foodId)?.image ||
                    DEFAULT_FOOD_IMAGE,
                }}
                defaultSource={require('../../../assets/default.webp')}
                width={50}
                height={50}
                style={{width: 120, height: 120, borderRadius: 4}}
              />
              <Space width={16} />
              <Row
                alignItems="flex-start"
                styles={{flexDirection: 'column', gap: 3}}>
                <TextComponent
                  numberOfLines={1}
                  size={16}
                  text={
                    foodsData.find(food => food.id === item.foodId)?.name || ''
                  }
                />
                <TextComponent text={`Đơn hàng #${item.id}`} />
                <TextComponent
                  size={12}
                  styles={{
                    backgroundColor: item.isPaid
                      ? colors.twitter
                      : colors.instagram,
                    paddingVertical: 4,
                    paddingHorizontal: 6,
                    color: colors.white,
                    borderRadius: 12,
                  }}
                  text={item.isPaid ? '🥇 Đã thanh toán' : '🥉 Chưa thanh toán'}
                />
                <TextComponent
                  text={`Ngày đặt hàng: ${
                    parseDateTime(item.orderTime).formattedDate
                  }`}
                />
                <Space height={2} />
                <Button
                  type="link"
                  size="small"
                  title="Xem chi tiết"
                  onPress={() =>
                    navigation.navigate('FoodDetail', {
                      food:
                        foodsData.find(food => food.id === item.foodId) || {},
                    })
                  }
                />
              </Row>
            </Row>
          </Section>
        )}
      />
    </Section>
  );
};

export default OrderHistory;
