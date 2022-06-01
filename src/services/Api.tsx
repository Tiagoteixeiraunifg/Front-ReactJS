import React, { useEffect, useState } from 'react';
import axios from "axios";
import http from "http";
import https from "https";
import { useAppSelector } from '../redux/hooks/useAppSelector';

const apiAuth = axios.create({
    baseURL: "http://54.205.225.72:8080/api",
    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
    responseType: 'json',
    responseEncoding: 'utf8',
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
});

apiAuth.interceptors.request.use(config => {
      //config.headers.Authorization = `Bearer ${token}`;
      return config;
});


export default apiAuth;