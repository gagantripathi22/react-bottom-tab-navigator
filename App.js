import * as React from 'react';
import { useState, useRef } from 'react';
import { View, Text, FlatList, StatusBar, StyleSheet, TouchableNativeFeedback, Animated, ScrollView, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigationBar from 'react-native-navbar-color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMatCom from 'react-native-vector-icons/MaterialCommunityIcons';

console.disableYellowBox = true;
NavigationBar.setColor('#FFFEFF');

// if (Platform.OS === "android")

function ChatScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text>Chat!</Text>
    </View>
  );
}

function MailScreen() {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 75);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 75],
    outputRange: [0, -75],
  })
  const [productList, setProductCard] = useState([
    { dealerName: 'A', businessName: 'One', key: '1', },
    { dealerName: 'B', businessName: 'Two', key: '2', },
    { dealerName: 'C', businessName: 'Three', key: '3', },
    { dealerName: 'D', businessName: 'Four', key: '4', },
    { dealerName: 'E', businessName: 'Five', key: '5', },
    { dealerName: 'G', businessName: 'Six', key: '6', },
    { dealerName: 'H', businessName: 'Seven', key: '7', },
    { dealerName: 'A', businessName: 'One', key: '8', },
    { dealerName: 'B', businessName: 'Two', key: '9', },
    { dealerName: 'C', businessName: 'Three', key: '10', },
    { dealerName: 'D', businessName: 'Four', key: '11', },
    { dealerName: 'E', businessName: 'Five', key: '12', },
    { dealerName: 'G', businessName: 'Six', key: '13', },
    { dealerName: 'H', businessName: 'Seven', key: '14', },
  ]);
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff', }}>
      <Animated.View
        style={{
          transform: [
            { translateY: translateY }
          ],
          elevation: 100,
        }}
      >
        <View style={{
          alignSelf: 'center',
          height: 55,
          width: Dimensions.get('window').width - 30,
          backgroundColor: '#fff',
          borderRadius: 10,
          marginTop: 15,
          marginBottom: 15,
          position: 'absolute',
          flexDirection: 'row',
          alignItems: 'center',

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          shadowRadius: 2.22,
          elevation: 3,
        }}>
        </View>
      </Animated.View>
      <FlatList
        // style={{ paddingTop: 75 }}
        // style={{ paddingBottom: 80 }}
        numColumns={1}
        data={productList}
        ListHeaderComponent={
          <View style={{
            height: 80,
          }}>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.listItem}>
          </View>
        )}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y)
        }}
      />
    </View>
  );
}

function VideoScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text>Meet!</Text>
    </View>
  );
}

function RoomScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text>Rooms!</Text>
    </View>
  );
}

// function FloatingButton(state) {
//   return (
//     <View style={styles.floatingBtn}>
//       <TouchableNativeFeedback>
//         <Text style={styles.floatBtnText}>TOUCH</Text>
//       </TouchableNativeFeedback>
//     </View>
//   )
// }

const getBtnText = (scr) => {
  if (scr === 'Mail')
    return 'Compose';
  else
    if (scr === 'Chat')
      return 'New Message';
    else
      if (scr === 'Video')
        return 'Create';
      else
        if (scr === 'Rooms')
          return 'Join';
}

const getFloatingBtnIcon = (scr) => {
  if (scr === 'Mail')
    return 'pencil-outline';
  else
    if (scr === 'Chat')
      return 'message-plus-outline';
    else
      if (scr === 'Video')
        return 'plus';
      else
        if (scr === 'Rooms')
          return 'video-plus-outline';
}

function MyTabBar({ state, descriptors, navigation }) {
  const [count, setCount] = useState('Mail');
  const [floatBtnWidth] = useState(new Animated.Value(140))
  var width = 0;
  function floatBtnAnimation(name) {
    if (name === 'Mail')
      width = 140;
    else
      if (name === 'Chat')
        width = 170;
      else
        if (name === 'Rooms')
          width = 105;
        else
          if (name === 'Video')
            width = 120;
    Animated.spring(floatBtnWidth, {
      toValue: width,
      duration: 170,
    }).start();
  }

  return (
    <>
      <StatusBar backgroundColor="#FFFEFF" barStyle={'dark-content'} />
      <>
        <Animated.View style={[styles.floatingBtn, { width: floatBtnWidth }]}>
          <View style={{backgroundColor: '#fff'}}>
            <IconMatCom name={getFloatingBtnIcon(count)} size={26} color={'#DA3123'} />
          </View>
          <Text style={styles.floatBtnText}>
            {getBtnText(count)}
          </Text>
        </Animated.View>
        <View style={{ backgroundColor: '#FFFEFF', borderTopWidth: .8, borderColor: '#EBEAED' }}>

          <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                    ? options.title
                    : route.name;

              const getIcon = (label) => {
                if (label === 'Chat')
                  return "chat-bubble-outline";
                else
                  if (label === 'Mail')
                    return "mail-outline";
                  else
                    if (label === 'Video')
                      return "slow-motion-video";
                    else
                      if (label === 'Rooms')
                        return "check-box-outline-blank";
              }

              const isFocused = state.index === index;

              // const onPress = () => {
              //   const event = navigation.emit({
              //     type: 'tabPress',
              //     target: route.key,
              //   });

              //   if (!isFocused && !event.defaultPrevented) {
              //     navigation.navigate(route.name);
              //   }
              // };

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };

              return (
                <>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableNativeFeedback
                      accessibilityRole="button"
                      accessibilityStates={isFocused ? ['selected'] : []}
                      accessibilityLabel={options.tabBarAccessibilityLabel}
                      testID={options.tabBarTestID}
                      // onPress={onPress}
                      onPress={() => {
                        const event = navigation.emit({
                          type: 'tabPress',
                          target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                          navigation.navigate(route.name);
                        }

                        setCount(route.name);
                        floatBtnAnimation(route.name);
                      }}
                      onLongPress={onLongPress}
                      background={TouchableNativeFeedback.Ripple('#FFCCCB', true)}
                    >
                      <View style={styles.button}>
                        <Icon name={getIcon(label)} size={26} color={isFocused ? '#DA3123' : '#616065'} />
                        <Text style={{ color: isFocused ? '#DA3123' : '#616065', fontWeight: 'bold' }}>
                          {label}
                        </Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </>
              );
            })}
          </View>
        </View>
      </>
    </>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
          <Tab.Screen name="Mail" component={MailScreen} />
          <Tab.Screen name="Chat" component={ChatScreen} />
          <Tab.Screen name="Rooms" component={RoomScreen} />
          <Tab.Screen name="Video" component={VideoScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 60,
    width: 130,
    // backgroundColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  tabBar: {
    height: 70,
    width: '100%',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: .5,
    borderColor: '#F6F6F7',
  },
  floatingBtn: {
    height: 50,
    minWidth: 'auto',
    paddingLeft: 22,
    paddingRight: 22,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 80,
    right: 20,
    borderRadius: 100,
    alignItems: 'center',
    flexDirection: 'row',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  floatBtnText: {
    fontWeight: 'bold',
    color: '#DA3123',
    marginLeft: 10,
    position: 'absolute',
    right: 22,
  },
  listItem: {
    height: 100,
    width: Dimensions.get('window').width,
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
  }
})