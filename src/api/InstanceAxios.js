import axios from 'axios';


const InstanceAxios = axios.create({
    withCredentials: true,
});

export { InstanceAxios };
