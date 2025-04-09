import React, { useEffect,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5'; 

const Stack = createNativeStackNavigator();

const FirstScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 3000); // 2 giây trước khi chuyển

    return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount
  }, [navigation]);

  return (
    <View style={styles.firstContainer}>
      <Image
        source={require('./assets/icon_nectar.png')}
        style={styles.firstImg}
      />
      <TouchableOpacity 
        style={styles.startButton} 
        onPress={() => navigation.navigate('Onboarding')}
      >
      </TouchableOpacity>
    </View>
  );
};

const Onboarding = ({ navigation }) => {
  return (
    <View style={styles.onboardingContainer}>
      <Image
        source={require('./assets/background_onbording.png')}
        style={styles.backgroundOnboarding}
      />
      <Image
        source={require('./assets/icon_carrot.png')}
        style={styles.onboardingImg}
      />
      <View style={styles.textBording}>
        <Text style={styles.text1Bording}>
          Welcome to our store
        </Text>
        <Text style={styles.text2Bording}>
          Get your groceries in as fast as one hour
        </Text>
      </View>
      <TouchableOpacity style={styles.buttonBording} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.textbtnBording}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const SignIn = ({ navigation }) => {
  return (
    <View style={styles.SignInContainer}>
      <Image
          source={require('./assets/bg_signin.png')}
          style={styles.signinimg}
      />
      <Text style={styles.title}>
        Get your groceries
      </Text>
      <Text style={styles.title1}>
        with nectar
      </Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          onFocus={() => navigation.navigate('number')} // Điều hướng khi nhấn vào TextInput
      />
      <Text style={styles.socialMediaText}>Or connect with social media</Text>
      <View style={styles.buttonContainer}>
      
        <TouchableOpacity style={styles.googleButton} onPress={() => navigation.navigate('number')}>
          <Text style={styles.ggbtnText}>Continue with Google</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.facebookButton} onPress={() => navigation.navigate('number')}>
          <Text style={styles.fbbtnText}>Continue with Facebook</Text>
        </TouchableOpacity>
      
      </View>
    </View>
  );
};

