import axios from 'axios';
// import { dCandidate } from '../reducers/dCandidate';

const baseUrl = "http://localhost:65170/";

const request = {
    dCandidate(url = baseUrl + 'dCandidate/'){
        return{
            fetchAll: () => axios.get(url),
            fetchById: (id) => axios.get(url+id),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url+id, updateRecord),
            delete: (id) => axios.delete(url+id)
        }
    }
}

export default request;