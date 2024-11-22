/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Row, Section, Space} from '@bsdaoquang/rncomponent';
import {Google} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {Auth} from '../../utils/handleAuth';

import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Hãy điền chính xác và đầy đủ thông tin',
      });
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      if (user) {
        await Auth.updateProfile(user);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Lỗi đăng nhập! Vui lòng kiểm tra lại thông tin',
      });
      setIsLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo?.data?.idToken;

      if (!idToken) {
        throw new Error('Failed to get idToken from Google Sign-in');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.log(error.message);
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Lỗi đăng nhập với Google! Vui lòng thử lại',
      });
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '146596695929-he487k39kjasge7k6ajp419q3v9e81vm.apps.googleusercontent.com',
    });
  }, []);

  return (
    <Container>
      <Section>
        <Row styles={{paddingTop: 20}}>
          <Image
            source={require('../../assets/logo.png')}
            width={40}
            height={40}
            style={{width: 150, height: 150}}
          />
        </Row>
      </Section>

      <Section>
        <TextComponent
          size={22}
          types="bigTitle"
          text="Chào mừng trở lại với FastFood Shop"
          styles={{textAlign: 'center'}}
        />
      </Section>

      <Section>
        <Input
          label="Tên đăng nhập"
          value={email}
          onChange={val => setEmail(val)}
        />
        <Input
          label="Mật khẩu"
          password
          value={password}
          onChange={val => setPassword(val)}
        />
        <Button
          title="Đăng nhập"
          loading={isLoading}
          color={colors.black}
          onPress={handleLogin}
        />
      </Section>

      <Section>
        <Row justifyContent="flex-end">
          <TextComponent text="Chưa có tài khoản?" />
          <Space width={10} />
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <TextComponent text="Đăng ký ngay" />
          </TouchableOpacity>
        </Row>
      </Section>

      <TextComponent
        text="Hoặc"
        styles={{textAlign: 'center', textTransform: 'uppercase'}}
      />

      <Space height={15} />

      <Section>
        <Button
          icon={<Google size={18} color={colors.white} />}
          color={colors.blue}
          title="Đăng nhập với Google"
          onPress={handleLoginWithGoogle}
        />
      </Section>
    </Container>
  );
};

export default Login;
