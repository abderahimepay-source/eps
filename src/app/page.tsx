import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Target,
  Clock,
  Zap,
  ShieldCheck,
  HelpCircle,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  const mockupImage = PlaceHolderImages.find(img => img.id === 'app-mockup');

  const faqs = [
    {
      category: "البداية والحساب",
      questions: [
        { q: "هل أحتاج لبطاقة بنكية للتسجيل؟", a: "لا، التسجيل مجاني تماماً ونمنحك اعتمادات تجريبية للبدء فوراً دون الحاجة لأي معلومات دفع." },
        { q: "هل يمكنني تغيير باقتي لاحقاً؟", a: "نعم، يمكنك الترقية إلى باقة المحترفين في أي وقت للحصول على سعة أكبر من الاعتمادات." }
      ]
    },
    {
      category: "الأمور التقنية",
      questions: [
        { q: "هل أحتاج لتحميل أي برنامج على حاسوبي؟", a: "لا، Modakira يعمل 100% عبر المتصفح. يمكنك استخدامه من الهاتف، اللوحة الإلكترونية، أو الحاسوب دون تثبيت أي شيء." },
        { q: "هل بياناتي ومذكراتي آمنة؟", a: "بالتأكيد، نستخدم تشفير SSL المتطور وخوادم Google Cloud لضمان خصوصية وأمان كافة ملفاتك." }
      ]
    },
    {
      category: "الدفع والاشتراكات",
      questions: [
        { q: "ما هي طرق الدفع المتاحة؟", a: "ندعم الدفع المحلي عبر البطاقة الذهبية وبطاقة CIB من خلال بوابة Chargily الآمنة." },
        { q: "ما هي سياسة الاسترجاع؟", a: "نظراً لأننا نقدم خدمة رقمية فورية، لا نوفر استرجاعاً للأموال بعد استخدام الاعتمادات، ولكن يمكنك دائماً تجربة الخدمة مجاناً قبل الشراء." }
      ]
    },
    {
      category: "الدعم والتدريب",
      questions: [
        { q: "هل توفرون دعماً فنياً في حال واجهت مشكلة؟", a: "نعم، فريقنا متواجد عبر واتساب والبريد الإلكتروني للرد على استفساراتكم في أقل من 24 ساعة." }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body" dir="rtl">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="bg-primary p-1.5 rounded-lg">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">Modakira</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#process">كيف يعمل؟</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#pricing">الأسعار</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#comparison">لماذا نحن؟</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#faq">الأسئلة الشائعة</Link>
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
                  <Link href="#process">
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
              <div className="p-8 rounded-3xl border bg-white shadow-sm flex flex-col relative hover:border-primary/50 transition-colors">
                <h3 className="text-2xl font-bold font-headline mb-4">الباقة الأساسية</h3>
                <div className="flex items-baseline justify-center gap-1 mb-6 text-primary">
                  <span className="text-4xl font-bold font-rajdhani">500</span>
                  <span className="text-muted-foreground font-tajawal">د.ج</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1 text-start">
                  <li className="flex items-center gap-3 text-sm font-tajawal">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="font-bold">توليد حوالي 40 مذكرة كاملة</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-tajawal">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>الوصول للمنهاج الرسمي 2023</span>
                  </li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full h-12" variant="outline">اختر الباقة</Button>
                </Link>
              </div>

              <div className="p-8 rounded-3xl border-2 border-primary bg-primary/5 shadow-xl flex flex-col relative transform lg:scale-105">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold font-tajawal shadow-lg">
                  الأكثر طلباً
                </div>
                <h3 className="text-2xl font-bold font-headline mb-4 text-primary">باقة المحترفين PRO</h3>
                <div className="flex items-baseline justify-center gap-1 mb-6 text-primary">
                  <span className="text-4xl font-bold font-rajdhani">1000</span>
                  <span className="text-muted-foreground font-tajawal">د.ج</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1 text-start">
                  <li className="flex items-center gap-3 text-sm font-tajawal">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-bold">توليد حوالي 80 مذكرة كاملة</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-tajawal">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>أولوية في الدعم الفني</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-tajawal">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>أرشفة سحابية غير محدودة</span>
                  </li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">ابدأ الآن</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Comparison Section */}
        <section id="comparison" className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">لماذا يختار الأساتذة Modakira؟</h2>
                <p className="text-lg text-muted-foreground font-tajawal">
                  نحن نفهم التحديات التي تواجه الأستاذ الجزائري يومياً. بدلاً من قضاء ساعات في البحث والنسخ، نمنحك الدقة والسرعة.
                </p>
                <div className="space-y-4">
                  {[
                    { title: "توافق كامل مع منهاج 2023", desc: "نظامنا محدث باستمرار وفق آخر التوصيات البيداغوجية." },
                    { title: "صياغة أهداف SMART", desc: "الذكاء الاصطناعي يختار الأفعال الإجرائية المناسبة التي يطلبها المفتشون." },
                    { title: "تصدير جاهز للطباعة", desc: "احصل على مذكرة منسقة وجاهزة للتوقيع في ثوانٍ." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold font-headline text-lg">{item.title}</h4>
                        <p className="text-sm text-muted-foreground font-tajawal">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-muted/30 rounded-3xl p-8 border-2 border-dashed border-primary/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm">
                    <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">1</div>
                    <p className="font-tajawal text-sm font-medium">تم توليد الهدف الإجرائي بنجاح...</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm translate-x-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">2</div>
                    <p className="font-tajawal text-sm font-medium">جاري صياغة المرحلة التعلمية...</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm">
                    <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">3</div>
                    <p className="font-tajawal text-sm font-medium">المذكرة جاهزة للتحميل بصيغة PDF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FAQ Section */}
        <section id="faq" className="w-full py-20 bg-muted/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">الأسئلة الشائعة</h2>
              <p className="text-lg text-muted-foreground font-tajawal">كل ما تحتاج معرفته عن منصة Modakira</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-8">
              {faqs.map((category, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-xl font-bold font-headline text-primary border-r-4 border-primary ps-3">{category.category}</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, fIdx) => (
                      <AccordionItem key={fIdx} value={`${idx}-${fIdx}`} className="border rounded-xl px-4 mb-2 bg-white">
                        <AccordionTrigger className="text-start font-bold font-tajawal hover:no-underline">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground font-tajawal leading-relaxed">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Final Call to Action Section */}
        <section className="w-full py-24 relative overflow-hidden bg-primary">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container px-4 md:px-6 mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold font-headline text-white leading-tight">
              توقف عن العمل الورقي المتعب <br />
              <span className="text-white font-extrabold drop-shadow-md">وابدأ التحضير بذكاء اليوم</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-tajawal max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
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
                <Button size="lg" variant="outline" className="h-16 px-12 text-2xl border-white/40 text-white hover:bg-white/10 rounded-2xl font-bold gap-2">
                  <MessageCircle className="h-6 w-6" />
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
                <span className="font-headline font-bold text-2xl text-primary">Modakira</span>
              </div>
              <p className="text-sm text-muted-foreground font-tajawal max-w-xs text-center md:text-start">
                أول منصة ذكية لأساتذة التربية البدنية في الجزائر، مصممة لتسهيل العمل التربوي وتوفير الوقت.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3 text-start">
                <h4 className="font-bold text-sm">قانوني</h4>
                <ul className="text-sm space-y-2 text-muted-foreground font-tajawal">
                  <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
                  <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">شروط الخدمة</Link></li>
                </ul>
              </div>
              <div className="space-y-3 text-start">
                <h4 className="font-bold text-sm">الدعم</h4>
                <ul className="text-sm space-y-2 text-muted-foreground font-tajawal">
                  <li><Link href="https://wa.me/213555000000" className="text-primary font-bold hover:underline">واتساب</Link></li>
                  <li><Link href="mailto:support@modakira.ai" className="hover:text-primary transition-colors">البريد الإلكتروني</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground font-tajawal">
            © 2024 Modakira. جميع الحقوق محفوظة للأستاذ الجزائري.
          </div>
        </div>
      </footer>
    </div>
  );
}
