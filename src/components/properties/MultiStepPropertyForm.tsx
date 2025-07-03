
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Upload, Plus, X } from 'lucide-react';
import { useProperty } from '@/context/PropertyContext';

// Define the data structure for the entire form
interface PropertyFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: string;
  units: UnitData[]; // Array of unit data
  yearBuilt: string;
  totalArea: string;
  parkingSpaces: string;
  description: string;
  amenities: string[];
  images: File[];
  staff: StaffData[]; // Array of staff data
}

interface UnitData {
  unitNumber: string;
  bedrooms: string;
  bathrooms: string;
  rentPrice: string;
  status: string;
}

interface StaffData {
  name: string;
  role: string;
  phone: string;
  email: string;
}

// Step 1: Basic Information
interface BasicInfoStepProps {
  formData: PropertyFormData;
  onUpdate: (data: Partial<PropertyFormData>) => void;
}

const propertyTypes = [
  'Apartment',
  'Condo',
  'Townhouse',
  'Single Family',
  'Commercial',
  'Mixed Use'
];

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ formData, onUpdate }) => {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Property Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Sunset Apartments"
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Property Type *</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe the property..."
            rows={3}
          />
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Location</h3>
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="123 Main Street"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="New York"
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="NY"
                required
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                placeholder="10001"
                required
              />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Property Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="yearBuilt">Year Built</Label>
              <Input
                id="yearBuilt"
                type="number"
                value={formData.yearBuilt}
                onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                placeholder="2020"
              />
            </div>
            <div>
              <Label htmlFor="totalArea">Total Area (sq ft)</Label>
              <Input
                id="totalArea"
                value={formData.totalArea}
                onChange={(e) => handleInputChange('totalArea', e.target.value)}
                placeholder="15000"
              />
            </div>
            <div>
              <Label htmlFor="parkingSpaces">Parking Spaces</Label>
              <Input
                id="parkingSpaces"
                type="number"
                value={formData.parkingSpaces}
                onChange={(e) => handleInputChange('parkingSpaces', e.target.value)}
                placeholder="30"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Step 2: Units
interface UnitsStepProps {
  formData: PropertyFormData;
  onUpdate: (data: Partial<PropertyFormData>) => void;
}

const UnitsStep: React.FC<UnitsStepProps> = ({ formData, onUpdate }) => {
  const handleUnitChange = (index: number, field: string, value: string) => {
    const updatedUnits = formData.units.map((unit, i) =>
      i === index ? { ...unit, [field]: value } : unit
    );
    onUpdate({ units: updatedUnits });
  };

  const addUnit = () => {
    onUpdate({
      units: [
        ...formData.units,
        { unitNumber: '', bedrooms: '', bathrooms: '', rentPrice: '', status: 'Vacant' },
      ],
    });
  };

  const removeUnit = (index: number) => {
    onUpdate({
      units: formData.units.filter((_, i) => i !== index),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Units</CardTitle>
        <CardDescription>Define individual units within this property.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {formData.units.length === 0 && (
          <p className="text-gray-500">No units added yet. Click &quot;Add Unit&quot; to get started.</p>
        )}
        {formData.units.map((unit, index) => (
          <div key={index} className="border p-4 rounded-md space-y-3 relative">
            <h4 className="font-semibold">Unit {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor={`unit-${index}-number`}>Unit Number *</Label>
                <Input
                  id={`unit-${index}-number`}
                  value={unit.unitNumber}
                  onChange={(e) => handleUnitChange(index, 'unitNumber', e.target.value)}
                  placeholder="e.g., A101"
                  required
                />
              </div>
              <div>
                <Label htmlFor={`unit-${index}-bedrooms`}>Bedrooms</Label>
                <Input
                  id={`unit-${index}-bedrooms`}
                  type="number"
                  value={unit.bedrooms}
                  onChange={(e) => handleUnitChange(index, 'bedrooms', e.target.value)}
                  placeholder="2"
                />
              </div>
              <div>
                <Label htmlFor={`unit-${index}-bathrooms`}>Bathrooms</Label>
                <Input
                  id={`unit-${index}-bathrooms`}
                  type="number"
                  value={unit.bathrooms}
                  onChange={(e) => handleUnitChange(index, 'bathrooms', e.target.value)}
                  placeholder="1.5"
                />
              </div>
              <div>
                <Label htmlFor={`unit-${index}-rent`}>Rent Price ($)</Label>
                <Input
                  id={`unit-${index}-rent`}
                  type="number"
                  value={unit.rentPrice}
                  onChange={(e) => handleUnitChange(index, 'rentPrice', e.target.value)}
                  placeholder="1500"
                />
              </div>
            </div>
            <div>
              <Label htmlFor={`unit-${index}-status`}>Status</Label>
              <Select value={unit.status} onValueChange={(value) => handleUnitChange(index, 'status', value)}>
                <SelectTrigger id={`unit-${index}-status`}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vacant">Vacant</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                  <SelectItem value="Maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeUnit(index)}
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addUnit} className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Unit
        </Button>
      </CardContent>
    </Card>
  );
};

// Step 3: Amenities
interface AmenitiesStepProps {
  formData: PropertyFormData;
  onUpdate: (data: Partial<PropertyFormData>) => void;
}

const commonAmenities = [
  'Pool',
  'Gym',
  'Laundry',
  'Security',
  'Parking',
  'Elevator',
  'Balcony',
  'Air Conditioning',
  'Heating',
  'Internet',
  'Pet Friendly',
  'Garden',
  'Rooftop Access'
];

const AmenitiesStep: React.FC<AmenitiesStepProps> = ({ formData, onUpdate }) => {
  const [customAmenity, setCustomAmenity] = useState('');

  const handleAmenityToggle = (amenity: string) => {
    onUpdate({
      amenities: formData.amenities.includes(amenity)
        ? formData.amenities.filter(a => a !== amenity)
        : [...formData.amenities, amenity]
    });
  };

  const addCustomAmenity = () => {
    if (customAmenity.trim() && !formData.amenities.includes(customAmenity.trim())) {
      onUpdate({
        amenities: [...formData.amenities, customAmenity.trim()]
      });
      setCustomAmenity('');
    }
  };

  const removeAmenity = (amenity: string) => {
    onUpdate({
      amenities: formData.amenities.filter(a => a !== amenity)
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Amenities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {commonAmenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={formData.amenities.includes(amenity)}
                onCheckedChange={() => handleAmenityToggle(amenity)}
              />
              <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Input
            value={customAmenity}
            onChange={(e) => setCustomAmenity(e.target.value)}
            placeholder="Add custom amenity"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAmenity())}
          />
          <Button type="button" onClick={addCustomAmenity} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {formData.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                {amenity}
                <button
                  type="button"
                  onClick={() => removeAmenity(amenity)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Step 4: Staff
interface StaffStepProps {
  formData: PropertyFormData;
  onUpdate: (data: Partial<PropertyFormData>) => void;
}

const StaffStep: React.FC<StaffStepProps> = ({ formData, onUpdate }) => {
  const handleStaffChange = (index: number, field: string, value: string) => {
    const updatedStaff = formData.staff.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    onUpdate({ staff: updatedStaff });
  };

  const addStaff = () => {
    onUpdate({
      staff: [
        ...formData.staff,
        { name: '', role: '', phone: '', email: '' },
      ],
    });
  };

  const removeStaff = (index: number) => {
    onUpdate({
      staff: formData.staff.filter((_, i) => i !== index),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Associated Staff</CardTitle>
        <CardDescription>Add staff members responsible for this property.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {formData.staff.length === 0 && (
          <p className="text-gray-500">No staff members added yet.</p>
        )}
        {formData.staff.map((member, index) => (
          <div key={index} className="border p-4 rounded-md space-y-3 relative">
            <h4 className="font-semibold">Staff Member {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`staff-${index}-name`}>Name *</Label>
                <Input
                  id={`staff-${index}-name`}
                  value={member.name}
                  onChange={(e) => handleStaffChange(index, 'name', e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor={`staff-${index}-role`}>Role</Label>
                <Input
                  id={`staff-${index}-role`}
                  value={member.role}
                  onChange={(e) => handleStaffChange(index, 'role', e.target.value)}
                  placeholder="Property Manager"
                />
              </div>
              <div>
                <Label htmlFor={`staff-${index}-phone`}>Phone</Label>
                <Input
                  id={`staff-${index}-phone`}
                  type="tel"
                  value={member.phone}
                  onChange={(e) => handleStaffChange(index, 'phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor={`staff-${index}-email`}>Email</Label>
                <Input
                  id={`staff-${index}-email`}
                  type="email"
                  value={member.email}
                  onChange={(e) => handleStaffChange(index, 'email', e.target.value)}
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeStaff(index)}
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addStaff} className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Staff Member
        </Button>
      </CardContent>
    </Card>
  );
};

// Step 5: Review and Save
interface ReviewStepProps {
  formData: PropertyFormData;
  onSubmit: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData, onSubmit }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Property Details</CardTitle>
        <CardDescription>Please review the information before creating the property.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Type:</strong> {formData.type}</p>
        <p><strong>Description:</strong> {formData.description || 'N/A'}</p>

        <h3 className="text-lg font-semibold mt-6">Location</h3>
        <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
        <p><strong>Year Built:</strong> {formData.yearBuilt || 'N/A'}</p>
        <p><strong>Total Area:</strong> {formData.totalArea || 'N/A'} sq ft</p>
        <p><strong>Parking Spaces:</strong> {formData.parkingSpaces || 'N/A'}</p>

        <h3 className="text-lg font-semibold mt-6">Units ({formData.units.length})</h3>
        {formData.units.length === 0 ? (
          <p>No units added.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1">
            {formData.units.map((unit, index) => (
              <li key={index}>
                Unit {unit.unitNumber} ({unit.bedrooms} Bed, {unit.bathrooms} Bath) - ${unit.rentPrice} ({unit.status})
              </li>
            ))}
          </ul>
        )}

        <h3 className="text-lg font-semibold mt-6">Amenities ({formData.amenities.length})</h3>
        {formData.amenities.length === 0 ? (
          <p>No amenities selected.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1">
            {formData.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        )}

        <h3 className="text-lg font-semibold mt-6">Associated Staff ({formData.staff.length})</h3>
        {formData.staff.length === 0 ? (
          <p>No staff members added.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1">
            {formData.staff.map((member, index) => (
              <li key={index}>
                {member.name} ({member.role}) - {member.email} / {member.phone}
              </li>
            ))}
          </ul>
        )}

        {/* Images review could be added here if needed */}

      </CardContent>
      <CardFooter>
        <Button onClick={onSubmit} className="w-full">Create Property</Button>
      </CardFooter>
    </Card>
  );
};

export function MultiStepPropertyForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PropertyFormData>({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    type: '',
    units: [],
    yearBuilt: '',
    totalArea: '',
    parkingSpaces: '',
    description: '',
    amenities: [],
    images: [],
    staff: [],
  });

  const handleUpdateFormData = (data: Partial<PropertyFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const { dispatch } = useProperty();

  const handleSubmit = () => {
    // Generate a simple unique ID for the new property
    const newPropertyId = Date.now().toString();

    // Create a new property object with default values for missing fields
    const newProperty = {
      ...formData,
      id: newPropertyId,
      occupied: 0, // Default value
      monthlyRevenue: 0, // Default value
      status: 'active', // Default value
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', // Default image
    };

    dispatch({ type: 'ADD_PROPERTY', payload: newProperty });

    alert('Property created successfully! (Data added to global state)');
    router.push('/properties');
  };

  const steps = [
    <BasicInfoStep key="basic" formData={formData} onUpdate={handleUpdateFormData} />,
    <UnitsStep key="units" formData={formData} onUpdate={handleUpdateFormData} />,
    <AmenitiesStep key="amenities" formData={formData} onUpdate={handleUpdateFormData} />,
    <StaffStep key="staff" formData={formData} onUpdate={handleUpdateFormData} />,
    <ReviewStep key="review" formData={formData} onSubmit={handleSubmit} />,
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Property</h1>
          <p className="mt-2 text-gray-600">Create a new property in your portfolio</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-between text-sm font-medium text-gray-500">
        {steps.map((_, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full ${index === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Step {index + 1}
          </span>
        ))}
      </div>

      {/* Current Step Form */}
      {steps[currentStep]}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t">
        {currentStep > 0 && (
          <Button type="button" variant="outline" onClick={prevStep}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="button" onClick={nextStep}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="button" onClick={handleSubmit}>
            Create Property
          </Button>
        )}
      </div>
    </div>
  );
}
