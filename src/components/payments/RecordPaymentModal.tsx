
'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecordPaymentModal({ isOpen, onClose }: RecordPaymentModalProps) {
  const [formData, setFormData] = useState({
    tenant: '',
    property: '',
    unit: '',
    amount: '',
    type: '',
    method: '',
    date: '',
    reference: '',
    notes: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recording payment:', formData);
    alert('Payment recorded successfully! (This is a demo)');
    onClose();
    setFormData({
      tenant: '',
      property: '',
      unit: '',
      amount: '',
      type: '',
      method: '',
      date: '',
      reference: '',
      notes: '',
    });
  };

  // Mock data for tenants, properties, units
  const mockTenants = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Michael Rodriguez' },
    { id: '3', name: 'Alex Chen' },
  ];

  const mockProperties = [
    { id: '1', name: 'Sunset Apartments' },
    { id: '2', name: 'Riverside Condos' },
    { id: '3', name: 'Garden View Townhomes' },
  ];

  const mockUnits = [
    { id: '1A', name: 'Unit 1A', propertyId: '1' },
    { id: '1B', name: 'Unit 1B', propertyId: '1' },
    { id: '2A', name: 'Unit 2A', propertyId: '2' },
    { id: '2B', name: 'Unit 2B', propertyId: '2' },
    { id: '7C', name: 'Unit 7C', propertyId: '3' },
  ];

  const filteredUnits = formData.property
    ? mockUnits.filter(unit => unit.propertyId === formData.property)
    : mockUnits;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Record New Payment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tenant">Tenant *</Label>
              <Select value={formData.tenant} onValueChange={(value) => handleInputChange('tenant', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tenant" />
                </SelectTrigger>
                <SelectContent>
                  {mockTenants.map(tenant => (
                    <SelectItem key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="property">Property *</Label>
              <Select value={formData.property} onValueChange={(value) => handleInputChange('property', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  {mockProperties.map(property => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="unit">Unit *</Label>
              <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)} disabled={!formData.property}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {filteredUnits.map(unit => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Payment Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="late-fee">Late Fee</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="method">Payment Method *</Label>
              <Select value={formData.method} onValueChange={(value) => handleInputChange('method', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Payment Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="reference">Reference (Optional)</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => handleInputChange('reference', e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Record Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
