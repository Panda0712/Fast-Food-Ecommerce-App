/* eslint-disable react-native/no-inline-styles */
import {Row, Section, Space} from '@bsdaoquang/rncomponent';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';

import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({navigation}: any) => {
  const user = auth().currentUser;

  return (
    <Container style={{backgroundColor: colors.red}}>
      <Row
        justifyContent="center"
        styles={{
          paddingVertical: 12,
        }}>
        <Image
          source={require('../../assets/logo.png')}
          width={100}
          height={100}
          style={{
            borderRadius: 100,
            width: 120,
            height: 120,
            borderColor: colors.white,
            borderWidth: 2,
          }}
        />
      </Row>

      <Section>
        <TextComponent
          size={24}
          font={fontFamilies.mergeBold}
          color={colors.white}
          styles={{textAlign: 'center'}}
          text={user?.displayName ?? ''}
        />
        <Space height={4} />
        <TextComponent
          size={18}
          color={colors.white}
          styles={{textAlign: 'center'}}
          text="Thông tin tài khoản"
        />
      </Section>

      <Space height={16} />

      <View style={{backgroundColor: colors.white}}>
        <TouchableOpacity onPress={() => navigation.navigate('OrderScreen')}>
          <Row
            justifyContent="space-between"
            styles={{
              paddingHorizontal: 8,
              paddingVertical: 16,
              borderBottomColor: colors.grey2,
              borderBottomWidth: 1,
            }}>
            <Row>
              <FontAwesome6 name="clipboard-list" size={20} />
              <Space width={10} />
              <TextComponent size={18} text="Danh sách đơn hàng" />
            </Row>
            <Ionicons name="chevron-forward" size={20} />
          </Row>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ServiceScreen')}>
          <Row
            justifyContent="space-between"
            styles={{
              paddingHorizontal: 8,
              paddingVertical: 16,
              borderBottomColor: colors.grey2,
              borderBottomWidth: 1,
            }}>
            <Row>
              <AntDesign name="customerservice" size={20} />
              <Space width={10} />
              <TextComponent size={18} text="Dịch vụ" />
            </Row>
            <Ionicons name="chevron-forward" size={20} />
          </Row>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ContactScreen')}>
          <Row
            justifyContent="space-between"
            styles={{
              paddingHorizontal: 8,
              paddingVertical: 16,
              borderBottomColor: colors.grey2,
              borderBottomWidth: 1,
            }}>
            <Row>
              <AntDesign name="contacts" size={20} />
              <Space width={10} />
              <TextComponent size={18} text="Liên hệ" />
            </Row>
            <Ionicons name="chevron-forward" size={20} />
          </Row>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AboutScreen')}>
          <Row
            justifyContent="space-between"
            styles={{
              paddingHorizontal: 8,
              paddingVertical: 16,
              borderBottomColor: colors.grey2,
              borderBottomWidth: 1,
            }}>
            <Row>
              <Ionicons name="information-circle" size={20} />
              <Space width={10} />
              <TextComponent size={18} text="Thông tin liên lạc" />
            </Row>
            <Ionicons name="chevron-forward" size={20} />
          </Row>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => auth().signOut()}>
          <Row
            justifyContent="space-between"
            styles={{
              paddingHorizontal: 8,
              paddingVertical: 16,
              borderBottomColor: colors.grey2,
              borderBottomWidth: 1,
            }}>
            <Row>
              <FontAwesome name="sign-out" size={20} />
              <Space width={10} />
              <TextComponent size={18} text="Đăng xuất" />
            </Row>
            <Ionicons name="chevron-forward" size={20} />
          </Row>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default ProfileScreen;
