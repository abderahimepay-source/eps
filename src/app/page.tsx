
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronLeft, 
  Zap, 
  Shield, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Smartphone,
  Facebook,
  Twitter,
  Instagram,
  Send,
  MessageSquare
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
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/about">
            عن المنصة
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
            الميزات
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/pricing">
            الأسعار
          </Link>
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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5">
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>
          
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-start">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-primary/10 text-primary mb-4 border-primary/20">
                  <Sparkles className="h-4 w-4 me-2 animate-spin-slow" />
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
                  <Link href="#problem">
                    <Button size="lg" variant="outline" className="h-14 px-10 text-xl">
                      اكتشف المزيد
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> لا يتطلب بطاقة بنكية
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> متوافق مع المنهاج الرسمي
                  </span>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative bg-white border rounded-3xl overflow-hidden shadow-2xl">
                  {mockupImage?.imageUrl ? (
                    <Image 
                      src={mockupImage.imageUrl} 
                      alt={mockupImage.description || "App Preview"}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                      data-ai-hint={mockupImage.imageHint}
                      unoptimized={true}
                      priority={true}
                    />
                  ) : (
                    <div className="w-[800px] h-[600px] bg-muted animate-pulse flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Problem & Solution Section */}
        <section id="problem" className="w-full py-20 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">هل تعبت من العمل الورقي التقليدي؟</h2>
              <p className="text-lg text-muted-foreground font-tajawal">
                نعلم المعاناة اليومية للأستاذ الجزائري في صياغة الأهداف وتنسيق المذكرات يدوياً.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <Card 
                title="الطريقة التقليدية المتعبة" 
                items={[
                  "ساعات من البحث في ملفات PDF القديمة",
                  "صعوبة صياغة الأهداف الإجرائية (SMART)",
                  "تكرار الكتابة اليدوية المملة",
                  "عدم تناسق التنسيق والخطوط"
                ]}
                isBad
              />
              <Card 
                title="طريقة RiyadiPlan AI الذكية" 
                items={[
                  "إنشاء مذكرة كاملة بـ 3 نقرات فقط",
                  "أهداف ذكية مصاغة بأفعال حركية دقيقة",
                  "تنسيق احترافي جاهز للطباعة فوراً",
                  "أرشيف سحابي متاح من هاتفك في أي وقت"
                ]}
                isBad={false}
              />
            </div>
          </div>
        </section>

        {/* 3. Curriculum-Specific Features */}
        <section id="features" className="w-full py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <FeatureItem 
                icon={<BookOpen className="h-10 w-10 text-primary" />}
                title="منهاج 2023 متكامل"
                description="قاعدة بيانات شاملة تضم جميع الميادين والموارد المعرفية للمنهاج الجزائري الرسمي لجميع مستويات الابتدائي."
              />
              <FeatureItem 
                icon={<Zap className="h-10 w-10 text-accent" />}
                title="مولد الأهداف الذكية"
                description="ذكاء اصطناعي مدرب على استخدام 'الأفعال الحركية' (يقذف، يتنقل، يربط) وفق المعايير المطلوبة من المفتشين."
              />
              <FeatureItem 
                icon={<Printer className="h-10 w-10 text-primary" />}
                title="تصدير جاهز للطباعة"
                description="احصل على مذكرتك بتنسيق PDF احترافي، منسق من اليمين إلى اليسار، وجاهز للتوقيع من طرف المدير."
              />
            </div>
          </div>
        </section>

        {/* 4. How it Works */}
        <section className="w-full py-20 bg-primary/5">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-16">3 خطوات بسيطة لمذكرتك القادمة</h2>
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-primary/20 -translate-y-1/2 z-0"></div>
              <StepItem number="1" title="اختر" description="حدد المستوى الدراسي والمورد المعرفي من القائمة الرسمية." />
              <StepItem number="2" title="حدد" description="اختر من بين 5 أهداف SMART يولدها لك الذكاء الاصطناعي بدقة." />
              <StepItem number="3" title="جهز" description="احصل على مذكرتك بمراحلها الثلاث: التحضيرية، التعلمية، والختامية." />
            </div>
          </div>
        </section>

        {/* 5. Trust & Social Proof */}
        <section className="w-full py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="bg-white border rounded-3xl p-8 md:p-12 shadow-xl flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                  <Shield className="h-4 w-4" />
                  مصمم وفق معايير التفتيش التربوي
                </div>
                <h2 className="text-3xl font-bold font-headline">ثقة مئات الأساتذة في الجزائر</h2>
                <div className="grid grid-cols-2 gap-8 py-4">
                  <div>
                    <div className="text-4xl font-bold text-primary font-rajdhani">+500</div>
                    <div className="text-sm text-muted-foreground font-tajawal">مذكرة تم إنشاؤها</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-accent font-rajdhani">+200</div>
                    <div className="text-sm text-muted-foreground font-tajawal">أستاذ نشط يومياً</div>
                  </div>
                </div>
                <blockquote className="border-r-4 border-accent pr-6 py-2 italic font-tajawal text-lg text-muted-foreground">
                  "ساعدني RiyadiPlan AI في توفير أكثر من 4 ساعات أسبوعياً من العمل الإداري الممل، مما أتاح لي التركيز أكثر على تلاميذي."
                  <footer className="mt-2 text-sm font-bold text-foreground">— أستاذ م. محمد، مدرسة ابتدائية، وهران</footer>
                </blockquote>
              </div>
              <div className="shrink-0">
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  {teacherImage?.imageUrl ? (
                    <Image 
                      src={teacherImage.imageUrl} 
                      alt="Teacher" 
                      fill 
                      className="object-cover"
                      data-ai-hint={teacherImage.imageHint}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <GraduationCap className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Payment Trust */}
        <section className="w-full py-16 bg-muted/20">
          <div className="container px-4 md:px-6 mx-auto text-center space-y-8">
            <h2 className="text-2xl font-bold font-headline">ادفع بسهولة وأمان</h2>
            <p className="text-muted-foreground font-tajawal">نحن ندعم جميع طرق الدفع المحلية في الجزائر عبر منصة Chargily</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <span className="font-bold text-xl border-2 px-4 py-2 rounded-lg border-primary/20 text-primary/60">EDAHABIA / الذهبية</span>
              <span className="font-bold text-xl border-2 px-4 py-2 rounded-lg border-primary/20 text-primary/60">CIB / بطاقة بنكية</span>
              <span className="font-bold text-xl border-2 px-4 py-2 rounded-lg border-primary/20 text-primary/60">BARIDIMOB / بريدي موب</span>
            </div>
          </div>
        </section>

        {/* 7. Contact Us Form */}
        <section id="contact" className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-background p-8 md:p-12 rounded-3xl border shadow-lg">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold font-headline">تواصل معنا</h2>
                <p className="text-muted-foreground font-tajawal leading-relaxed">
                  لديك استفسار أو اقتراح؟ فريقنا التقني والبيداغوجي هنا لمساعدتك دائماً.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold font-headline text-sm">واتساب الدعم</h4>
                      <p className="text-xs text-muted-foreground">0555-XX-XX-XX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Send className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold font-headline text-sm">البريد الإلكتروني</h4>
                      <p className="text-xs text-muted-foreground">support@riyadiplan.dz</p>
                    </div>
                  </div>
                </div>
                <div className="pt-6 flex gap-4">
                  <Link href="#" className="h-10 w-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="h-10 w-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="h-10 w-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </div>
              </div>
              
              <form className="space-y-4">
                <div className="space-y-2">
                  <Input placeholder="الاسم الكامل" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Input placeholder="البريد الإلكتروني" type="email" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Textarea placeholder="كيف يمكننا مساعدتك؟" className="min-h-[120px]" />
                </div>
                <Button className="w-full h-12 text-lg bg-primary hover:bg-primary/90">إرسال الرسالة</Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <footer className="w-full py-12 bg-white border-t">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1 rounded-md">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-headline font-bold text-2xl text-primary">RiyadiPlan AI</span>
            </div>
            <p className="text-sm text-muted-foreground font-tajawal text-center md:text-start">
              © 2024 RiyadiPlan AI. جميع الحقوق محفوظة للأستاذ الجزائري.
            </p>
            <div className="flex gap-6 text-sm font-medium">
              <Link className="hover:text-primary transition-colors" href="#">سياسة الخصوصية</Link>
              <Link className="hover:text-primary transition-colors" href="#">شروط الاستخدام</Link>
              <Link className="hover:text-primary transition-colors font-bold text-primary" href="https://wa.me/213555000000">الدعم عبر واتساب</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Card({ title, items, isBad }: { title: string, items: string[], isBad: boolean }) {
  return (
    <div className={`p-8 rounded-3xl border shadow-sm flex flex-col h-full ${isBad ? 'bg-white opacity-80' : 'bg-white border-primary shadow-primary/10'}`}>
      <h3 className={`text-xl font-bold font-headline mb-6 text-center ${isBad ? 'text-muted-foreground' : 'text-primary'}`}>{title}</h3>
      <ul className="space-y-4 flex-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            {isBad ? (
              <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
              </div>
            ) : (
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
            )}
            <span className={`text-sm font-tajawal ${isBad ? 'text-muted-foreground' : 'text-foreground font-medium'}`}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 group">
      <div className="bg-muted p-6 rounded-3xl group-hover:bg-primary/10 transition-colors duration-500 transform group-hover:-translate-y-2">
        {icon}
      </div>
      <h3 className="text-2xl font-bold font-headline">{title}</h3>
      <p className="text-muted-foreground font-tajawal leading-relaxed">{description}</p>
    </div>
  );
}

function StepItem({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 relative z-10">
      <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-xl border-4 border-white">
        {number}
      </div>
      <h3 className="text-2xl font-bold font-headline">{title}</h3>
      <p className="text-sm text-muted-foreground font-tajawal max-w-[200px]">{description}</p>
    </div>
  );
}
