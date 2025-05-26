import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { shop, topic, payload } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop} with payload:`, payload);

  // For GDPR data request webhooks, we need to return a specific JSON response
  if (topic === "customers/data_request") {
    // Use the request ID from the payload
    const requestId = payload.data_request.id;

    // Set a reasonable completion time (10 days from now)
    const tenDaysFromNow = new Date();
    tenDaysFromNow.setDate(tenDaysFromNow.getDate() + 10);
    const estimatedCompletionTime = tenDaysFromNow.toISOString();
    const backendUrl = `${process.env.BACKEND_URL}/shopifywebhooks/customers/data_request`;
    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return new Response(
      JSON.stringify({
        request_id: requestId,
        message: "Data request received. We will process this request.",
        estimated_completion_time: estimatedCompletionTime,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  // For other webhooks, return a simple 200 OK
  return new Response();
};
