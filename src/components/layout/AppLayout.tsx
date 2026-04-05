
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { 
  ClipboardPenLine, 
  LayoutDashboard, 
  User, 
  LogOut, 
  Plus, 
  ChevronRight, 
  ChevronLeft,
  CreditCard,
  ShieldAlert,
  Sparkles
} from "lucide-react";
import { useState } from 'react';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
  { href: '/lesson-plans/create', label: 'إنشاء مذكرة', icon: Sparkles },
  { href: '/pricing', label: 'شحن الرصيد', icon: CreditCard },
  { href: '/profile', label: 'حسابي', icon: User },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    <div className="min-h-screen flex bg-background font-body" dir="rtl">
      {/* Sidebar - Desktop Only */}
      <aside className={cn(
        "hidden lg:flex bg-white border-e fixed inset-y-0 right-0 z-50 transition-all duration-300 flex-col shadow-sm",
        isCollapsed ? "w-20" : "w-64"
      )}>
        <div className="h-full flex flex-col p-4">
          <div className={cn(
            "flex items-center gap-2 mb-8 px-2 transition-all duration-300",
            isCollapsed ? "justify-center" : ""
          )}>
            <div className="bg-primary p-1.5 rounded-lg shrink-0">
              <ClipboardPenLine className="h-6 w-6 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <span className="font-headline text-2xl font-bold text-primary truncate">Modakira</span>
            )}
          </div>

          <Link href="/lesson-plans/create" className="mb-6">
            <Button className={cn(
              "w-full bg-accent hover:bg-accent/90 gap-2 h-12 transition-all",
              isCollapsed ? "p-0 aspect-square" : "text-lg"
            )}>
              <Plus className="h-5 w-5" />
              {!isCollapsed && "مذكرة جديدة"}
            </Button>
          </Link>

          <nav className="flex-1 space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      "w-full justify-start gap-3 h-11 text-base transition-all duration-200",
                      isActive && "bg-primary/10 text-primary hover:bg-primary/20",
                      isCollapsed ? "px-0 justify-center" : "px-4"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                    {!isCollapsed && <span className="font-tajawal">{item.label}</span>}
                  </Button>
                </Link>
              );
            })}

            {profile?.isAdmin && (
              <Link href="/admin">
                <Button
                  variant={pathname === '/admin' ? 'secondary' : 'ghost'}
                  className={cn(
                    "w-full justify-start gap-3 h-11 text-base transition-all duration-200 mt-4 border-t pt-4 rounded-none",
                    pathname === '/admin' && "bg-destructive/10 text-destructive hover:bg-destructive/20",
                    isCollapsed ? "px-0 justify-center" : "px-4"
                  )}
                >
                  <ShieldAlert className={cn("h-5 w-5 shrink-0", pathname === '/admin' ? "text-destructive" : "text-muted-foreground")} />
                  {!isCollapsed && <span className="font-tajawal font-bold">لوحة الإدارة</span>}
                </Button>
              </Link>
            )}
          </nav>

          <div className="pt-4 border-t space-y-1">
            {!isCollapsed && (
              <div className="px-3 py-2 mb-2 bg-primary/5 rounded-xl border border-primary/10">
                <div className="text-xs text-muted-foreground mb-1">الرصيد</div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary text-lg font-rajdhani">{profile?.credit_balance || 0}</span>
                  <Link href="/pricing">
                    <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-accent">شحن</Button>
                  </Link>
                </div>
              </div>
            )}
            
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10",
                isCollapsed ? "px-0 justify-center" : "px-4"
              )}
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && <span className="font-tajawal">خروج</span>}
            </Button>
          </div>
        </div>

        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -left-4 top-20 rounded-full border shadow-md h-8 w-8 hidden lg:flex items-center justify-center bg-white hover:bg-gray-50 z-[60]"
        >
          {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </aside>

      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300",
        isCollapsed ? "lg:pr-20" : "lg:pr-64"
      )}>
        <header className="h-16 border-b bg-white flex items-center px-4 lg:px-8 justify-between sticky top-0 z-40">
          <div className="flex lg:hidden items-center gap-2">
            <div className="bg-primary p-1 rounded-md">
              <ClipboardPenLine className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-headline font-bold text-lg text-primary">Modakira</span>
          </div>
          
          <div className="ms-auto flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2 h-10 px-4"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              <span className="font-tajawal font-bold">خروج</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8 overflow-y-auto">
          {children}
        </main>

        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 px-4 h-16 flex items-center justify-around shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <div className={cn(
                  "flex flex-col items-center gap-1 transition-all duration-200",
                  isActive ? "text-primary scale-110" : "text-muted-foreground"
                )}>
                  <item.icon className="h-5 w-5" />
                  <span className="text-[10px] font-tajawal font-medium">{item.label}</span>
                  {isActive && <div className="h-1 w-1 rounded-full bg-primary mt-0.5" />}
                </div>
              </Link>
            );
          })}
          <Link href="/lesson-plans/create" className="absolute -top-6 left-1/2 -translate-x-1/2">
            <Button size="icon" className="h-12 w-12 rounded-full shadow-lg bg-accent hover:bg-accent/90 border-4 border-background">
              <Plus className="h-6 w-6" />
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  );
}
