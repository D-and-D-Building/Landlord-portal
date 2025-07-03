
'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseMessage, setLicenseMessage] = useState('');
  const [showLicenseInput, setShowLicenseInput] = useState(false);

  const router = useRouter();
  const { data: session, update } = useSession();

  // Effect to handle redirection after session update (e.g., after license renewal)
  useEffect(() => {
    if (session?.user) {
      const expiryDate = session.user.licenseExpiryDate ? new Date(session.user.licenseExpiryDate) : null;
      const now = new Date();

      if (session.user.firstLogin) {
        router.push('/auth/change-password');
      } else if (expiryDate && expiryDate < now) {
        // License expired, show license input
        setShowLicenseInput(true);
      } else {
        // License valid, redirect to dashboard
        router.push('/');
      }
    }
  }, [session, router]);

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLicenseMessage('');
    setShowLicenseInput(false);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else if (result?.ok) {
      // Session will be updated by NextAuth, useEffect will handle redirection
      // No direct redirect here, as we need the session to be updated first
    }
  };

  const handleLicenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLicenseMessage('');

    let newExpiryDate: Date | null = null;
    if (licenseNumber === 'VALID-LICENSE-2026') {
      newExpiryDate = new Date();
      newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1); // Set expiry to 1 year from now
    } else if (licenseNumber === 'VALID-LICENSE-2027') {
      newExpiryDate = new Date();
      newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 2); // Set expiry to 2 years from now
    } else {
      setLicenseMessage('Invalid license number. Please try again.');
      return;
    }

    await update({
      ...session,
      user: {
        ...session?.user,
        licenseExpiryDate: newExpiryDate.toISOString(),
      },
    });

    setLicenseMessage('License activated successfully! Redirecting...');
    // Redirection will be handled by the useEffect after session update
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access the landlord portal</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {!showLicenseInput ? (
            <form onSubmit={handleSignInSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          ) : (
            <form onSubmit={handleLicenseSubmit} className="grid gap-4">
              <p className="text-center text-red-500">Your license has expired. Please enter a new license number.</p>
              <div className="grid gap-2">
                <Label htmlFor="license-number">License Number</Label>
                <Input
                  id="license-number"
                  placeholder="LIC-XXXX-XXXX-XXXX"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  required
                />
              </div>
              {licenseMessage && (
                <p className={`text-sm ${licenseMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                  {licenseMessage}
                </p>
              )}
              <Button type="submit" className="w-full">Activate License</Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-500 w-full">
            Demo Account: admin@example.com / password
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
