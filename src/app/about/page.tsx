
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  GraduationCap, 
  BookOpen, 
  Search, 
  Tag, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ArrowRight,
  Newspaper,
  Lightbulb,
  FileText,
  User
} from "lucide-react";
import { useState } from 'react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "شرح شامل لمنهاج التربية البدنية 2023 للطور الابتدائي",
    excerpt: "تعرف على أهم التغييرات في المنهاج الجديد وكيفية تكييف حصصك مع المقاربة بالكفاءات...",
    category: "أخبار المنهاج",
    date: "15 مارس 2024",
    readTime: "8 دقائق",
    image: "https://picsum.photos/seed/curriculum/600/400",
    author: "أ. محمد علي"
  },
  {
    id: 2,
    title: "5 ألعاب شبه رياضية لتطوير التنسيق الحركي لدى تلاميذ السنة الأولى",
    excerpt: "مجموعة من الألعاب المختارة بعناية لتناسب الخصائص النمائية لتلاميذ الطور الأول...",
    category: "نصائح بيداغوجية",
    date: "12 مارس 2024",
    readTime: "5 دقائق",
    image: "https://picsum.photos/seed/games/600/400",
    author: "أ. سارة ب."
  },
  {
    id: 3,
    title: "كيفية صياغة أهداف SMART في التربية البدنية والرياضية",
    excerpt: "دليل عملي للأستاذ لتعلم فن صياغة الأهداف الإجرائية القابلة للقياس والملاحظة...",
    category: "تطوير مهني",
    date: "10 مارس 2024",
    readTime: "10 دقائق",
    image: "https://picsum.photos/seed/smart/600/400",
    author: "فريق RiyadiPlan"
  },
  {
    id: 4,
    title: "أهمية التقويم البنائي في حصة التربية البدنية",
    excerpt: "لماذا يجب علينا التركيز على عملية التعلم بدلاً من النتائج فقط؟ وكيف نطبق ذلك في الساحة؟",
    category: "بيداغوجيا",
    date: "5 مارس 2024",
    readTime: "6 دقائق",
    image: "https://picsum.photos/seed/assessment/600/400",
    author: "أ. كمال ح."
  }
];

const CATEGORIES = [
  { name: "الكل", count: 12, icon: Newspaper },
  { name: "أخبار المنهاج", count: 4, icon: BookOpen },
  { name: "نصائح بيداغوجية", count: 5, icon: Lightbulb },
  { name: "تطوير مهني", count: 3, icon: GraduationCap },
  { name: "وثائق تربوية", count: 2, icon: FileText },
];

export default function AboutBlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Navigation Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="bg-primary p-1.5 rounded-lg">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">RiyadiPlan AI</span>
        </Link>
        <div className="flex gap-4">
          <Link href="/auth/sign-in">
            <Button variant="ghost">دخول</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button className="bg-accent hover:bg-accent/90">ابدأ مجاناً</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Sidebar - Desktop Only (on right because RTL) */}
          <aside className="lg:col-span-3 space-y-8 order-2 lg:order-2">
            
            {/* Search Box */}
            <Card className="border-none shadow-sm overflow-hidden bg-white">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="بحث في المقالات..." className="pr-10 h-11" />
                </div>
              </CardContent>
            </Card>

            {/* Categories Menu */}
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-lg font-headline flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  التصنيفات
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors text-sm font-tajawal ${
                        selectedCategory === cat.name 
                        ? 'bg-primary/10 text-primary font-bold' 
                        : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <cat.icon className="h-4 w-4" />
                        <span>{cat.name}</span>
                      </div>
                      <Badge variant="secondary" className="bg-white/50">{cat.count}</Badge>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* Featured Section / Newsletter */}
            <Card className="border-none shadow-sm bg-primary text-primary-foreground overflow-hidden">
              <CardContent className="p-6 text-center space-y-4">
                <div className="bg-white/20 p-3 rounded-full w-fit mx-auto">
                  <Newspaper className="h-8 w-8" />
                </div>
                <h3 className="font-bold font-headline text-lg leading-tight">اشترك في النشرة البيداغوجية</h3>
                <p className="text-sm opacity-90 font-tajawal">احصل على أحدث أخبار المنهاج والنصائح مباشرة في بريدك.</p>
                <Input placeholder="بريدك الإلكتروني" className="bg-white text-foreground border-none h-10" />
                <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90">اشترك الآن</Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-8 order-1 lg:order-1">
            
            {/* Blog Header Section */}
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-primary/10 text-primary mb-2">
                مدونة RiyadiPlan
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-headline text-slate-900">
                المدونة البيداغوجية <br />
                <span className="text-primary">للأستاذ الجزائري</span>
              </h1>
              <p className="text-lg text-slate-600 font-tajawal max-w-2xl leading-relaxed">
                وجهتكم الأولى لمواكبة مستجدات التربية البدنية، نصائح تحضير المذكرات، واستراتيجيات التعليم الحديثة.
              </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {BLOG_POSTS.map((post) => (
                <Card key={post.id} className="border-none shadow-sm hover:shadow-md transition-all flex flex-col group overflow-hidden bg-white">
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-primary hover:bg-white shadow-sm border-none backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 space-y-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-tajawal">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </CardTitle>
                    <p className="text-muted-foreground font-tajawal text-sm line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-slate-400" />
                      </div>
                      <span className="text-xs font-bold font-tajawal text-slate-700">{post.author}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary font-bold group">
                      اقرأ المزيد
                      <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center pt-8">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled><ArrowRight className="h-4 w-4 rotate-180" /></Button>
                <Button variant="secondary" size="sm" className="bg-primary text-white">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="border-t py-12 bg-white mt-12">
        <div className="container px-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded-md">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-headline font-bold text-xl text-primary">RiyadiPlan AI</span>
          </div>
          <p className="text-sm text-muted-foreground font-tajawal text-center">
            © 2024 RiyadiPlan AI. المنصة الجزائرية الأولى لتطوير العمل البيداغوجي.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary">سياسة الخصوصية</Link>
            <Link href="/terms-of-service" className="text-xs text-muted-foreground hover:text-primary">شروط الخدمة</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

