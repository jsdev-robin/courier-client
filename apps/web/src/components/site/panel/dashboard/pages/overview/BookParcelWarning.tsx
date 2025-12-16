import { Alert, AlertDescription, AlertTitle } from '@repo/ui/components/alert';
import Heading from '@repo/ui/components/heading';
import { AlertCircleIcon } from 'lucide-react';
import Link from 'next/link';

const BookParcelWarning = () => {
  return (
    <section>
      <div className="container">
        <div className="space-y-6">
          <Heading as="h4" className="text-center">
            Book a Parcel Pickup
          </Heading>
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Complete Your Profile First</AlertTitle>
            <AlertDescription>
              <p>
                You need to finish setting up your profile before booking a
                parcel.
              </p>
              <ul className="list-inside list-disc text-sm">
                <li>Fill in your personal information</li>
                <li>Add a valid address</li>
                <li>Upload your profile avatar</li>
              </ul>
              <p className="mt-2">
                <Link
                  href="/account/dashboard/settings/profile"
                  className="text-blue-600 underline"
                >
                  Go to Profile
                </Link>
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </section>
  );
};

export default BookParcelWarning;
