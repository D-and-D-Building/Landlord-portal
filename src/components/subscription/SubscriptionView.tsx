'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown, 
  Calendar, 
  Gift, 
  Percent, 
  Key, 
  Package, 
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Star,
  Upgrade,
  Download,
  Copy
} from 'lucide-react';

export function SubscriptionView() {
  const [voucherCode, setVoucherCode] = useState('');

  // Mock subscription data
  const currentLicense = {
    licenseNumber: 'LIC-2024-PRO-789456',
    packageCode: 'PKG-PROFESSIONAL',
    packageName: 'Professional Plan',
    status: 'active',
    issueDate: '2024-01-01',
    expirationDate: '2024-12-31',
    maxProperties: 50,
    maxUnits: 500,
    maxUsers: 10,
    features: [
      'Advanced Analytics',
      'Automated Billing',
      'Maintenance Management',
      'Tenant Portal',
      'Financial Reporting',
      'API Access',
      'Priority Support'
    ]
  };

  // Mock available packages
  const availablePackages = [
    {
      code: 'PKG-STARTER',
      name: 'Starter Plan',
      price: 29,
      maxProperties: 5,
      maxUnits: 50,
      maxUsers: 2,
      features: ['Basic Analytics', 'Tenant Management', 'Basic Reporting'],
      popular: false
    },
    {
      code: 'PKG-PROFESSIONAL',
      name: 'Professional Plan',
      price: 79,
      maxProperties: 50,
      maxUnits: 500,
      maxUsers: 10,
      features: ['Advanced Analytics', 'Automated Billing', 'Maintenance Management', 'Tenant Portal', 'Financial Reporting', 'API Access', 'Priority Support'],
      popular: true
    },
    {
      code: 'PKG-ENTERPRISE',
      name: 'Enterprise Plan',
      price: 199,
      maxProperties: 'Unlimited',
      maxUnits: 'Unlimited',
      maxUsers: 'Unlimited',
      features: ['All Professional Features', 'Custom Integrations', 'White Label', 'Dedicated Support', 'Custom Reports', 'Multi-location Support'],
      popular: false
    }
  ];

  // Mock vouchers and offers
  const availableVouchers = [
    {
      id: 'VOUCHER-001',
      code: 'SAVE20NOW',
      title: '20% Off Next Billing Cycle',
      description: 'Get 20% discount on your next monthly payment',
      discount: 20,
      type: 'percentage',
      expirationDate: '2024-03-31',
      status: 'available',
      minSpend: 50
    },
    {
      id: 'VOUCHER-002',
      code: 'UPGRADE50',
      title: '$50 Upgrade Credit',
      description: 'Apply $50 credit when upgrading to a higher plan',
      discount: 50,
      type: 'fixed',
      expirationDate: '2024-04-15',
      status: 'available',
      minSpend: 100
    },
    {
      id: 'VOUCHER-003',
      code: 'FREEMONTH',
      title: 'One Month Free',
      description: 'Get one month free on annual subscription',
      discount: 100,
      type: 'percentage',
      expirationDate: '2024-02-29',
      status: 'used',
      minSpend: 0
    }
  ];

  // Mock special offers
  const specialOffers = [
    {
      id: 'OFFER-001',
      title: 'Annual Subscription Discount',
      description: 'Save 25% when you switch to annual billing',
      discount: 25,
      validUntil: '2024-03-31',
      terms: 'Valid for new annual subscriptions only',
      featured: true
    },
    {
      id: 'OFFER-002',
      title: 'Referral Bonus',
      description: 'Get $25 credit for each successful referral',
      discount: 25,
      validUntil: '2024-12-31',
      terms: 'Referred customer must maintain subscription for 3 months',
      featured: false
    }
  ];

  // Mock usage statistics
  const usageStats = {
    properties: { current: 12, limit: currentLicense.maxProperties },
    units: { current: 186, limit: currentLicense.maxUnits },
    users: { current: 3, limit: currentLicense.maxUsers }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><AlertCircle className="h-3 w-3 mr-1" />Expired</Badge>;
      case 'expiring':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200"><Clock className="h-3 w-3 mr-1" />Expiring Soon</Badge>;
      default:
        return null;
    }
  };

  const getVoucherStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Available</Badge>;
      case 'used':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Used</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Expired</Badge>;
      default:
        return null;
    }
  };

  const calculateUsagePercentage = (current: number, limit: number | string) => {
    if (typeof limit === 'string') return 0;
    return Math.round((current / limit) * 100);
  };

  const handleApplyVoucher = () => {
    if (voucherCode.trim()) {
      // In a real app, this would validate and apply the voucher
      alert(`Voucher "${voucherCode}" applied successfully! (This is a demo)`);
      setVoucherCode('');
    }
  };

  const handleUpgradePackage = (packageCode: string) => {
    // In a real app, this would initiate the upgrade process
    alert(`Upgrading to ${packageCode}... (This is a demo)`);
  };

  const copyLicenseNumber = () => {
    navigator.clipboard.writeText(currentLicense.licenseNumber);
    alert('License number copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
          <p className="mt-2 text-gray-600">Manage your licenses, packages, and billing</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Download License
        </Button>
      </div>

      {/* Current License Overview */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-900">
            <Crown className="h-6 w-6 mr-2" />
            Current License
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">License Number</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm">{currentLicense.licenseNumber}</span>
                  <Button variant="ghost" size="sm" onClick={copyLicenseNumber}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">Package</span>
                <span className="font-semibold">{currentLicense.packageName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">Status</span>
                {getStatusBadge(currentLicense.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">Expires</span>
                <span className="font-semibold">{new Date(currentLicense.expirationDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-blue-900">Usage Statistics</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Properties</span>
                    <span>{usageStats.properties.current} / {usageStats.properties.limit}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${calculateUsagePercentage(usageStats.properties.current, usageStats.properties.limit)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Units</span>
                    <span>{usageStats.units.current} / {usageStats.units.limit}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${calculateUsagePercentage(usageStats.units.current, usageStats.units.limit)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Users</span>
                    <span>{usageStats.users.current} / {usageStats.users.limit}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${calculateUsagePercentage(usageStats.users.current, usageStats.users.limit)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="packages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="packages">Available Packages</TabsTrigger>
          <TabsTrigger value="vouchers">Vouchers & Credits</TabsTrigger>
          <TabsTrigger value="offers">Special Offers</TabsTrigger>
          <TabsTrigger value="history">License History</TabsTrigger>
        </TabsList>

        <TabsContent value="packages" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePackages.map((pkg) => (
              <Card key={pkg.code} className={`relative ${pkg.popular ? 'border-blue-500 shadow-lg' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center">
                    <Package className="h-5 w-5 mr-2" />
                    {pkg.name}
                  </CardTitle>
                  <div className="text-3xl font-bold">${pkg.price}<span className="text-lg font-normal text-gray-600">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Properties</span>
                      <span className="font-medium">{pkg.maxProperties}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Units</span>
                      <span className="font-medium">{pkg.maxUnits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Users</span>
                      <span className="font-medium">{pkg.maxUsers}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Features</h4>
                    <ul className="space-y-1">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className={`w-full ${pkg.code === currentLicense.packageCode ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    disabled={pkg.code === currentLicense.packageCode}
                    onClick={() => handleUpgradePackage(pkg.code)}
                  >
                    {pkg.code === currentLicense.packageCode ? (
                      'Current Plan'
                    ) : (
                      <>
                        <Upgrade className="h-4 w-4 mr-2" />
                        {pkg.price > 79 ? 'Upgrade' : 'Downgrade'}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vouchers" className="space-y-6">
          {/* Apply Voucher Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="h-5 w-5 mr-2" />
                Apply Voucher Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-3">
                <Input
                  placeholder="Enter voucher code"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  className="flex-1"
                />
                <Button onClick={handleApplyVoucher} disabled={!voucherCode.trim()}>
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Vouchers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Available Vouchers & Credits</h3>
            {availableVouchers.map((voucher) => (
              <Card key={voucher.id} className={voucher.status === 'available' ? 'border-green-200' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${voucher.status === 'available' ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {voucher.type === 'percentage' ? (
                          <Percent className={`h-6 w-6 ${voucher.status === 'available' ? 'text-green-600' : 'text-gray-400'}`} />
                        ) : (
                          <Gift className={`h-6 w-6 ${voucher.status === 'available' ? 'text-green-600' : 'text-gray-400'}`} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{voucher.title}</h4>
                        <p className="text-sm text-gray-600">{voucher.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500">Code: {voucher.code}</span>
                          <span className="text-xs text-gray-500">
                            Expires: {new Date(voucher.expirationDate).toLocaleDateString()}
                          </span>
                          {voucher.minSpend > 0 && (
                            <span className="text-xs text-gray-500">Min spend: ${voucher.minSpend}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          {voucher.type === 'percentage' ? `${voucher.discount}%` : `$${voucher.discount}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {voucher.type === 'percentage' ? 'Off' : 'Credit'}
                        </p>
                      </div>
                      {getVoucherStatusBadge(voucher.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="offers" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Special Offers & Discounts</h3>
            {specialOffers.map((offer) => (
              <Card key={offer.id} className={offer.featured ? 'border-purple-200 bg-purple-50' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${offer.featured ? 'bg-purple-100' : 'bg-blue-100'}`}>
                        <Zap className={`h-6 w-6 ${offer.featured ? 'text-purple-600' : 'text-blue-600'}`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{offer.title}</h4>
                          {offer.featured && (
                            <Badge className="bg-purple-600 text-white">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{offer.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500">
                            Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-gray-500">{offer.terms}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-lg font-bold">{offer.discount}%</p>
                        <p className="text-sm text-gray-600">Discount</p>
                      </div>
                      <Button variant="outline">
                        Claim Offer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                License History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{currentLicense.licenseNumber}</h4>
                    <p className="text-sm text-gray-600">{currentLicense.packageName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(currentLicense.issueDate).toLocaleDateString()} - {new Date(currentLicense.expirationDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(currentLicense.status)}
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                
                {/* Mock previous licenses */}
                <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div>
                    <h4 className="font-medium">LIC-2023-STD-456123</h4>
                    <p className="text-sm text-gray-600">Starter Plan</p>
                    <p className="text-xs text-gray-500">
                      2023-01-01 - 2023-12-31
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200">Expired</Badge>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}