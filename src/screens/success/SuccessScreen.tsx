/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {useShippingForm} from '../../context/ShippingFormContext';
import Toast from 'react-native-toast-message';

const SuccessScreen = ({navigation}: any) => {
  const [second, setSecond] = useState(15);

  const {formData, resetFormData}: any = useShippingForm();

  const handleReturn = () => {
    navigation.navigate('HomeScreen');
    resetFormData();
  };

  useEffect(() => {
    Toast.show({
      type: 'success',
      text1: 'Thông báo',
      text2: 'Đơn hàng của bạn đã được đặt thành công',
    });

    const countdown = setInterval(() => {
      setSecond(prevSeconds => prevSeconds - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigation.navigate('HomeScreen');
      resetFormData();
    }, 15000);

    return () => {
      clearInterval(countdown);
      clearTimeout(timeout);
    };
  }, [resetFormData, formData, navigation]);

  return (
    <Section
      styles={{
        paddingVertical: 40,
      }}>
      <Row
        styles={{
          borderRadius: 100,
          width: 210,
          height: 210,
          marginHorizontal: 'auto',
          backgroundColor: colors.grey5,
        }}>
        <TextComponent size={80} styles={{textAlign: 'center'}} text="✅" />
      </Row>
      <Space height={24} />
      <TextComponent
        styles={{textAlign: 'center'}}
        size={18}
        text="🎊 Đơn hàng đã được đặt thành công 🎊"
      />
      <Space height={4} />
      <TextComponent
        styles={{textAlign: 'center'}}
        size={18}
        text="Chân thành cảm ơn quý khách đã tin tưởng sử dụng dịch vụ của chúng tôi"
      />
      <Space height={4} />
      <TextComponent
        size={16}
        styles={{textAlign: 'center'}}
        text={`Tự động trở về trang chủ trong ${second} giây`}
      />
      <Space height={16} />

      <View
        style={{
          width: '100%',
          height: 1,
          marginVertical: 15,
          backgroundColor: colors.black4,
        }}
      />

      <TextComponent
        styles={{textAlign: 'center'}}
        size={20}
        text="Thông tin đơn hàng"
      />
      <Space height={8} />
      <Row
        styles={{
          flexDirection: 'column',
          gap: 6,
        }}
        alignItems="flex-start">
        <TextComponent size={16} text={`🪪 Mã khách hàng: #${formData.id}`} />
        <TextComponent size={16} text={`💬 Khách hàng: ${formData.name}`} />
        <TextComponent size={16} text={`📧 Email: ${formData.email}`} />
        <TextComponent size={16} text={`🏠 Địa chỉ: ${formData.address}`} />
        <TextComponent size={16} text={`📞 Số điện thoại: ${formData.phone}`} />
      </Row>
      <Space height={28} />
      <Row>
        <Button
          radius={6}
          textStyleProps={{fontFamily: fontFamilies.mergeBold}}
          color={colors.red}
          title="Trở về trang chủ"
          onPress={handleReturn}
        />
      </Row>
    </Section>
  );
};

export default SuccessScreen;
