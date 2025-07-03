
'use client';

import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Define the shape of a Property
interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: string;
  units: UnitData[];
  yearBuilt: string;
  totalArea: string;
  parkingSpaces: string;
  description: string;
  amenities: string[];
  images: File[];
  staff: StaffData[];
  manager: StaffData; // Added manager property
  occupied: number;
  monthlyRevenue: number;
  status: 'active' | 'maintenance' | 'vacant';
  image: string;
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

// Define the shape of the state
interface PropertyState {
  properties: Property[];
}

// Define the types of actions
type PropertyAction = 
  | { type: 'ADD_PROPERTY'; payload: Property }
  | { type: 'UPDATE_PROPERTY'; payload: Property }
  | { type: 'DELETE_PROPERTY'; payload: string };

// Initial state
const initialState: PropertyState = {
  properties: [
    {
      id: '1',
      name: 'Sunset Apartments',
      address: '123 Main Street, Downtown',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      type: 'Apartment',
      units: [],
      yearBuilt: '2018',
      totalArea: '15000',
      parkingSpaces: '30',
      description: 'Modern apartment complex with excellent amenities and prime location.',
      amenities: ['Pool', 'Gym', 'Laundry', 'Security', 'Parking'],
      images: [],
      staff: [],
      manager: {
        name: 'Sarah Johnson',
        phone: '+1 (555) 123-4567',
        email: 'sarah@propertyhub.com'
      },
      occupied: 22,
      monthlyRevenue: 28800,
      status: 'active',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '2',
      name: 'Riverside Condos',
      address: '456 River Road, Riverside',
      city: 'Riverside',
      state: 'CA',
      zipCode: '92507',
      type: 'Condo',
      units: [],
      yearBuilt: '2020',
      totalArea: '12000',
      parkingSpaces: '20',
      description: 'Luxury condos with stunning river views and modern finishes.',
      amenities: ['Gym', 'Concierge', 'Rooftop Access', 'Parking'],
      images: [],
      staff: [],
      manager: {
        name: 'Michael Brown',
        phone: '+1 (555) 987-6543',
        email: 'michael@propertyhub.com'
      },
      occupied: 16,
      monthlyRevenue: 32400,
      status: 'active',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '3',
      name: 'Garden View Townhomes',
      address: '789 Garden Lane, Suburbs',
      city: 'Suburbs',
      state: 'GA',
      zipCode: '30303',
      type: 'Townhouse',
      units: [],
      yearBuilt: '2015',
      totalArea: '10000',
      parkingSpaces: '15',
      description: 'Spacious townhomes with private gardens and family-friendly environment.',
      amenities: ['Garden', 'Pet Friendly', 'Playground'],
      images: [],
      staff: [],
      manager: {
        name: 'Emily White',
        phone: '+1 (555) 456-7890',
        email: 'emily@propertyhub.com'
      },
      occupied: 10,
      monthlyRevenue: 24000,
      status: 'maintenance',
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
};

// Reducer function
const propertyReducer = (state: PropertyState, action: PropertyAction): PropertyState => {
  switch (action.type) {
    case 'ADD_PROPERTY':
      return { ...state, properties: [...state.properties, action.payload] };
    case 'UPDATE_PROPERTY':
      return {
        ...state,
        properties: state.properties.map((property) =>
          property.id === action.payload.id ? action.payload : property
        ),
      };
    case 'DELETE_PROPERTY':
      return {
        ...state,
        properties: state.properties.filter((property) => property.id !== action.payload),
      };
    default:
      return state;
  }
};

// Create Context
export const PropertyContext = createContext<{ 
  state: PropertyState;
  dispatch: React.Dispatch<PropertyAction>;
} | undefined>(undefined);

// Create Provider Component
interface PropertyProviderProps {
  children: ReactNode;
}

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(propertyReducer, initialState);

  return (
    <PropertyContext.Provider value={{ state, dispatch }}>
      {children}
    </PropertyContext.Provider>
  );
};

// Custom hook to use the PropertyContext
export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
