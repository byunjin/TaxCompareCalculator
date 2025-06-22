// src/components/NavigationBar.tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";      // 방금 가져온 래퍼
import { Link, useLocation } from "wouter";
import { Calculator, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NavigationBar() {
  const [path] = useLocation();         // 현재 경로 확인

  /** 활성 링크면 primary 색상으로 강조 */
  const linkCx = (href: string) =>
    cn(
      navigationMenuTriggerStyle(),
      "gap-2",
      path === href && "text-primary data-[state=closed]:bg-accent/50"
    );

  return (
    <NavigationMenu className="w-full border-b bg-white shadow-sm">
      <NavigationMenuList className="px-4 sm:px-6 lg:px-8 h-14">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkCx("/")}>
            <Link href="/">
              <Calculator className="h-4 w-4" />
              세금 계산기
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkCx("/pdf")}>
            <Link href="/pdf">
              <FileText className="h-4 w-4" /> 
              문장 분리기
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      {/* 선택적: 지시자·뷰포트는 단순 링크라면 없어도 무방 */}
      <NavigationMenuIndicator />
      <NavigationMenuViewport />
    </NavigationMenu>
  );
}
