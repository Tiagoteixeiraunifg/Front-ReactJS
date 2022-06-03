import React, { useEffect, useState } from 'react';
import axios from "axios";
import http from "http";
import https from "https";
import { useAppSelector } from '../redux/hooks/useAppSelector';

const apiAuth = axios.create({
    
    insecureHTTPParser: false,    
    withCredentials: false,
    baseURL: "http://23.21.198.225/api",
    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
    responseType: 'json',
    responseEncoding: 'utf8',
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: false }),

});

apiAuth.interceptors.request.use(config => {
      //config.headers.Authorization = `Bearer ${token}`;
      return config;
});


export default apiAuth;