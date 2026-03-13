# RiyadiPlan AI - مولد مذكرات التربية البدنية

أول منصة جزائرية ذكية تساعد أساتذة التربية البدنية على إنشاء مذكرات بيداغوجية احترافية في ثوانٍ، متوافقة تماماً مع المنهاج الرسمي 2023.

## التقنيات المستخدمة
- **Next.js 15 (App Router)**
- **Firebase (Auth & Firestore)**
- **Genkit (Gemini AI)**
- **Shadcn UI & Tailwind CSS**
- **Chargily Pay V2** (للمدفوعات)

## كيفية حل خطأ Repository not found ونقل المشروع

إذا واجهت خطأ `Repository not found` عند تنفيذ الأوامر، اتبع هذه الخطوات بالترتيب:

### 1. إنشاء المستودع على GitHub (خطوة إجبارية)
1. اذهب إلى حسابك في [GitHub](https://github.com/new).
2. في خانة **Repository name**، اكتب بالضبط: `epsaiagent`.
3. اجعل المستودع **Public** أو **Private** حسب رغبتك.
4. **هام جداً:** لا تقم بتحديد أي خيارات إضافية (مثل Add a README أو .gitignore). اتركها فارغة.
5. اضغط على **Create repository**.

### 2. ربط المشروع ورفعه (Terminal)
بعد إنشاء المستودع على الموقع بنجاح، افتح المجلد في الجهاز ونفذ الأوامر التالية:

```bash
# 1. تهيئة git (إذا لم تكن قد فعلت ذلك)
git init

# 2. إضافة الرابط الصحيح للمستودع الجديد
git remote add origin https://github.com/abderahimepay-source/epsaiagent.git

# 3. في حال كان الرابط موجوداً مسبقاً وتريد تحديثه:
git remote set-url origin https://github.com/abderahimepay-source/epsaiagent.git

# 4. إضافة الملفات وعمل أول نسخة
git add .
git commit -m "Initial commit - RiyadiPlan AI"

# 5. رفع الملفات إلى الفرع الرئيسي
git branch -M main
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