/* eslint-disable */

import axios from "axios";

// export const axiosInstance=axios.create({

//     baseURL: 'http://20.85.199.193:8080',
//     timeout: 1000,
// });

// axiosInstance.interceptors.request.use(()=>{

// });

// export const axiosInstance = axios.create({
//     baseURL: 'http://20.85.199.193:8080',
//     headers:{
//         "Content-Type": "application/json"
//     }
//   });

//   axiosInstance.interceptors.response.use(
//     response => response,
//     error => Error);

//   export default axiosInstance;
const token = '';

var axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    headers: {
      "Authorization": `Bearer ${token}`
    },
   
  })

// console.log('axiosInstance......')

  //This allows you to intercept the request before it is sent and alter headers or anyting else that is passed to the axios config.
  let interceptors = axiosInstance.interceptors.request.use((config)=>{
    // console.log('axiosInstance...... before call config ',config)
    return config
  }, (error) => {
    console.log("Interceptor Request Error" + error)
  })

  //This allows you to intercept the response and check the status and error messages and if ncessary reject the promise.
  axiosInstance.interceptors.response.use((response) => {
    return response
  }, (error) => {
    return Promise.reject(error);
  })

  const customFnUpdateAxiosHeader=(roleId)=>{
    // reject the previous interceptors 
    // axios.interceptors.request.eject(interceptors);
    // interceptors = 
    axiosInstance.interceptors.request.use((config)=>{
      config.headers.roleId=roleId;
      // console.log('updateAxiosHeader...... new config ', config);
      return config;
    }, (error) => {
      console.error('updateAxiosHeader Interceptor Request Error' + error);
    });
  };

  const customFnAddTokenInHeader = (accessToken)=>{
    axiosInstance.interceptors.request.use((config)=>{
      config.headers.Authorization=`Bearer ${accessToken}`;
      // console.log('updateAxiosHeader...... new config ', config);
      return config;
    }, (error) => {
      console.error('customFnAddTokenInHeader Interceptor Request Error' + error);
    });
  }

  

  axiosInstance.customFnUpdateAxiosHeader=customFnUpdateAxiosHeader;
  axiosInstance.customFnAddTokenInHeader=customFnAddTokenInHeader;

  export default axiosInstance
