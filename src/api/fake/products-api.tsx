import faker from 'faker';
import IProduct from '../../commons/interfaces/IProduct';

const getList = (amount: number) => {
    const products: IProduct[] = [];
        for (let i = 0; i < amount; i++) {
            const product: IProduct = {image: '', name: '', price: 0};
            product.image = faker.image.food();
            product.name = faker.lorem.words();
            product.price = faker.random.number();
            products.push(product);
        };
        return products;
};

export const ProductsApi = {
    getList
}