/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import React from 'react';
import {Image, View} from 'react-native';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';

import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
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
        <Button
          inline
          radius={0}
          styles={{justifyContent: 'space-between'}}
          title="Danh sách đơn hàng"
          iconPosition="right"
          icon={<Ionicons name="chevron-forward" size={18} />}
          onPress={() => {}}
        />
        <Button
          inline
          radius={0}
          styles={{justifyContent: 'space-between'}}
          title="Dịch vụ"
          iconPosition="right"
          icon={<Ionicons name="chevron-forward" size={18} />}
          onPress={() => {}}
        />
        <Button
          inline
          radius={0}
          styles={{justifyContent: 'space-between'}}
          title="Liên hệ"
          iconPosition="right"
          icon={<Ionicons name="chevron-forward" size={18} />}
          onPress={() => {}}
        />
        <Button
          inline
          radius={0}
          styles={{justifyContent: 'space-between'}}
          title="Đăng xuất"
          iconPosition="right"
          icon={<Ionicons name="chevron-forward" size={18} />}
          onPress={() => auth().signOut()}
        />
      </View>
    </Container>
  );
};

export default ProfileScreen;
