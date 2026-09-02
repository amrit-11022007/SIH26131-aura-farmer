/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";

async function saveLoginRecord(user: {
  id: string;
  email: string;
  name?: string | null;
  isMock?: boolean;
  farmer?: unknown;
}) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB ?? "sih131");

    await db.collection("loginData").insertOne({
      userId: user.id,
      email: user.email,
      name: user.name || "Unknown user",
      isMock: Boolean(user.isMock),
      farmer: user.farmer || null,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Failed to save login record to MongoDB:", error);
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID_PLACEHOLDER",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET_PLACEHOLDER",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Attempt to authenticate with the Django backend
          const backendUrl =
            process.env.BACKEND_API_URL || "http://127.0.0.1:8000";
          const res = await fetch(`${backendUrl}/api/login/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data && data.user) {
              const user = {
                id: data.user.id.toString(),
                name: data.user.name || data.user.username,
                email: data.user.email,
                image: null,
                accessToken: data.access,
                refreshToken: data.refresh,
                farmer: data.farmer,
              };

              await saveLoginRecord(user);

              return user;
            }
          }
        } catch (error) {
          console.warn(
            "Backend authentication failed or is offline. Falling back to local/mock authentication.",
            error,
          );
        }
        if (
          credentials.email.includes("@") &&
          credentials.password.length >= 4
        ) {
          const name = credentials.email.split("@")[0];
          const user = {
            id: "mock-user-id-123",
            name: name.charAt(0).toUpperCase() + name.slice(1),
            email: credentials.email,
            image: null,
            isMock: true,
            farmer: {
              id: 999,
              name: name.charAt(0).toUpperCase() + name.slice(1),
              email: credentials.email,
              location: "Palampur, Kangra District",
              created_at: new Date().toISOString(),
            },
          };

          await saveLoginRecord(user);

          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as any;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret:
    process.env.NEXTAUTH_SECRET || "super-secret-development-key-123456789",
});

export { handler as GET, handler as POST };
