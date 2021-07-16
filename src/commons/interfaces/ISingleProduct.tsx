export default interface ISingleProduct {
    id: number,
    description: string,
    category: string,
    title: string,
    image: string[],
    price: number,
    colors: string[],
    new: boolean
}