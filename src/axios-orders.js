import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-1740b.firebaseio.com/'
});

export default instance;