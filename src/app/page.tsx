
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Printer, 
  Target,
  Clock,
  Zap,
  ShieldCheck,
  Star,
  Quote
} from "lucide-react";
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const mockupImage = PlaceHolderImages.find(img => img.id === 'app-mockup');
  const teacherImage = PlaceHolderImages.find(img => img.id === 'teacher-testimonial');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body" dir="rtl">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="bg-primary p-1.5 rounded-lg">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">RiyadiPlan AI</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/about">عن المنصة</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">المميزات</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#process">كيف يعمل؟</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#pricing">الأسعار</Link>
        </nav>
        <div className="flex gap-3 items-center">
          <Link href="/auth/sign-in" className="hidden sm:block">
            <Button variant="ghost">دخول</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button className="bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20">ابدأ الآن مجاناً</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 relative overflow-hidden bg-gradient-to-b from-white to-primary/5">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-start">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-primary/10 text-primary mb-4 border-primary/20">
                  <Sparkles className="h-4 w-4 me-2" />
                  مستقبل التحضير البيداغوجي في الجزائر
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline leading-tight">
                  أنشئ مذكراتك البيداغوجية <br />
                  <span className="text-primary">في ثوانٍ بذكاء اصطناعي</span> متخصص
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl font-tajawal leading-relaxed mx-auto lg:mx-0">
                  أول منصة جزائرية مصممة خصيصاً لأساتذة التربية البدنية، متوافقة تماماً مع منهاج 2023 والمقاربة بالكفاءات.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/auth/sign-up">
                    <Button size="lg" className="h-14 px-10 text-xl bg-accent hover:bg-accent/90 shadow-xl shadow-accent/20">
                      ابدأ الآن مجاناً
                      <ChevronLeft className="ms-2 h-6 w-6" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline" className="h-14 px-10 text-xl">
                      اكتشف المميزات
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative group animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-white border rounded-3xl overflow-hidden shadow-2xl">
                  {mockupImage?.imageUrl && (
                    <Image 
                      src={mockupImage.imageUrl} 
                      alt={mockupImage.description || "App Preview"}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                      unoptimized={true}
                      priority={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Process Section */}
        <section id="process" className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">تحضير مذكرتك لم يكن أسهل</h2>
              <p className="text-lg text-muted-foreground font-tajawal">ثلاث خطوات بسيطة تفصلك عن مذكرتك القادمة</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-primary/20 -translate-y-1/2 z-0"></div>
              
              {[
                { step: "1", title: "حدد المورد", desc: "اختر المستوى الدراسي، الميدان، والمورد المعرفي المطلوب." },
                { step: "2", title: "اختر الأهداف", desc: "اختر من بين أهداف SMART المولدة آلياً والموافقة للمنهاج." },
                { step: "3", title: "حمل مذكرتك", desc: "راجع المذكرة الكاملة وحملها بصيغة PDF فوراً." }
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4 relative z-10 group">
                  <div className="h-20 w-20 rounded-full bg-white text-primary flex items-center justify-center text-3xl font-bold shadow-xl border-4 border-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold font-headline">{s.title}</h3>
                  <p className="text-sm text-muted-foreground font-tajawal max-w-[200px]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Pricing Section */}
        <section id="pricing" className="w-full py-20 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">باقات تناسب مسيرتك</h2>
              <p className="text-lg text-muted-foreground font-tajawal">ابدأ مجاناً ثم اختر الباقة التي تمنحك إنتاجية أكبر</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Basic Plan */}
              <div className="p-8 rounded-3xl border bg-white shadow-sm flex flex-col relative hover:border-primary/50 transition-colors">
                <h3 className="text-2xl font-bold font-headline mb-4">الباقة الأساسية</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold font-rajdhani">500</span>
                  <span className="text-muted-foreground font-tajawal">د.ج</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1 text-start">
                  <li className="flex items-center gap-3 text-sm font-tajawal">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="font-bold">توليد حوالي 40 مذكرة كاملة</span>
                  </li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full h-12" variant="outline">اختر الباقة</Button>
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="p-8 rounded-3xl border-2 border-primary bg-primary/5 shadow-xl flex flex-col relative transform lg:scale-105">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold font-tajawal shadow-lg">
                  الأكثر طلباً
                </div>
                <h3 className="text-2xl font-bold font-headline mb-4 text-primary">باقة المحترفين PRO</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold font-rajdhani">1000</span>
                  <span className="text-muted-foreground font-tajawal">د.ج</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1 text-start">
                  <li className="flex items-center gap-3 text-sm font-tajawal">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-bold">توليد حوالي 80 مذكرة كاملة</span>
                  </li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">ابدأ الآن</Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-12 text-center text-muted-foreground font-tajawal flex items-center justify-center gap-4">
              <span className="text-xs">الدفع متاح عبر:</span>
              <div className="flex gap-4 opacity-50">
                <span className="font-bold text-sm">الذهبية</span>
                <span className="font-bold text-sm">CIB</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Problem & Solution Section */}
        <section className="w-full py-20 bg-white border-y">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-destructive">هل تعبت من العمل الورقي التقليدي؟</h2>
                <p className="text-lg text-muted-foreground font-tajawal leading-relaxed">
                  نعلم المعاناة اليومية للأستاذ الجزائري في صياغة الأهداف وتنسيق المذكرات يدوياً. إضاعة الساعات في البحث في ملفات PDF القديمة وصعوبة ملاحقة تحديثات المنهاج.
                </p>
                <ul className="space-y-4">
                  {[
                    "إضاعة ساعات في صياغة الأهداف الإجرائية (SMART).",
                    "عدم تناسق التنسيق اليدوي والخطوط.",
                    "صعوبة الوصول للمذكرات القديمة عند الحاجة."
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                      </div>
                      <span className="font-tajawal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6 bg-primary/5 p-8 rounded-3xl border border-primary/20 shadow-inner">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">حل ذكي، بلمسة واحدة</h2>
                <p className="text-lg text-muted-foreground font-tajawal leading-relaxed">
                  RiyadiPlan AI يختصر عليك الطريق. بفضل قاعدة بيانات المنهاج الرسمي المدمجة، تحصل على مذكرة احترافية جاهزة للطباعة في ثوانٍ.
                </p>
                <ul className="space-y-4">
                  {[
                    "توليد أهداف دقيقة باستخدام أفعال حركية رسمية.",
                    "تنسيق احترافي موحد بضغطة زر واحدة.",
                    "أرشيف سحابي آمن لمذكراتك متاح من أي جهاز."
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="font-tajawal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Key Features Section */}
        <section id="features" className="w-full py-20 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">لماذا RiyadiPlan AI؟</h2>
              <p className="text-lg text-muted-foreground font-tajawal">مصمم خصيصاً ليناسب احتياجات الأستاذ في المؤسسة الجزائرية</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: "منهاج 2023 مدمج", 
                  desc: "يحتوي على كافة ميادين وموارد المنهاج الرسمي الجديد لضمان الدقة البيداغوجية.", 
                  icon: BookOpen,
                  color: "bg-blue-500"
                },
                { 
                  title: "مولد أهداف SMART", 
                  desc: "صياغة أهداف إجرائية ذكية وقابلة للقياس باستخدام أفعال حركية دقيقة (يقذف، يركض..).", 
                  icon: Target,
                  color: "bg-orange-500"
                },
                { 
                  title: "تصدير PDF فوري", 
                  desc: "احصل على مذكرتك بتنسيق احترافي جاهز للطباعة أو الإرسال لمديرك في ثوانٍ.", 
                  icon: Printer,
                  color: "bg-green-500"
                },
                { 
                  title: "توفير 80% من الوقت", 
                  desc: "حوّل عملية التحضير من ساعات من التفكير والكتابة إلى ثوانٍ من المراجعة والتدقيق.", 
                  icon: Clock,
                  color: "bg-purple-500"
                },
                { 
                  title: "دعم فني محلي", 
                  desc: "فريقنا متواجد دائماً لدعمك عبر واتساب والرد على استفساراتك التقنية والتربوية.", 
                  icon: Zap,
                  color: "bg-yellow-500"
                },
                { 
                  title: "أمان وخصوصية", 
                  desc: "بياناتك ومذكراتك محمية بأحدث بروتوكولات التشفير على خوادم Google Cloud.", 
                  icon: ShieldCheck,
                  color: "bg-teal-500"
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border group">
                  <div className={`${feature.color} h-12 w-12 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground font-tajawal leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Social Proof Section */}
        <section className="w-full py-20 bg-primary/5">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-headline mb-4">ماذا يقول الأساتذة عنا؟</h2>
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "أحمد ب.", role: "أستاذ تربية بدنية - العاصمة", text: "وفرت عليّ المنصة الكثير من الجهد في صياغة الأهداف. المذكرات المولدة دقيقة جداً وموافقة للمنهاج." },
                { name: "سارة م.", role: "أستاذة مدرسة ابتدائية - وهران", text: "سهولة الاستخدام مذهلة. الآن أستطيع تحضير أسبوع كامل من الدروس في أقل من 10 دقائق." },
                { name: "محمد ق.", role: "مفتش تربوي سابق", text: "فكرة رائعة تدعم التحول الرقمي في التعليم. استخدام الأفعال الحركية في الأهداف احترافي للغاية." }
              ].map((t, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border relative">
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                  <p className="text-sm font-tajawal italic mb-6 leading-relaxed text-muted-foreground">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-headline">{t.name}</h4>
                      <p className="text-[10px] text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Final Call to Action Section */}
        <section className="w-full py-24 relative overflow-hidden bg-primary">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container px-4 md:px-6 mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold font-headline text-white leading-tight">
              توقف عن العمل الورقي المتعب <br />
              <span className="text-accent-foreground font-extrabold drop-shadow-sm">وابدأ التحضير بذكاء اليوم</span>
            </h2>
            <p className="text-xl md:text-2xl text-white font-tajawal max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              انضم لمئات الأساتذة الجزائريين الذين وفروا ساعات من وقتهم أسبوعياً. مذكرتك القادمة جاهزة في انتظارك.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/auth/sign-up">
                <Button size="lg" className="h-16 px-12 text-2xl bg-white text-primary hover:bg-white/90 shadow-2xl transition-all hover:scale-105 rounded-2xl font-bold">
                  ابدأ تجربتك المجانية
                  <ChevronLeft className="ms-2 h-7 w-7" />
                </Button>
              </Link>
              <Link href="https://wa.me/213555000000">
                <Button size="lg" variant="outline" className="h-16 px-12 text-2xl border-white/40 text-white hover:bg-white/10 rounded-2xl font-bold">
                  تحدث مع الدعم
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-white border-t">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-1 rounded-md">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-headline font-bold text-2xl text-primary">RiyadiPlan AI</span>
              </div>
              <p className="text-sm text-muted-foreground font-tajawal max-w-xs text-center md:text-start">
                أول منصة ذكية لأساتذة التربية البدنية في الجزائر، مصممة لتسهيل العمل التربوي وتوفير الوقت.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h4 className="font-bold text-sm">المنصة</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li><Link href="#features" className="hover:text-primary transition-colors">المميزات</Link></li>
                  <li><Link href="#pricing" className="hover:text-primary transition-colors">الأسعار</Link></li>
                  <li><Link href="/about" className="hover:text-primary transition-colors">عن المنصة</Link></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-sm">قانوني</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
                  <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">شروط الخدمة</Link></li>
                </ul>
              </div>
              <div className="space-y-3 col-span-2 sm:col-span-1">
                <h4 className="font-bold text-sm">الدعم</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li><Link href="https://wa.me/213555000000" className="text-primary font-bold hover:underline">واتساب</Link></li>
                  <li><Link href="mailto:support@riyadiplan.ai" className="hover:text-primary transition-colors">البريد الإلكتروني</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground font-tajawal">
            © 2024 RiyadiPlan AI. جميع الحقوق محفوظة للأستاذ الجزائري.
          </div>
        </div>
      </footer>
    </div>
  );
}
