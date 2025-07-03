
'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <DashboardLayout>Loading profile...</DashboardLayout>;
  }

  if (!session) {
    return <DashboardLayout>You need to be logged in to view this page.</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <p className="mt-2 text-gray-600">Manage your profile information and settings.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>View and update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={session.user?.name || 'N/A'} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={session.user?.email || 'N/A'} readOnly />
              </div>
            </div>
            {/* Add more profile fields as needed */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Perform actions related to your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={() => signOut({ callbackUrl: '/' })}>
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
