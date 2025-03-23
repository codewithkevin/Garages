//enum 
export enum UserRoles {
    user = 'user',
    seller = 'seller'
}

export interface UserFormData {
    email: string;
    name: string;
    role: UserRoles.user;
}

export interface SellerFormData {
    email: string;
    garageName: string;
    contactNumber: string;
    address: string;
    role: UserRoles.seller;
}
