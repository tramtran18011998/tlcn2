import { Customer } from './customer';
import { Employee } from './employee';

export  class InvoiceProduct {
    id: number;
    total: number;
    employee: Employee;
    
    customer: Customer;

    createdDate: Date;
    updatedDate: Date;
    
}