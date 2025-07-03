'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X } from 'lucide-react';

interface AddTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTenantModal({ isOpen, onClose }: AddTenantModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    property: '',
    unit: '',
    rentAmount: '',
    leaseStart: '',
    leaseEnd: '',
    securityDeposit: '',
    notes: '',
    documents: [] as File[], // New field for documents
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Adding tenant:', formData);
    alert('Tenant added successfully! (This is a demo - no actual data was saved)');
    onClose();
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      property: '',
      unit: '',
      rentAmount: '',
      leaseStart: '',
      leaseEnd: '',
      securityDeposit: '',
      notes: '',
      documents: [],
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Tenant</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Property Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="property">Property *</Label>
                <Select value={formData.property} onValueChange={(value) => handleInputChange('property', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunset-apartments">Sunset Apartments</SelectItem>
                    <SelectItem value="riverside-condos">Riverside Condos</SelectItem>
                    <SelectItem value="garden-view-townhomes">Garden View Townhomes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="unit">Unit *</Label>
                <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1a">Unit 1A</SelectItem>
                    <SelectItem value="1b">Unit 1B</SelectItem>
                    <SelectItem value="2a">Unit 2A</SelectItem>
                    <SelectItem value="2b">Unit 2B</SelectItem>
                    <SelectItem value="3a">Unit 3A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Lease Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Lease Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rentAmount">Monthly Rent *</Label>
                <Input
                  id="rentAmount"
                  type="number"
                  placeholder="2000"
                  value={formData.rentAmount}
                  onChange={(e) => handleInputChange('rentAmount', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="securityDeposit">Security Deposit</Label>
                <Input
                  id="securityDeposit"
                  type="number"
                  placeholder="2000"
                  value={formData.securityDeposit}
                  onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="leaseStart">Lease Start Date *</Label>
                <Input
                  id="leaseStart"
                  type="date"
                  value={formData.leaseStart}
                  onChange={(e) => handleInputChange('leaseStart', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="leaseEnd">Lease End Date *</Label>
                <Input
                  id="leaseEnd"
                  type="date"
                  value={formData.leaseEnd}
                  onChange={(e) => handleInputChange('leaseEnd', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information about the tenant..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
            />
          </div>

          {/* Documents Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Documents</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600 mb-2">Drag and drop documents here, or click to browse</p>
              <input
                type="file"
                multiple
                onChange={handleDocumentUpload}
                className="hidden"
                id="document-upload"
              />
              <Label htmlFor="document-upload" className="cursor-pointer">
                <Button type="button" variant="outline" asChild>
                  <span>Choose Files</span>
                </Button>
              </Label>
            </div>

            {formData.documents.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Selected Documents:</p>
                {formData.documents.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(index)}
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Tenant
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}