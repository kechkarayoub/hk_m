import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from 'prop-types';
import React from 'react';
import { COLORS } from "src/variables/colors";
import { connect } from 'react-redux';
import { Stack, IconButton } from "@react-native-material/core";
import { StyleSheet } from 'react-native';
import { reverse_property, reverse_style } from 'src/utils/rtl_layout';

const BORDER_WIDTH = 1; // This variable will be used in styling
const BUTTON_SIZE = 25; // This variable will be used in styling

class CloseButton extends React.Component {
  // This component represents a button to close other interfaces
  constructor(props) {
    super(props);
  }

  static propTypes = {
    alignItems: PropTypes.string,
    color: PropTypes.string,
    current_language: PropTypes.string,
    disabled: PropTypes.bool,
    elevation: PropTypes.number,
    justifyContent: PropTypes.string,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    marginTop: PropTypes.number,
    onPress: PropTypes.func,
    test_id: PropTypes.string,
    zIndex: PropTypes.number,
  }

  static defaultProps = {
    alignItems: "flex-end",
    color: COLORS.default_color,
    current_language: "en",
    disabled: false,
    elevation: 2,
    justifyContent: "flex-end",
    marginBottom: 15,
    marginLeft: -20,
    marginRight: -20,
    marginTop: 0,
    onPress: () => {},
    test_id: 'test_id',
    zIndex: 2,
  }

  render() {
    const { current_language } = this.props;
    // Style for the button
    let button_style = {borderColor: this.props.color, ...styles.button};
    return(
      <Stack
        alignItems={reverse_property(current_language == "ar", "alignItems", this.props.alignItems || "flex-end")[1]}
        elevation={this.props.elevation || 2}
        fill 
        justifyContent={reverse_property(current_language == "ar", "justifyContent", this.props.justifyContent || "flex-end")[1]}
        marginBottom={this.props.marginBottom || 15}
        marginLeft={reverse_property(current_language == "ar", "marginLeft", undefined, true, this.props.marginLeft || -5)[1]}
        marginRight={reverse_property(current_language == "ar", "marginRight", this.props.marginRight || -5, true, undefined)[1]}
        marginTop={this.props.marginTop}
        spacing={4}
        zIndex={this.props.zIndex || 2}
      >
        <IconButton 
          icon={props => <Icon name="close" size={BUTTON_SIZE/2} {...props}  color={this.props.color} />}
          onPress={this.props.disabled ? () => {} : this.props.onPress}
          style={[reverse_style(current_language, button_style), this.props.disabled ? styles.disabledStyle : {}]} 
          testID={this.props.test_id || 'test_id'}
        />
      </Stack>
    )
  }
}

// Styles for the CloseButton component
const styles = StyleSheet.create({
  button:{
    alignItems: 'flex-end',
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    height: BUTTON_SIZE + BORDER_WIDTH,
    justifyContent: 'flex-end',
    width: BUTTON_SIZE + BORDER_WIDTH,
    marginRight: -10,
  },
  // Styles for the disabled state
  disabledStyle: {
    opacity: 0.3,
  },
});

// Map the current_language from Redux state to component props
const mapStateToProps = (state) => {
  return {
    current_language: state.current_language,
  }
}

// Connect the component to the Redux store
export default connect(mapStateToProps)(CloseButton);
