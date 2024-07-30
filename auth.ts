import NextAuth, { Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        token: {},
      },
      authorize: async (credentials) => {
        const { token } = credentials;

        console.log();

        return {
          email: "test@pdn.com",
          name: "ادمین سیستم",
          token,
        } as User;
      },
    }),
  ],
  callbacks: {
    jwt: ({ user, token }: { user: User; token: JWT }) => {
      console.log({ token, user });

      if (user && "token" in user && user.token) {
        return {
          ...token,
          id: user.id,
          token: `${user.token}`,
        };
      }

      return token;
    },
    session: ({
      session,
      token,
    }: {
      session: Session;
      token: JWT & { token?: string };
    }) => {
      return { ...session, user: token };
    },
  },
  pages: {
    signIn: "/login",
  },
});
