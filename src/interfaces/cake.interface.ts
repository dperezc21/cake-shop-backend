

export interface CakeInterface {
    id: number;
    name: string;
    description: string;
    images: CakeImage[];
}

export interface CakeImage {
    id?: string | number;
    url: string
}