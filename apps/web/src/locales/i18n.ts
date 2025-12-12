'use client';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      header: {
        home: 'Home',
        services: 'Services',
        pricing: 'Pricing',
        aboutUs: 'About Us',
        contact: 'Contact',
        login: 'Login',
        register: 'Register',
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Log out',
        signingOut: 'Signing out...',
      },
      hero: {
        title: 'Fast & Reliable Courier & Parcel Management',
        desc: 'Streamline your delivery process with our advanced courier management system. Track parcels in real-time, manage deliveries efficiently, and provide exceptional service to your customers.',
        watchDemo: 'Watch Demo',
        learnMore: 'Learn More',
        parcelsDelivered: 'Parcels Delivered',
        onTimeDelivery: 'On-Time Delivery',
        customerSupport: 'Customer Support',
        trackParcelTitle: 'Track Your Parcel',
        trackingPlaceholder: 'Enter tracking number',
        dontKnow: "Don't know your tracking number?",
        contactUs: 'Contact us',
      },
      features: {
        title: 'Why Choose QuickShip?',
        desc: 'Our comprehensive courier management system offers everything you need to streamline your delivery operations',
        list: [
          {
            title: 'Real-Time Tracking',
            description:
              'Track parcels in real-time with our advanced GPS technology. Provide customers with accurate delivery estimates.',
          },
          {
            title: 'Optimized Routes',
            description:
              'AI-powered route optimization to reduce delivery times and fuel costs while maximizing efficiency.',
          },
          {
            title: 'Role Management',
            description:
              'Comprehensive role-based access for admins, agents, and customers with appropriate permissions.',
          },
          {
            title: 'COD Management',
            description:
              'Efficiently handle cash on delivery transactions with integrated payment tracking and reporting.',
          },
          {
            title: 'Analytics & Reports',
            description:
              'Generate detailed reports and gain insights into your delivery performance and business metrics.',
          },
          {
            title: 'Mobile App',
            description:
              'Our mobile app allows delivery agents to update statuses and customers to track parcels on the go.',
          },
        ],
      },
      steps: {
        title: 'How It Works',
        desc: 'Simple steps to manage your deliveries efficiently',
        list: [
          {
            number: 1,
            title: 'Book a Parcel',
            description: 'Create a shipment with pickup and delivery details',
          },
          {
            number: 2,
            title: 'Assign Agent',
            description: 'Assign the delivery to an available agent',
          },
          {
            number: 3,
            title: 'Track Delivery',
            description: 'Monitor the parcel in real-time',
          },
          {
            number: 4,
            title: 'Receive Confirmation',
            description: 'Get delivery confirmation and feedback',
          },
        ],
      },
      cta: {
        title: 'Ready to Transform Your Courier Business?',
        desc: 'Join thousands of businesses that use QuickShip to streamline their delivery operations and provide exceptional service to their customers.',
        button: 'Get Started Today',
      },
      footer: {
        aboutTitle: 'About QuickShip',
        aboutDesc:
          'QuickShip is a comprehensive courier and parcel management system designed to streamline your delivery operations and enhance customer satisfaction.',
        quickLinksTitle: 'Quick Links',
        quickLinks: [
          { label: 'Home', href: '#' },
          { label: 'Services', href: '#' },
          { label: 'Pricing', href: '#' },
          { label: 'About Us', href: '#' },
          { label: 'Contact', href: '#' },
        ],
        contactTitle: 'Contact Us',
        contactItems: [
          { icon: 'MapPin', text: 'Kewarjani, Manikganj-1800, Dhaka, BD' },
          { icon: 'Phone', text: '01763408494' },
          { icon: 'Mail', text: 'jsdev.robin@gmail.com' },
        ],
        copyright: '© 2025 QuickShip. All rights reserved.',
      },
      signin: {
        welcomeBack: 'Welcome back',
        description:
          'Sign in to your account or continue with a social provider.',
        email: 'Email',
        password: 'Password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot your password?',
        signIn: 'Sign in',
        noAccount: "Don't have an account?",
        signUp: 'Sign up',
        signingIn: 'Signing in...',
      },
      signup: {
        title: 'Create your seller account',
        description:
          'Sign up with your email or continue with a social account to start selling.',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        phone: 'Phone',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        signUp: 'Sign up',
        signingUp: 'Signing up...',
        alreadyAccount: 'Already have an account?',
        signIn: 'Sign In',
      },
      verifyEmail: {
        title: 'OTP Verification',
        description:
          'Enter the 6-digit code sent to your registered email or phone number.',
        otpLabel: 'One-Time Password',
        submitButton: 'Complete Verification',
        loading: 'Verifying your account...',
      },
      forgotPassword: {
        title: 'Forgot your password?',
        description:
          "Enter your email address and we'll send you a link to reset your password.",
        emailLabel: 'Email',
        submitButton: 'Send Reset Link',
        returnSignIn: 'Return to sign in',
        loading: 'Sending password reset link...',
      },
      resetPassword: {
        title: 'Reset Your Password',
        description:
          'Enter your new password below to securely reset your account password.',
        newPassword: 'New Password',
        confirmNewPassword: 'Confirm New Password',
        submitButton: 'Reset Password',
        loading: 'Changing your password, please wait...',
      },
      verify2FA: {
        heading: 'Verify Your Identity',
        title: 'To keep your account secure, we verify your identity.',
        description: 'Enter the code generated by your authenticator app.',
        label: 'Verification Code',
        submit: 'Submit',
        cancel: 'Cancel',
        loading: 'Verifying your identity...',
        success: '2FA verification successful. You are now signed in.',
        error: 'Verification failed. Please check your code and try again.',
      },
    },
  },
  bn: {
    translation: {
      header: {
        home: 'হোম',
        services: 'সার্ভিসেস',
        pricing: 'মূল্য নির্ধারণ',
        aboutUs: 'আমাদের সম্পর্কে',
        contact: 'যোগাযোগ',
        login: 'লগইন',
        register: 'রেজিস্টার',
        profile: 'প্রোফাইল',
        settings: 'সেটিংস',
        logout: 'লগআউট',
        signingOut: 'লগআউট হচ্ছে...',
      },
      hero: {
        title: 'দ্রুত এবং নির্ভরযোগ্য কুরিয়ার এবং পার্সেল ম্যানেজমেন্ট',
        desc: 'আমাদের উন্নত কুরিয়ার ম্যানেজমেন্ট সিস্টেম দিয়ে আপনার ডেলিভারি প্রক্রিয়াকে সহজ করুন। পার্সেল রিয়েল-টাইমে ট্র্যাক করুন, ডেলিভারিগুলো কার্যকরভাবে পরিচালনা করুন এবং আপনার গ্রাহকদের চমৎকার সেবা প্রদান করুন।',
        watchDemo: 'ডেমো দেখুন',
        learnMore: 'আরও জানুন',
        parcelsDelivered: 'ডেলিভারি করা পার্সেল',
        onTimeDelivery: 'সময়মতো ডেলিভারি',
        customerSupport: 'গ্রাহক সমর্থন',
        trackParcelTitle: 'আপনার পার্সেল ট্র্যাক করুন',
        trackingPlaceholder: 'ট্র্যাকিং নম্বর লিখুন',
        dontKnow: 'আপনার ট্র্যাকিং নম্বর জানা নেই?',
        contactUs: 'যোগাযোগ করুন',
      },
      features: {
        title: 'কেন QuickShip বেছে নেবেন?',
        desc: 'আমাদের পূর্ণাঙ্গ কুরিয়ার ম্যানেজমেন্ট সিস্টেম আপনার ডেলিভারি পরিচালনাকে সহজ করতে প্রয়োজনীয় সব কিছু সরবরাহ করে',
        list: [
          {
            title: 'রিয়েল-টাইম ট্র্যাকিং',
            description:
              'উন্নত GPS প্রযুক্তি দিয়ে পার্সেল রিয়েল-টাইমে ট্র্যাক করুন। গ্রাহকদের সঠিক ডেলিভারি অনুমান প্রদান করুন।',
          },
          {
            title: 'সর্বোত্তম রুট',
            description:
              'AI চালিত রুট অপ্টিমাইজেশন ডেলিভারি সময় এবং জ্বালানী খরচ কমাতে সহায়ক।',
          },
          {
            title: 'রোল ম্যানেজমেন্ট',
            description:
              'অ্যাডমিন, এজেন্ট এবং গ্রাহকদের জন্য প্রাসঙ্গিক অনুমতি সহ পূর্ণাঙ্গ রোল ভিত্তিক অ্যাক্সেস।',
          },
          {
            title: 'COD ম্যানেজমেন্ট',
            description:
              'ইন্টিগ্রেটেড পেমেন্ট ট্র্যাকিং এবং রিপোর্টিং দিয়ে ক্যাশ অন ডেলিভারি কার্যকরভাবে পরিচালনা করুন।',
          },
          {
            title: 'Analytics & Reports',
            description:
              'ডেলিভারি পারফরম্যান্স এবং ব্যবসায়িক সূচক সম্পর্কে বিস্তারিত রিপোর্ট তৈরি করুন এবং অন্তর্দৃষ্টি পান।',
          },
          {
            title: 'মোবাইল অ্যাপ',
            description:
              'আমাদের মোবাইল অ্যাপ ডেলিভারি এজেন্টদের স্ট্যাটাস আপডেট করতে এবং গ্রাহকদের চলাকালীন পার্সেল ট্র্যাক করতে দেয়।',
          },
        ],
      },
      steps: {
        title: 'কিভাবে কাজ করে',
        desc: 'আপনার ডেলিভারি কার্যকরভাবে পরিচালনা করার জন্য সহজ ধাপ',
        list: [
          {
            number: 1,
            title: 'পার্সেল বুক করুন',
            description:
              'পিকআপ এবং ডেলিভারি বিস্তারিত সহ একটি শিপমেন্ট তৈরি করুন',
          },
          {
            number: 2,
            title: 'এজেন্ট নিয়োগ করুন',
            description: 'ডেলিভারিটি একটি উপলব্ধ এজেন্টকে নিয়োগ করুন',
          },
          {
            number: 3,
            title: 'ডেলিভারি ট্র্যাক করুন',
            description: 'পার্সেল রিয়েল-টাইমে পর্যবেক্ষণ করুন',
          },
          {
            number: 4,
            title: 'কনফার্মেশন নিন',
            description: 'ডেলিভারি কনফার্মেশন এবং ফিডব্যাক পান',
          },
        ],
      },
      cta: {
        title: 'আপনার কুরিয়ার ব্যবসা পরিবর্তনের জন্য প্রস্তুত?',
        desc: 'হাজার হাজার ব্যবসায়ীদের সঙ্গে যোগ দিন যারা QuickShip ব্যবহার করে তাদের ডেলিভারি পরিচালনা সহজ করছে এবং গ্রাহকদের চমৎকার সেবা প্রদান করছে।',
        button: 'আজই শুরু করুন',
      },
      footer: {
        aboutTitle: 'QuickShip সম্পর্কে',
        aboutDesc:
          'QuickShip একটি পূর্ণাঙ্গ কুরিয়ার এবং পার্সেল ম্যানেজমেন্ট সিস্টেম যা আপনার ডেলিভারি পরিচালনা সহজ এবং গ্রাহক সন্তুষ্টি বাড়ানোর জন্য ডিজাইন করা হয়েছে।',
        quickLinksTitle: 'দ্রুত লিঙ্ক',
        quickLinks: [
          { label: 'হোম', href: '#' },
          { label: 'সার্ভিসেস', href: '#' },
          { label: 'মূল্য নির্ধারণ', href: '#' },
          { label: 'আমাদের সম্পর্কে', href: '#' },
          { label: 'যোগাযোগ', href: '#' },
        ],
        contactTitle: 'যোগাযোগ করুন',
        contactItems: [
          {
            icon: 'MapPin',
            text: 'কেওয়ারজানি, মানিকগঞ্জ-১৮০০, ঢাকা, বাংলাদেশ',
          },
          { icon: 'Phone', text: '০১৭৬৩৪০৮৪৯৪' },
          { icon: 'Mail', text: 'jsdev.robin@gmail.com' },
        ],
        copyright: '© ২০২৫ QuickShip. সর্বস্বত্ব সংরক্ষিত।',
      },
      signin: {
        welcomeBack: 'ফিরে স্বাগতম',
        description:
          'আপনার অ্যাকাউন্টে লগইন করুন অথবা সোশ্যাল প্রোভাইডার দিয়ে চালিয়ে যান।',
        email: 'ইমেইল',
        password: 'পাসওয়ার্ড',
        rememberMe: 'আমাকে মনে রাখুন',
        forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
        signIn: 'সাইন ইন',
        noAccount: 'অ্যাকাউন্ট নেই?',
        signUp: 'সাইন আপ',
        signingIn: 'সাইন ইন হচ্ছে...',
      },
      signup: {
        title: 'আপনার সেলার অ্যাকাউন্ট তৈরি করুন',
        description:
          'আপনার ইমেইল দিয়ে সাইন আপ করুন অথবা সোশ্যাল অ্যাকাউন্ট ব্যবহার করে শুরু করুন।',
        firstName: 'নামের প্রথম অংশ',
        lastName: 'নামের শেষ অংশ',
        email: 'ইমেইল',
        phone: 'ফোন',
        password: 'পাসওয়ার্ড',
        confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
        signUp: 'সাইন আপ',
        signingUp: 'সাইন আপ হচ্ছে...',
        alreadyAccount: 'ইতিমধ্যে একটি অ্যাকাউন্ট আছে?',
        signIn: 'সাইন ইন',
      },
      verifyEmail: {
        title: 'ওটিপি যাচাই',
        description:
          'আপনার রেজিস্টারড ইমেইল বা ফোন নম্বরে পাঠানো ৬-সংখ্যার কোডটি লিখুন।',
        otpLabel: 'ওয়ান-টাইম পাসওয়ার্ড',
        submitButton: 'যাচাই সম্পন্ন করুন',
        loading: 'আপনার অ্যাকাউন্ট যাচাই করা হচ্ছে...',
      },
      forgotPassword: {
        title: 'আপনার পাসওয়ার্ড ভুলে গেছেন?',
        description:
          'আপনার ইমেইল ঠিকানা লিখুন এবং আমরা একটি রিসেট লিঙ্ক পাঠাব।',
        emailLabel: 'ইমেইল',
        submitButton: 'রিসেট লিঙ্ক পাঠান',
        returnSignIn: 'সাইন ইন এ ফিরে যান',
        loading: 'পাসওয়ার্ড রিসেট লিঙ্ক পাঠানো হচ্ছে...',
      },
      resetPassword: {
        title: 'আপনার পাসওয়ার্ড রিসেট করুন',
        description: 'নিচে নতুন পাসওয়ার্ড লিখুন এবং নিরাপদভাবে রিসেট করুন।',
        newPassword: 'নতুন পাসওয়ার্ড',
        confirmNewPassword: 'নতুন পাসওয়ার্ড পুনরায় লিখুন',
        submitButton: 'পাসওয়ার্ড রিসেট করুন',
        loading: 'পাসওয়ার্ড পরিবর্তন করা হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...',
      },
      verify2FA: {
        heading: 'আপনার পরিচয় যাচাই করুন',
        title: 'আপনার অ্যাকাউন্ট নিরাপদ রাখতে আমরা আপনার পরিচয় যাচাই করি।',
        description: 'আপনার অ্যাপ থেকে তৈরি করা কোড লিখুন।',
        label: 'যাচাই কোড',
        submit: 'জমা দিন',
        cancel: 'বাতিল',
        loading: 'আপনার পরিচয় যাচাই করা হচ্ছে...',
        success: '2FA যাচাই সফল। আপনি এখন লগইন করেছেন।',
        error: 'যাচাই ব্যর্থ হয়েছে। কোডটি পরীক্ষা করুন এবং আবার চেষ্টা করুন।',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
