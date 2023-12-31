import CustomInputText from 'src/Components/FormFields/CustomInputText';
import CustomTouchableOpacity from 'src/Components/FormFields/CustomTouchableOpacity';
import LanguagePicker from 'src/Components/Common/LanguagePicker';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, ImageBackground, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { COLORS } from "src/variables/colors";
import { connect } from 'react-redux'
import { icons, logos } from "src/_ressources";
import { set } from 'src/Store/locale';
import { t } from 'src/i18n';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_language: "en",
      is_portrait: props.is_portrait,
      password: '',
      username_or_email: '',
    }
    if(!t("Arabic")){
      // Initialize t translation function) if it is not initistialised
      setTimeout(() => {
        this.setState({current_language: this.state.current_language});
      }, 10);
    }
  }
  // static get propTypes() {
  //   return {
  //     current_language: PropTypes.string,
  //     dispatch: PropTypes.object,
  //     navigation: PropTypes.object,
  //   };
  // }

  onClickListener = (viewId) => {
    var current_language = "en";
    // if("restore_password" == viewId){
    //   set_locale("ar");
    //   current_language = "ar";
    // }
    // else{
    //   set_locale("fr");
    //   current_language = "fr";
    // }
    // this.setState({"current_language": current_language})
    if("restore_password" == viewId){
      current_language = "ar"
    }
    Alert.alert("Alert", "current_language "+this.props.current_language);
    set("current_language", current_language);
    const action = { type: "CHANGE_LANGUAGE", value: current_language }
    this.props.dispatch(action);
  }

  static propTypes = {
    current_language: PropTypes.string,
    is_portrait: PropTypes.bool,
    navigation: PropTypes.oneOfType([
      PropTypes.object,
    ]),
  }
  
  static defaultProps = {
    current_language: 'en',
    is_portrait: true,
    navigation: null,
  }

  render() {
    const username_or_email = this.state.username_or_email, password = this.state.password, current_language = this.state.current_language;
    return (
        <View style={styles.body}>
          <ImageBackground source={logos.logo} style={styles.background}/>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={{marginTop: 70}}></View>
            <LanguagePicker list_mode="SCROLLVIEW" />
            <CustomInputText placeholder={t("Username or email")} underlineColorAndroid='transparent'
              onChangeText={username_or_email => this.setState({username_or_email: username_or_email})}
              icon_url={icons.emailIcon} value={username_or_email}  iconStyle={{height:26, width: 25, marginRight: 18}}
              current_language={current_language} test_id={"username_or_email"}  type_input="email"
            />
            <CustomInputText placeholder={t("Password")} underlineColorAndroid='transparent' secureTextEntry={true}
              onChangeText={password => this.setState({password: password})} iconStyle={{height:28, width: 24, marginRight: 18}}
              icon_url={icons.passwordIcon} value={password} current_language={current_language} type_input="password"
              test_id={"password"}
            />
            <CustomTouchableOpacity is_not_button={true} onPress={() => this.onClickListener('restore_password')}
              text={t("Forgot your password?")} style={{marginBottom: 25}}
            />
            <CustomTouchableOpacity onPress={() => this.onClickListener('login')}
              text={t("Sign in")} style={styles.loginButton}
            />
            <CustomTouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}
              text={t("Sign up")} style={styles.loginButton}
            />
          </ScrollView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    opacity: 0.2,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  body: {
    backgroundColor: COLORS.default_color,
    flex: 1,
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: "#00b5ec",
    elevation: 19, // works on android
    shadowColor: "#808080",
    shadowOffset: {
      height: 9,
      width: 0,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
  },
  scrollView: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
    paddingTop: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    current_language: state.current_language,
    is_portrait: state.is_portrait,
  }
}

export default connect(mapStateToProps)(SignIn);
