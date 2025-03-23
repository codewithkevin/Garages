import { SellerFormData, UserFormData } from '@/types/user.type';
import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape<Record<keyof UserFormData, Yup.AnySchema>>({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    name: Yup.string().min(2).required("Name is required"),
    role: Yup.string().required(),
});

export const sellerValidationSchema = Yup.object().shape<Record<keyof SellerFormData, Yup.AnySchema>>({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    garageName: Yup.string().required("Garage name is required"),
    contactNumber: Yup.string().min(10).max(15).required("Contact number is required"),
    address: Yup.string().required("Address is required"),
    role: Yup.string().required(),
})

