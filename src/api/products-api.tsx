import axios from 'axios';
import IProduct from '../commons/interfaces/IProduct';

const url = 'https://fakestoreapi.com/products';

async function getList() {
    try {
        const response = await axios.get(url)
        response.data.forEach((item: any) => {
            const isItemNew = Math.random() > 0.70;
            item.new = isItemNew;
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

async function getLisOfNewItems() {
    try {
        const response = await axios.get(url)
        response.data.forEach((item: any) => {
            const isItemNew = Math.random() > 0.70;
            item.new = isItemNew;
        })
        return response.data.filter((item: any) => item.new);
    } catch (error) {
        console.log(error)
    }
}



async function getCategories() {
    try {
        const response = await axios.get(`${url}/categories`)
        const result: {}[] = [];
        response.data.forEach((element: string) => {
            if (element === "electronics") {
                result.push({ name: element, image: "/landing/tech.jpg" })
            } else if (element === "jewelery") {
                result.push({ name: element, image: "/landing/jewelery.jpg" })
            } else if (element === "men's clothing") {
                result.push({ name: element, image: "/landing/mens-clothing.jpg" })
            } else if (element === "women's clothing") {
                result.push({ name: element, image: "/landing/womans-clothing.jpg" })
            }
        })
        return result;
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

async function getSelectedProduct(id: number) {
    try {
        const response = await axios.get(`${url}/${id}`)
        const productImage = response.data.image;
        response.data.image = [];
        for (let i = 0; i < 4; i++) {
            response.data.image.push(productImage);
        }
        if (response.data.category.includes("clothing")) {
            response.data.colors = ["#FF5733", "#FFFC33", "#33FFBF", "#3386FF"]
        }
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

async function getRelatedProducts(id: number) {
    try {
        const selectedProduct = await axios.get(`${url}/${id}`)
        const relatedProducts = await axios.get(`${url}/category/${selectedProduct.data.category}`)
        const response = relatedProducts.data.filter((item: IProduct) => item.id !== id)
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const ProductsApi = {
    getList,
    getCategories,
    selectCategory,
    getLisOfNewItems,
    getSelectedProduct,
    getRelatedProducts
}