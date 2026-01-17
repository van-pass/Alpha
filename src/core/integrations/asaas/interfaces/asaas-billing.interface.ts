export interface CreateAsaasBillingRequest {
  customer: string;
  billingType: 'BOLETO' | 'PIX' | 'CREDIT_CARD';
  value: number;
  dueDate: string;
  externalReference: string; // studentId
  description: string;
}

export interface AsaasBillingResponse {
  object: 'payment';
  id: string;
  invoiceUrl: string;
  invoiceNumber: string;
  dateCreated: string;
  customer: string;
  billingType: 'BOLETO' | 'PIX' | 'CREDIT_CARD';
  value: number;
  netValue: number;
  dueDate: string;
  externalReference: string;
  description: string;
  status:
    | 'PENDING'
    | 'RECEIVED'
    | 'CONFIRMED'
    | 'OVERDUE'
    | 'REFUNDED'
    | 'RECEIVED_IN_CASH'
    | 'REFUND_REQUESTED'
    | 'REFUND_IN_PROGRESS'
    | 'CHARGEBACK_REQUESTED'
    | 'CHARGEBACK_DISPUTE'
    | 'AWAITING_CHARGEBACK_REVERSAL'
    | 'DUNNING_REQUESTED'
    | 'DUNNING_RECEIVED'
    | 'AWAITING_RISK_ANALYSIS';
}
