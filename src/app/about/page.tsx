
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
  User,
  Star
} from "lucide-react";
import { useState, useMemo } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const BLOG_POSTS = [
  {
    id: 1,
    title: "شرح شامل لمنهاج التربية البدنية 2023 للطور الابتدائي",
    excerpt: "تعرف على أهم التغييرات في المنهاج الجديد وكيفية تكييف حصصك مع المقاربة بالكفاءات الجديدة التي تركز على الطفل...",
    category: "أخبار المنهاج",
    date: "15 مارس 2024",
    readTime: "8 دقائق",
    imageId: "blog-curriculum",
    author: "أ. محمد علي",
    featured: true
  },
  {
    id: 2,
    title: "5 ألعاب شبه رياضية لتطوير التنسيق الحركي لدى تلاميذ السنة الأولى",
    excerpt: "مجموعة من الألعاب المختارة بعناية لتناسب الخصائص النمائية لتلاميذ الطور الأول وتضمن المتعة والتعلم في آن واحد...",
    category: "نصائح بيداغوجية",
    date: "12 مارس 2024",
    readTime: "5 دقائق",
    imageId: "blog-games",
    author: "أ. سارة ب.",
    featured: false
  },
  {
    id: 3,
    title: "كيفية صياغة أهداف SMART في التربية البدنية والرياضية",
    excerpt: "دليل عملي للأستاذ لتعلم فن صياغة الأهداف الإجرائية القابلة للقياس والملاحظة وتجنب الأخطاء الشائعة في التحضير...",
    category: "تطوير مهني",
    date: "10 مارس 2024",
    readTime: "10 دقائق",
    imageId: "blog-smart",
    author: "فريق RiyadiPlan",
    featured: false
  },
  {
    id: 4,
    title: "أهمية التقويم البنائي في حصة التربية البدنية",
    excerpt: "لماذا يجب علينا التركيز على عملية التعلم بدلاً من النتائج فقط؟ وكيف نطبق شبكات التقويم في الساحة بفعالية؟",
    category: "نصائح بيداغوجية",
    date: "5 مارس 2024",
    readTime: "6 دقائق",
    imageId: "blog-assessment",
    author: "أ. كمال ح.",
    featured: false
  },
  {
    id: 5,
    title: "صيانة الوسائل الرياضية في المؤسسات التربوية",
    excerpt: "دليل عملي للأستاذ والمدير حول كيفية الحفاظ على العتاد الرياضي وتمديد عمره الافتراضي في ظل نقص الإمكانيات...",
    category: "وثائق تربوية",
    date: "1 مارس 2024",
    readTime: "4 دقائق",
    imageId: "blog-equipment",
    author: "أ. عيسى م.",
    featured: false
  }
];

const CATEGORIES = [
  { name: "الكل", icon: Newspaper },
  { name: "أخبار المنهاج", icon: BookOpen },
  { name: "نصائح بيداغوجية", icon: Lightbulb },
  { name: "تطوير مهني", icon: GraduationCap },
  { name: "وثائق تربوية", icon: FileText },
];

export default function AboutBlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === "الكل" || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => BLOG_POSTS.find(p => p.featured), []);

  const getImageUrl = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id)?.imageUrl || "/placeholder.svg";
  };

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
          
          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-12 order-1 lg:order-1">
            
            {/* Featured Post */}
            {selectedCategory === "الكل" && !searchQuery && featuredPost && (
              <section className="relative group cursor-pointer overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-video md:aspect-auto min-h-[300px]">
                    <Image 
                      src={getImageUrl(featuredPost.imageId)} 
                      alt={featuredPost.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      data-ai-hint="curriculum blog"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-white shadow-lg">مقالات مميزة</Badge>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center space-y-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-tajawal">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {featuredPost.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featuredPost.readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold font-headline group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground font-tajawal leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-bold text-sm font-tajawal">{featuredPost.author}</span>
                      </div>
                      <Button variant="link" className="text-primary p-0 h-auto font-bold">
                        واصل القراءة <ChevronLeft className="mr-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Blog Posts Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-headline">
                  {searchQuery ? `نتائج البحث عن: ${searchQuery}` : selectedCategory === "الكل" ? "أحدث المقالات" : selectedCategory}
                </h2>
                <span className="text-sm text-muted-foreground font-tajawal">{filteredPosts.length} مقال</span>
              </div>
              
              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="border-none shadow-sm hover:shadow-md transition-all flex flex-col group overflow-hidden bg-white">
                      <div className="relative aspect-video overflow-hidden">
                        <Image 
                          src={getImageUrl(post.imageId)} 
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
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
                  <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <p className="text-muted-foreground font-tajawal">لم يتم العثور على أي مقالات تطابق بحثك.</p>
                  <Button variant="link" onClick={() => {setSearchQuery(""); setSelectedCategory("الكل");}} className="mt-2">إعادة تعيين البحث</Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8 order-2 lg:order-2">
            
            {/* Search Box */}
            <Card className="border-none shadow-sm overflow-hidden bg-white">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="بحث في المقالات..." 
                    className="pr-10 h-11" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
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
                      <Badge variant="secondary" className="bg-white/50">
                        {cat.name === "الكل" ? BLOG_POSTS.length : BLOG_POSTS.filter(p => p.category === cat.name).length}
                      </Badge>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* Newsletter */}
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

            {/* App Promotion */}
            <Card className="border-none shadow-sm bg-accent text-white overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-white" />
                  <span className="font-bold text-sm">جرّب RiyadiPlan AI</span>
                </div>
                <p className="text-sm font-tajawal">أنشئ مذكراتك بذكاء في ثوانٍ. وفر 80% من وقت التحضير.</p>
                <Link href="/auth/sign-up" className="block">
                  <Button className="w-full bg-white text-accent hover:bg-white/90">ابدأ الآن</Button>
                </Link>
              </CardContent>
            </Card>
          </aside>

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
