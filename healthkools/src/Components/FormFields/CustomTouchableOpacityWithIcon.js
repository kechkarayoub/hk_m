import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class CustomTouchableOpacityWithIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: props.disabled,
    };
  }

  static propTypes = {
    disabled: PropTypes.bool,
    icon_name: PropTypes.string,
    onPress: PropTypes.func,
    style: PropTypes.object,
    test_id: PropTypes.string,
    text: PropTypes.string,
    textStyle: PropTypes.object,
  }

  static defaultProps = {
    disabled: false,
    icon_name: "close",
    onPress: () => {},
    style: null,
    test_id: '',
    text: '',
    textStyle: null,
  }

  render() {
    const { disabled } = this.state;
    var text_length = (this.props.text || '').length;
    if(disabled){
      return (
        <View style={[styles.containerStyle, this.props.style || {}, styles.disabledStyle]}
          testID={this.props.test_id}
        >
          <Text 
            style={[styles.textStyle, this.props.textStyle || {}, text_length == 4 ? {fontSize: 17} : text_length == 5 ? {fontSize: 14} : {}]}
          >{this.props.text}</Text>
          <Icon
            name={this.props.icon_name}
            size={16}
            style={styles.iconStyle}
          />
        </View>
      )
    }
    return (
      <TouchableOpacity style={[styles.containerStyle, this.props.style || {}]}
        onPress={this.props.onPress} testID={this.props.test_id}
      >
        <Text 
          style={[styles.textStyle, this.props.textStyle || {}, text_length == 4 ? {fontSize: 17} : text_length == 5 ? {fontSize: 14} : {}]}
        >{this.props.text}</Text>
        <Icon
          name={this.props.icon_name}
          size={16}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 15,
    justifyContent: 'flex-end',
    width: 300,
  },
  disabledStyle: {
    opacity: 0.5,
  },
  iconStyle: {
    marginTop: 0,
  },
  textStyle:{
    color:"white",
    fontWeight:'bold',
    textAlign: 'right',
  },
});

export default CustomTouchableOpacityWithIcon;
