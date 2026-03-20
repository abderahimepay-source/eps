import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Sparkles, 
  BookOpen, 
  ClipboardPenLine, 
  CheckCircle2, 
  Target,
  Clock,
  Zap,
  ShieldCheck,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  FileText
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
            <ClipboardPenLine className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">Modakira</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#process">كيف يعمل؟</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/blog">المدونة</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#pricing">الأسعار</Link>
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

        {/* Process Section */}
        <section id="process" className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">تحضير مذكرتك لم يكن أسهل</h2>
              <p className="text-lg text-muted-foreground font-tajawal">ثلاث خطوات بسيطة تفصلك عن مذكرتك القادمة</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
              {[
                { step: "1", title: "حدد المورد", desc: "اختر المستوى الدراسي والميدان." },
                { step: "2", title: "اختر الأهداف", desc: "اختر من بين أهداف SMART المولدة آلياً." },
                { step: "3", title: "حمل مذكرتك", desc: "راجع المذكرة وحملها بصيغة PDF فوراً." }
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

        {/* Pricing Section */}
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

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">الأسئلة الشائعة</h2>
              <p className="text-lg text-muted-foreground font-tajawal">كل ما تحتاج معرفته عن Modakira</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((cat, i) => cat.questions.map((q, j) => (
                  <AccordionItem key={`${i}-${j}`} value={`item-${i}-${j}`}>
                    <AccordionTrigger className="text-start font-bold">{q.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{q.a}</AccordionContent>
                  </AccordionItem>
                )))}
              </Accordion>
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
                  <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">الخصوصية</Link></li>
                  <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">الشروط</Link></li>
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
