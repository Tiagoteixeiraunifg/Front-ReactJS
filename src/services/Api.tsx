import axios from "axios";


//baseURL: "http://localhost:80/api",
//baseURL: "https://api-spring-a3.herokuapp.com/api",
const apiAuth = axios.create({
    
    insecureHTTPParser: false,    
    withCredentials: false,
    baseURL: "https://api-spring-a3.herokuapp.com/api",
    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
    responseType: 'json',
    responseEncoding: 'utf8',
});

apiAuth.interceptors.request.use(config => {
      //config.headers.Authorization = `Bearer ${token}`;
      return config;
});


export default apiAuth;
