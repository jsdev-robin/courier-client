"use client";

import React, { useState } from "react";
import PasskeyRegister from "./particles/PasskeyRegister";
import PasskeySetupSuccessState from "./particles/PasskeySetupSuccessState";

const StartPasskeysRegistration = () => {
  const [step, setStep] = useState<number>(3);

  return (
    <section>
      <div className="wrapper max-w-2xl mx-auto">
        <div className="space-y-4">
          {step === 3 && <PasskeyRegister setStep={setStep} />}
          {step === 4 && <PasskeySetupSuccessState />}
        </div>
      </div>
    </section>
  );
};

export default StartPasskeysRegistration;
