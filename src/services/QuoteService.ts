export interface QuoteRequest {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  product: string;
  specs: string;
  quantity: string;
  city: string;
  notes?: string;
}

export const submitQuote = async (data: QuoteRequest) => {
  console.log("Submitting quote (mock):", data);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true };
};
