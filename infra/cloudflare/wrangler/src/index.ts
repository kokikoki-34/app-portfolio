import { GoogleAuth } from 'google-auth-library';

export interface Env {
  // Service account JSON key
  GCP_SERVICE_ACCOUNT_KEY: any;
  // Cloud Run base URL (e.g., https://...asia-northeast1.run.app)
  PROXY_TARGET: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const targetBaseUrl = env.PROXY_TARGET.replace(/\/$/, ""); // Ensure no trailing slash

    try {
      const url = new URL(request.url);
      const targetUrl = targetBaseUrl + url.pathname + url.search;

      // 1. Create fresh headers to avoid carrying over Cloudflare-specific host headers
      const newHeaders = new Headers(request.headers);

      // 2. Set the Host header to the Cloud Run service URL (Crucial step!)
      const targetHost = new URL(targetBaseUrl).host;
      newHeaders.set("Host", targetHost);

      // 3. Handle Authentication (even if public access is allowed, keep this for security)
      const credentials = typeof env.GCP_SERVICE_ACCOUNT_KEY === 'string'
        ? JSON.parse(env.GCP_SERVICE_ACCOUNT_KEY)
        : env.GCP_SERVICE_ACCOUNT_KEY;

      const auth = new GoogleAuth({ credentials });
      const client = await auth.getIdTokenClient(targetBaseUrl);
      const authHeaders = await client.getRequestHeaders(targetBaseUrl);

      const authValue = authHeaders.get("Authorization");
      if (authValue) {
        newHeaders.set('Authorization', authValue);
      }

      const newRequest = new Request(targetUrl, {
        method: request.method,
        headers: newHeaders,
        body: request.body,
        redirect: 'manual'
      });

      return await fetch(newRequest);

    } catch (e: any) {
      return new Response(`Proxy Error: ${e.message}`, { status: 500 });
    }
  },
};
