import { GoogleAuth } from 'google-auth-library';

export interface Env {
  GCP_SERVICE_ACCOUNT_KEY: any;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const CLOUD_RUN_URL = "https://app-portfolio-proxy-dev-442469161656.asia-northeast1.run.app";

    try {
      const credentials = typeof env.GCP_SERVICE_ACCOUNT_KEY === 'string'
        ? JSON.parse(env.GCP_SERVICE_ACCOUNT_KEY)
        : env.GCP_SERVICE_ACCOUNT_KEY;

      const auth = new GoogleAuth({ credentials });
      const client = await auth.getIdTokenClient(CLOUD_RUN_URL);
      const authHeaders = await client.getRequestHeaders(CLOUD_RUN_URL);

      const newHeaders = new Headers(request.headers);
      const authValue = authHeaders.get("Authorization");
      if (authValue) {
        newHeaders.set('Authorization', authValue);
      }

      const url = new URL(request.url);
      const targetUrl = CLOUD_RUN_URL + url.pathname + url.search;

      const newRequest = new Request(targetUrl, {
        method: request.method,
        headers: newHeaders,
        body: request.body,
        redirect: 'manual'
      });

      const response = await fetch(newRequest);

      const responseHeaders = new Headers(response.headers);

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders
      });

    } catch (e: any) {
      return new Response(`Proxy Error: ${e.message}`, { status: 500 });
    }
  },
};
