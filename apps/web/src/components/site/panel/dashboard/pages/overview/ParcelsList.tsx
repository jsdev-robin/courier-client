import { buttonVariants } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import Heading from '@repo/ui/components/heading';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';
import { cn } from '@repo/ui/lib/utils';
import { Eye } from 'lucide-react';
import Link from 'next/link';

const dummyParcels = [
  {
    id: 1,
    deliveryAddress: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      coordinates: ['40.7128', '-74.0060'],
      contactName: 'John Smith',
      contactPhone: '+1-555-1234',
    },
    parcelDetails: {
      size: 'Medium',
      weight: '2.5kg',
      type: 'Box',
      description: 'Fragile items inside',
    },
    payment: {
      type: 'Credit Card',
      amount: '25.99',
      codAmount: '0',
      status: 'Paid',
    },
  },
  {
    id: 2,
    deliveryAddress: {
      street: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      coordinates: ['34.0522', '-118.2437'],
      contactName: 'Maria Garcia',
      contactPhone: '+1-555-2345',
    },
    parcelDetails: {
      size: 'Large',
      weight: '5.0kg',
      type: 'Envelope',
      description: 'Documents',
    },
    payment: {
      type: 'Cash on Delivery',
      amount: '45.50',
      codAmount: '45.50',
      status: 'Pending',
    },
  },
  {
    id: 3,
    deliveryAddress: {
      street: '789 Pine Road',
      city: 'Chicago',
      state: 'IL',
      postalCode: '60601',
      coordinates: ['41.8781', '-87.6298'],
      contactName: 'Robert Johnson',
      contactPhone: '+1-555-3456',
    },
    parcelDetails: {
      size: 'Small',
      weight: '1.2kg',
      type: 'Package',
      description: 'Electronics',
    },
    payment: {
      type: 'PayPal',
      amount: '18.75',
      status: 'Completed',
    },
  },
  {
    id: 4,
    deliveryAddress: {
      street: '321 Elm Street',
      city: 'Houston',
      state: 'TX',
      postalCode: '77001',
      coordinates: ['29.7604', '-95.3698'],
      contactName: 'Sarah Williams',
      contactPhone: '+1-555-4567',
    },
    parcelDetails: {
      size: 'Extra Large',
      weight: '10.5kg',
      type: 'Box',
      description: 'Household items',
    },
    payment: {
      type: 'Bank Transfer',
      amount: '89.99',
      status: 'Processing',
    },
  },
  {
    id: 5,
    deliveryAddress: {
      street: '654 Maple Drive',
      city: 'Phoenix',
      state: 'AZ',
      postalCode: '85001',
      coordinates: ['33.4484', '-112.0740'],
      contactName: 'David Brown',
      contactPhone: '+1-555-5678',
    },
    parcelDetails: {
      size: 'Medium',
      weight: '3.0kg',
      type: 'Tube',
      description: 'Poster',
    },
    payment: {
      type: 'Cash on Delivery',
      amount: '32.50',
      codAmount: '32.50',
      status: 'Pending',
    },
  },
  {
    id: 6,
    deliveryAddress: {
      street: '987 Cedar Lane',
      city: 'Philadelphia',
      state: 'PA',
      postalCode: '19101',
      coordinates: ['39.9526', '-75.1652'],
      contactName: 'Lisa Anderson',
      contactPhone: '+1-555-6789',
    },
    parcelDetails: {
      size: 'Small',
      weight: '0.8kg',
      type: 'Envelope',
      description: 'Letter',
    },
    payment: {
      type: 'Credit Card',
      amount: '12.99',
      status: 'Paid',
    },
  },
  {
    id: 7,
    deliveryAddress: {
      street: '147 Birch Boulevard',
      city: 'San Antonio',
      state: 'TX',
      postalCode: '78201',
      coordinates: ['29.4241', '-98.4936'],
      contactName: 'Michael Taylor',
      contactPhone: '+1-555-7890',
    },
    parcelDetails: {
      size: 'Large',
      weight: '4.2kg',
      type: 'Box',
      description: 'Books',
    },
    payment: {
      type: 'PayPal',
      amount: '28.75',
      status: 'Completed',
    },
  },
  {
    id: 8,
    deliveryAddress: {
      street: '258 Willow Way',
      city: 'San Diego',
      state: 'CA',
      postalCode: '92101',
      coordinates: ['32.7157', '-117.1611'],
      contactName: 'Jennifer Martinez',
      contactPhone: '+1-555-8901',
    },
    parcelDetails: {
      size: 'Medium',
      weight: '2.8kg',
      type: 'Package',
      description: 'Clothing',
    },
    payment: {
      type: 'Cash on Delivery',
      amount: '35.25',
      codAmount: '35.25',
      status: 'Pending',
    },
  },
  {
    id: 9,
    deliveryAddress: {
      street: '369 Spruce Court',
      city: 'Dallas',
      state: 'TX',
      postalCode: '75201',
      coordinates: ['32.7767', '-96.7970'],
      contactName: 'James Wilson',
      contactPhone: '+1-555-9012',
    },
    parcelDetails: {
      size: 'Extra Large',
      weight: '12.0kg',
      type: 'Box',
      description: 'Furniture parts',
    },
    payment: {
      type: 'Credit Card',
      amount: '120.00',
      status: 'Paid',
    },
  },
  {
    id: 10,
    deliveryAddress: {
      street: '741 Aspen Street',
      city: 'San Jose',
      state: 'CA',
      postalCode: '95101',
      coordinates: ['37.3382', '-121.8863'],
      contactName: 'Patricia Thomas',
      contactPhone: '+1-555-0123',
    },
    parcelDetails: {
      size: 'Small',
      weight: '1.5kg',
      type: 'Envelope',
      description: 'Legal documents',
    },
    payment: {
      type: 'Bank Transfer',
      amount: '22.50',
      status: 'Processing',
    },
  },
  {
    id: 11,
    deliveryAddress: {
      street: '852 Redwood Road',
      city: 'Austin',
      state: 'TX',
      postalCode: '73301',
      coordinates: ['30.2672', '-97.7431'],
      contactName: 'Richard Moore',
      contactPhone: '+1-555-1122',
    },
    parcelDetails: {
      size: 'Medium',
      weight: '3.2kg',
      type: 'Package',
      description: 'Computer accessories',
    },
    payment: {
      type: 'PayPal',
      amount: '42.99',
      status: 'Completed',
    },
  },
  {
    id: 12,
    deliveryAddress: {
      street: '963 Sequoia Lane',
      city: 'Jacksonville',
      state: 'FL',
      postalCode: '32201',
      coordinates: ['30.3322', '-81.6557'],
      contactName: 'Susan Jackson',
      contactPhone: '+1-555-2233',
    },
    parcelDetails: {
      size: 'Large',
      weight: '4.8kg',
      type: 'Box',
      description: 'Kitchenware',
    },
    payment: {
      type: 'Cash on Delivery',
      amount: '55.75',
      codAmount: '55.75',
      status: 'Pending',
    },
  },
  {
    id: 13,
    deliveryAddress: {
      street: '159 Fir Avenue',
      city: 'Fort Worth',
      state: 'TX',
      postalCode: '76101',
      coordinates: ['32.7555', '-97.3308'],
      contactName: 'Charles White',
      contactPhone: '+1-555-3344',
    },
    parcelDetails: {
      size: 'Small',
      weight: '0.9kg',
      type: 'Envelope',
      description: 'Photos',
    },
    payment: {
      type: 'Credit Card',
      amount: '15.25',
      status: 'Paid',
    },
  },
  {
    id: 14,
    deliveryAddress: {
      street: '357 Poplar Drive',
      city: 'Columbus',
      state: 'OH',
      postalCode: '43201',
      coordinates: ['39.9612', '-82.9988'],
      contactName: 'Karen Harris',
      contactPhone: '+1-555-4455',
    },
    parcelDetails: {
      size: 'Extra Large',
      weight: '15.0kg',
      type: 'Box',
      description: 'Sports equipment',
    },
    payment: {
      type: 'Bank Transfer',
      amount: '95.50',
      status: 'Processing',
    },
  },
  {
    id: 15,
    deliveryAddress: {
      street: '753 Cypress Court',
      city: 'Charlotte',
      state: 'NC',
      postalCode: '28201',
      coordinates: ['35.2271', '-80.8431'],
      contactName: 'Daniel Clark',
      contactPhone: '+1-555-5566',
    },
    parcelDetails: {
      size: 'Medium',
      weight: '2.3kg',
      type: 'Tube',
      description: 'Blueprint',
    },
    payment: {
      type: 'PayPal',
      amount: '27.80',
      status: 'Completed',
    },
  },
  {
    id: 16,
    deliveryAddress: {
      street: '951 Magnolia Street',
      city: 'Indianapolis',
      state: 'IN',
      postalCode: '46201',
      coordinates: ['39.7684', '-86.1581'],
      contactName: 'Nancy Lewis',
      contactPhone: '+1-555-6677',
    },
    parcelDetails: {
      size: 'Large',
      weight: '4.5kg',
      type: 'Package',
      description: 'Medical supplies',
    },
    payment: {
      type: 'Cash on Delivery',
      amount: '48.90',
      codAmount: '48.90',
      status: 'Pending',
    },
  },
  {
    id: 17,
    deliveryAddress: {
      street: '258 Dogwood Road',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      coordinates: ['47.6062', '-122.3321'],
      contactName: 'Paul Robinson',
      contactPhone: '+1-555-7788',
    },
    parcelDetails: {
      size: 'Small',
      weight: '1.1kg',
      type: 'Envelope',
      description: 'Certificates',
    },
    payment: {
      type: 'Credit Card',
      amount: '19.99',
      status: 'Paid',
    },
  },
  {
    id: 18,
    deliveryAddress: {
      street: '852 Cherry Lane',
      city: 'Denver',
      state: 'CO',
      postalCode: '80201',
      coordinates: ['39.7392', '-104.9903'],
      contactName: 'Betty Walker',
      contactPhone: '+1-555-8899',
    },
    parcelDetails: {
      size: 'Medium',
      weight: '3.4kg',
      type: 'Box',
      description: 'Cosmetics',
    },
    payment: {
      type: 'Bank Transfer',
      amount: '38.25',
      status: 'Processing',
    },
  },
  {
    id: 19,
    deliveryAddress: {
      street: '147 Hickory Way',
      city: 'Washington',
      state: 'DC',
      postalCode: '20001',
      coordinates: ['38.9072', '-77.0369'],
      contactName: 'Kevin Young',
      contactPhone: '+1-555-9900',
    },
    parcelDetails: {
      size: 'Large',
      weight: '5.5kg',
      type: 'Package',
      description: 'Office supplies',
    },
    payment: {
      type: 'PayPal',
      amount: '52.40',
      status: 'Completed',
    },
  },
  {
    id: 20,
    deliveryAddress: {
      street: '369 Chestnut Avenue',
      city: 'Boston',
      state: 'MA',
      postalCode: '02101',
      coordinates: ['42.3601', '-71.0589'],
      contactName: 'Amanda King',
      contactPhone: '+1-555-0011',
    },
    parcelDetails: {
      size: 'Extra Large',
      weight: '8.7kg',
      type: 'Box',
      description: 'Winter clothing',
    },
    payment: {
      type: 'Cash on Delivery',
      amount: '67.85',
      codAmount: '67.85',
      status: 'Pending',
    },
  },
];

