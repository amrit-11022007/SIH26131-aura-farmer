import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB ?? "sih131");

    const alerts = await db.collection("alerts").find({}).toArray();

    return NextResponse.json(alerts);
  } catch (error) {
    console.error("Failed to fetch alerts:", error);

    return NextResponse.json(
      { error: "Failed to fetch alerts" },
      { status: 500 },
    );
  }
}
