import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Fingerprint, Smartphone, Lock, CheckCircle2 } from "lucide-react";
import { Badge } from "@repo/ui/components/badge";

const cardsData = [
  {
    icon: Fingerprint,
    title: "Biometric Login",
    description:
      "Use your fingerprint or face recognition for instant, secure access",
    badgeText: "Active",
    features: ["Touch ID & Face ID", "Windows Hello", "Android Biometrics"],
  },
  {
    icon: Smartphone,
    title: "Cross-Device Sync",
    description: "Your passkeys work seamlessly across all your devices",
    badgeText: "Synced",
    features: [
      "iCloud Keychain",
      "Google Password Manager",
      "1Password & Bitwarden",
    ],
  },
  {
    icon: Lock,
    title: "Enhanced Security",
    description:
      "Phishing-resistant authentication with public key cryptography",
    badgeText: "Secure",
    features: ["No password leaks", "Phishing protection", "FIDO2 certified"],
  },
];

const PasskeyFeatures = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {cardsData.map((card, idx) => {
        return (
          <Card
            key={idx}
            className="bg-card border-border hover:border-primary/50 transition-colors group"
          >
            <CardHeader className="gap-4">
              <span className="h-12 w-12 rounded-lg flex items-center justify-center bg-muted text-muted-foreground bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors text-primary">
                <card.icon />
              </span>
              <div className="space-y-2">
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </div>
              <CardAction>
                <Badge variant="secondary">{card.badgeText}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {card.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PasskeyFeatures;