const ParcelsList = () => {
  return (
    <section>
      <section>
        <div className="container">
          <div className="space-y-6">
            <Heading as="h4" className="text-center">
              Your Parcel History
            </Heading>
            <Card className="p-0 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Contact Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Payment Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyParcels.map((parcel) => (
                    <TableRow key={parcel.id}>
                      <TableCell>{parcel.id}</TableCell>
                      <TableCell>
                        {parcel.deliveryAddress.contactName}
                      </TableCell>
                      <TableCell>{parcel.deliveryAddress.street}</TableCell>
                      <TableCell>
                        {parcel.deliveryAddress.city},{' '}
                        {parcel.deliveryAddress.state}
                      </TableCell>
                      <TableCell>
                        {parcel.deliveryAddress.contactPhone}
                      </TableCell>
                      <TableCell>{parcel.parcelDetails.size}</TableCell>
                      <TableCell>{parcel.parcelDetails.weight}</TableCell>
                      <TableCell>{parcel.parcelDetails.type}</TableCell>
                      <TableCell>{parcel.payment.type}</TableCell>
                      <TableCell>${parcel.payment.amount}</TableCell>
                      <TableCell>{parcel.payment.status}</TableCell>
                      <TableCell>
                        <Link
                          href={`/account/dashboard/parcel/details/d`}
                          className={cn(
                            buttonVariants({
                              size: 'sm',
                              variant: 'secondary',
                            }),
                          )}
                        >
                          <Eye />
                          View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ParcelsList;
