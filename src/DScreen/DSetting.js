import {StyleSheet, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import {Layout, Text, Divider, Icon, Button} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {connect, useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {auth} from '../../firebase';
import {logout} from '../reducers';
import {ScrollView} from 'react-native-gesture-handler';
const DSetting = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.auth);
  const navigation = useNavigation();
  const signout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logout());
        auth.onAuthStateChanged(_user => {
          if (!_user) {
            navigation.navigate('AuthStack', {screen: 'DLogin'});
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <ScrollView width="100%" showsVerticalScrollIndicator={false}>
      <Layout style={styles.Layout}>
        <SafeAreaView>
          <Layout style={styles.MainContainer}>
            <Layout style={styles.TopHead}>
              <Icon
                style={styles.Arrow}
                fill="#0075A9"
                name="arrow-back"
                onPress={() =>
                  navigation.navigate('DoctorBottomTab', {screen: 'DHome'})
                }
              />
              <Text style={styles.Settings}>Settings</Text>
            </Layout>
            <Text style={styles.ProDetails}>View your Profile Details</Text>
            <Layout style={styles.TopHeader}>
              <Image
                source={require('../../assets/user2.png')}
                style={styles.User}
              />
              <Text style={styles.FullName}>{authUser.user.fullname}</Text>
              <Text style={styles.Role}>{authUser.user.role}</Text>
            </Layout>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AuthStack', {screen: 'DEditProfile'})
              }>
              <Layout style={styles.Profile}>
                <Icon
                  style={styles.icon}
                  fill="#8F9BB3"
                  name="person-outline"
                />
                <Text style={styles.MainText}>Account</Text>
                <Text style={styles.Desc}>Manage Your Account</Text>
              </Layout>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DoctorBottomTab', {screen: 'DPatientChat'})
              }>
              <Layout style={styles.Profile}>
                <Icon
                  style={styles.icon}
                  fill="#8F9BB3"
                  name="message-square-outline"
                />
                <Text style={styles.MainText}>Chats</Text>
                <Text style={styles.Desc}>Manage Your Chat</Text>
              </Layout>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DoctorBottomTab', {
                  screen: 'DNotification',
                })
              }>
              <Layout style={styles.Profile}>
                <Icon style={styles.icon} fill="#8F9BB3" name="bell-outline" />
                <Text style={styles.MainText}>Notifications</Text>
                <Text style={styles.Desc}>Manage Your Notifications</Text>
              </Layout>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DHelp')}>
              <Layout style={styles.Profile}>
                <Icon
                  style={styles.icon}
                  fill="#8F9BB3"
                  name="question-mark-circle-outline"
                />
                <Text style={styles.MainText}>Help</Text>
                <Text style={styles.Desc}>Get Help</Text>
              </Layout>
            </TouchableOpacity>
            <Layout style={styles.Profile}>
              <Button
                onPress={() => signout()}
                style={styles.Button}
                size="large">
                Sign Out
              </Button>
            </Layout>
          </Layout>
        </SafeAreaView>
      </Layout>
    </ScrollView>
  );
};
export default DSetting;
const styles = StyleSheet.create({
  MainContainer: {
    height: '100%',
    backgroundColor: '#fff',
    marginBottom: 80,
  },
  Layout: {
    width: '100%',
  },
  TopHead: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
  },
  Settings: {
    fontSize: 20,
    fontFamily: 'Recoleta-Bold',
    marginLeft: 10,
  },
  ProDetails: {
    fontSize: 15,
    color: '#DDDDDD',
    fontFamily: 'GTWalsheimPro-Bold',
    marginLeft: 60,
  },
  Arrow: {
    width: 30,
    height: 30,
  },
  FullName: {
    fontSize: 22,
    marginLeft: 20,
    fontFamily: 'Recoleta-Bold',
  },
  TopHeader: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
    paddingBottom: 22,
    paddingHorizontal: 30,
  },
  User: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  Role: {
    position: 'absolute',
    margin: 40,
    left: 70,
    color: '#D5D5D5',
    fontSize: 16,
    fontFamily: 'GTWalsheimPro-Regular',
  },
  Profile: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 25,
    marginHorizontal: 30,
  },
  icon: {
    height: 30,
    width: 30,
    top: 10,
  },
  MainText: {
    fontSize: 20,
    marginLeft: 30,
    fontFamily: 'Recoleta-Bold',
  },
  Desc: {
    position: 'absolute',
    marginTop: 30,
    left: 60,
    color: '#D5D5D5',
    fontSize: 16,
    fontFamily: 'GTWalsheimPro-Regular',
  },
  Button: {
    marginTop: 10,
    backgroundColor: '#0075A9',
    width: 330,
    borderColor: 'transparent',
  },
});