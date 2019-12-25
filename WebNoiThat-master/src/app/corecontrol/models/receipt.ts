import { InvoiceProduct } from './invoiceproduct';
import { Employee } from './employee';

export  class Receipt {
    id: number;
    amount: number;
    discount: number;
    stateDelivering: boolean;
    stateDelivered: boolean;
    statePaid: boolean;
    total: number;
    employee: Employee;
    invoiceProduct: InvoiceProduct;

    createdDate: Date;
    updatedDate: Date;
    
}