import axios from 'axios';

const url = 'https://fakestoreapi.com/products';

async function getList() {
    try {
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const ProductsApi = {
    getList
}