
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Sparkles, 
  ClipboardPenLine, 
  CheckCircle2, 
  Clock,
  Zap,
  Star,
  Quote,
  LayoutGrid,
  FileSearch,
  FileCheck
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
  const guideStep1 = PlaceHolderImages.find(img => img.id === 'guide-step-1');
  const guideStep2 = PlaceHolderImages.find(img => img.id === 'guide-step-2');
  const guideStep3 = PlaceHolderImages.find(img => img.id === 'guide-step-3');
  const teacherAvatar = PlaceHolderImages.find(img => img.id === 'teacher-avatar');

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
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body" dir="rtl">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="bg-primary p-1.5 rounded-lg">
            <ClipboardPenLine className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">Modakira</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">المميزات</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/blog">المدونة</Link>
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
        {/* Hero Section */}
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
              
              <div className="relative animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50"></div>
                <div className="relative bg-white border rounded-3xl overflow-hidden shadow-2xl">
                  {mockupImage?.imageUrl && (
                    <Image 
                      src={mockupImage.imageUrl} 
                      alt={mockupImage.description || "App Preview"}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover pointer-events-none"
                      unoptimized={true}
                      priority={true}
                      data-ai-hint="app mockup"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section with Guide Images */}
        <section id="features" className="py-24 bg-white overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold font-headline">كيف يعمل Modakira؟</h2>
              <p className="text-lg text-muted-foreground font-tajawal">ثلاث خطوات بسيطة تفصلك عن مذكرتك البيداغوجية الاحترافية</p>
            </div>

            <div className="space-y-32">
              {/* Step 1 */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6 text-start order-2 lg:order-1">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary text-2xl font-bold font-headline">01</div>
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">تحديد المورد المعرفي بدقة</h2>
                  <p className="text-lg text-muted-foreground font-tajawal leading-relaxed">
                    اختر السنة الدراسية، ميدان التعلم، والمورد المعرفي من القوائم المنسدلة المبرمجة حرفياً وفق المنهاج الوزاري 2023.
                  </p>
                  <ul className="space-y-3 font-tajawal text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> قاعدة بيانات شاملة لكل المستويات</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> توافق تام مع المقاربة بالكفاءات</li>
                  </ul>
                </div>
                <div className="relative order-1 lg:order-2">
                  <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] -rotate-2"></div>
                  <Image 
                    src={guideStep1?.imageUrl || ""} 
                    alt="Step 1: Selection" 
                    width={800} 
                    height={600} 
                    className="relative rounded-3xl shadow-2xl border-4 border-white object-cover"
                    data-ai-hint="resource selection"
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/5 rounded-[2.5rem] rotate-2"></div>
                  <Image 
                    src={guideStep2?.imageUrl || ""} 
                    alt="Step 2: Objectives" 
                    width={800} 
                    height={600} 
                    className="relative rounded-3xl shadow-2xl border-4 border-white object-cover"
                    data-ai-hint="objectives generation"
                  />
                </div>
                <div className="space-y-6 text-start">
                  <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center text-accent text-2xl font-bold font-headline">02</div>
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">أهداف SMART بلمسة ذكاء</h2>
                  <p className="text-lg text-muted-foreground font-tajawal leading-relaxed">
                    يقوم الذكاء الاصطناعي بتوليد 5 أهداف إجرائية دقيقة (أن + فعل إجرائي + المتعلم...). اختر الأهداف التي تناسب ظروف حصتك وتلاميذك.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border text-center">
                      <h4 className="font-bold text-sm mb-1 text-primary">أفعال حركية</h4>
                      <p className="text-xs text-muted-foreground font-tajawal">قابلة للقياس والملاحظة</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border text-center">
                      <h4 className="font-bold text-sm mb-1 text-primary">توفير وقت</h4>
                      <p className="text-xs text-muted-foreground font-tajawal">صياغة تربوية في ثوانٍ</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6 text-start order-2 lg:order-1">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary text-2xl font-bold font-headline">03</div>
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">مذكرة كاملة جاهزة للطباعة</h2>
                  <p className="text-lg text-muted-foreground font-tajawal leading-relaxed">
                    احصل فوراً على المذكرة بتنسيق رسمي يشمل المراحل الثلاث (التحضيرية، التعلمية، والختامية) مع تفصيل دقيق لكل وضعية، وقم بتحميلها بصيغة PDF.
                  </p>
                  <ul className="space-y-3 font-tajawal">
                    <li className="flex items-center gap-2 font-bold"><CheckCircle2 className="h-5 w-5 text-green-500" /> تنسيق A4 احترافي</li>
                    <li className="flex items-center gap-2 font-bold"><CheckCircle2 className="h-5 w-5 text-green-500" /> جاهزة لختم المدير والمفتش</li>
                  </ul>
                  <Link href="/auth/sign-up">
                    <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-lg font-bold rounded-xl mt-4">
                      جرب الخطوات بنفسك الآن
                    </Button>
                  </Link>
                </div>
                <div className="relative order-1 lg:order-2">
                  <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] -rotate-1"></div>
                  <Image 
                    src={guideStep3?.imageUrl || ""} 
                    alt="Step 3: Final Plan" 
                    width={800} 
                    height={600} 
                    className="relative rounded-3xl shadow-2xl border-4 border-white object-cover"
                    data-ai-hint="final lesson plan"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">ماذا يقول زملاؤنا؟</h2>
              <p className="text-lg text-muted-foreground font-tajawal">انطباعات أساتذة التربية البدنية الذين جربوا المنصة</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  name: "أ. محمد بن علي", 
                  role: "أستاذ تعليم ابتدائي - وهران", 
                  text: "لم أكن أتخيل أن الذكاء الاصطناعي سيصل لمجالنا. Modakira وفرت علي ساعات من البحث في المنهج الورقي." 
                },
                { 
                  name: "أ. سارة قرشي", 
                  role: "أستاذة تربية بدنية - العاصمة", 
                  text: "أكثر ما أعجبني هو دقة الأفعال الإجرائية المقترحة. المذكرات تخرج بشكل احترافي جداً وتبيض الوجه أمام المفتش." 
                },
                { 
                  name: "أ. كمال عباسي", 
                  role: "أستاذ تعليم ابتدائي - سطيف", 
                  text: "نظام الشحن سهل والاعتمادات تكفي لفصل دراسي كامل. استثمار رائع لكل أستاذ يبحث عن الرقمنة." 
                }
              ].map((t, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border hover:shadow-md transition-shadow relative">
                  <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/10" />
                  <div className="space-y-6">
                    <p className="text-muted-foreground italic font-tajawal leading-relaxed">"{t.text}"</p>
                    <div className="flex items-center gap-4 pt-4 border-t">
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                        <Image 
                          src={teacherAvatar?.imageUrl || ""} 
                          alt="Teacher" 
                          width={48} 
                          height={48} 
                          className="object-cover"
                          data-ai-hint="teacher avatar"
                        />
                      </div>
                      <div className="text-start">
                        <h4 className="font-bold text-sm">{t.name}</h4>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-20 bg-white">
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
                    <span>توليد حوالي 40 مذكرة كاملة</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-tajawal">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>الوصول للمنهاج الرسمي 2023</span>
                  </li>
                </ul>
                <Link href="/auth/sign-up"><Button className="w-full h-12" variant="outline">ابدأ الآن</Button></Link>
              </div>

              <div className="p-8 rounded-3xl border-2 border-primary bg-primary/5 shadow-xl flex flex-col relative transform lg:scale-105">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold font-tajawal shadow-lg">الأكثر طلباً</div>
                <h3 className="text-2xl font-bold font-headline mb-4 text-primary">باقة المحترفين PRO</h3>
                <div className="flex items-baseline justify-center gap-1 mb-6 text-primary">
                  <span className="text-4xl font-bold font-rajdhani">1000</span>
                  <span className="text-muted-foreground font-tajawal">د.ج</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1 text-start">
                  <li className="flex items-center gap-3 text-sm font-tajawal">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>توليد حوالي 80 مذكرة كاملة</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-tajawal">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>أرشفة سحابية غير محدودة</span>
                  </li>
                </ul>
                <Link href="/auth/sign-up"><Button className="w-full h-12 bg-primary hover:bg-primary/90">ابدأ الآن</Button></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-24 bg-primary text-white text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-4xl md:text-6xl font-bold font-headline leading-tight relative z-10">
            توقف عن العمل الورقي المتعب <br />
            وابدأ التحضير بذكاء اليوم
          </h2>
          <p className="text-xl text-white/90 font-tajawal max-w-2xl mx-auto relative z-10">
            انضم لمئات الأساتذة الجزائريين الذين وفروا ساعات من وقتهم أسبوعياً. مذكرتك القادمة جاهزة في انتظارك.
          </p>
          <div className="flex justify-center relative z-10 pt-4">
            <Link href="/auth/sign-up">
              <Button size="lg" className="h-16 px-12 text-2xl bg-white text-primary hover:bg-white/90 rounded-2xl font-bold shadow-2xl">
                ابدأ تجربتك المجانية
                <ChevronLeft className="ms-2 h-7 w-7" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 bg-white border-t">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-start">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link href="/" className="flex items-center gap-2">
                <ClipboardPenLine className="h-6 w-6 text-primary" />
                <span className="font-headline font-bold text-2xl text-primary">Modakira</span>
              </Link>
              <p className="text-sm text-muted-foreground font-tajawal max-w-xs">أول منصة ذكية لأساتذة التربية البدنية في الجزائر.</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="font-bold text-sm">روابط هامة</h4>
                <ul className="text-sm space-y-2 text-muted-foreground font-tajawal">
                  <li><Link href="/blog" className="hover:text-primary transition-colors">المدونة</Link></li>
                  <li><Link href="/pricing-guide" className="hover:text-primary transition-colors">دليل التسعير والاعتمادات</Link></li>
                  <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">الخصوصية</Link></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-sm">الدعم</h4>
                <ul className="text-sm space-y-2 text-muted-foreground font-tajawal">
                  <li><Link href="https://wa.me/213555000000" className="text-primary font-bold">واتساب</Link></li>
                  <li><Link href="mailto:support@modakira.ai" className="hover:text-primary transition-colors">إيميل</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-xs text-muted-foreground">© 2024 Modakira. جميع الحقوق محفوظة.</div>
        </div>
      </footer>
    </div>
  );
}
