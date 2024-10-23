import {FirebaseAuthTypes} from '@react-native-firebase/auth';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export class Auth {
  static createProfile = async (user: FirebaseAuthTypes.User) => {
    console.log(user);

    try {
      const currentUser = auth().currentUser;
      if (user.displayName) {
        await currentUser?.updateProfile({
          displayName: user.displayName,
        });
      }

      const data = {
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        emailVerified: user.emailVerified,
        photoUrl: user.photoURL,
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
      };

      await firestore().collection('users').doc(user.uid).set(data);

      console.log('User created');
    } catch (error) {
      console.log(error);
    }
  };
  static updateProfile = async (user: FirebaseAuthTypes.User) => {
    try {
      const currentUser = auth().currentUser;
      if (user.displayName) {
        await currentUser?.updateProfile({
          displayName: user.displayName,
        });
      }

      const data = {
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        photoUrl: user.photoURL,
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
      };

      await firestore().collection('users').doc(user.uid).update(data);

      console.log('User updated');
    } catch (error) {
      console.log(error);
    }
  };
}
