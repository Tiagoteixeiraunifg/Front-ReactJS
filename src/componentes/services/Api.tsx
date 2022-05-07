import React from 'react';
import axios from "axios";
import http from "http";
import https from "https";




const apiAuth = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
    responseType: 'json',
    responseEncoding: 'utf8',
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
});

export default apiAuth;