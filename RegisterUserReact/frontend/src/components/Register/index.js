import React, { Component } from 'react'
import FormTextInput from '../FormTextInput';
import IMask from 'imask';
import authService from '../../services/registerSendAxios'
import $ from 'jquery'
import { withRouter } from 'react-router';
import bootbox from 'bootbox';

const regex_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
const regex_phone = /^(?=\+?([0-9]{2})\(?([0-9]{3})\)\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})).{18}$/;

export class RegisterComponent extends Component {
    
    state = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
    };

    onChangeHandler = (e) => {
        var $group = $('[data-blok]');
        if($group.length > 0) 
        {
            $group.each((index,element) => {
                $(element).remove();
            });
        }
        this.setState({
            [e.target.name]: e.target.value
        });
        this.validTextBox(e.target.name, e.target.value);

    };

    onChangeHandlerPhone = (e) => {
        this.setState({
            phone: e.target.value
        });
        this.validPhoneTextBox(e.target.value);
    };

    onChangeHandlerEmail = (e) => {
        var $group = $('[data-blok]');
        if($group.length > 0) 
        {
            $group.each((index,element) => {
                $(element).remove();
            });
        }

        this.setState({
            email: e.target.value
        });
        this.validEmailTextBox(e.target.value);
    };

    onSubmitHandler = async(e) => {
        e.preventDefault();
        
        this.AllValidVisual();

        if(this.validTextBox("firstname", this.state.firstname) &&
        this.validTextBox("lastname", this.state.lastname) &&
        this.validTextBox("password", this.state.password) &&
        this.validEmailTextBox(this.state.email) &&
        this.validPhoneTextBox(this.state.phone)) 
        {
            try
            {
                const result = await authService.registerAxios(this.state);
                console.log(result);
                this.props.history.push('/');
            }
            catch(error) 
            {
                var data = error.response.data;
                switch(data.type) 
                {
                    case "email": 
                    {
                            var email = document.getElementById('email');
                            this.Fail(email);
                            var $div = $(email).closest('.form-group').find('.invalid-feedback');

                            var $spanElement = $(`<span className="text-danger" data-blok><br/>${data.message}</span>`);
                                $div.append($spanElement);
                        break;
                    }
                    case "password": 
                    {
                        var password = document.getElementById('password');
                            this.Fail(password);
                            var $div = $(password).closest('.form-group').find('.invalid-feedback');


                            $(data.errors).each((element) => {
                                var $spanElement = $(`<span className="text-danger" data-blok><br/>${data.errors[element]}</span>`);
                                $div.append($spanElement);
                            });
                        break;
                    }
                    case "server": 
                    {
                        console.log("Server error");
                        alert("Сервіс знаходиться на ремонті... Спробуйте будь ласка пізніше");
                        break;
                    }
                }
                
            }
        }
    }

    AllValidVisual() 
    {
        this.validTextBox("firstname", this.state.firstname);
        this.validTextBox("lastname", this.state.lastname) ;
        this.validTextBox("password", this.state.password);
        this.validEmailTextBox(this.state.email);
        this.validPhoneTextBox(this.state.phone);
    }

    validTextBox(fieldName, valueField) {
        var field = document.getElementById(fieldName);
        if(valueField != '') {
            this.Success(field);
            return true;
        }else {
            this.Fail(field);
            return false;
        }
    }

    validPhoneTextBox(valueField) {
        var field = document.getElementById("phone");
        if(regex_phone.test(valueField)) {
            this.Success(field);
            return true;
        }else {
            this.Fail(field);
            return false;
        }
    }

    validEmailTextBox(valueField) {
        var field = document.getElementById("email");
        if(regex_email.test(valueField)) {
            this.Success(field);
            return true;
        }else {
            this.Fail(field);
            return false;
        }
    }

    Success(field) 
    {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
    }

    Fail(field) 
    {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
    }

    componentDidMount() {
        var mask = IMask(document.getElementById("phone"), {
            mask: '+{38}(000) 000 00 00'
        });
    }



    render() {
            return (
                <div className="container mt-4">
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <h3 className="text-center">Реєстрація</h3>
                        <form onSubmit={this.onSubmitHandler}>
                            <FormTextInput value={this.state.firstname}
                                field="firstname" labelText="Ведіть коректне ім'я"
                                label="Ім'я"
                                onInputHandler={this.onChangeHandler} />

                            <FormTextInput value={this.state.lastname}
                                field="lastname" labelText="Ведіть коректне прізвище"
                                label="Прізвище"
                                onInputHandler={this.onChangeHandler} />

                            <FormTextInput value={this.state.phone}
                                field="phone" labelText="Ведіть коректний номер телефону"
                                label="Телефон"
                                onInputHandler={this.onChangeHandlerPhone} />

                            <FormTextInput value={this.state.email}
                                field="email" labelText="Ведіть коректний Е-мейл"
                                label="Е-мейл"
                                onInputHandler={this.onChangeHandlerEmail} />

                            <FormTextInput type="password" value={this.state.password}
                                field="password" labelText="Ведіть коректний пароль"
                                label="Пароль"
                                onInputHandler={this.onChangeHandler} />

                            <input type="submit" className="btn btn-success mt-3" value="Зареєструватися"/>
                        </form>
                    </div>
                </div>
            </div>
            );
    }
}

export default withRouter(RegisterComponent)
