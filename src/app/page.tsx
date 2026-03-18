
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
  MessageSquare,
  Check,
  CreditCard
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
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#pricing">
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
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative bg-white border rounded-3xl overflow-hidden shadow-2xl">
                  {mockupImage?.imageUrl && (
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. How it Works (Process) */}
        <section className="w-full py-20 bg-primary/5">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">كيف يعمل RiyadiPlan؟</h2>
              <p className="text-lg text-muted-foreground font-tajawal">
                خطوات بسيطة تفصلك عن مذكرتك البيداغوجية القادمة
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-primary/20 -translate-y-1/2 z-0"></div>
              
              <div className="flex flex-col items-center text-center space-y-4 relative z-10 group">
                <div className="h-20 w-20 rounded-full bg-white text-primary flex items-center justify-center text-3xl font-bold shadow-xl border-4 border-primary group-hover:scale-110 transition-transform">
                  1
                </div>
                <h3 className="text-xl font-bold font-headline">أنشئ حسابك</h3>
                <p className="text-sm text-muted-foreground font-tajawal max-w-[200px]">سجل دخولك مجاناً واربط بياناتك المهنية.</p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 relative z-10 group">
                <div className="h-20 w-20 rounded-full bg-white text-primary flex items-center justify-center text-3xl font-bold shadow-xl border-4 border-primary group-hover:scale-110 transition-transform">
                  2
                </div>
                <h3 className="text-xl font-bold font-headline">حدد تفضيلاتك</h3>
                <p className="text-sm text-muted-foreground font-tajawal max-w-[200px]">اختر المستوى الدراسي، الميدان، والمورد المعرفي.</p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 relative z-10 group">
                <div className="h-20 w-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold shadow-xl border-4 border-white group-hover:scale-110 transition-transform">
                  3
                </div>
                <h3 className="text-xl font-bold font-headline">شاهد النتائج</h3>
                <p className="text-sm text-muted-foreground font-tajawal max-w-[200px]">يولد الذكاء الاصطناعي مذكرتك فوراً وجاهزة للتحميل.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Pricing Section */}
        <section id="pricing" className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">استثمر في وقتك وجهدك</h2>
              <p className="text-lg text-muted-foreground font-tajawal">
                باقات مرنة تناسب احتياجات كل أستاذ في مسيرته التربوية
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Basic Plan */}
              <div className="p-8 rounded-3xl border bg-white shadow-sm flex flex-col relative">
                <h3 className="text-2xl font-bold font-headline mb-4">الباقة الأساسية</h3>
                <div className="flex items-baseline gap-1 mb-6">
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
                <Link href="/pricing">
                  <Button className="w-full h-12" variant="outline">اختر الباقة</Button>
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="p-8 rounded-3xl border-2 border-primary bg-primary/5 shadow-xl flex flex-col relative transform lg:scale-105">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold font-tajawal">
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
                  <li className="flex items-center gap-3 text-sm font-tajawal">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>دعم كامل لجميع المستويات</span>
                  </li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">ابدأ الآن</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Final Call to Action */}
        <section className="w-full py-20 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-primary opacity-90 -z-10"></div>
          <div className="container px-4 md:px-6 mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold font-headline text-white leading-tight">
              توقف عن العمل الورقي المتعب <br />
              <span className="text-accent">وابدأ التحضير بذكاء اليوم</span>
            </h2>
            <p className="text-xl text-white/90 font-tajawal max-w-2xl mx-auto">
              انضم لمئات الأساتذة الجزائريين الذين وفروا ساعات من وقتهم أسبوعياً.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/auth/sign-up">
                <Button size="lg" className="h-14 px-10 text-xl bg-white text-primary hover:bg-white/90 shadow-2xl">
                  ابدأ تجربتك المجانية
                  <ChevronLeft className="ms-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="problem" className="w-full py-20 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-center">هل تعبت من العمل الورقي التقليدي؟</h2>
              <p className="text-lg text-muted-foreground font-tajawal text-center">
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
      </main>

      {/* Footer */}
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
              <Link className="hover:text-primary transition-colors" href="/privacy-policy">سياسة الخصوصية</Link>
              <Link className="hover:text-primary transition-colors" href="/terms-of-service">شروط الاستخدام</Link>
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
