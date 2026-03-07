import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  BarChart2,
  CalendarDays,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  Lock,
  LogOut,
  Menu,
  Printer,
  RefreshCw,
  Save,
  Shield,
  User,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  AdmissionEntry,
  AttendanceRecord,
  backendInterface,
} from "../backend.d";
import { useActor } from "../hooks/useActor";

function OMSymbol({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block font-display select-none ${className}`}
      aria-hidden
    >
      ॐ
    </span>
  );
}

function AdminNavBar({
  onLogout,
  isLoggedIn,
}: { onLogout: () => void; isLoggedIn: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-[0_2px_20px_oklch(var(--saffron)/0.15)] border-b border-saffron/20"
          : "bg-foreground/90 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          data-ocid="nav.link"
          className="flex items-center gap-2 group"
          aria-label="मुख्य पृष्ठ"
        >
          <OMSymbol className="text-saffron text-2xl group-hover:scale-110 transition-transform" />
          <span className="font-hindi font-bold text-sm sm:text-base text-foreground leading-tight">
            <span
              className={`block ${scrolled ? "text-saffron-deep" : "text-white"} transition-colors`}
            >
              निःशुल्क योग
            </span>
            <span
              className={`block text-xs ${scrolled ? "text-forest" : "text-white/80"} transition-colors`}
            >
              हनुमानगढ़
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/"
            data-ocid="nav.link"
            className={`px-3 py-2 text-sm font-hindi font-medium transition-colors rounded-md hover:bg-saffron/10 ${
              scrolled
                ? "text-foreground hover:text-saffron-deep"
                : "text-white/90 hover:text-white"
            }`}
          >
            मुख्य पृष्ठ
          </Link>
          {isLoggedIn && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              data-ocid="admin.logout_button"
              className="font-hindi text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              लॉगआउट
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.toggle"
          className={`md:hidden p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron ${
            scrolled
              ? "text-foreground hover:bg-saffron/10"
              : "text-white hover:bg-white/10"
          }`}
          aria-label={mobileOpen ? "मेनू बंद करें" : "मेनू खोलें"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-cream/98 backdrop-blur-md border-t border-saffron/20"
          >
            <ul className="flex flex-col px-4 py-3 gap-1">
              <li>
                <Link
                  to="/"
                  data-ocid="nav.link"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 font-hindi text-base text-foreground hover:text-saffron-deep hover:bg-saffron/10 rounded-lg transition-colors"
                >
                  मुख्य पृष्ठ
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onLogout();
                      setMobileOpen(false);
                    }}
                    data-ocid="admin.logout_button"
                    className="w-full text-left px-4 py-3 font-hindi text-base text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    लॉगआउट
                  </button>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LoginForm({
  onLogin,
}: {
  onLogin: (username: string, password: string) => void;
  isLoading: boolean;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Username और Password दोनों आवश्यक हैं");
      return;
    }
    onLogin(username, password);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Lock icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-saffron-light/40 to-saffron/10 border border-saffron/30 flex items-center justify-center mx-auto mb-5">
            <Shield className="w-10 h-10 text-saffron-deep" />
          </div>
          <h1 className="font-hindi font-bold text-2xl sm:text-3xl text-foreground mb-2">
            Admin Panel
          </h1>
          <p className="font-hindi text-muted-foreground text-sm">
            प्रवेश रिकॉर्ड देखने के लिए लॉगिन करें
          </p>
        </div>

        <Card className="border-saffron/20 shadow-saffron-lg">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Username */}
              <div className="space-y-2">
                <Label
                  htmlFor="admin-username"
                  className="font-hindi text-sm font-semibold text-foreground"
                >
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="admin-username"
                    type="text"
                    data-ocid="admin.username_input"
                    placeholder="Username दर्ज करें"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    className="font-body pl-10 border-saffron/30 focus:border-saffron focus-visible:ring-saffron/30 h-11"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="admin-password"
                  className="font-hindi text-sm font-semibold text-foreground"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    data-ocid="admin.password_input"
                    placeholder="Password दर्ज करें"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="font-body pl-10 pr-10 border-saffron/30 focus:border-saffron focus-visible:ring-saffron/30 h-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                    aria-label={
                      showPassword ? "Password छुपाएं" : "Password दिखाएं"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    data-ocid="admin.error_state"
                    className="bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 flex items-start gap-3"
                  >
                    <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="font-hindi text-sm text-destructive">
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                data-ocid="admin.login_button"
                className="w-full bg-saffron hover:bg-saffron-deep text-white font-hindi font-bold py-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-saffron text-base"
              >
                <Lock className="w-4 h-4 mr-2" />
                लॉगिन करें
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function formatDate(submittedAt: bigint): string {
  try {
    // submittedAt is in nanoseconds from IC
    const ms = Number(submittedAt) / 1_000_000;
    const date = new Date(ms);
    if (Number.isNaN(date.getTime()) || date.getFullYear() < 2000) {
      return "—";
    }
    return date.toLocaleDateString("hi-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

function getTodayDate(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatDisplayDate(dateStr: string): string {
  try {
    const date = new Date(`${dateStr}T00:00:00`);
    return date.toLocaleDateString("hi-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ---- Attendance Sheet Component ----
function AttendanceSheet({
  admissions,
  credentials,
  actor,
}: {
  admissions: AdmissionEntry[];
  credentials: { username: string; password: string };
  actor: backendInterface | null;
}) {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDate());
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>(
    {},
  );
  const [attendanceDates, setAttendanceDates] = useState<string[]>([]);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // Load past attendance dates on mount
  useEffect(() => {
    if (!actor || !credentials.username) return;
    actor
      .getAttendanceDates(credentials.username, credentials.password)
      .then((dates) => {
        setAttendanceDates([...dates].sort((a, b) => b.localeCompare(a)));
      })
      .catch(() => {
        // silently ignore
      });
  }, [actor, credentials]);

  // Load attendance for selected date
  const loadAttendance = useCallback(
    async (date: string) => {
      if (!actor || !credentials.username) return;
      setIsLoadingAttendance(true);
      setSaveSuccess(false);
      setSaveError(false);
      try {
        const records: AttendanceRecord[] = await actor.getAttendance(
          date,
          credentials.username,
          credentials.password,
        );
        const map: Record<string, boolean> = {};
        // Initialize all members as absent
        for (const admission of admissions) {
          map[admission.yogaCode] = false;
        }
        // Fill saved records
        for (const record of records) {
          map[record.yogaCode] = record.present;
        }
        setAttendanceMap(map);
      } catch {
        // If no attendance exists for this date, default all to absent
        const map: Record<string, boolean> = {};
        for (const admission of admissions) {
          map[admission.yogaCode] = false;
        }
        setAttendanceMap(map);
      } finally {
        setIsLoadingAttendance(false);
      }
    },
    [actor, credentials, admissions],
  );

  // Load attendance whenever date changes
  useEffect(() => {
    loadAttendance(selectedDate);
  }, [selectedDate, loadAttendance]);

  function handleToggle(yogaCode: string) {
    setAttendanceMap((prev) => ({
      ...prev,
      [yogaCode]: !prev[yogaCode],
    }));
  }

  async function handleSave() {
    if (!actor || !credentials.username) return;
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(false);
    try {
      const records: Array<[string, boolean]> = Object.entries(attendanceMap);
      await actor.saveAttendance(
        selectedDate,
        records,
        credentials.username,
        credentials.password,
      );
      setSaveSuccess(true);
      // Refresh attendance dates list
      const dates = await actor.getAttendanceDates(
        credentials.username,
        credentials.password,
      );
      setAttendanceDates([...dates].sort((a, b) => b.localeCompare(a)));
      // Auto-hide success message after 3s
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setSaveError(true);
      setTimeout(() => setSaveError(false), 4000);
    } finally {
      setIsSaving(false);
    }
  }

  const presentCount = Object.values(attendanceMap).filter(Boolean).length;
  const totalCount = admissions.length;

  return (
    <div className="space-y-6">
      {/* Date Controls */}
      <Card className="border-saffron/20 shadow-card-warm">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            {/* Date picker */}
            <div className="flex-1 space-y-2">
              <Label
                htmlFor="attendance-date"
                className="font-hindi text-sm font-semibold text-foreground flex items-center gap-2"
              >
                <CalendarDays className="w-4 h-4 text-saffron-deep" />
                दिनांक चुनें
              </Label>
              <Input
                id="attendance-date"
                type="date"
                data-ocid="admin.attendance.date_input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="font-body border-saffron/30 focus:border-saffron focus-visible:ring-saffron/30 h-11 max-w-xs"
              />
            </div>

            {/* Past dates dropdown */}
            {attendanceDates.length > 0 && (
              <div className="flex-1 space-y-2">
                <Label className="font-hindi text-sm font-semibold text-foreground">
                  पिछली तारीखें
                </Label>
                <Select
                  value={selectedDate}
                  onValueChange={(val) => setSelectedDate(val)}
                >
                  <SelectTrigger
                    data-ocid="admin.attendance.dates_select"
                    className="font-hindi border-saffron/30 focus:ring-saffron/30 h-11 max-w-xs"
                  >
                    <SelectValue placeholder="तारीख चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    {attendanceDates.map((date) => (
                      <SelectItem
                        key={date}
                        value={date}
                        className="font-hindi"
                      >
                        {formatDisplayDate(date)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status messages */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            data-ocid="admin.attendance.success_state"
            className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="font-hindi font-semibold text-green-700 text-sm">
              अटेंडेंस सहेजी गई! ({formatDisplayDate(selectedDate)})
            </p>
          </motion.div>
        )}
        {saveError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            data-ocid="admin.attendance.error_state"
            className="bg-destructive/10 border border-destructive/30 rounded-xl px-5 py-4 flex items-center gap-3"
          >
            <X className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="font-hindi font-semibold text-destructive text-sm">
              सहेजने में त्रुटि हुई। कृपया दोबारा प्रयास करें।
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attendance list */}
      {isLoadingAttendance ? (
        <div
          data-ocid="admin.attendance.loading_state"
          className="flex flex-col items-center justify-center py-16 gap-4"
        >
          <Loader2 className="w-10 h-10 text-saffron animate-spin" />
          <p className="font-hindi text-muted-foreground">लोड हो रहा है...</p>
        </div>
      ) : admissions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          data-ocid="admin.attendance.empty_state"
          className="text-center py-16"
        >
          <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto mb-5">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="font-hindi font-semibold text-foreground text-lg mb-2">
            अभी कोई सदस्य नहीं
          </p>
          <p className="font-hindi text-muted-foreground text-sm">
            जब कोई प्रवेश फॉर्म भरेगा, यहाँ अटेंडेंस दिखेगी
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-saffron/20 shadow-card-warm overflow-hidden">
            {/* Header bar */}
            <div className="bg-saffron-light/30 border-b border-saffron/20 px-5 py-3 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-saffron-deep" />
                <p className="font-hindi font-semibold text-foreground text-sm">
                  {formatDisplayDate(selectedDate)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700 border-green-200 font-hindi text-xs">
                  उपस्थित: {presentCount}
                </Badge>
                <Badge className="bg-red-50 text-red-600 border-red-200 font-hindi text-xs">
                  अनुपस्थित: {totalCount - presentCount}
                </Badge>
                <Badge className="bg-saffron/20 text-saffron-deep border-saffron/30 font-hindi text-xs">
                  कुल: {totalCount}
                </Badge>
              </div>
            </div>

            {/* Member list */}
            <div className="divide-y divide-border/50">
              {admissions.map((entry, i) => {
                const isPresent = attendanceMap[entry.yogaCode] ?? false;
                return (
                  <motion.div
                    key={entry.yogaCode}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className={`flex items-center gap-4 px-5 py-4 transition-colors ${
                      isPresent
                        ? "bg-green-50/60 hover:bg-green-50"
                        : "bg-white hover:bg-saffron/5"
                    }`}
                  >
                    {/* Index */}
                    <span className="text-xs font-body text-muted-foreground w-6 text-right flex-shrink-0">
                      {i + 1}.
                    </span>

                    {/* Checkbox */}
                    <Checkbox
                      id={`attendance-${entry.yogaCode}`}
                      data-ocid={`admin.attendance.checkbox.${i + 1}`}
                      checked={isPresent}
                      onCheckedChange={() => handleToggle(entry.yogaCode)}
                      className="border-saffron/40 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 flex-shrink-0 w-5 h-5"
                    />

                    {/* YOGA code badge */}
                    <Badge className="bg-saffron/15 text-saffron-deep border-saffron/25 font-body font-bold text-xs tracking-wide whitespace-nowrap flex-shrink-0">
                      {entry.yogaCode}
                    </Badge>

                    {/* Name */}
                    <label
                      htmlFor={`attendance-${entry.yogaCode}`}
                      className="font-hindi text-sm font-semibold text-foreground cursor-pointer flex-1 truncate"
                    >
                      {entry.name}
                    </label>

                    {/* Status badge */}
                    <span
                      className={`text-xs font-hindi font-semibold whitespace-nowrap flex-shrink-0 ${
                        isPresent ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {isPresent ? "✓ उपस्थित" : "✗ अनुपस्थित"}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Save button footer */}
            <div className="border-t border-saffron/20 bg-muted/20 px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
              <p className="font-hindi text-sm text-muted-foreground">
                {presentCount} / {totalCount} सदस्य उपस्थित
              </p>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                data-ocid="admin.attendance.save_button"
                className="bg-saffron hover:bg-saffron-deep text-white font-hindi font-bold shadow-saffron transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    सहेजा जा रहा है...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    सहेजें
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

// ---- Monthly Summary Component ----
interface MemberSummary {
  yogaCode: string;
  name: string;
  presentDays: number;
  absentDays: number;
  totalDays: number;
  attendancePct: number;
}

const MONTH_NAMES = [
  "जनवरी",
  "फरवरी",
  "मार्च",
  "अप्रैल",
  "मई",
  "जून",
  "जुलाई",
  "अगस्त",
  "सितंबर",
  "अक्टूबर",
  "नवंबर",
  "दिसंबर",
];

function MonthlySummary({
  admissions,
  credentials,
  actor,
}: {
  admissions: AdmissionEntry[];
  credentials: { username: string; password: string };
  actor: backendInterface | null;
}) {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1); // 1–12
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [summaryData, setSummaryData] = useState<MemberSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const currentYear = now.getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 2024 },
    (_, i) => 2025 + i,
  );
  // Ensure currentYear is always included
  if (!yearOptions.includes(currentYear)) yearOptions.push(currentYear);

  const fetchSummary = useCallback(async () => {
    if (!actor || !credentials.username) return;
    setIsLoading(true);
    setError(false);
    try {
      // Fetch all dates and admissions in parallel
      const [allDates, allAdmissions] = await Promise.all([
        actor.getAttendanceDates(credentials.username, credentials.password),
        actor.getAllAdmissions(credentials.username, credentials.password),
      ]);

      // Filter dates matching selected month/year (YYYY-MM format prefix)
      const prefix = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;
      const matchingDates = allDates.filter((d) => d.startsWith(prefix));

      // Fetch attendance for all matching dates in parallel
      const attendanceResults = await Promise.all(
        matchingDates.map((date) =>
          actor.getAttendance(date, credentials.username, credentials.password),
        ),
      );

      // Build a map: yogaCode → { present: number, absent: number }
      const statsMap: Record<string, { present: number; absent: number }> = {};
      for (const admission of allAdmissions.length > 0
        ? allAdmissions
        : admissions) {
        statsMap[admission.yogaCode] = { present: 0, absent: 0 };
      }

      for (const dayRecords of attendanceResults) {
        for (const record of dayRecords) {
          if (!statsMap[record.yogaCode]) {
            statsMap[record.yogaCode] = { present: 0, absent: 0 };
          }
          if (record.present) {
            statsMap[record.yogaCode].present += 1;
          } else {
            statsMap[record.yogaCode].absent += 1;
          }
        }
      }

      const totalDays = matchingDates.length;

      // Build summary using current admissions list for names
      const memberList = allAdmissions.length > 0 ? allAdmissions : admissions;
      const summary: MemberSummary[] = memberList.map((entry) => {
        const stats = statsMap[entry.yogaCode] ?? { present: 0, absent: 0 };
        const memberTotalDays = stats.present + stats.absent;
        const effectiveTotalDays =
          memberTotalDays > 0 ? memberTotalDays : totalDays;
        const pct =
          effectiveTotalDays > 0
            ? Math.round((stats.present / effectiveTotalDays) * 100)
            : 0;
        return {
          yogaCode: entry.yogaCode,
          name: entry.name,
          presentDays: stats.present,
          absentDays: totalDays > 0 ? totalDays - stats.present : stats.absent,
          totalDays,
          attendancePct: pct,
        };
      });

      setSummaryData(summary);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [actor, credentials, selectedMonth, selectedYear, admissions]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  function handleDownloadCSV() {
    const headers = [
      "क्र.सं.",
      "YOGA कोड",
      "नाम",
      "उपस्थित दिन",
      "अनुपस्थित दिन",
      "कुल दिन",
      "उपस्थिति %",
    ];
    const rows = summaryData.map((m, i) => [
      String(i + 1),
      m.yogaCode,
      m.name,
      String(m.presentDays),
      String(m.absentDays),
      String(m.totalDays),
      `${m.attendancePct}%`,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `yoga-attendance-${MONTH_NAMES[selectedMonth - 1]}-${selectedYear}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handlePrint() {
    window.print();
  }

  function getAttendanceBadge(pct: number, totalDays: number) {
    if (totalDays === 0) {
      return (
        <Badge className="bg-gray-100 text-gray-500 border-gray-200 font-hindi text-xs">
          डेटा नहीं
        </Badge>
      );
    }
    if (pct >= 75) {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200 font-hindi text-xs font-bold">
          {pct}%
        </Badge>
      );
    }
    if (pct >= 50) {
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 font-hindi text-xs font-bold">
          {pct}%
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-50 text-red-600 border-red-200 font-hindi text-xs font-bold">
        {pct}%
      </Badge>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls Card */}
      <Card className="border-saffron/20 shadow-card-warm print:hidden">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end flex-wrap">
            {/* Month selector */}
            <div className="flex-1 min-w-[160px] space-y-2">
              <Label
                htmlFor="summary-month-select"
                className="font-hindi text-sm font-semibold text-foreground"
              >
                महीना चुनें
              </Label>
              <Select
                value={String(selectedMonth)}
                onValueChange={(val) => setSelectedMonth(Number(val))}
              >
                <SelectTrigger
                  id="summary-month-select"
                  data-ocid="admin.summary.month_select"
                  className="font-hindi border-saffron/30 focus:ring-saffron/30 h-11"
                >
                  <SelectValue placeholder="महीना" />
                </SelectTrigger>
                <SelectContent>
                  {MONTH_NAMES.map((name) => (
                    <SelectItem
                      key={name}
                      value={String(MONTH_NAMES.indexOf(name) + 1)}
                      className="font-hindi"
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year selector */}
            <div className="flex-1 min-w-[120px] space-y-2">
              <Label
                htmlFor="summary-year-select"
                className="font-hindi text-sm font-semibold text-foreground"
              >
                वर्ष चुनें
              </Label>
              <Select
                value={String(selectedYear)}
                onValueChange={(val) => setSelectedYear(Number(val))}
              >
                <SelectTrigger
                  id="summary-year-select"
                  data-ocid="admin.summary.year_select"
                  className="font-hindi border-saffron/30 focus:ring-saffron/30 h-11"
                >
                  <SelectValue placeholder="वर्ष" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((y) => (
                    <SelectItem key={y} value={String(y)} className="font-body">
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-6 sm:pt-0">
              <Button
                variant="outline"
                onClick={handleDownloadCSV}
                disabled={isLoading || summaryData.length === 0}
                data-ocid="admin.summary.download_button"
                className="font-hindi border-saffron/30 text-saffron-deep hover:bg-saffron/10 hover:border-saffron/50 gap-1.5 h-11"
              >
                <Download className="w-4 h-4" />
                CSV डाउनलोड
              </Button>
              <Button
                variant="outline"
                onClick={handlePrint}
                disabled={isLoading || summaryData.length === 0}
                data-ocid="admin.summary.print_button"
                className="font-hindi border-saffron/30 text-saffron-deep hover:bg-saffron/10 hover:border-saffron/50 gap-1.5 h-11"
              >
                <Printer className="w-4 h-4" />
                PDF प्रिंट
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Print header — only shows when printing */}
      <div className="hidden print:block mb-6 text-center">
        <h2 className="font-hindi font-bold text-xl text-foreground">
          निःशुल्क योग कक्षा — मासिक अटेंडेंस सारांश
        </h2>
        <p className="font-hindi text-muted-foreground text-sm mt-1">
          {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
        </p>
      </div>

      {/* Error state */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            data-ocid="admin.summary.error_state"
            className="bg-destructive/10 border border-destructive/30 rounded-xl px-5 py-4 flex items-center gap-3"
          >
            <X className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="font-hindi font-semibold text-destructive text-sm">
              डेटा लोड करने में समस्या हुई। कृपया दोबारा प्रयास करें।
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading state */}
      {isLoading ? (
        <div
          data-ocid="admin.summary.loading_state"
          className="flex flex-col items-center justify-center py-20 gap-4"
        >
          <Loader2 className="w-10 h-10 text-saffron animate-spin" />
          <p className="font-hindi text-muted-foreground">
            सारांश तैयार हो रहा है...
          </p>
        </div>
      ) : admissions.length === 0 ? (
        /* Empty state — no members */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          data-ocid="admin.summary.empty_state"
          className="text-center py-20"
        >
          <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto mb-5">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="font-hindi font-semibold text-foreground text-lg mb-2">
            अभी कोई सदस्य नहीं
          </p>
          <p className="font-hindi text-muted-foreground text-sm">
            जब कोई प्रवेश फॉर्म भरेगा, यहाँ सारांश दिखेगा
          </p>
        </motion.div>
      ) : (
        /* Summary table */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-saffron/20 shadow-card-warm overflow-hidden">
            {/* Header bar */}
            <div className="bg-saffron-light/30 border-b border-saffron/20 px-5 py-3 flex items-center justify-between flex-wrap gap-2 print:bg-gray-100">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-saffron-deep" />
                <p className="font-hindi font-semibold text-foreground text-sm">
                  {MONTH_NAMES[selectedMonth - 1]} {selectedYear} — मासिक सारांश
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-saffron/20 text-saffron-deep border-saffron/30 font-hindi text-xs">
                  {summaryData[0]?.totalDays ?? 0} अटेंडेंस दिन
                </Badge>
                <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-hindi text-xs">
                  {summaryData.length} सदस्य
                </Badge>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table data-ocid="admin.summary.table">
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3 w-12">
                      क्र.सं.
                    </TableHead>
                    <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3">
                      YOGA कोड
                    </TableHead>
                    <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3">
                      नाम
                    </TableHead>
                    <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3 text-center">
                      उपस्थित दिन
                    </TableHead>
                    <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3 text-center">
                      अनुपस्थित दिन
                    </TableHead>
                    <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3 text-center">
                      कुल दिन
                    </TableHead>
                    <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3 text-center">
                      उपस्थिति %
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaryData.map((member, i) => (
                    <TableRow
                      key={member.yogaCode}
                      data-ocid={`admin.summary.row.${i + 1}`}
                      className="hover:bg-saffron/5 border-b border-border/50"
                    >
                      <TableCell className="font-body text-xs text-muted-foreground px-4 py-3 text-right">
                        {i + 1}.
                      </TableCell>
                      <TableCell className="px-4 py-3 whitespace-nowrap">
                        <Badge className="bg-saffron/15 text-saffron-deep border-saffron/25 font-body font-bold text-xs tracking-wide">
                          {member.yogaCode}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-hindi text-sm font-semibold text-foreground px-4 py-3 whitespace-nowrap">
                        {member.name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center min-w-[2rem] font-body text-sm font-bold text-green-700">
                          {member.presentDays}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center min-w-[2rem] font-body text-sm font-bold text-red-500">
                          {member.absentDays}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-center">
                        <span className="font-body text-sm text-muted-foreground font-semibold">
                          {member.totalDays}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-center">
                        {getAttendanceBadge(
                          member.attendancePct,
                          member.totalDays,
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Legend */}
            <div className="border-t border-saffron/20 bg-muted/10 px-5 py-3 flex items-center gap-4 flex-wrap print:hidden">
              <span className="font-hindi text-xs text-muted-foreground">
                उपस्थिति %:
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                <span className="font-hindi text-xs text-muted-foreground">
                  ≥75% उत्तम
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                <span className="font-hindi text-xs text-muted-foreground">
                  50–74% ठीक
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span className="font-hindi text-xs text-muted-foreground">
                  &lt;50% कम
                </span>
              </span>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

// ---- Admin Dashboard with Tabs ----
function AdminDashboard({
  admissions,
  isLoading,
  onRefresh,
  onLogout,
  loginError,
  credentials,
  actor,
}: {
  admissions: AdmissionEntry[];
  isLoading: boolean;
  onRefresh: () => void;
  onLogout: () => void;
  loginError: boolean;
  credentials: { username: string; password: string };
  actor: backendInterface | null;
}) {
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      {/* Stats header */}
      <div className="bg-gradient-to-br from-saffron-deep to-[oklch(0.45_0.15_45)] py-10 px-4 sm:px-6 relative overflow-hidden">
        <div
          className="absolute -right-8 top-1/2 -translate-y-1/2 text-white/[0.04] font-display select-none pointer-events-none"
          style={{ fontSize: "12rem", lineHeight: 1 }}
          aria-hidden
        >
          ॐ
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-hindi font-bold text-2xl sm:text-3xl text-white mb-1">
                Admin Panel
              </h1>
              <p className="font-hindi text-white/70 text-sm">
                प्रवेश रिकॉर्ड एवं अटेंडेंस
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3 text-center border border-white/20">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gold" />
                  <div>
                    <p className="font-display font-bold text-2xl text-white leading-none">
                      {isLoading ? "—" : admissions.length}
                    </p>
                    <p className="font-hindi text-white/60 text-xs">कुल प्रवेश</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={onRefresh}
                disabled={isLoading}
                className="bg-white/15 hover:bg-white/25 text-white border border-white/20 font-hindi"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-1.5 ${isLoading ? "animate-spin" : ""}`}
                />
                रिफ्रेश
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        {/* Login error */}
        <AnimatePresence>
          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              data-ocid="admin.error_state"
              className="mb-6 bg-destructive/10 border border-destructive/30 rounded-xl px-5 py-4 flex items-start gap-3"
            >
              <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-hindi font-semibold text-destructive text-sm">
                  गलत username या password
                </p>
                <p className="font-hindi text-destructive/70 text-xs mt-0.5">
                  कृपया सही credentials के साथ दोबारा प्रयास करें।
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <Tabs defaultValue="admissions">
          <TabsList className="mb-6 bg-saffron-light/30 border border-saffron/20 p-1 rounded-xl h-auto flex flex-wrap gap-1">
            <TabsTrigger
              value="admissions"
              data-ocid="admin.admissions_tab"
              className="font-hindi font-semibold text-sm data-[state=active]:bg-saffron data-[state=active]:text-white data-[state=active]:shadow-saffron rounded-lg h-10 px-4 sm:px-6 transition-all"
            >
              <Shield className="w-4 h-4 mr-1.5 sm:mr-2" />
              प्रवेश रिकॉर्ड
            </TabsTrigger>
            <TabsTrigger
              value="attendance"
              data-ocid="admin.attendance_tab"
              className="font-hindi font-semibold text-sm data-[state=active]:bg-saffron data-[state=active]:text-white data-[state=active]:shadow-saffron rounded-lg h-10 px-4 sm:px-6 transition-all"
            >
              <CalendarDays className="w-4 h-4 mr-1.5 sm:mr-2" />
              अटेंडेंस शीट
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              data-ocid="admin.summary_tab"
              className="font-hindi font-semibold text-sm data-[state=active]:bg-saffron data-[state=active]:text-white data-[state=active]:shadow-saffron rounded-lg h-10 px-4 sm:px-6 transition-all"
            >
              <BarChart2 className="w-4 h-4 mr-1.5 sm:mr-2" />
              मासिक सारांश
            </TabsTrigger>
          </TabsList>

          {/* Admissions Tab */}
          <TabsContent value="admissions">
            {/* Loading state */}
            {isLoading && (
              <div
                data-ocid="admin.loading_state"
                className="flex flex-col items-center justify-center py-20 gap-4"
              >
                <Loader2 className="w-10 h-10 text-saffron animate-spin" />
                <p className="font-hindi text-muted-foreground">
                  डेटा लोड हो रहा है...
                </p>
              </div>
            )}

            {/* No data state */}
            {!isLoading && !loginError && admissions.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="admin.empty_state"
                className="text-center py-20"
              >
                <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto mb-5">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="font-hindi font-semibold text-foreground text-lg mb-2">
                  अभी कोई प्रवेश नहीं
                </p>
                <p className="font-hindi text-muted-foreground text-sm">
                  जब कोई फॉर्म जमा करेगा, यहाँ दिखेगा
                </p>
              </motion.div>
            )}

            {/* Table */}
            {!isLoading && admissions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-saffron/20 shadow-card-warm overflow-hidden">
                  {/* Table header bar */}
                  <div className="bg-saffron-light/30 border-b border-saffron/20 px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-saffron-deep" />
                      <p className="font-hindi font-semibold text-foreground text-sm">
                        प्रवेश रिकॉर्ड
                      </p>
                    </div>
                    <Badge className="bg-saffron/20 text-saffron-deep border-saffron/30 font-hindi text-xs">
                      {admissions.length} रिकॉर्ड
                    </Badge>
                  </div>

                  {/* Scrollable table */}
                  <div className="overflow-x-auto">
                    <Table data-ocid="admin.table">
                      <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3">
                            YOGA कोड
                          </TableHead>
                          <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3">
                            नाम
                          </TableHead>
                          <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3">
                            संपर्क
                          </TableHead>
                          <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3">
                            जन्म तिथि
                          </TableHead>
                          <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3">
                            Email
                          </TableHead>
                          <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3">
                            पता
                          </TableHead>
                          <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3">
                            ID Proof
                          </TableHead>
                          <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3">
                            ID फोटो
                          </TableHead>
                          <TableHead className="font-hindi font-bold text-foreground text-xs whitespace-nowrap px-4 py-3">
                            दिनांक
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {admissions.map((entry, i) => (
                          <TableRow
                            key={entry.yogaCode}
                            data-ocid={`admin.row.${i + 1}`}
                            className="hover:bg-saffron/5 border-b border-border/50"
                          >
                            <TableCell className="px-4 py-3">
                              <Badge className="bg-saffron/15 text-saffron-deep border-saffron/25 font-body font-bold text-xs tracking-wide whitespace-nowrap">
                                {entry.yogaCode}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-hindi text-sm font-semibold text-foreground px-4 py-3 whitespace-nowrap">
                              {entry.name}
                            </TableCell>
                            <TableCell className="font-body text-sm text-foreground px-4 py-3 whitespace-nowrap">
                              {entry.contact}
                            </TableCell>
                            <TableCell className="font-hindi text-sm text-foreground px-4 py-3 whitespace-nowrap">
                              {entry.dateOfBirth || "—"}
                            </TableCell>
                            <TableCell className="font-body text-sm text-foreground px-4 py-3 max-w-[180px] truncate">
                              {entry.email}
                            </TableCell>
                            <TableCell className="font-hindi text-sm text-muted-foreground px-4 py-3 max-w-[200px]">
                              <span className="line-clamp-2">
                                {entry.address}
                              </span>
                            </TableCell>
                            <TableCell className="font-body text-sm text-muted-foreground px-4 py-3 whitespace-nowrap">
                              {entry.idProof}
                            </TableCell>
                            <TableCell className="px-4 py-3 whitespace-nowrap">
                              {entry.idProofFileUrl ? (
                                <a
                                  href={entry.idProofFileUrl.getDirectURL()}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-hindi font-semibold text-saffron-deep hover:text-saffron bg-saffron/10 hover:bg-saffron/20 px-3 py-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  देखें
                                </a>
                              ) : (
                                <span className="text-xs text-muted-foreground/50 font-hindi">
                                  —
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="font-hindi text-sm text-muted-foreground px-4 py-3 whitespace-nowrap">
                              {formatDate(entry.submittedAt)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance">
            <AttendanceSheet
              admissions={admissions}
              credentials={credentials}
              actor={actor}
            />
          </TabsContent>

          {/* Monthly Summary Tab */}
          <TabsContent value="summary">
            <MonthlySummary
              admissions={admissions}
              credentials={credentials}
              actor={actor}
            />
          </TabsContent>
        </Tabs>

        {/* Logout button bottom */}
        {!isLoading && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              onClick={onLogout}
              data-ocid="admin.logout_button"
              className="font-hindi border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              लॉगआउट करें
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [admissions, setAdmissions] = useState<AdmissionEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const { actor } = useActor();
  const fetchedRef = useRef(false);

  async function handleLogin(username: string, password: string) {
    setIsLoading(true);
    setLoginError(false);
    fetchedRef.current = false;
    try {
      if (!actor) {
        // Store credentials to use once actor is available
        setCredentials({ username, password });
        setLoggedIn(true);
        return;
      }
      const data = await actor.getAllAdmissions(username, password);
      setAdmissions(data);
      setCredentials({ username, password });
      setLoggedIn(true);
      fetchedRef.current = true;
    } catch {
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch when actor becomes available after login
  useEffect(() => {
    if (!loggedIn || !actor || fetchedRef.current || !credentials.username)
      return;
    fetchedRef.current = true;
    setIsLoading(true);
    actor
      .getAllAdmissions(credentials.username, credentials.password)
      .then((data) => {
        setAdmissions(data);
        setLoginError(false);
      })
      .catch(() => {
        setLoginError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [actor, loggedIn, credentials]);

  function handleRefresh() {
    if (!actor || !credentials.username) return;
    fetchedRef.current = true;
    setIsLoading(true);
    actor
      .getAllAdmissions(credentials.username, credentials.password)
      .then((data) => {
        setAdmissions(data);
        setLoginError(false);
      })
      .catch(() => {
        setLoginError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogout() {
    setLoggedIn(false);
    setCredentials({ username: "", password: "" });
    setAdmissions([]);
    setLoginError(false);
    fetchedRef.current = false;
  }

  return (
    <>
      <AdminNavBar onLogout={handleLogout} isLoggedIn={loggedIn} />

      {!loggedIn ? (
        <LoginForm onLogin={handleLogin} isLoading={isLoading} />
      ) : (
        <AdminDashboard
          admissions={admissions}
          isLoading={isLoading}
          onRefresh={handleRefresh}
          onLogout={handleLogout}
          loginError={loginError}
          credentials={credentials}
          actor={actor}
        />
      )}

      {/* Footer */}
      <footer className="bg-foreground text-background/70 py-8 px-4 sm:px-6 text-center">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-hindi text-xs text-background/40">
            © {new Date().getFullYear()} Free Yoga Class Hanumangarh
          </p>
          <p className="font-body text-xs text-background/40">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-saffron transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
