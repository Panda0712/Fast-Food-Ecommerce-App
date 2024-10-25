/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';

const ServiceScreen = ({navigation}: any) => {
  return (
    <Container
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      title="Dịch vụ">
      <Section styles={{marginTop: 16}}>
        <TextComponent size={20} text="Dịch vụ của chúng tôi" />
        <TextComponent
          color={colors.grey4}
          size={18}
          text="Chúng tôi cung cấp những dịch vụ cần thiết để phục vụ bạn tốt nhất"
        />
      </Section>

      <Section styles={{alignItems: 'flex-start'}}>
        <Row
          alignItems="center"
          justifyContent="space-between"
          styles={{
            width: '100%',
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 8,
            backgroundColor: colors.grey5,
            elevation: 3,
          }}>
          <Row styles={{flexDirection: 'column'}} alignItems="flex-start">
            <TextComponent size={20} text="Thanh toán khi nhận hàng" />
            <TextComponent
              styles={{maxWidth: 200}}
              text="Chúng tôi hỗ trợ bạn đặt hàng online và thanh toán trực tiếp khi nhận được hàng."
            />
            <Space height={12} />
            <Button
              textStyleProps={{
                fontFamily: fontFamilies.mergeBold,
                fontSize: 14,
              }}
              size="small"
              color={colors.red}
              radius={8}
              title="Xem thêm"
              onPress={() => navigation.navigate('FoodTab')}
            />
          </Row>
          <Space width={12} />
          <Image
            source={require('../../assets/icon1.png')}
            width={100}
            height={100}
            style={{width: 100, height: 100}}
          />
        </Row>

        <Space height={20} />

        <Row
          alignItems="center"
          justifyContent="space-between"
          styles={{
            width: '100%',
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 8,
            backgroundColor: colors.grey,
            elevation: 3,
          }}>
          <Row styles={{flexDirection: 'column'}} alignItems="flex-start">
            <TextComponent size={20} text="Thanh toán trực tiếp" />
            <TextComponent
              styles={{maxWidth: 200}}
              text="Bạn cũng có thể thanh toán trực tiếp qua hình thức chuyển khoản cho chúng tôi."
            />
            <Space height={12} />
            <Button
              textStyleProps={{
                fontFamily: fontFamilies.mergeBold,
                fontSize: 14,
              }}
              size="small"
              color={colors.red}
              radius={8}
              title="Xem thêm"
              onPress={() => navigation.navigate('FoodTab')}
            />
          </Row>
          <Space width={12} />
          <Image
            source={require('../../assets/icon2.png')}
            width={100}
            height={100}
            style={{width: 100, height: 100}}
          />
        </Row>

        <Space height={20} />

        <Row
          alignItems="center"
          justifyContent="space-between"
          styles={{
            width: '100%',
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 8,
            backgroundColor: colors.grey5,
            elevation: 3,
          }}>
          <Row styles={{flexDirection: 'column'}} alignItems="flex-start">
            <TextComponent size={20} text="Đặt tiệc lớn" />
            <TextComponent
              styles={{maxWidth: 200}}
              text="Hãy liên hệ trực tiếp với chúng tôi thông qua đường dây nóng nếu bạn muốn đặt tiệc lớn."
            />
            <Space height={12} />
            <Button
              textStyleProps={{
                fontFamily: fontFamilies.mergeBold,
                fontSize: 14,
              }}
              size="small"
              color={colors.red}
              radius={8}
              title="Xem thêm"
              onPress={() => navigation.navigate('FoodTab')}
            />
          </Row>
          <Space width={12} />
          <Image
            source={require('../../assets/icon3.png')}
            width={100}
            height={100}
            style={{width: 100, height: 100}}
          />
        </Row>
      </Section>
    </Container>
  );
};

export default ServiceScreen;
