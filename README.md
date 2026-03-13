# RiyadiPlan AI - مولد مذكرات التربية البدنية

أول منصة جزائرية ذكية تساعد أساتذة التربية البدنية على إنشاء مذكرات بيداغوجية احترافية في ثوانٍ، متوافقة تماماً مع المنهاج الرسمي 2023.

## التقنيات المستخدمة
- **Next.js 15 (App Router)**
- **Firebase (Auth & Firestore)**
- **Genkit (Gemini AI)**
- **Shadcn UI & Tailwind CSS**
- **Chargily Pay V2** (للمدفوعات)

## كيفية نقل المشروع إلى مستودع GitHub الجديد

إذا واجهت خطأ `Repository not found` عند تنفيذ الأوامر، اتبع هذه الخطوات بالترتيب:

### 1. إنشاء المستودع على GitHub
- اذهب إلى حسابك في [GitHub](https://github.com/new).
- قم بتسمية المستودع بنفس الاسم: `epsaiagent`.
- **هام:** لا تقم بتحديد خيار "Initialize this repository with a README" (اتركه فارغاً).
- اضغط على **Create repository**.

### 2. إعداد المستودع محلياً (Terminal)
بعد إنشاء المستودع على الموقع، نفذ هذه الأوامر في مجلد المشروع:

```bash
# التأكد من الرابط الصحيح
git remote set-url origin https://github.com/abderahimepay-source/epsaiagent.git

# إضافة جميع الملفات
git add .

# إنشاء أول نسخة
git commit -m "Initial commit"

# الرفع إلى الفرع الرئيسي
git push -u origin main
```

## الإعدادات المطلوبة (.env)
تأكد من إعداد المتغيرات التالية في بيئة العمل الخاصة بك (مثلاً في Vercel أو Firebase App Hosting):
- `NEXT_PUBLIC_APP_URL`: رابط تطبيقك (مثلاً https://studio-delta-tan.vercel.app)
- `CHARGILY_SECRET_KEY`: مفتاحك السري من لوحة تحكم Chargily
- `GEMINI_API_KEY`: مفتاح Google AI Studio لتشغيل Genkit

## تشغيل المشروع محلياً
```bash
npm install
npm run dev
```
