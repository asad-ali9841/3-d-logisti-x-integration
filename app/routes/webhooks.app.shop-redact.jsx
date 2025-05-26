import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { shop, topic, payload } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop} with payload:`, payload);

  // For shop redact webhooks, we need to:
  // 1. Identify the shop from the payload
  const shopId = payload.shop_id;
  const shopDomain = payload.shop_domain;

  // 2. Log that we received the redact request (for audit purposes)
  console.log(
    `Received request to redact all data for shop ${shopDomain} (ID: ${shopId})`,
  );

  // 3. Implement your logic to delete/anonymize all shop data here
  // This would typically be an async process that happens after responding

  // 4. Return a 200 OK to acknowledge receipt
  return new Response(null, { status: 200 });
};
