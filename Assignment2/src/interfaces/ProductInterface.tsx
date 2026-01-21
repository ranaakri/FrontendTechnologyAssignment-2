export interface Product{
    id: string;
    description: string;
    title: string;
    category: string;
    price: number;
    discountPercentage:number;
    stock:number;
    images: string[];
}