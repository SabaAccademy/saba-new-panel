import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const mockUsers = [
  {
    id: '1',
    name: 'علی احمدی',
    email: 'admin@demo.com',
    password: 'demo1234',
    role: 'admin',
    image: '/images/profile/user-1.jpg',
    title: 'مدیر سیستم',
  },
  {
    id: '2',
    name: 'سارا محمدی',
    email: 'user@demo.com',
    password: 'user1234',
    role: 'user',
    image: '/images/profile/user-2.jpg',
    title: 'کاربر عادی',
  },
  {
    id: '3',
    name: 'رضا کریمی',
    email: 'manager@demo.com',
    password: 'manager1234',
    role: 'manager',
    image: '/images/profile/user-3.jpg',
    title: 'مدیر محصول',
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'ایمیل', type: 'email' },
        password: { label: 'رمز عبور', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = mockUsers.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        )
        if (!user) return null
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          title: user.title,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role
        token.title = (user as { title?: string }).title
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as { role?: string }).role = token.role as string
        ;(session.user as { title?: string }).title = token.title as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/login',
    newUser: '/auth/register',
  },
  secret: process.env.NEXTAUTH_SECRET ?? 'tailwind-admin-secret-change-in-production',
}
