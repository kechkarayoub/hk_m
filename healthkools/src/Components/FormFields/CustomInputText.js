import ErrorComponent from "src/Components/Common/ErrorComponent";
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { reverse_style } from "src/utils/rtl_layout";

class CustomInputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_language: props.current_language,
      disabled: props.disabled,
      form_error: props.form_error,
      icon_url: props.icon_url,
      keyboardType: props.keyboardType || "default",
      placeholder: props.placeholder,
      secureTextEntry: props.secureTextEntry,
      test_id: props.test_id,
      type_input: props.type_input,
      underlineColorAndroid: props.underlineColorAndroid,
      value: props.value,
    }
  }

  static propTypes = {
    containerStyle: PropTypes.object,
    current_language: PropTypes.string,
    disabled: PropTypes.bool,
    form_error: PropTypes.string,
    icon_url: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
    ]),
    iconStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    keyboardType: PropTypes.string,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    style: PropTypes.object,
    test_id: PropTypes.string,
    type_input: PropTypes.string,
    underlineColorAndroid: PropTypes.string,
    value: PropTypes.string,
  }
  
  static defaultProps = {
    containerStyle: null,
    current_language: 'en',
    disabled: false,
    form_error: "",
    icon_url: null,
    iconStyle: null,
    keyboardType: '',
    onChangeText: () => {},
    placeholder: '',
    secureTextEntry: false,
    style: null,
    test_id: '',
    type_input: '',
    underlineColorAndroid: 'transparent',
    value: '',
  }

  static getDerivedStateFromProps(props, state) {
    var new_state = {};
    var return_new_state = false;
    if (props.current_language !== state.current_language) {
      new_state.current_language = props.current_language;
      return_new_state = true;
    }
    if(props.form_error !== state.form_error) {
      new_state.form_error = props.form_error;
      return_new_state = true;
    }
    if(props.disabled !== state.disabled) {
      new_state.disabled = props.disabled;
      return_new_state = true;
    }
    if (props.placeholder !== state.placeholder) {
      new_state.placeholder = props.placeholder;
      return_new_state = true;
    }
    if (props.value !== state.value) {
      new_state.value = (props.onChangeText ? props : state).value;
      return_new_state = true;
    }
    return return_new_state ? new_state : null;
  }

  render() {
    const { current_language, disabled, form_error, icon_url, keyboardType, placeholder, secureTextEntry, test_id, underlineColorAndroid, value } = this.state;
    let inputContainerPlatformStyle = {
      flexDirection: 'row',
    },
    inputIconPlatformStyle = {
      marginRight: 15,
    },
    inputsPlatformStyle = {
      marginLeft: 16,
    };
    if(Platform.OS === 'ios'){
      // Unexpected behavior on ios; I need to reverse direction value to work normally
      inputContainerPlatformStyle = reverse_style(current_language, inputContainerPlatformStyle, true);
      inputIconPlatformStyle = reverse_style(current_language, inputIconPlatformStyle, true);
      inputsPlatformStyle = reverse_style(current_language, inputsPlatformStyle, true);
    }
    return (
      <View style={[reverse_style(current_language, this.props.containerStyle || styles.inputContainer), reverse_style(current_language, inputContainerPlatformStyle), form_error ? styles.errorStyle : {}]}>
        <TextInput
          editable={!disabled}
          keyboardType={keyboardType}
          onChangeText={(value) => {
            if(this.props.onChangeText){
              this.props.onChangeText(value);
            }
            else{
              this.setState({value: value})
            }
          }}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          selectTextOnFocus={!disabled}
          style={[reverse_style(current_language, styles.inputs), reverse_style(current_language, inputsPlatformStyle), reverse_style(current_language, this.props.style || {}), disabled ? styles.disabledStyle : {}]}
          testID={test_id}
          value={value}
          underlineColorAndroid={underlineColorAndroid}
        />
        {icon_url &&
          <Image style={[reverse_style(current_language, styles.inputIcon), reverse_style(current_language, inputIconPlatformStyle), reverse_style(current_language, this.props.iconStyle), disabled ? styles.disabledIconStyle : {}]} source={icon_url}/>
        }
        {form_error &&
          <ErrorComponent error={form_error} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  disabledIconStyle: {
    opacity: 0.5,
  },
  disabledStyle: {
    opacity: 0.5,
  },
  errorStyle: {
    height: 60,
    paddingBottom: 10,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#F5FCFF',
    borderBottomWidth: 0,
    borderRadius: 30,
    display: 'flex',
    elevation: 5, // works on android
    flexDirection: 'row',
    height: 45,
    marginBottom: 20,
    shadowColor: "#808080",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 300,
  },
  inputIcon:{
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  inputs:{
    borderBottomColor: '#FFFFFF',
    flex: 1,
    height: 45,
    textAlign: 'left',
  },
});

const mapStateToProps = (state) => {
  return {
    current_language: state.current_language,
  }
}

export default connect(mapStateToProps)(CustomInputText);
