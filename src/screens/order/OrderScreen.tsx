/* eslint-disable react-native/no-inline-styles */
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {getSpecificUser} from '../../lib/actions';
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import {fontFamilies} from '../../constants/fontFamilies';
import OrderHistory from './components/OrderHistory';
import {GuestModel} from '../../constants/models';

const OrderScreen = ({navigation}: any) => {
  const [guestData, setGuestData] = useState<GuestModel>();
  const [isLoading, setIsLoading] = useState(false);

  const user = auth().currentUser;
  const userEmail: string = user?.email || '';

  const getUser = async (email: string) => {
    setIsLoading(true);
    const {guest} = await getSpecificUser(email);
    setGuestData(guest);
    setIsLoading(false);
  };

  useEffect(() => {
    getUser(userEmail);
  }, [userEmail]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Container
      isScroll={false}
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      title="Lịch sử đặt hàng">
      <Section styles={{marginTop: 20}}>
        <TextComponent
          styles={{textAlign: 'center'}}
          size={24}
          text="Lịch sử đặt hàng của bạn"
        />
        {!guestData?.id && (
          <>
            <Space height={8} />
            <TextComponent
              size={18}
              styles={{textAlign: 'center'}}
              text="Bạn chưa có đơn hàng nào! Hãy mua hàng đã nhé 😉"
            />
          </>
        )}
        {!guestData?.id && (
          <Row styles={{marginTop: 20, flexDirection: 'column'}}>
            <Image
              source={require('../../assets/seeyou.png')}
              width={100}
              height={100}
              style={{width: 300, height: 300}}
            />
            <Space height={12} />
            <Button
              radius={12}
              textStyleProps={{
                fontFamily: fontFamilies.mergeBold,
                fontSize: 16,
              }}
              color={colors.orange}
              title="🍕 Bắt đầu mua hàng nào 🍔"
              onPress={() => navigation.navigate('FoodTab')}
            />
          </Row>
        )}
      </Section>
      {guestData?.id ? <OrderHistory guestData={guestData} /> : <></>}
    </Container>
  );
};

export default OrderScreen;