const number = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const validatePhoneNumber = (phone) => {
    // Biểu thức Regex kiểm tra số điện thoại Việt Nam
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;

    if (phoneRegex.test(phone)) {
      setErrorMessage('Số điện thoại hợp lệ!');
      navigation.navigate('verification')
    } else {
      setErrorMessage('Số điện thoại không hợp lệ!');
    }
  };

  return(
    <View style={styles.numberContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.mobileNumberText}>Enter your number mobile</Text>
      <Text style={styles.mobileNumberText1}>Mobile Number</Text>
      <TextInput
          style={styles.input1}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
      />
      {errorMessage ? (
        <Text style={errorMessage.includes('Số điện thoại hợp lệ!') ? styles.successMessage : styles.errorMessage}>
          {errorMessage}
        </Text>
      ) : null}
      <TouchableOpacity style={styles.nextButton} onPress={() => validatePhoneNumber(phoneNumber)}>
        <Text style={styles.nextButtonText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};


const verification = ({ navigation }) => {
  const [codeNumber, setcodeNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const validateCodeNumber = (code) => {

    if (code.length==4) {
      setErrorMessage('Mã code hợp lệ!');
    } else {
      setErrorMessage('Mã code không hợp lệ!');
    }
  };

  return(
    <View style={styles.numberContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('number')}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.mobileNumberText}>Enter your 4-digit code</Text>
      <Text style={styles.mobileNumberText1}>Code</Text>
      <TextInput
          style={styles.input1}
          keyboardType="phone-pad"
          value={codeNumber}
          onChangeText={setcodeNumber}
      />
      {errorMessage ? (
        <Text style={errorMessage.includes('Mã code hợp lệ!') ? styles.successMessage : styles.errorMessage}>
          {errorMessage}
        </Text>
      ) : null}
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.nextButtonText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const location = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [selectedZone, setSelectedZone] = useState('Banasree');
  const zones = ['Banasree', 'Zone 1', 'Zone 2']; // Danh sách các khu vực
  const [selectedArea, setSelectedArea] = useState('');
  const Areas = ['Hà Nội', 'Area 1', 'Area 2']; // Danh sách các area

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Đổi trạng thái của "Your Zone"
    if (isOpen1) setIsOpen1(false); // Đóng "Your Area" nếu đang mở
  };

  const selectZone = (zone) => {
    setSelectedZone(zone);
    setIsOpen(false);
  };


  return(
    <View style={styles.numberContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('verification')}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={{flex:1,alignItems:'center',marginTop:50,height:50}}>
        <Image
          source={require('./assets/bando.png')}
          style={{ }}
        />
        <Text style={{fontWeight:600,fontSize:26,lineHeight:29,marginTop:50}}>
            Select your location
        </Text>
        <Text style={{color: "#7C7C7C",marginTop:10,fontSize:16,textAlign:'center'}}>
          Swithch on your location to stay in tune with{'\n'}
          what’s happening in your area
        </Text>
        <View style={{padding: 20,marginTop:40}}>
          <Text style={{fontSize: 14,color: '#999'}}>Your Zone</Text>
          <TouchableOpacity style={{borderBottomWidth: 1,
                                    borderBottomColor: '#ccc',
                                    paddingVertical: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width:380}} onPress={toggleDropdown}>
            <Text style={{fontSize: 16,color: '#333',}}>{selectedZone}</Text>
            <Text style={{fontSize: 16}}>▼</Text>
          </TouchableOpacity>
          {isOpen && (
            <View style={{marginTop: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              backgroundColor: '#fff',
              maxHeight: 150, // Giới hạn chiều cao để tránh tràn
              overflow: 'hidden',}}>
              <FlatList
                data={zones}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => selectZone(item)}>
                    <Text style={{paddingVertical: 10,
                                  paddingHorizontal: 15,
                                  fontSize: 16,}}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
        <View style={{padding: 20}}>
          <Text style={{fontSize: 14,color: '#999'}}>Your Area</Text>
          <TouchableOpacity style={{borderBottomWidth: 1,
                                    borderBottomColor: '#ccc',
                                    paddingVertical: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width:380}} onPress={toggleDropdown}>
            <Text style={{fontSize: 16,color: '#333',}}>{selectedArea}</Text>
            <Text style={{fontSize: 16}}>▼</Text>
          </TouchableOpacity>
          {isOpen && (
            <View style={{marginTop: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              backgroundColor: '#fff',
              maxHeight: 150, // Giới hạn chiều cao để tránh tràn
              overflow: 'hidden',}}>
              <FlatList
                data={Areas}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => selectArea(item)}>
                    <Text style={{paddingVertical: 10,
                                  paddingHorizontal: 15,
                                  fontSize: 16,}}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
        <TouchableOpacity style={{backgroundColor: '#5eb078',
                                width: 353,
                                height: 67,
                                bottom: 100, // Căn giữa dọc
                                left: 6,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop:150}} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textbtnBording}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Login = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Trạng thái hiển thị mật khẩu
  return (
    <View>
      <View style={{alignItems:'center',marginTop:100,height:50}}>
        <Image 
          source={require('./assets/icon_carot.png')}
          style={{}}
        />
      </View>
      <Text style={{fontWeight:600,fontSize:26,marginLeft:30,marginTop:50}}>Login</Text>
      <Text style={{fontSize:16,marginLeft:30,marginTop:10,color:"#7C7C7C"}}>Enter your emails and password</Text>
      <Text style={{fontSize:18,marginLeft:30,marginTop:80,color:"#7C7C7C"}}>Email</Text>
      <TextInput style={{fontSize:16,marginLeft:30,marginTop:15,width:380,height:30,borderBottomWidth:1}}></TextInput>
      <Text style={{fontSize:18,marginLeft:30,marginTop:40,color:"#7C7C7C"}}>Password</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 15, borderBottomWidth: 1, width: 380 }}>
        <TextInput 
          style={{ fontSize: 16, flex: 1, height: 30 }} 
          placeholder="Enter your password"
          secureTextEntry={!isPasswordVisible} // Ẩn/hiện mật khẩu dựa trên trạng thái
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Text style={{ fontSize: 16, color: '#7C7C7C' }}>
            {isPasswordVisible ? 'Hide' : 'Show'} {/* Hiển thị "Hide" hoặc "Show" */}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{background: "#181725",fontWeight:500,marginTop:20,marginLeft:290}}>Forgot Password ?</Text>
      <TouchableOpacity style={{backgroundColor: '#5eb078',
                                width: 353,
                                height: 67,
                                bottom: 20, // Căn giữa dọc
                                marginLeft: 40,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop:100,
                              }} >
        <Text style={styles.textbtnBording}>
          Login
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row',marginLeft:95}}>
        <Text style={{fontWeight:500}}>Don't have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{color:'#5eb078',marginLeft:5,fontWeight:800}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SignUp = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Trạng thái hiển thị mật khẩu
  return (
    <View>
      <View style={{alignItems:'center',marginTop:100,height:50}}>
        <Image 
          source={require('./assets/icon_carot.png')}
          style={{}}
        />
      </View>
      <Text style={{fontWeight:600,fontSize:26,marginLeft:30,marginTop:50}}>Sign Up</Text>
      <Text style={{fontSize:16,marginLeft:30,marginTop:10,color:"#7C7C7C"}}>Enter your credentials to continue</Text>
      <Text style={{fontSize:18,marginLeft:30,marginTop:80,color:"#7C7C7C"}}>Username</Text>
      <TextInput style={{fontSize:16,marginLeft:30,marginTop:15,width:380,height:30,borderBottomWidth:1}}></TextInput>
      <Text style={{fontSize:18,marginLeft:30,marginTop:40,color:"#7C7C7C"}}>Email</Text>
      <TextInput style={{fontSize:16,marginLeft:30,marginTop:15,width:380,height:30,borderBottomWidth:1}}></TextInput>
      <Text style={{fontSize:18,marginLeft:30,marginTop:40,color:"#7C7C7C"}}>Password</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 15, borderBottomWidth: 1, width: 380 }}>
        <TextInput 
          style={{ fontSize: 16, flex: 1, height: 30 }} 
          placeholder="Enter your password"
          secureTextEntry={!isPasswordVisible} // Ẩn/hiện mật khẩu dựa trên trạng thái
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Text style={{ fontSize: 16, color: '#7C7C7C' }}>
            {isPasswordVisible ? 'Hide' : 'Show'} {/* Hiển thị "Hide" hoặc "Show" */}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',marginLeft:29,marginTop:10}}>
        <Text style={{fontWeight:500}}>By continuing you agree to our</Text>
        <TouchableOpacity onPress={() => navigation.navigate('')}>
          <Text style={{color:'#5eb078',marginLeft:5,fontWeight:500}}>Terms of Service</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',marginLeft:29}}>
        <Text style={{fontWeight:500}}>and</Text>
        <TouchableOpacity onPress={() => navigation.navigate('')}>
          <Text style={{color:'#5eb078',marginLeft:5,fontWeight:500}}>Privacy Policy.</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{backgroundColor: '#5eb078',
                                width: 353,
                                height: 67,
                                bottom: 20, // Căn giữa dọc
                                marginLeft: 40,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop:100,
                              }} >
        <Text style={styles.textbtnBording}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row',marginLeft:110}}>
        <Text style={{fontWeight:600}}>Already have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{color:'#5eb078',marginLeft:5,fontWeight:500}}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>)
};


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen">
        <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="number" component={number} options={{ headerShown: false }} />
        <Stack.Screen name="verification" component={verification} options={{ headerShown: false }} />
        <Stack.Screen name="location" component={location} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    backgroundColor: '#5eb078',
  },
  firstImg: {
    width: 267.4,
    height: 68.6,
    marginTop: 413.7,
    marginLeft: 73.3,
  },
  startButton: {
    width: '100%',
    height:'100%'
  },
  firstButton1: {
    width:'100%',
    height:'100%'
  },
  onboardingContainer: {
    flex: 1,
  },
  backgroundOnboarding: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  onboardingImg: {
    position: 'absolute',
    width: 48.5,
    height: 56.4,
    marginTop: 470,
    marginLeft: 182.8,
  },
  textBording: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 200, // Căn giữa dọc
    left: 0,
    right: 0,
  },
  text1Bording: {
    width: 253,
    height: 86,
    color: 'white',
    fontFamily: 'Gilroy', // Đảm bảo bạn đã tải font này vào ứng dụng
    fontWeight: '600',
    fontSize: 48,
    lineHeight: 42,
    letterSpacing: 0,
    textAlign: 'center',
  },
  text2Bording: {
    width: 295,
    height: 15,
    marginTop: 5,
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    lineHeight: 15,
    letterSpacing: 0,
    textAlign: 'center',
    color: 'rgba(252, 252, 252, 0.34)', // Đã sửa lại màu sắc
  },
  buttonBording: {
    position: 'absolute',
    backgroundColor: '#5eb078',
    width: 353,
    height: 67,
    bottom: 100, // Căn giữa dọc
    left: 30.5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbtnBording: {
    color: 'white',
    fontWeight: '600', // Đã sửa lại định dạng
    fontSize: 20,
  },
  SignInContainer:{
    flex:1,
    backgroundColor: '#fcfcfc',
    position:'relative'
  },
  signinimg: {
    width: 413.36627197265625,
    height: 374.151611328125,
    marginTop: 30,
    backgroundColor: '#fcfcfc',
  },
  title: {
    marginTop: 400,
    marginLeft: 25,
    fontFamily: 'Gilroy',
    fontWeight: 600,
    fontSize: 26,
    lineHeight: 29,
    letterSpacing: 0,
    color: ' #030303',
    position:'absolute'
  },
  title1: {
    marginTop: 430,
    marginLeft: 25,
    fontFamily: 'Gilroy',
    fontWeight: 600,
    fontSize: 26,
    lineHeight: 29,
    letterSpacing: 0,
    color: ' #030303',
    position:'absolute'
  },
  input: {
    width: 364,
    height: 39.550201416015625,
    marginTop: 490,
    marginLeft: 25,
    borderBottomWidth: 1,
    borderColor:' #E2E2E2',
    position:'absolute'
  },
  socialMediaText: {
    fontSize: 16,
    color: '#888',
    position: 'absolute',
    width: 220,
    height: 17,
    marginTop: 565,
    marginLeft: 100,

  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft:30
  },
  googleButton: {
    width: 364,
    height: 67,
    backgroundColor:'#5683e8',
    position:'absolute',
  },
  ggbtnText:{
    color:'white',
    textAlign: 'center',
    fontSize:18,
    fontWeight:600,
    paddingTop:20,
  },
  facebookButton: {
    width: 364,
    height: 67,
    backgroundColor: '#4b66a9',
    marginTop:150
  },
  fbbtnText:{
    color:'white',
    textAlign: 'center',
    fontSize:18,
    fontWeight:600,
    paddingTop:20,
  },
  numberContainer: {
    flex:1,
    backgroundColor:'#fcfcfc'
  },
  backButton: {
    marginTop: 56.83,
    marginLeft: 25.01,
    width: 45,
    height: 44,
  },
  backButtonText: {
    fontFamily: 'Gilroy',
    fontWeight: '600',
    fontSize: 26,
    lineHeight: 29,
    letterSpacing: 0,
    color: '#181725',
  },
  mobileNumberText: {
    marginTop: 120,
    marginLeft: 25,
    fontFamily: 'Gilroy',
    fontWeight: '600',
    fontSize: 26,
    lineHeight: 29,
    letterSpacing: 0,
    color: '#181725',
  },
  mobileNumberText1:{
    marginTop: 20,
    marginLeft: 24.88,
    fontFamily: 'Gilroy',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 29,
    letterSpacing: 0,
    color: '#7C7C7C',
  },
  input1: {
    width: 364,
    height: 39.550201416015625,
    marginTop: 320,
    marginLeft: 25,
    borderBottomWidth: 1,
    borderColor:' #E2E2E2',
    position:'absolute'
  },
  nextButton: {
    marginTop: 220,
    marginLeft: 322,
    width: 67,
    height: 67,
    borderRadius:'100%',
    backgroundColor:'#5eb078'
  },
  nextButtonText: {
    fontFamily: 'Gilroy',
    fontWeight: '600',
    fontSize: 26,
    lineHeight: 29,
    letterSpacing: 0,
    color: '#181725',
    textAlign:'center',
    paddingTop:16,
    color:'white'
  },
  successMessage: {
    color: 'green',
    paddingLeft:25
  },
  errorMessage: {
    color: 'red',
    paddingLeft:25
  }
});

export default App;