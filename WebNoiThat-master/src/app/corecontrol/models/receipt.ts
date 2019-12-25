import { InvoiceProduct } from './invoiceproduct';

export  class Receipt {
    id: number;
    amount: string;
    discount: string;
    stateDelivering: boolean;
    stateDelivered: boolean;
    statePaid: boolean;
    total: number;
    employee_id: number;
    invoiceProduct: InvoiceProduct;

    createdDate: Date;
    updatedDate: Date;
    
}