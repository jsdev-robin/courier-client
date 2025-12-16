'use client';

import { Button } from '@repo/ui/components/button';
import Heading from '@repo/ui/components/heading';
import { Item, ItemGroup } from '@repo/ui/components/item';
import Typography from '@repo/ui/components/typography';
import { ArrowLeftIcon, Shield } from 'lucide-react';
import { useState } from 'react';
import Complete2FASetup from './particles/Complete2FASetup';
import Finish2FASetup from './particles/Finish2FASetup';
import Intro2FASetup from './particles/Intro2FASetup';
import QR2FASetup from './particles/QR2FASetup';

const TwoFactorSetup = () => {
  const [step, setStep] = useState<'intro' | 'scan' | 'verify' | 'complete'>(
    'intro',
  );
  const [token, setToken] = useState<string>('');

  return (
    <section>
      <div className="container max-w-4xl">
        <ItemGroup>
          <Item className="px-0">
            <div className="space-y-4">
              {step !== 'intro' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (step === 'scan') setStep('intro');
                    if (step === 'verify') setStep('scan');
                  }}
                >
                  <ArrowLeftIcon />
                  Back
                </Button>
              )}
              <div className="flex items-center gap-4">
                <Shield className="bg-accent text-foreground" />

                <div className="space-y-2">
                  <Heading as="h5">Two-Factor Authentication</Heading>
                  <Typography textColor="muted">
                    Add an extra layer of security to your account
                  </Typography>
                </div>
              </div>
            </div>
          </Item>
          <Item className="px-0" asChild>
            <div className="flex items-center gap-2">
              {['intro', 'scan', 'verify', 'complete'].map((s, idx) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`h-1.5 rounded-full flex-1 transition-colors ${
                      ['intro', 'scan', 'verify', 'complete'].indexOf(step) >=
                      idx
                        ? 'bg-green-500'
                        : 'bg-border'
                    }`}
                  />
                </div>
              ))}
            </div>
          </Item>
          <Item className="w-full px-0" asChild>
            <div className="w-full">
              {step === 'intro' && <Intro2FASetup setStep={setStep} />}
              {step === 'scan' && (
                <QR2FASetup setStep={setStep} setToken={setToken} />
              )}
              {step === 'verify' && (
                <Finish2FASetup token={token} setStep={setStep} />
              )}
              {step === 'complete' && <Complete2FASetup />}
            </div>
          </Item>
        </ItemGroup>
      </div>
    </section>
  );
};

export default TwoFactorSetup;
