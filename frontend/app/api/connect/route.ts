import Ably from "ably/promises";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const ABLY_API_KEY = process.env.ABLY_API_KEY;
  if (!ABLY_API_KEY) {
    return new Response("Undefined Ably API key.", { status: 400 });
  }

  const client = new Ably.Realtime(ABLY_API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "ably-nextjs-demo",
  });
  return Response.json(tokenRequestData);
}
