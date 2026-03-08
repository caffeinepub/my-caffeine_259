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
  Lock,
  LogOut,
  Printer,
  Save,
  Shield,
  User,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { BottomNav } from "../components/BottomNav";
import type { LocalAdmissionEntry } from "./AdmissionPage";

// ---- localStorage helpers ----
function getAdmissions(): LocalAdmissionEntry[] {
  try {
    const raw = localStorage.getItem("yoga_admissions");
    if (!raw) return [];
    return JSON.parse(raw) as LocalAdmissionEntry[];
  } catch {
    return [];
  }
}

// attendance: { "2026-03-08": { "YOGA001": true, "YOGA002": false } }
type AttendanceData = Record<string, Record<string, boolean>>;

function getAttendance(): AttendanceData {
  try {
    const raw = localStorage.getItem("yoga_attendance");
    if (!raw) return {};
    return JSON.parse(raw) as AttendanceData;
  } catch {
    return {};
  }
}

function saveAttendance(data: AttendanceData): void {
  localStorage.setItem("yoga_attendance", JSON.stringify(data));
}

// ---- Admin credentials ----
const ADMIN_USERNAME = "Tushar 5522";
const ADMIN_PASSWORD = "Yoga@32752";

// ---- Utility ----
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

function formatSubmissionTime(isoStr: string): string {
  try {
    const date = new Date(isoStr);
    return date.toLocaleDateString("hi-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
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

// ---- Login Form ----
function LoginForm({
  onLogin,
  loginError,
}: {
  onLogin: (username: string, password: string) => void;
  loginError: boolean;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError("");
    if (!username.trim() || !password.trim()) {
      setLocalError("Username और Password दोनों आवश्यक हैं");
      return;
    }
    onLogin(username, password);
  }

  const errorMsg =
    localError ||
    (loginError ? "गलत username या password। कृपया दोबारा प्रयास करें।" : "");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-8 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
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

              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    data-ocid="admin.error_state"
                    className="bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 flex items-start gap-3"
                  >
                    <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="font-hindi text-sm text-destructive">
                      {errorMsg}
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

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="font-hindi text-sm text-saffron-deep hover:text-saffron transition-colors"
          >
            ← मुख्य पृष्ठ पर जाएं
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// ---- Attendance Sheet ----
function AttendanceSheet({
  admissions,
}: { admissions: LocalAdmissionEntry[] }) {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDate());
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>(
    {},
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadAttendance = useCallback(
    (date: string) => {
      const allAttendance = getAttendance();
      const dayData = allAttendance[date] ?? {};
      const map: Record<string, boolean> = {};
      for (const entry of admissions) {
        map[entry.confirmationCode] = dayData[entry.confirmationCode] ?? false;
      }
      setAttendanceMap(map);
    },
    [admissions],
  );

  useEffect(() => {
    loadAttendance(selectedDate);
  }, [selectedDate, loadAttendance]);

  function handleToggle(code: string) {
    setAttendanceMap((prev) => ({ ...prev, [code]: !prev[code] }));
  }

  function handleSave() {
    const allAttendance = getAttendance();
    allAttendance[selectedDate] = { ...attendanceMap };
    saveAttendance(allAttendance);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  }

  const presentCount = Object.values(attendanceMap).filter(Boolean).length;
  const totalCount = admissions.length;

  // Get past dates that have saved attendance
  const allAttendance = getAttendance();
  const savedDates = Object.keys(allAttendance).sort((a, b) =>
    b.localeCompare(a),
  );

  return (
    <div className="space-y-6">
      {/* Date Controls */}
      <Card className="border-saffron/20 shadow-card-warm">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
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
                data-ocid="attendance.date_input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="font-body border-saffron/30 focus:border-saffron focus-visible:ring-saffron/30 h-11 max-w-xs"
              />
            </div>

            {savedDates.length > 0 && (
              <div className="flex-1 space-y-2">
                <Label className="font-hindi text-sm font-semibold text-foreground">
                  पिछली तारीखें
                </Label>
                <Select
                  value={selectedDate}
                  onValueChange={(val) => setSelectedDate(val)}
                >
                  <SelectTrigger
                    data-ocid="attendance.dates_select"
                    className="font-hindi border-saffron/30 focus:ring-saffron/30 h-11 max-w-xs"
                  >
                    <SelectValue placeholder="तारीख चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    {savedDates.map((date) => (
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

      {/* Success message */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            data-ocid="attendance.success_state"
            className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="font-hindi font-semibold text-green-700 text-sm">
              अटेंडेंस सहेजी गई! ({formatDisplayDate(selectedDate)})
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Member list */}
      {admissions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          data-ocid="attendance.empty_state"
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

            <div className="divide-y divide-border/50">
              {admissions.map((entry, i) => {
                const isPresent =
                  attendanceMap[entry.confirmationCode] ?? false;
                return (
                  <motion.div
                    key={entry.confirmationCode}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className={`flex items-center gap-4 px-5 py-4 transition-colors ${
                      isPresent
                        ? "bg-green-50/60 hover:bg-green-50"
                        : "bg-white hover:bg-saffron/5"
                    }`}
                  >
                    <span className="text-xs font-body text-muted-foreground w-6 text-right flex-shrink-0">
                      {i + 1}.
                    </span>

                    <Checkbox
                      id={`attendance-${entry.confirmationCode}`}
                      data-ocid={`attendance.member.checkbox.${i + 1}`}
                      checked={isPresent}
                      onCheckedChange={() =>
                        handleToggle(entry.confirmationCode)
                      }
                      className="border-saffron/40 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 flex-shrink-0 w-5 h-5"
                    />

                    <Badge className="bg-saffron/15 text-saffron-deep border-saffron/25 font-body font-bold text-xs tracking-wide whitespace-nowrap flex-shrink-0">
                      {entry.confirmationCode}
                    </Badge>

                    <label
                      htmlFor={`attendance-${entry.confirmationCode}`}
                      className="font-hindi text-sm font-semibold text-foreground cursor-pointer flex-1 truncate"
                    >
                      {entry.name}
                    </label>

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

            <div className="border-t border-saffron/20 bg-muted/20 px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
              <p className="font-hindi text-sm text-muted-foreground">
                {presentCount} / {totalCount} सदस्य उपस्थित
              </p>
              <Button
                onClick={handleSave}
                data-ocid="attendance.save_button"
                className="bg-saffron hover:bg-saffron-deep text-white font-hindi font-bold shadow-saffron transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Save className="w-4 h-4 mr-2" />
                सहेजें
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

// ---- Monthly Summary ----
interface MemberSummary {
  confirmationCode: string;
  name: string;
  presentDays: number;
  absentDays: number;
  totalDays: number;
  attendancePct: number;
}

function MonthlySummary({ admissions }: { admissions: LocalAdmissionEntry[] }) {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [summaryData, setSummaryData] = useState<MemberSummary[]>([]);

  const currentYear = now.getFullYear();
  const yearOptions: number[] = [];
  for (let y = 2025; y <= currentYear; y++) {
    yearOptions.push(y);
  }

  const computeSummary = useCallback(() => {
    const allAttendance = getAttendance();
    const prefix = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;
    const matchingDates = Object.keys(allAttendance).filter((d) =>
      d.startsWith(prefix),
    );

    const totalDays = matchingDates.length;

    const summary: MemberSummary[] = admissions.map((entry) => {
      let presentDays = 0;
      for (const date of matchingDates) {
        const dayData = allAttendance[date] ?? {};
        if (dayData[entry.confirmationCode]) {
          presentDays++;
        }
      }
      const absentDays = totalDays - presentDays;
      const pct =
        totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
      return {
        confirmationCode: entry.confirmationCode,
        name: entry.name,
        presentDays,
        absentDays,
        totalDays,
        attendancePct: pct,
      };
    });

    setSummaryData(summary);
  }, [admissions, selectedMonth, selectedYear]);

  useEffect(() => {
    computeSummary();
  }, [computeSummary]);

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
      m.confirmationCode,
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
      {/* Controls */}
      <Card className="border-saffron/20 shadow-card-warm print:hidden">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end flex-wrap">
            <div className="flex-1 min-w-[160px] space-y-2">
              <Label className="font-hindi text-sm font-semibold text-foreground">
                महीना चुनें
              </Label>
              <Select
                value={String(selectedMonth)}
                onValueChange={(val) => setSelectedMonth(Number(val))}
              >
                <SelectTrigger
                  data-ocid="summary.month_select"
                  className="font-hindi border-saffron/30 focus:ring-saffron/30 h-11"
                >
                  <SelectValue placeholder="महीना" />
                </SelectTrigger>
                <SelectContent>
                  {MONTH_NAMES.map((name, idx) => (
                    <SelectItem
                      key={name}
                      value={String(idx + 1)}
                      className="font-hindi"
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[120px] space-y-2">
              <Label className="font-hindi text-sm font-semibold text-foreground">
                वर्ष चुनें
              </Label>
              <Select
                value={String(selectedYear)}
                onValueChange={(val) => setSelectedYear(Number(val))}
              >
                <SelectTrigger
                  data-ocid="summary.year_select"
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

            <div className="flex gap-2 pt-6 sm:pt-0">
              <Button
                variant="outline"
                onClick={handleDownloadCSV}
                disabled={summaryData.length === 0}
                data-ocid="summary.csv_button"
                className="font-hindi border-saffron/30 text-saffron-deep hover:bg-saffron/10 hover:border-saffron/50 gap-1.5 h-11"
              >
                <Download className="w-4 h-4" />
                CSV डाउनलोड
              </Button>
              <Button
                variant="outline"
                onClick={handlePrint}
                disabled={summaryData.length === 0}
                data-ocid="summary.pdf_button"
                className="font-hindi border-saffron/30 text-saffron-deep hover:bg-saffron/10 hover:border-saffron/50 gap-1.5 h-11"
              >
                <Printer className="w-4 h-4" />
                PDF प्रिंट
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Print header */}
      <div className="hidden print:block mb-6 text-center">
        <h2 className="font-hindi font-bold text-xl text-foreground">
          निःशुल्क योग कक्षा — मासिक अटेंडेंस सारांश
        </h2>
        <p className="font-hindi text-muted-foreground text-sm mt-1">
          {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
        </p>
      </div>

      {admissions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          data-ocid="summary.empty_state"
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-saffron/20 shadow-card-warm overflow-hidden">
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

            <div className="overflow-x-auto">
              <Table data-ocid="summary.table">
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
                      key={member.confirmationCode}
                      data-ocid={`summary.row.${i + 1}`}
                      className="hover:bg-saffron/5 border-b border-border/50"
                    >
                      <TableCell className="font-body text-xs text-muted-foreground px-4 py-3 text-right">
                        {i + 1}.
                      </TableCell>
                      <TableCell className="px-4 py-3 whitespace-nowrap">
                        <Badge className="bg-saffron/15 text-saffron-deep border-saffron/25 font-body font-bold text-xs tracking-wide">
                          {member.confirmationCode}
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

// ---- Admin Dashboard ----
function AdminDashboard({
  admissions,
  onLogout,
  onRefresh,
}: {
  admissions: LocalAdmissionEntry[];
  onLogout: () => void;
  onRefresh: () => void;
}) {
  function openIdProof(entry: LocalAdmissionEntry) {
    if (!entry.idProofFileData) return;
    // Determine MIME type from base64 header
    const mimeMatch = entry.idProofFileData.match(/^data:([^;]+);base64,/);
    const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
    const base64 = entry.idProofFileData.replace(/^data:[^;]+;base64,/, "");
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mime });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    // Revoke after a delay to allow the tab to open
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  return (
    <div className="min-h-screen bg-background pt-4 pb-36 md:pb-16">
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
                      {admissions.length}
                    </p>
                    <p className="font-hindi text-white/60 text-xs">कुल प्रवेश</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={onRefresh}
                className="bg-white/15 hover:bg-white/25 text-white border border-white/20 font-hindi"
              >
                रिफ्रेश
              </Button>
              <Button
                variant="ghost"
                onClick={onLogout}
                data-ocid="admin.logout_button"
                className="bg-white/15 hover:bg-white/25 text-white border border-white/20 font-hindi"
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                लॉगआउट
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
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
              data-ocid="attendance.tab"
              className="font-hindi font-semibold text-sm data-[state=active]:bg-saffron data-[state=active]:text-white data-[state=active]:shadow-saffron rounded-lg h-10 px-4 sm:px-6 transition-all"
            >
              <CalendarDays className="w-4 h-4 mr-1.5 sm:mr-2" />
              अटेंडेंस शीट
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              data-ocid="summary.tab"
              className="font-hindi font-semibold text-sm data-[state=active]:bg-saffron data-[state=active]:text-white data-[state=active]:shadow-saffron rounded-lg h-10 px-4 sm:px-6 transition-all"
            >
              <BarChart2 className="w-4 h-4 mr-1.5 sm:mr-2" />
              मासिक सारांश
            </TabsTrigger>
          </TabsList>

          {/* Admissions Tab */}
          <TabsContent value="admissions">
            {admissions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="admin.admissions_empty_state"
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
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-saffron/20 shadow-card-warm overflow-hidden">
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

                  <div className="overflow-x-auto">
                    <Table data-ocid="admin.admissions_table">
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
                            key={entry.confirmationCode}
                            data-ocid={`admin.admissions.row.${i + 1}`}
                            className="hover:bg-saffron/5 border-b border-border/50"
                          >
                            <TableCell className="px-4 py-3">
                              <Badge className="bg-saffron/15 text-saffron-deep border-saffron/25 font-body font-bold text-xs tracking-wide whitespace-nowrap">
                                {entry.confirmationCode}
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
                              {entry.idProofNumber}
                            </TableCell>
                            <TableCell className="px-4 py-3 whitespace-nowrap">
                              {entry.idProofFileData ? (
                                <button
                                  type="button"
                                  onClick={() => openIdProof(entry)}
                                  data-ocid={`admin.admissions.view_id.${i + 1}`}
                                  className="inline-flex items-center gap-1.5 text-xs font-hindi font-semibold text-saffron-deep hover:text-saffron bg-saffron/10 hover:bg-saffron/20 px-3 py-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  देखें
                                </button>
                              ) : (
                                <span className="text-xs text-muted-foreground/50 font-hindi">
                                  —
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="font-hindi text-sm text-muted-foreground px-4 py-3 whitespace-nowrap">
                              {formatSubmissionTime(entry.submissionTime)}
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
            <AttendanceSheet admissions={admissions} />
          </TabsContent>

          {/* Monthly Summary Tab */}
          <TabsContent value="summary">
            <MonthlySummary admissions={admissions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ---- Main Export ----
export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [admissions, setAdmissions] = useState<LocalAdmissionEntry[]>([]);

  function handleLogin(username: string, password: string) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setLoginError(false);
      setAdmissions(getAdmissions());
    } else {
      setLoginError(true);
    }
  }

  function handleLogout() {
    setLoggedIn(false);
    setLoginError(false);
    setAdmissions([]);
  }

  function handleRefresh() {
    setAdmissions(getAdmissions());
  }

  return (
    <>
      {!loggedIn ? (
        <LoginForm onLogin={handleLogin} loginError={loginError} />
      ) : (
        <AdminDashboard
          admissions={admissions}
          onLogout={handleLogout}
          onRefresh={handleRefresh}
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

      <BottomNav />
    </>
  );
}
