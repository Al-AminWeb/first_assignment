const formatValue = (value: number | string | boolean) => {
    if (typeof value === 'string') {
        return value.toUpperCase();
    } else if (typeof value === "number") {
        return value * 10;
    } else if (typeof value === "boolean") {
        return !value;
    }
}


const getLength = (input: string | any[]) => {
    if (typeof input === "string") {
        return input.length;
    }
    if (Array.isArray(input)) {
        return input.length;
    }
}


class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}


interface RatedItem {
    title: string;
    rating: number;
}

export function filterByRating(items: RatedItem[]): RatedItem[] {
    return items.filter((item) => item.rating >= 4);
}


interface ActiveUsers {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

export function filterActiveUsers(users: ActiveUsers[]): ActiveUsers[] {
    return users.filter((user) => user.isActive === true);
}



interface Book {
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
}

export function printBookDetails(book: Book): string {
    return `Title: ${book.title}, Author: ${book.author}, Published: ${book.publishedYear}, Available: ${book.isAvailable ? 'Yes' : 'No'}`;
}

const myBook: Book = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publishedYear: 1925,
    isAvailable: true,
};
printBookDetails(myBook)



export function getUniqueValues(arr1: (string | number)[], arr2: (string | number)[]): (string | number)[] {
    const result: (string | number)[] = [];

    const pushIfNotExists = (value: string | number) => {
        let exists = false;
        for (const item of result) {
            if (item === value) {
                exists = true;
                break;
            }
        }
        if (!exists) result.push(value);
    };

    for (const v of arr1) pushIfNotExists(v);
    for (const v of arr2) pushIfNotExists(v);

    return result;
}



interface Product {
    name: string;
    price: number;
    quantity: number;
    discount?: number;
}

export function calculateTotalPrice(products: Product[]): number {
    if (products.length === 0) return 0;

    return products
        .map((product) => {
            const base = product.price * product.quantity;
            if (product.discount) {
                const discounted = base - (base * product.discount) / 100;
                return discounted;
            }
            return base;
        })
        .reduce((sum, current) => sum + current, 0);
}