import { Badge } from '@repo/ui/components/badge';
import Heading from '@repo/ui/components/heading';
import Typography from '@repo/ui/components/typography';
import PasskeyFeatures from './particles/PasskeyFeatures';
import PasskeySetupCard from './particles/PasskeySetupCard';

const PasskeysSetupIntro = () => {
  return (
    <section>
      <div className="container">
        <div className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              WebAuthn Enabled
            </Badge>
            <div className="space-y-2">
              <Heading as="h3" className="font-bold text-balance">
                Passwordless Authentication
              </Heading>
              <Typography
                variant="lg"
                textColor="muted"
                className="text-pretty"
              >
                Set up passkeys for secure, passwordless sign-ins across all
                your devices. No more passwords to remember or reset.
              </Typography>
            </div>
          </div>
          <div className="space-y-4">
            <PasskeyFeatures />
            <PasskeySetupCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasskeysSetupIntro;
