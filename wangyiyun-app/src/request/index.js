import axios from 'axios';

axios.defaults.withCredentials = true;

let service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000,
    withCredentials:true
})
export default service