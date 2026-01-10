export interface AsaasErrorResponse {
  errors: Array<{
    code: string;
    description: string;
  }>;
}
