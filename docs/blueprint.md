# **App Name**: RiyadiPlan AI

## Core Features:

- User Authentication & Profile: Secure sign-up and sign-in using Firebase Authentication, along with basic profile management for user information and account settings.
- Personalized Dashboard: A tailored dashboard displaying key user information, including the total count of lesson plans created and the current credit balance, fetched from Firestore.
- AI Lesson Objectives Tool: Generate 5 precise, measurable, achievable, relevant, and time-bound (SMART) lesson objectives in Arabic, leveraging Google's Gemini AI, based on curriculum details provided by the user.
- AI Lesson Plan Drafting Tool: Utilize Google's Gemini AI to draft a comprehensive PE lesson plan in Arabic, structured according to formal Algerian pedagogical stages (preparatory, learning, final) based on selected objectives.
- Lesson Plan Management: Enable users to view, save, and retrieve a detailed list of their created lesson plans from Firestore, as well as review and edit individual plan content.
- Credit & Usage System: Monitor and display the user's current credit balance. Implement an atomic credit deduction mechanism for each AI generation, with alerts for low balances.
- PRO Subscription Management: Facilitate seamless upgrades to a PRO subscription tier using Chargily Pay V2, incorporating automated activation via secure webhooks.

## Style Guidelines:

- Primary color: Teal (#47CFD6). Chosen for its professional and energetic appeal, supporting clarity and guidance in the user interface.
- Background color: Light Teal (#E6F7F8). A soft and clean variant that harmonizes with the primary teal, enhancing readability and promoting a clear aesthetic.
- Accent color: Orange (#FF8033). Provides a vibrant contrast, used strategically for Calls to Action (CTAs) and essential highlights to draw user attention.
- Body font: 'Tajawal' (Arabic sans-serif) for its modern readability, suited for extensive Arabic text. Headers font: 'Rajdhani' (geometric sans-serif) for a sporty and contemporary feel in English headings. Note: currently only Google Fonts are supported.
- Leverage Lucide-React for clean, consistent, and highly customizable icons, ensuring visual coherence and a polished, professional look throughout the application.
- Employ an 'Arabic-First' Right-to-Left (RTL) design philosophy for all components, optimizing the interface for Arabic-speaking educators. Incorporate clear, multi-step guided forms to streamline the lesson plan creation process.
- Integrate polished micro-animations using Framer Motion to create a fluid and engaging user experience, offering subtle visual feedback for user interactions.