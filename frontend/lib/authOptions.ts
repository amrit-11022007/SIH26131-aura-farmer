import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "demo-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo-google-client-secret",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "FARMER", // Google OAuth is specifically restricted/assigned for Farmers!
        };
      },
    }),
    CredentialsProvider({
      name: "CropGuard Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email", placeholder: "farmer@example.com" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const email = credentials.email.toLowerCase();
        const role = credentials.role || "FARMER";
        const userName = (credentials as any)?.name || "Ramesh Patel";

        // Pre-configured role mapping for demo / credentials login
        if (email.includes("expert")) {
          return {
            id: "u-expert-1",
            name: "Dr. Rajesh Kumar",
            email: "expert@example.com",
            role: "EXPERT",
          };
        } else if (email.includes("official") || email.includes("admin")) {
          return {
            id: "u-official-1",
            name: "Sunita Verma (District Agri Officer)",
            email: "official@example.com",
            role: "AGRICULTURE_OFFICIAL",
          };
        } else {
          return {
            id: "u-farmer-1",
            name: userName,
            email: email,
            role: role,
          };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = (user as any).role || "FARMER";
        token.id = user.id;
      }
      if (account?.provider === "google") {
        token.role = "FARMER"; // Force Google sign-in role to FARMER
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role || "FARMER";
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "cropguard-nextauth-secret-key-2026",
};
