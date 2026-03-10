"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { GraduationCap, LayoutDashboard, BookOpen, User, LogOut, Plus, Menu, CreditCard } from "lucide-react";
import { useState } from 'react';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/lesson-plans', label: 'مذكراتي', icon: BookOpen },
  { href: '/pricing', label: 'الأسعار والاشتراك', icon: CreditCard },
  { href: '/profile', label: 'الملف الشخصي', icon: User },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, firestore, auth } = useFirebase();

  const profileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'profiles', user.uid);
  }, [user, firestore]);
  const { data: profile } = useDoc(profileRef);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex bg-background" dir="rtl">
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-e fixed inset-y-0 right-0 z-50 transition-all duration-300 w-64 lg:relative lg:translate-x-0",
        !isSidebarOpen && "translate-x-full lg:w-0 lg:overflow-hidden lg:border-none"
      )}>
        <div className="h-full flex flex-col p-4">
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-headline text-2xl font-bold text-primary">RiyadiPlan</span>
          </div>

          <Link href="/lesson-plans/create" className="mb-6">
            <Button className="w-full bg-accent hover:bg-accent/90 gap-2 h-12 text-lg">
              <Plus className="h-5 w-5" />
              مذكرة جديدة
            </Button>
          </Link>

          <nav className="flex-1 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? 'secondary' : 'ghost'}
                  className={cn(
                    "w-full justify-start gap-3 h-11 text-base font-tajawal",
                    pathname === item.href && "bg-primary/10 text-primary hover:bg-primary/20"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t space-y-1">
            <div className="px-3 py-2 mb-2 bg-primary/5 rounded-xl border border-primary/10">
              <div className="text-xs text-muted-foreground mb-1">الرصيد المتبقي</div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary text-lg font-rajdhani">{profile?.credit_balance || 0}</span>
                <Link href="/pricing">
                  <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-accent">ترقية</Button>
                </Link>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-white flex items-center px-4 lg:px-8 justify-between sticky top-0 z-40">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col text-start">
              <span className="text-sm font-bold font-tajawal">{profile?.displayName || 'جاري التحميل...'}</span>
              <span className="text-xs text-muted-foreground font-tajawal truncate max-w-[150px]">{profile?.school || '...'}</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {profile?.displayName?.substring(0, 2) || 'أع'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
