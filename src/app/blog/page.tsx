
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, Calendar, Clock, ChevronLeft } from "lucide-react";
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BlogPage() {
  const curriculumImage = PlaceHolderImages.find(img => img.id === 'blog-curriculum');

  const posts = [
    {
      id: 'curriculum-2023',
      title: "دليل شامل لمنهاج التربية البدنية والرياضية 2023 في الجزائر",
      excerpt: "تعرف على أهم التغييرات في المنهاج الجديد وكيفية بناء الكفاءات الإجرائية للمرحلة الابتدائية وفق المقاربة الجديدة.",
      date: "15 مارس 2024",
      readTime: "8 دقائق",
      image: curriculumImage?.imageUrl,
      category: "مناهج تربوية"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-tajawal" dir="rtl">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="bg-primary p-1.5 rounded-lg">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
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

        <div className="grid gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <article className="group bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl transition-all grid md:grid-cols-2">
                <div className="relative h-64 md:h-full overflow-hidden">
                  {post.image && (
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                    {post.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center space-y-4 text-start">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold font-headline group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  <Button variant="link" className="p-0 h-auto text-primary font-bold self-start gap-2">
                    اقرأ المقال كاملاً
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
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
