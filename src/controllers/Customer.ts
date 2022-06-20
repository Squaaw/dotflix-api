import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import { Customer } from "../interfaces/Customer"
import CustomerSchema from "../models/CustomerSchema"


// Add Customer
const addNewCustomer = (req: Request, res: Response) => {
    
    const newCustomer = new CustomerSchema({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "addressName": req.body.addressName,
        "addressNumber": req.body.addressNumber,
        "postalCode": req.body.postalCode,
        "city": req.body.city,
    })

    return newCustomer
        .save()
        .then((data: Customer) => res.status(201).json({data}))
        .catch((err: any) => res.status(500).json({ err }));
}

const getAllCustomers = (req: Request, res: Response) => {
    return CustomerSchema.find()
        .then((data) => res.status(200).json({ data }))
        .catch((err) => res.status(500).json({ err }));
};

const getCustomerById = (req: Request, res: Response) => {
    const customerId = req.params.id;

    return CustomerSchema.findById(customerId)
        .then((data) => (data ? res.status(200).json({ data }) : res.status(404).json({ message: 'Customer not found' })))
        .catch((err) => res.status(500).json({ err }));
};

const updateCustomerById = (req: Request, res: Response) => {
    const customerId = req.params.id;

    return CustomerSchema.findById(customerId)
        .then((data) => {
            if (data) {
                data.set(req.body);

                return data
                    .save()
                    .then((data: any) => res.status(200).json({ data }))
                    .catch((err: any) => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Customer not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteCustomerById = (req: Request, res: Response) => {
    const customerId = req.params.id;
    
    return CustomerSchema.remove({_id: customerId})
        .then((data) => (data ? res.status(201).json({ data, message: `Deleted customer ${customerId}` }) : res.status(404).json({ message: 'Customer not found' })))
        .catch((err) => res.status(500).json({ err: err, msg: "Customer not deleted, retry in a few moment." }));
};

export { addNewCustomer, getAllCustomers, getCustomerById, updateCustomerById, deleteCustomerById };