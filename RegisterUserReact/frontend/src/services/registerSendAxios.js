import React, { Component } from 'react'
import http from '../services/getAxiosCreate'

class RegisterService {
    registerAxios(data) 
    {
       return http.post("api/account/registeruser", data);
    }
}

export default new RegisterService()
