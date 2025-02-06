import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

export async function POST(req: Request) {
    const { key } = await req.json();
    try {
      const kvUri = process.env.KEY_VAULT_URI || "";
  
      const credential = new DefaultAzureCredential();
      const client = new SecretClient(kvUri, credential);
      const secret = await client.getSecret(key);
      return new Response(JSON.stringify({ value: secret.value }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log("Error fetching secrets");
      return new Response(JSON.stringify({ message: "Error getting Secrets" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  };
  