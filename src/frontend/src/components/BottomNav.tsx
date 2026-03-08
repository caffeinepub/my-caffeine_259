import { Link, useLocation } from "@tanstack/react-router";
import { CalendarDays, FileText, Home, Phone } from "lucide-react";

export function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isHome = currentPath === "/";
  const isAdmission = currentPath === "/admission";
  const isAdmin = currentPath === "/admin";

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-cream/98 backdrop-blur-md border-t border-saffron/20 shadow-[0_-4px_20px_oklch(var(--saffron)/0.12)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="मुख्य नेविगेशन"
    >
      <div className="flex items-stretch h-16">
        {/* Home */}
        <a
          href="/"
          data-ocid="bottom_nav.home_link"
          className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all min-h-[44px] active:scale-95 ${
            isHome
              ? "text-saffron-deep"
              : "text-muted-foreground hover:text-saffron-deep"
          }`}
          aria-label="मुख्य पृष्ठ"
          aria-current={isHome ? "page" : undefined}
        >
          <div
            className={`relative flex items-center justify-center ${isHome ? "after:absolute after:-top-3.5 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-0.5 after:bg-saffron-deep after:rounded-full" : ""}`}
          >
            <Home
              className={`w-5 h-5 transition-all ${isHome ? "fill-saffron/20" : ""}`}
            />
          </div>
          <span
            className={`font-hindi text-[10px] font-semibold leading-none transition-all ${isHome ? "text-saffron-deep" : "text-muted-foreground"}`}
          >
            मुख्य
          </span>
        </a>

        {/* Admission */}
        <Link
          to="/admission"
          data-ocid="bottom_nav.admission_link"
          className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all min-h-[44px] active:scale-95 ${
            isAdmission
              ? "text-saffron-deep"
              : "text-muted-foreground hover:text-saffron-deep"
          }`}
          aria-label="प्रवेश फॉर्म"
          aria-current={isAdmission ? "page" : undefined}
        >
          <div
            className={`relative flex items-center justify-center ${isAdmission ? "after:absolute after:-top-3.5 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-0.5 after:bg-saffron-deep after:rounded-full" : ""}`}
          >
            <FileText
              className={`w-5 h-5 transition-all ${isAdmission ? "fill-saffron/20" : ""}`}
            />
          </div>
          <span
            className={`font-hindi text-[10px] font-semibold leading-none transition-all ${isAdmission ? "text-saffron-deep" : "text-muted-foreground"}`}
          >
            प्रवेश
          </span>
        </Link>

        {/* Attendance / Admin */}
        <Link
          to="/admin"
          data-ocid="bottom_nav.attendance_link"
          className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all min-h-[44px] active:scale-95 ${
            isAdmin
              ? "text-saffron-deep"
              : "text-muted-foreground hover:text-saffron-deep"
          }`}
          aria-label="अटेंडेंस"
          aria-current={isAdmin ? "page" : undefined}
        >
          <div
            className={`relative flex items-center justify-center ${isAdmin ? "after:absolute after:-top-3.5 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-0.5 after:bg-saffron-deep after:rounded-full" : ""}`}
          >
            <CalendarDays
              className={`w-5 h-5 transition-all ${isAdmin ? "fill-saffron/20" : ""}`}
            />
          </div>
          <span
            className={`font-hindi text-[10px] font-semibold leading-none transition-all ${isAdmin ? "text-saffron-deep" : "text-muted-foreground"}`}
          >
            अटेंडेंस
          </span>
        </Link>

        {/* Contact */}
        <a
          href="tel:+919024783339"
          data-ocid="bottom_nav.contact_link"
          className="flex-1 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-saffron-deep transition-all min-h-[44px] active:scale-95"
          aria-label="संपर्क करें"
        >
          <div className="relative flex items-center justify-center">
            <Phone className="w-5 h-5 transition-all" />
          </div>
          <span className="font-hindi text-[10px] font-semibold leading-none transition-all">
            संपर्क
          </span>
        </a>
      </div>
    </nav>
  );
}
