/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Row, Section, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import {Google} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {Auth} from '../../utils/handleAuth';

const initialValue = {
  username: '',
  email: '',
  password: '',
  confirm: '',
};

const SignUp = ({navigation}: any) => {
  const [registerForm, setRegisterForm] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeValue = (val: string, key: string) => {
    const items: any = {...registerForm};

    if (val && key) {
      items[`${key}`] = val;

      setRegisterForm(items);
    }
  };

  const handleSignUp = async () => {
    if (!registerForm.email || !registerForm.password) {
      return;
    }

    setIsLoading(true);
    try {
      const credentialUser = await auth().createUserWithEmailAndPassword(
        registerForm.email,
        registerForm.password,
      );

      const user = credentialUser.user;
      if (user) {
        if (registerForm.username) {
          await user.updateProfile({
            displayName: registerForm.username,
          });
        }
        await Auth.createProfile();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Container isScroll={false}>
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
          text="Đăng ký tài khoản"
          styles={{textAlign: 'center'}}
        />
      </Section>

      <ScrollView>
        <Section>
          <Input
            label="Tên người dùng"
            value={registerForm.username}
            onChange={val => handleChangeValue(val, 'username')}
          />
          <Input
            label="Email"
            value={registerForm.email}
            onChange={val => handleChangeValue(val, 'email')}
          />
          <Input
            label="Mật khẩu"
            password
            value={registerForm.password}
            onChange={val => handleChangeValue(val, 'password')}
          />
          <Input
            label="Nhập lại mật khẩu"
            password
            value={registerForm.confirm}
            onChange={val => handleChangeValue(val, 'confirm')}
          />
          <Button
            loading={isLoading}
            title="Đăng ký"
            color={colors.black}
            onPress={handleSignUp}
          />
        </Section>

        <Section>
          <Row justifyContent="flex-end">
            <TextComponent text="Đã có tài khoản?" />
            <Space width={10} />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <TextComponent text="Đăng nhập ngay" />
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
            title="Đăng ký với Google"
            onPress={() => {}}
          />
        </Section>
      </ScrollView>
    </Container>
  );
};

export default SignUp;
