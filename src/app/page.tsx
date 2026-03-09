import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Zap, Shield, Sparkles, BookOpen, GraduationCap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="bg-primary p-1.5 rounded-lg">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">RiyadiPlan AI</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/about">
            عن المنصة
          </Link>
          <Link href="/auth/sign-in">
            <Button variant="ghost">تسجيل الدخول</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button className="bg-accent hover:bg-accent/90">اشترك مجاناً</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>
          
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/20 text-primary-foreground mb-4">
                  <Sparkles className="h-3 w-3 me-2" />
                  مستقبل التحضير البيداغوجي هنا
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
                  حول حصص التربية البدنية إلى <span className="text-primary">تجارب تعلم ذكية</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl leading-relaxed font-tajawal">
                  أول منصة جزائرية ذكية تساعد أساتذة التربية البدنية على إنشاء مذكرات بيداغوجية احترافية في ثوانٍ، متوافقة تماماً مع المنهاج الرسمي 2023.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link href="/auth/sign-up">
                  <Button size="lg" className="h-14 px-8 text-lg bg-accent hover:bg-accent/90 w-full sm:w-auto">
                    ابدأ بإنشاء مذكرتك الأولى
                    <ChevronLeft className="ms-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto">
                    اكتشف المميزات
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl border bg-background/50 hover:shadow-lg transition-all">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-headline">سرعة فائقة</h3>
                <p className="text-muted-foreground font-tajawal">
                  وفر ساعات من العمل الورقي التقليدي. أنشئ مذكرة كاملة بـ 3 خطوات بسيطة فقط.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl border bg-background/50 hover:shadow-lg transition-all">
                <div className="bg-accent/10 p-4 rounded-full">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold font-headline">دقة بيداغوجية</h3>
                <p className="text-muted-foreground font-tajawal">
                  جميع مخرجات الذكاء الاصطناعي مدربة على مصطلحات المنهاج الجزائري الرسمي والمقاربة بالكفاءات.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl border bg-background/50 hover:shadow-lg transition-all">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-headline">تنظيم سحابي</h3>
                <p className="text-muted-foreground font-tajawal">
                  احتفظ بجميع مذكراتك في مكان واحد آمن، يمكنك الوصول إليها وتعديلها في أي وقت ومن أي جهاز.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-background">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded-md">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-headline font-bold text-xl text-primary">RiyadiPlan AI</span>
          </div>
          <p className="text-sm text-muted-foreground font-tajawal">
            © 2024 RiyadiPlan AI. جميع الحقوق محفوظة للأستاذ الجزائري.
          </p>
          <div className="flex gap-6">
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              سياسة الخصوصية
            </Link>
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              شروط الاستخدام
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}