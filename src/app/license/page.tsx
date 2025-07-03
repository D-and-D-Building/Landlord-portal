
'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function LicensePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [licenseNumber, setLicenseNumber] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'loading') return;

    // Redirect if not an admin or not logged in
    if (!session || session.user?.role !== 'admin') {
      router.push('/');
    }
  }, [session, status, router]);

  const handleRenewLicense = async () => {
    setMessage(''); 

    
    let newExpiryDate: Date | null = null;
    if (licenseNumber === 'VALID-LICENSE-2026') {
      newExpiryDate = new Date();
      newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1); // Set expiry to 1 year from now
    } else if (licenseNumber === 'VALID-LICENSE-2027') {
      newExpiryDate = new Date();
      newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 2); // Set expiry to 2 years from now
    } else {
      setMessage("Invalid license number. Please try again.");
      return;
    }

    // Simulate API call to update license expiry date
    // an actual API call to your backend and the backend would update the database and return the new session data.
    await update({
      ...session,
      user: {
        ...session?.user,
        licenseExpiryDate: newExpiryDate.toISOString(),
      },
    });

    setMessage('License renewed successfully! New expiry: ' + format(newExpiryDate, 'PPP'));
  };

  if (status === 'loading' || !session || session.user?.role !== 'admin') {
    return <DashboardLayout>Loading license management...</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">License Management</h1>
          <p className="mt-2 text-gray-600">Manage your organization's subscription license.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current License Status</CardTitle>
            <CardDescription>
              Your current license expires on:
              <span className="font-semibold ml-1">
                {session?.user?.licenseExpiryDate ? format(new Date(session.user.licenseExpiryDate), 'PPP') : 'N/A'}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="license-number">Enter License Number</Label>
              <Input
                id="license-number"
                placeholder="LIC-XXXX-XXXX-XXXX"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </div>
            {message && (
              <p className={`text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleRenewLicense}>Activate License</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
