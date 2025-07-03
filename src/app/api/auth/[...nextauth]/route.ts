
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.email === 'admin@example.com') {
          const isFirstLogin = credentials?.password === 'password';
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@example.com',
            firstLogin: isFirstLogin,
            organizationId: 'org-123',
            role: 'admin',
            licenseExpiryDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // Expired yesterday
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.firstLogin = user.firstLogin;
        token.organizationId = user.organizationId;
        token.role = user.role;
        token.licenseExpiryDate = user.licenseExpiryDate;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.firstLogin = token.firstLogin;
        session.user.organizationId = token.organizationId;
        session.user.role = token.role;
        session.user.licenseExpiryDate = token.licenseExpiryDate;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
