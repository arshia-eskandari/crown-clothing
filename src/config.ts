export const CATEGORIES = [
    {
        id: 1,
        title: 'hats',
        imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
        route: 'shop/hats',
    },
    {
        id: 2,
        title: 'jackets',
        imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
        route: 'shop/jackets',
    },
    {
        id: 3,
        title: 'sneakers',
        imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
        route: 'shop/sneakers',
    },
    {
        id: 4,
        title: 'womens',
        imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
        route: 'shop/womens',
    },
    {
        id: 5,
        title: 'mens',
        imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
        route: 'shop/mens',
    },
];
export enum DEFAULT_SIGNUP_FORM_FIELDS {
    displayName = '',
    email = '',
    password = '',
    confirmPassword = '',
}
export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted',
}
export enum DEFAULT_SIGNIN_FORM_FIELDS {
    email = '',
    password = '',
}
export const ONE = 1;
export enum DEFAULT_SHIPPING_ADDRESS_FORM_FIELDS {
    shipLine1 = '',
    shipLine2 = '',
    shipCity = '',
    shipPostalCode = '',
    shipState = '',
}
export enum DEFAULT_BILLING_ADDRESS_FORM_FIELDS {
    billLine1 = '',
    billLine2 = '',
    billCity = '',
    billPostalCode = '',
    billState = '',
}
export const LARGE = 'L';
export const MEDIUM = 'M';
export const SMALL = 'S';