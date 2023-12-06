import { GetObjectCommand } from "@aws-sdk/client-s3";

import { r2 } from "@/lib/r2";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("id");

    if (!query) {
      throw new Error("id not found.");
    }

    console.log(`Retrieving pdf from R2!`);

    const pdf = await r2.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: query,
      }),
    );

    if (!pdf) {
      throw new Error("pdf not found.");
    }

    return new Response(pdf.Body?.transformToWebStream(), {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (err) {
    console.log("error", err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
