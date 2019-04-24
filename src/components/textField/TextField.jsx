import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import "./TextField.css";

class TextField extends Component {
  validateField(e) {
    const name = e.target.name;
    let val = e.target.value;

    this.props.isValid({ name, val }, e.type);
  }

  onChange = ({ target }) => {
    const rulesProps = this.props.rules || {};
    const rules = Object.keys( rulesProps);
    const name = target.name;
    let val = target.value;

    if (rules.length) {
      rules.forEach(function(rule) {
        switch(rule) {
          case 'textOnly':
            val = val.replace(/[^\D]/g, "");
            break;

          case 'digitsOnly':
            val = val.replace(/[^\d]/g, "");
            break;

          case 'maxLength':
            const length = rulesProps[rule];
            if (val.length > length) {
              val = val.substring(0, length);
            }
            break;

          default:
            break;
        }
      });
    }

    this.props.onReadValue({ name, val });
  }

  componentDidMount() {
    if (this.props.type !== 'checkbox') {
      this.props.onReadValue({
        name: this.props.name,
        val: '',
      });
    }
  }

  render() {
    const {
      id,
      name,
      type,
      placeholder,
      disabled=false,
      equals=false,
      errors={}
    } = this.props;
    const inpData = this.props.inputStore || '';
    const error = errors ? errors[name] : '';

    return (
      <div>
        <input
          id={id || name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={inpData[name]}
          onChange={this.onChange}
          disabled={disabled}
          className={error ? "error" : ""}
          checked={equals}
          onBlur={this.validateField.bind(this)}
          error={error}
        />
        <span className={`${name}-error fieldError`}>{error}</span>
      </div>
    );
  }
}

TextField.propTypes = {
  id: propTypes.string,
  name: propTypes.string,
  type: propTypes.string.isRequired,
  value: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  onBlur: propTypes.func,
  disabled: propTypes.bool,
  checked: propTypes.bool,
  error: propTypes.string
};

TextField.defaultProps = {
  name: "",
  placeholder: "",
  value: "",
  type: "text",
  disabled: false,
  checked: false,
  onBlur: null,
  onChange: null
};

const readValue = (payload) => ({
  type: 'READ_VALUE',
  payload
});

export default connect(
  state => ({
    inputStore: state.urDataList
  }),
  {onReadValue: readValue}
)(TextField);
