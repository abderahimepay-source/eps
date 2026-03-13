# RiyadiPlan AI - مولد مذكرات التربية البدنية

أول منصة جزائرية ذكية تساعد أساتذة التربية البدنية على إنشاء مذكرات بيداغوجية احترافية في ثوانٍ، متوافقة تماماً مع المنهاج الرسمي 2023.

## التقنيات المستخدمة
- **Next.js 15 (App Router)**
- **Firebase (Auth & Firestore)**
- **Genkit (Gemini AI)**
- **Shadcn UI & Tailwind CSS**
- **Chargily Pay V2** (للمدفوعات)

## كيفية نقل المشروع إلى مستودع GitHub جديد
إذا كنت ترغب في رفع هذا المشروع إلى حسابك الجديد، اتبع الخطوات التالية في سطر الأوامر (Terminal):

1. **تغيير عنوان المستودع البعيد (Remote URL):**
   ```bash
   git remote set-url origin https://github.com/abderahimepay-source/epsaiagent.git
   ```

2. **رفع الملفات:**
   ```bash
   git add .
   git commit -m "Initial commit to new repository"
   git push -u origin main
   ```

## الإعدادات المطلوبة (.env)
تأكد من إعداد المتغيرات التالية في بيئة العمل الخاصة بك:
- `NEXT_PUBLIC_APP_URL`: رابط تطبيقك (حالياً https://studio-delta-tan.vercel.app)
- `CHARGILY_SECRET_KEY`: مفتاحك السري من لوحة تحكم Chargily
- `GEMINI_API_KEY`: مفتاح Google AI Studio لتشغيل Genkit

## تشغيل المشروع محلياً
```bash
npm install
npm run dev
```
