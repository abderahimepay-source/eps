
"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users, ShieldAlert, CreditCard, BookOpen } from "lucide-react";
import { useFirebase, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const { user, firestore } = useFirebase();
  const router = useRouter();

  // 1. Get current user profile to check if Admin
  const profileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'profiles', user.uid);
  }, [user, firestore]);
  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  // 2. Fetch all user profiles (Admin Only query)
  const usersQuery = useMemoFirebase(() => {
    if (!user || !firestore || !profile?.isAdmin) return null;
    return query(collection(firestore, 'profiles'), orderBy('createdAt', 'desc'));
  }, [user, firestore, profile]);
  const { data: allUsers, isLoading: isUsersLoading } = useCollection(usersQuery);

  // Redirect if not admin
  useEffect(() => {
    if (!isProfileLoading && profile && !profile.isAdmin) {
      router.push('/dashboard');
    }
  }, [profile, isProfileLoading, router]);

  if (isProfileLoading || (profile?.isAdmin && isUsersLoading)) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-tajawal">جاري التحقق من صلاحيات المسؤول...</p>
        </div>
      </AppLayout>
    );
  }

  if (!profile?.isAdmin) {
    return null; // Will redirect via useEffect
  }

  const totalUsers = allUsers?.length || 0;
  const proUsers = allUsers?.filter(u => u.isPro).length || 0;
  const totalCredits = allUsers?.reduce((acc, u) => acc + (u.credit_balance || 0), 0) || 0;

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center gap-3">
          <div className="bg-destructive/10 p-3 rounded-2xl shadow-sm">
            <ShieldAlert className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">لوحة تحكم المسؤول</h1>
            <p className="text-muted-foreground font-tajawal">مراقبة المستخدمين وإدارة المنصة.</p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-tajawal">إجمالي المستخدمين</p>
                <p className="text-xl font-bold font-rajdhani">{totalUsers}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-accent/10">
                <CreditCard className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-tajawal">إجمالي الاعتمادات الموزعة</p>
                <p className="text-xl font-bold font-rajdhani">{totalCredits.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-purple-100">
                <BookOpen className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-tajawal">مشتركي PRO</p>
                <p className="text-xl font-bold font-rajdhani">{proUsers}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="font-headline">إدارة المستخدمين</CardTitle>
            <CardDescription className="font-tajawal">قائمة بجميع الأساتذة المسجلين في المنصة.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-tajawal">المستخدم</TableHead>
                    <TableHead className="font-tajawal text-center">المؤسسة</TableHead>
                    <TableHead className="font-tajawal text-center">الرصيد</TableHead>
                    <TableHead className="font-tajawal text-center">الحالة</TableHead>
                    <TableHead className="font-tajawal text-center">تاريخ التسجيل</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allUsers?.map((u) => (
                    <TableRow key={u.uid}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{u.displayName}</span>
                          <span className="text-xs text-muted-foreground">{u.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-tajawal text-sm">{u.school}</TableCell>
                      <TableCell className="text-center font-rajdhani font-bold">{u.credit_balance}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={u.isPro ? "default" : "secondary"} className={u.isPro ? "bg-primary" : ""}>
                          {u.isPro ? "PRO" : "مجاني"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-xs text-muted-foreground">
                        {u.createdAt?.toDate().toLocaleDateString('ar-DZ')}
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!allUsers || allUsers.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-muted-foreground font-tajawal">
                        لا يوجد مستخدمين مسجلين بعد.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
