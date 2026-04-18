"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ClipboardPenLine, ArrowRight, Calendar, Clock, ChevronLeft, BookOpen } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      id: 'competencies-guide',
      title: "دليل الكفاءات الختامية ومركباتها في التربية البدنية (2023)",
      excerpt: "تحليل بيداغوجي شامل لجميع الكفاءات الختامية ومركباتها لكل المستويات الابتدائية وفق المقاربة بالكفاءات.",
      date: "20 مارس 2024",
      readTime: "15 دقيقة",
      category: "تحليل بيداغوجي"
    },
    {
      id: 'curriculum-2023',
      title: "دليل شامل لمنهاج التربية البدنية والرياضية 2023 في الجزائر",
      excerpt: "تعرف على أهم التغييرات في المنهاج الجديد وكيفية بناء الكفاءات الإجرائية للمرحلة الابتدائية وفق المقاربة الجديدة.",
      date: "15 مارس 2024",
      readTime: "8 دقائق",
      category: "مناهج تربوية"
    },
    {
      id: 'curriculum-data',
      title: "المنهاج الرسمي بالتفصيل: الكفاءات والموارد المعرفية",
      excerpt: "عرض كامل وشامل لكافة الكفاءات الختامية والموارد المعرفية لكل المستويات الابتدائية وفق الوثيقة الرسمية.",
      date: "17 مارس 2024",
      readTime: "12 دقيقة",
      category: "وثائق رسمية"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-tajawal" dir="rtl">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="bg-primary p-1.5 rounded-lg">
            <ClipboardPenLine className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">Modakira</span>
        </Link>
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowRight className="h-4 w-4" />
            العودة للرئيسية
          </Button>
        </Link>
      </header>

      <main className="container max-w-5xl mx-auto py-12 px-4 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">المدونة البيداغوجية</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            مقالات ودراسات متخصصة لمساعدة أستاذ التربية البدنية والرياضية في مشواره المهني.
          </p>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <article className="group bg-white rounded-3xl p-8 border shadow-sm hover:shadow-md transition-all text-start space-y-4">
                <div className="flex items-center justify-between">
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                    {post.category}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold font-headline group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center text-primary font-bold gap-2 text-sm">
                  <span>اقرأ المقال كاملاً</span>
                  <ChevronLeft className="h-4 w-4" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t py-12 text-center text-sm text-muted-foreground bg-white mt-20">
        © 2024 Modakira. جميع الحقوق محفوظة للأستاذ الجزائري.
      </footer>
    </div>
  );
}
