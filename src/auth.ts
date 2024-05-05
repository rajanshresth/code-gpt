import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google],
});
