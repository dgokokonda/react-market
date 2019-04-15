import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import validateInput from "../../validations/urForm";
import TextField from "../textField/TextField";
import "./Form.css";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      shortname: "",
      inn: "",
      kpp: "",
      urAddress: "",
      factAddress: "",
      urPhone: "",
      fio: "",
      position: "",
      email: "",
      phone: "",
      password: "",
      errors: {},
      isLoading: false,
      equals: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid(fieldData, eventType='submit') {
    const { errors, isValid, equals } = validateInput(
      fieldData || this.state, 
      eventType, 
      this.state.errors,
      this.state.equals
    );

    if (!isValid) {
      this.setState({ errors });
    }

    this.setState({ equals });

    return isValid;
  }

  onChange({ target }) {
    let val = target.value;

    switch (target.name) {
      case "fullname":
      case "shortname":
      case "fio":
        val = val.replace(/[^\D]/g, "");
        break;

      case "inn":
        // inn равен 10 или 12 ?
        val = val.replace(/[^\d]/g, "");
        if (val.length > 10) {
          val = val.substring(0, 10);
        }
        break;

      case "kpp":
        val = val.replace(/[^\d]/g, "");
        if (val.length > 9) {
          val = val.substring(0, 9);
        }
        break;

      case "urPhone":
      case "phone":
        val = val.replace(/[^\d]/g, "");
        break;

      default:
        break;
    }
    this.setState({ [target.name]: val });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({
        errors: {},
        isLoading: true
      });
    }
  }

  readValue(e) {
    const name = e.target.name;
    let val = e.target.value;

    this.isValid({name, val}, e.type);

    if (val) {
      this.props.onReadValue({ [name]: val });
      val = "";
    }
  }

  render() {
    const {
      fullname,
      shortname,
      inn,
      kpp,
      urAddress,
      factAddress,
      urPhone,
      fio,
      position,
      email,
      phone,
      password,
      errors,
      equals
    } = this.state;
    return (
      <Fragment>
        <h1>Добавить новое юр.лицо</h1>
        <form id="urForm" onSubmit={this.onSubmit}>
          <div>
            <TextField
              name="fullname"
              type="text"
              placeholder="Полное наименование юрлица"
              value={fullname}
              error={errors.fullname}
              onChange={this.onChange}
              onBlur={this.readValue.bind(this)}
            />
            <TextField
              name="shortname"
              type="text"
              placeholder="Сокращенное наименование"
              value={shortname}
              error={errors.shortname}
              onChange={this.onChange}
              onBlur={this.readValue.bind(this)}
            />
            <TextField
              name="inn"
              type="text"
              placeholder="ИНН"
              value={inn}
              error={errors.inn}
              onChange={this.onChange}
              onBlur={this.readValue.bind(this)}
            />
            <TextField
              name="kpp"
              type="text"
              placeholder="КПП"
              value={kpp}
              error={errors.kpp}
              onChange={this.onChange}
              onBlur={this.readValue.bind(this)}
            />
            <TextField
              name="urAddress"
              type="text"
              placeholder="Юридический адрес"
              value={urAddress}
              error={errors.urAddress}
              onChange={this.onChange}
              onBlur={this.readValue.bind(this)}
            />
            <TextField
              name="factAddress"
              type="text"
              placeholder="Фактический адрес"
              value={factAddress}
              error={errors.factAddress}
              onChange={this.onChange}
              onBlur={this.readValue.bind(this)}
            />
            <div>
              <TextField
                id="equal"
                name="addressEqual"
                type="checkbox"
                disabled={true}
                checked={equals}
              />
              <label>Фактический адрес совпадает с юридическим адресом</label>
            </div>
            <TextField
              name="urPhone"
              type="text"
              placeholder="Телефон"
              value={urPhone}
              error={errors.urPhone}
              onChange={this.onChange}
              onBlur={this.readValue.bind(this)}
            />
            <h3>Контактное лицо</h3>
            <TextField
              name="fio"
              type="text"
              placeholder="ФИО"
              value={fio}
              error={errors.fio}
              onChange={this.onChange}
              onBlur={this.readValue.bind(this)}
            />
            <TextField
              name="position"
              type="text"
              placeholder="Должность"
              value={position}
              error={errors.position}
              onChange={this.onChange}
              onBlur={this.readValue.bind(this)}
            />
            <TextField
              name="email"
              type="text"
              placeholder="E-mail"
              value={email}
              error={errors.email}
              onChange={this.onChange}
              onBlur={this.readValue.bind(this)}
            />
            <TextField
              name="phone"
              type="text"
              placeholder="Мобильный телефон"
              value={phone}
              error={errors.phone}
              onChange={this.onChange}
              onBlur={this.readValue.bind(this)}
            />
            <div>
              <span id="ecp">Добавить ЭЦП</span>
            </div>

            <TextField
              name="password"
              type="password"
              placeholder="Пароль"
              value={password}
              error={errors.password}
              onChange={this.onChange}
              onBlur={this.readValue.bind(this)}
            />
            <div>Введите пароль основного аккаунта, чтобы добавить юр.лицо</div>
            <div>
              <TextField
                id="addUr"
                type="submit"
                placeholder="Пароль"
                value="Добавить юрлицо"
                onChange={this.onChange}
                onBlur={this.readValue.bind(this)}
              />
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    testStore: state
  }),
  dispatch => ({
    onReadValue: prop => {
      dispatch({
        type: "READ_VALUE",
        payload: prop
      });
    }
  })
)(Form);
