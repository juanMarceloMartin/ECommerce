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

async function getCategories() {
    try {
        const response = await axios.get(`${url}/categories`)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

async function selectCategory(category: string) {
    try {
        const response = await axios.get(`${url}/category/${category}`)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}


export const ProductsApi = {
    getList,
    getCategories,
    selectCategory
}