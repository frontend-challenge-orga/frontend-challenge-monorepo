import { PrismaAdapter } from "@auth/prisma-adapter";
import type { PrismaClient } from "@prisma/client";

/** @return { import("next-auth/adapters").Adapter } */
export function CustomPrismaAdapter(p: PrismaClient) {
  return {
    ...PrismaAdapter(p),

    getSessionAndUser: async (sessionToken: string) => {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken },
        include: {
          user: {
            include: { sessions: true },
          },
        },
      });

      if (!userAndSession) return null;

      const { user, ...session } = userAndSession;

      return { user, session };
    },
  };
}
