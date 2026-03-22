export interface InvoiceItem {
  product: string;
  qty: number;
  unitPrice: number;
}

export interface Invoice {
  id?: number;
  invoiceNumber: string;
  businessName: string;
  addressLine1: string;
  addressLine2: string;
  date: string;
  terms: string;
  items: InvoiceItem[];
  taxPercent: number;
  subtotal: number;
  taxAmount: number;
  total: number;
  createdAt: string;
}

export interface InvoiceFormValues {
  businessName: string;
  addressLine1: string;
  addressLine2: string;
  date: string;
  terms: string;
  items: InvoiceItem[];
  taxPercent: number;
}
