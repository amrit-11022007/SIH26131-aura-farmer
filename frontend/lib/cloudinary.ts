/**
 * Cloudinary Image Upload Helper
 * Uploads crop diagnosis images directly to Cloudinary and returns the secure CDN URL.
 */

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "cropguard_unsigned";

export const isCloudinaryConfigured = Boolean(
  cloudName && !cloudName.includes("your-cloud-name")
);

export async function uploadImageToCloudinary(file: File | Blob): Promise<string> {
  if (!isCloudinaryConfigured) {
    console.warn("Cloudinary not configured in .env.local; returning temporary object URL.");
    if (file instanceof File || file instanceof Blob) {
      return URL.createObjectURL(file);
    }
    return "/uploads/sample_leaf.jpg";
  }

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error("Cloudinary upload failed:", errData);
      return URL.createObjectURL(file);
    }

    const data = await res.json();
    return data.secure_url || data.url;
  } catch (err) {
    console.error("Failed to upload image to Cloudinary:", err);
    return URL.createObjectURL(file);
  }
}
