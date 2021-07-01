import axios from 'axios';

const url = 'https://fakestoreapi.com/products';

async function getList() {
    try {
        const response = await axios.get(url)
        response.data.forEach((item: any )=> {
            const isItemNew = Math.random() > 0.70;
            item.new = isItemNew;
        })
        return response.data;
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
                result.push({ name: element, image: "/landing-electronics.jpg" })
            } else if (element === "jewelery") {
                result.push({ name: element, image: "/landing-jewelery.jpg" })
            } else if (element === "men's clothing") {
                result.push({ name: element, image: "/landing-mens-clothing.jpg" })
            } else if (element === "women's clothing") {
                result.push({ name: element, image: "/landing-womens-clothing.jpg" })
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


export const ProductsApi = {
    getList,
    getCategories,
    selectCategory
}