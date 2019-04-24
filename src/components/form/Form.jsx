import React, {Component, Fragment} from "react";
import TextField from "../textField/TextField";
import validateInput from "../../validations/urForm";
import {connect} from "react-redux";
import "./Form.css";

class Form extends Component {

    constructor() {
        super();
        this.state = {
            equals: false,
            errors: {}
        }
        this.isValid = this.isValid.bind(this);
    }

    isValid(fieldData, eventType = "submit") {
        const {errors, isValid, equals} = validateInput(
            fieldData || this.props.inputStore,
            eventType,
            this.state.errors,
            this.state.equals
        );

        if (!isValid) {
            this.setState({errors});
        }

        this.setState({equals});

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({
                errors: {}
            });
        }
    }

    resetForm() {
        const resetData = this.props.inputStore;

        Object.keys(resetData).map(prop => resetData[prop] = '');
        this.props.onResetForm(resetData);
        this.setState({
            errors: {}
        });
    }

    render() {
        const {errors, equals} = this.state;

        return (
            <Fragment>
                <a href="/catalog">Catalog</a>
                <h1>Добавить новое юр.лицо</h1>
                <form id="urForm" onSubmit={this.onSubmit.bind(this)}>
                    <div style={{display: 'inline-block'}}>
                        <TextField
                            name="fullname"
                            type="text"
                            placeholder="Полное наименование юрлица"
                            isValid={this.isValid}
                            rules={{textOnly: true}}
                            errors={errors}
                        />
                        <TextField
                            name="shortname"
                            type="text"
                            placeholder="Сокращенное наименование"
                            isValid={this.isValid}
                            rules={{textOnly: true}}
                            errors={errors}
                        />
                        <TextField
                            name="inn"
                            type="text"
                            placeholder="ИНН"
                            isValid={this.isValid}
                            rules={{digitsOnly: true, maxLength: 10}}
                            errors={errors}
                        />
                        <TextField
                            name="kpp"
                            type="text"
                            placeholder="КПП"
                            isValid={this.isValid}
                            rules={{digitsOnly: true, maxLength: 9}}
                            errors={errors}
                        />
                        <TextField
                            name="urAddress"
                            type="text"
                            placeholder="Юридический адрес"
                            isValid={this.isValid}
                            rules={{}}
                            errors={errors}
                        />
                        <TextField
                            name="factAddress"
                            type="text"
                            placeholder="Фактический адрес"
                            isValid={this.isValid}
                            rules={{}}
                            errors={errors}
                        />
                        <div>
                            <TextField
                                id="equal"
                                name="addressEqual"
                                type="checkbox"
                                disabled={true}
                                equals={equals}
                            />
                            <label>Фактический адрес совпадает с юридическим адресом</label>
                        </div>
                        <TextField
                            name="urPhone"
                            type="text"
                            placeholder="Телефон"
                            isValid={this.isValid}
                            rules={{digitsOnly: true}}
                            errors={errors}
                        />
                        <h3>Контактное лицо</h3>
                        <TextField
                            name="fio"
                            type="text"
                            placeholder="ФИО"
                            isValid={this.isValid}
                            rules={{textOnly: true}}
                            errors={errors}
                        />
                        <TextField
                            name="position"
                            type="text"
                            placeholder="Должность"
                            isValid={this.isValid}
                            rules={{textOnly: true}}
                            errors={errors}
                        />
                        <TextField
                            name="email"
                            type="text"
                            placeholder="E-mail"
                            isValid={this.isValid}
                            rules={{}}
                            errors={errors}
                        />
                        <TextField
                            name="phone"
                            type="text"
                            placeholder="Мобильный телефон"
                            isValid={this.isValid}
                            rules={{digitsOnly: true}}
                            errors={errors}
                        />
                        <div>
                            <span id="ecp">Добавить ЭЦП</span>
                        </div>

                        <TextField
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            isValid={this.isValid}
                            rules={{}}
                            errors={errors}
                        />
                        <div>Введите пароль основного аккаунта, чтобы добавить юр.лицо</div>
                        <div>
                            <input type="reset" onClick={this.resetForm.bind(this)} value={"RESET"}/>
                            <input id="addUr" type="submit" value="Добавить юрлицо"/>
                        </div>
                    </div>
                </form>
            </Fragment>
        );
    }
}

const resetForm = (payload) => ({
    type: 'RESET_FORM',
    payload
});

export default connect(
    state => ({
        inputStore: state.urDataList,
    }),
    {onResetForm: resetForm}
)(Form);
