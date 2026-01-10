export interface CreateAsaasCustomerRequest {
  name: string;
  cpfCnpj: string;
  email?: string;
  phone?: string;
  mobilePhone: string; // whatsappNumber
  address?: string;
  addressNumber?: string;
  complement?: string;
  province?: string;
  postalCode?: string;
  externalReference: string; // driverId
  notificationDisabled?: boolean;
  additionalEmails?: string;
  municipalInscription?: string;
  stateInscription?: string;
  observations?: string;
  groupName?: string;
  company?: string;
}

export interface AsaasCustomerResponse {
  object: 'customer';
  id: string;
  dateCreated: string;
  name: string;
  email: string | null;
  phone: string | null;
  mobilePhone: string | null;
  address: string | null;
  addressNumber: string | null;
  complement: string | null;
  province: string | null;
  city: number;
  cityName: string;
  state: string;
  country: string;
  postalCode: string | null;
  cpfCnpj: string;
  personType: 'FISICA' | 'JURIDICA';
  deleted: boolean;
  additionalEmails: string | null;
  externalReference: string | null;
  notificationDisabled: boolean;
  observations: string | null;
  foreignCustomer: boolean;
}

export interface ListAsaasCustomersResponse {
  object: 'list';
  hasMore: boolean;
  totalCount: number;
  limit: number;
  offset: number;
  data: AsaasCustomerResponse[];
}
