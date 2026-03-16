import {
  AlertTriangle,
  ArrowLeftRight,
  Calculator,
  CreditCard,
  LayoutDashboard,
  MoreHorizontal,
  Settings,
  Tag,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import type { Page } from "../App";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

const primaryNav: { page: Page; label: string; icon: React.ReactNode }[] = [
  {
    page: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  { page: "accounts", label: "Accounts", icon: <Wallet className="w-5 h-5" /> },
  {
    page: "transactions",
    label: "Trans.",
    icon: <ArrowLeftRight className="w-5 h-5" />,
  },
  { page: "budget", label: "Budget", icon: <Calculator className="w-5 h-5" /> },
  {
    page: "settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

const moreNav: { page: Page; label: string; icon: React.ReactNode }[] = [
  {
    page: "categories",
    label: "Categories",
    icon: <Tag className="w-5 h-5" />,
  },
  {
    page: "debts",
    label: "Debts",
    icon: <AlertTriangle className="w-5 h-5" />,
  },
  { page: "goals", label: "Goals", icon: <Target className="w-5 h-5" /> },
  {
    page: "investments",
    label: "Investments",
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

interface LayoutProps {
  children: ReactNode;
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}

export default function Layout({
  children,
  currentPage,
  setCurrentPage,
}: LayoutProps) {
  const [moreOpen, setMoreOpen] = useState(false);

  const isMoreActive = moreNav.some((item) => item.page === currentPage);

  const handleNav = (page: Page) => {
    setCurrentPage(page);
    setMoreOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Top Header */}
      <header className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border flex-shrink-0">
        <div className="bg-primary rounded-lg p-1.5">
          <CreditCard className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-base text-foreground">FinanceFlow</span>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">{children}</main>

      {/* Bottom Navigation Bar */}
      <nav className="flex-shrink-0 bg-card border-t border-border shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
        <div className="flex items-stretch">
          {primaryNav.map((item) => (
            <button
              type="button"
              key={item.page}
              data-ocid={`nav.${item.page}.link`}
              onClick={() => handleNav(item.page)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 px-1 text-[10px] font-medium transition-colors min-h-[56px] ${
                currentPage === item.page
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className={`${currentPage === item.page ? "text-primary" : ""}`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
          {/* More button */}
          <button
            type="button"
            data-ocid="nav.more.button"
            onClick={() => setMoreOpen(true)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 px-1 text-[10px] font-medium transition-colors min-h-[56px] ${
              isMoreActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span>More</span>
          </button>
        </div>
      </nav>

      {/* More Sheet */}
      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent
          side="bottom"
          data-ocid="nav.more.sheet"
          className="pb-safe"
        >
          <SheetHeader className="mb-4">
            <SheetTitle className="text-sm text-muted-foreground">
              More sections
            </SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-4 gap-3 pb-4">
            {moreNav.map((item) => (
              <button
                type="button"
                key={item.page}
                data-ocid={`nav.${item.page}.link`}
                onClick={() => handleNav(item.page)}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl text-xs font-medium transition-colors ${
                  currentPage === item.page
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-foreground hover:bg-primary/10"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
