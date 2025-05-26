import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { shop, topic, payload } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop} with payload:`, payload);

  // For customer redact webhooks, we need to:
  // 1. Identify the customer from the payload
  const customerId = payload.customer.id;

  // 2. Log that we received the redact request (for audit purposes)
  console.log(`Received request to redact data for customer ${customerId}`);

  // 3. Implement your logic to delete/anonymize customer data here
  // This would typically be an async process that happens after responding

  // 4. Return a 200 OK to acknowledge receipt
  return new Response(null, { status: 200 });
};
