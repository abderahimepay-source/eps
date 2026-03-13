# RiyadiPlan AI - مولد مذكرات التربية البدنية

أول منصة جزائرية ذكية تساعد أساتذة التربية البدنية على إنشاء مذكرات بيداغوجية احترافية في ثوانٍ، متوافقة تماماً مع المنهاج الرسمي 2023.

## التقنيات المستخدمة
- **Next.js 15 (App Router)**
- **Firebase (Auth & Firestore)**
- **Genkit (Gemini AI)**
- **Shadcn UI & Tailwind CSS**
- **Chargily Pay V2** (للمدفوعات)

## تعليمات الاستضافة (Deployment)

لرفع التطبيق على الإنترنت باستخدام **Firebase App Hosting**:

### 1. إعداد المستودع على GitHub
1. تأكد من رفع الكود إلى مستودعك: `https://github.com/abderahimepay-source/epsaiagent.git`.

### 2. إعداد Firebase Console
1. اذهب إلى [Firebase Console](https://console.firebase.google.com/).
2. اختر مشروعك، ثم انتقل إلى **App Hosting** من القائمة الجانبية.
3. اضغط على **Get Started** واربط حسابك بـ GitHub.
4. اختر المستودع `epsaiagent` والفرع `main`.

### 3. إعداد المتغيرات السرية (Environment Variables)
في واجهة Firebase أو Google Cloud Console، يجب إضافة المفاتيح التالية كـ **Secrets**:
- `CHARGILY_SECRET_KEY`: مفتاحك السري من Chargily.
- `GEMINI_API_KEY`: مفتاح API الخاص بـ Google AI Studio.
- `NEXT_PUBLIC_APP_URL`: رابط موقعك النهائي.

## كيفية حل خطأ Repository not found ونقل المشروع

إذا واجهت خطأ `Repository not found` عند تنفيذ الأوامر، اتبع هذه الخطوات بالترتيب:

### 1. إنشاء المستودع على GitHub
1. اذهب إلى [GitHub](https://github.com/new).
2. في خانة **Repository name**، اكتب: `epsaiagent`.
3. اضغط على **Create repository**.

### 2. ربط المشروع ورفعه
```bash
git init
git remote add origin https://github.com/abderahimepay-source/epsaiagent.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

## تشغيل المشروع محلياً
```bash
npm install
npm run dev
```