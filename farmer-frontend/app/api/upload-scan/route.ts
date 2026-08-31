import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 },
      );
    }

    // Validate file type (optional)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 },
      );
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the upload directory (relative to project root)
    const uploadDir = path.join(process.cwd(), "public", "scans");

    // Create directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true });

    // Generate a unique filename
    const timestamp = Date.now();
    const filename = `scan-${timestamp}.jpg`;
    const filePath = path.join(uploadDir, filename);

    // Write the file
    await writeFile(filePath, buffer);

    // Return the public URL path (accessible from the browser)
    const publicPath = `/scans/${filename}`;

    return NextResponse.json(
      { filePath: publicPath, filename },
      { status: 200 },
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
