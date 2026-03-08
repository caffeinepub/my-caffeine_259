import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Image,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { BottomNav } from "../components/BottomNav";

// ---- localStorage helpers ----
export interface LocalAdmissionEntry {
  id: number;
  confirmationCode: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  dateOfBirth: string;
  idProofNumber: string;
  idProofFileName: string;
  idProofFileData: string; // base64
  submissionTime: string;
}

function getAdmissions(): LocalAdmissionEntry[] {
  try {
    const raw = localStorage.getItem("yoga_admissions");
    if (!raw) return [];
    return JSON.parse(raw) as LocalAdmissionEntry[];
  } catch {
    return [];
  }
}

function saveAdmissions(entries: LocalAdmissionEntry[]): void {
  localStorage.setItem("yoga_admissions", JSON.stringify(entries));
}

function generateYogaCode(index: number): string {
  return `YOGA${String(index).padStart(3, "0")}`;
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ---- Success Dialog ----
function SuccessDialog({
  open,
  yogaCode,
  onClose,
}: {
  open: boolean;
  yogaCode: string;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="admission.success_dialog"
        className="max-w-md border-saffron/30 bg-card"
      >
        <DialogHeader>
          <DialogTitle className="sr-only">पंजीकरण सफल</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center text-center py-6 px-2">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-forest/20 to-forest/10 flex items-center justify-center mb-5"
          >
            <CheckCircle2 className="w-10 h-10 text-forest" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-hindi font-bold text-xl text-foreground mb-3 leading-snug"
          >
            आपका पंजीकरण सफल हुआ!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-hindi text-muted-foreground text-sm mb-6 leading-relaxed"
          >
            आपका योग कोड है:
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="w-full bg-gradient-to-br from-saffron-light/40 to-saffron/10 border-2 border-saffron/40 rounded-2xl p-6 mb-6"
          >
            <p className="font-body text-xs uppercase tracking-widest text-saffron-deep/70 mb-2">
              Your Yoga Code
            </p>
            <p className="font-display font-bold text-4xl text-saffron-deep tracking-wider">
              {yogaCode}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="font-hindi text-sm text-muted-foreground mb-6 leading-relaxed max-w-xs"
          >
            यह कोड संभाल कर रखें। योग कक्षा में प्रवेश के समय यह दिखाएं।
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full"
          >
            <Button
              onClick={onClose}
              data-ocid="admission.close_button"
              className="w-full bg-saffron hover:bg-saffron-deep text-white font-hindi font-bold py-3 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-saffron"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              ठीक है, धन्यवाद!
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---- Main Page ----
export default function AdmissionPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [idProofNumber, setIdProofNumber] = useState("");
  const [idProofFile, setIdProofFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [successCode, setSuccessCode] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(file: File) {
    setIdProofFile(file);
    setFormError("");
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    const phoneClean = contact.replace(/[\s\-()]/g, "");
    if (phoneClean.length < 10) {
      setFormError("कृपया वैध संपर्क नंबर दर्ज करें (कम से कम 10 अंक)");
      return;
    }

    if (!idProofFile) {
      setFormError("कृपया ID Proof की फोटो/PDF अपलोड करें (अनिवार्य)");
      return;
    }

    setIsSubmitting(true);

    try {
      const base64Data = await toBase64(idProofFile);
      const existing = getAdmissions();
      const newId = existing.length + 1;
      const confirmationCode = generateYogaCode(newId);

      const newEntry: LocalAdmissionEntry = {
        id: newId,
        confirmationCode,
        name,
        address,
        contact,
        email,
        dateOfBirth,
        idProofNumber,
        idProofFileName: idProofFile.name,
        idProofFileData: base64Data,
        submissionTime: new Date().toISOString(),
      };

      saveAdmissions([...existing, newEntry]);
      setSuccessCode(confirmationCode);
    } catch {
      setFormError("फॉर्म जमा करने में समस्या हुई। कृपया दोबारा प्रयास करें।");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    setSuccessCode(null);
    setName("");
    setAddress("");
    setContact("");
    setEmail("");
    setDateOfBirth("");
    setIdProofNumber("");
    setIdProofFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <>
      <main className="min-h-screen bg-background pt-4 pb-36 md:pb-16">
        {/* Hero Strip */}
        <div className="bg-gradient-to-br from-saffron-deep to-[oklch(0.45_0.15_45)] py-14 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.5) 39px, rgba(255,255,255,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.5) 39px, rgba(255,255,255,0.5) 40px)",
              }}
            />
          </div>
          <div
            className="absolute -right-8 top-1/2 -translate-y-1/2 text-white/[0.04] font-display select-none pointer-events-none"
            style={{ fontSize: "14rem", lineHeight: 1 }}
            aria-hidden
          >
            ॐ
          </div>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-5 bg-white/20 text-white border-white/30 font-hindi text-sm px-5 py-2 backdrop-blur-sm">
                <FileText className="w-3.5 h-3.5 mr-1.5" />
                निःशुल्क पंजीकरण
              </Badge>
              <h1 className="font-hindi font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight">
                प्रवेश फॉर्म
              </h1>
              <p className="font-hindi text-white/80 text-base sm:text-lg leading-relaxed">
                योग कक्षा में अपना स्थान सुरक्षित करें — बिल्कुल निःशुल्क
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 justify-center mt-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="flex items-center gap-1.5 text-white/80 font-hindi text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="w-3.5 h-3.5 text-gold" />
                सुबह 5:00 बजे
              </span>
              <span className="flex items-center gap-1.5 text-white/80 font-hindi text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                अम्बेडकर भवन
              </span>
              <span className="flex items-center gap-1.5 text-white/80 font-hindi text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Star className="w-3.5 h-3.5 text-gold fill-current" />
                बिल्कुल मुफ्त
              </span>
            </motion.div>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-xl mx-auto px-4 sm:px-6 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Card className="border-saffron/20 shadow-saffron-lg overflow-hidden">
              <div className="bg-saffron-light/30 border-b border-saffron/20 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-saffron/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-saffron-deep" />
                  </div>
                  <div>
                    <p className="font-hindi font-bold text-foreground text-base leading-tight">
                      व्यक्तिगत जानकारी
                    </p>
                    <p className="font-hindi text-muted-foreground text-xs">
                      सभी फील्ड अनिवार्य हैं *
                    </p>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="admission-name"
                      className="font-hindi text-sm font-semibold text-foreground"
                    >
                      पूरा नाम <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="admission-name"
                      type="text"
                      data-ocid="admission.name_input"
                      placeholder="अपना पूरा नाम दर्ज करें"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      minLength={2}
                      className="font-hindi border-saffron/30 focus:border-saffron focus-visible:ring-saffron/30 h-11"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="admission-address"
                      className="font-hindi text-sm font-semibold text-foreground"
                    >
                      पूरा पता <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="admission-address"
                      data-ocid="admission.address_input"
                      placeholder="अपना पूरा पता दर्ज करें (मकान नंबर, मोहल्ला, शहर)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      minLength={10}
                      rows={3}
                      className="font-hindi border-saffron/30 focus:border-saffron focus-visible:ring-saffron/30 resize-none"
                    />
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="admission-contact"
                      className="font-hindi text-sm font-semibold text-foreground"
                    >
                      संपर्क नंबर <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="admission-contact"
                        type="tel"
                        data-ocid="admission.contact_input"
                        placeholder="+91 XXXXX XXXXX"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                        className="font-body pl-10 border-saffron/30 focus:border-saffron focus-visible:ring-saffron/30 h-11"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="admission-email"
                      className="font-hindi text-sm font-semibold text-foreground"
                    >
                      Gmail / Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="admission-email"
                      type="email"
                      data-ocid="admission.email_input"
                      placeholder="yourname@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="font-body border-saffron/30 focus:border-saffron focus-visible:ring-saffron/30 h-11"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="admission-dob"
                      className="font-hindi text-sm font-semibold text-foreground"
                    >
                      जन्म तिथि <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                      <Input
                        id="admission-dob"
                        type="date"
                        data-ocid="admission.dob_input"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                        max={new Date().toISOString().split("T")[0]}
                        className="font-body pl-10 border-saffron/30 focus:border-saffron focus-visible:ring-saffron/30 h-11"
                      />
                    </div>
                  </div>

                  {/* ID Proof Number */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="admission-idproof"
                      className="font-hindi text-sm font-semibold text-foreground"
                    >
                      ID Proof नंबर <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-xs font-hindi text-muted-foreground -mt-1">
                      आधार कार्ड / PAN कार्ड / वोटर ID नंबर
                    </p>
                    <Input
                      id="admission-idproof"
                      type="text"
                      data-ocid="admission.idproof_input"
                      placeholder="XXXX XXXX XXXX (Aadhar) या XXXXX0000X (PAN)"
                      value={idProofNumber}
                      onChange={(e) => setIdProofNumber(e.target.value)}
                      required
                      minLength={8}
                      className="font-body border-saffron/30 focus:border-saffron focus-visible:ring-saffron/30 h-11"
                    />
                  </div>

                  {/* ID Proof File Upload */}
                  <div className="space-y-2">
                    <Label className="font-hindi text-sm font-semibold text-foreground">
                      ID Proof फोटो{" "}
                      <span className="text-destructive">* (अनिवार्य)</span>
                    </Label>
                    <p className="text-xs font-hindi text-muted-foreground -mt-1">
                      आधार कार्ड / PAN कार्ड की फोटो या PDF अपलोड करें
                    </p>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={handleFileInputChange}
                      aria-label="ID Proof फ़ाइल चुनें"
                    />

                    <div
                      data-ocid="admission.idproof_dropzone"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      className={`relative rounded-xl border-2 border-dashed transition-all duration-200 ${
                        isDragging
                          ? "border-saffron bg-saffron/10 scale-[1.01]"
                          : idProofFile
                            ? "border-forest/50 bg-forest/5"
                            : "border-saffron/30 bg-saffron-light/10"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
                        {idProofFile ? (
                          <>
                            <div className="w-12 h-12 rounded-xl bg-forest/15 flex items-center justify-center mb-3">
                              {idProofFile.type.startsWith("image/") ? (
                                <Image className="w-6 h-6 text-forest" />
                              ) : (
                                <FileText className="w-6 h-6 text-forest" />
                              )}
                            </div>
                            <p className="font-body font-semibold text-sm text-forest truncate max-w-[200px]">
                              {idProofFile.name}
                            </p>
                            <p className="font-body text-xs text-muted-foreground mt-1">
                              {formatFileSize(idProofFile.size)}
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setIdProofFile(null);
                                if (fileInputRef.current)
                                  fileInputRef.current.value = "";
                              }}
                              className="mt-3 text-xs font-hindi text-muted-foreground hover:text-destructive transition-colors underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                            >
                              फ़ाइल बदलें
                            </button>
                          </>
                        ) : (
                          <>
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                                isDragging ? "bg-saffron/20" : "bg-saffron/10"
                              }`}
                            >
                              <Upload
                                className={`w-6 h-6 transition-colors ${isDragging ? "text-saffron-deep" : "text-saffron"}`}
                              />
                            </div>
                            <p className="font-hindi font-semibold text-sm text-foreground">
                              {isDragging ? "यहाँ छोड़ें..." : "फ़ाइल अपलोड करें"}
                            </p>
                            <p className="font-hindi text-xs text-muted-foreground mt-1">
                              फोटो या PDF • JPG, PNG, PDF
                            </p>
                            <Button
                              type="button"
                              data-ocid="admission.idproof_upload_button"
                              variant="outline"
                              size="sm"
                              className="mt-3 font-hindi text-xs border-saffron/40 text-saffron-deep hover:bg-saffron/10 hover:border-saffron/60"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload className="w-3.5 h-3.5 mr-1.5" />
                              फ़ाइल चुनें
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Error state */}
                  <AnimatePresence>
                    {formError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        data-ocid="admission.error_state"
                        className="bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 flex items-start gap-3"
                      >
                        <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                        <p className="font-hindi text-sm text-destructive">
                          {formError}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    data-ocid="admission.submit_button"
                    disabled={isSubmitting}
                    className="w-full bg-saffron hover:bg-saffron-deep text-white font-hindi font-bold py-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-saffron text-base mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        जमा हो रहा है...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        फॉर्म जमा करें
                      </>
                    )}
                  </Button>

                  <p className="text-center font-hindi text-xs text-muted-foreground">
                    फॉर्म जमा होने पर आपको एक अद्वितीय{" "}
                    <span className="text-saffron-deep font-semibold">
                      YOGA कोड
                    </span>{" "}
                    मिलेगा
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Info card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6"
            >
              <Card className="border-saffron/15 bg-saffron-light/20">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-saffron/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-saffron-deep" />
                  </div>
                  <div>
                    <p className="font-hindi font-semibold text-foreground text-sm mb-1">
                      कक्षा का स्थान
                    </p>
                    <p className="font-hindi text-muted-foreground text-sm leading-relaxed">
                      अम्बेडकर भवन, करनी चौक के पास,
                      <br />
                      हनुमानगढ़ जंक्शन, राजस्थान
                    </p>
                    <p className="font-hindi text-saffron-deep font-semibold text-sm mt-2">
                      प्रतिदिन सुबह 5:00 बजे
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact help */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-4 text-center"
            >
              <p className="font-hindi text-sm text-muted-foreground mb-3">
                कोई सहायता चाहिए?
              </p>
              <div className="flex gap-3 justify-center">
                <a
                  href="https://wa.me/919057036745"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-forest/10 text-forest hover:bg-forest/20 font-hindi text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href="tel:+919024783339"
                  className="flex items-center gap-2 bg-saffron/10 text-saffron-deep hover:bg-saffron/20 font-hindi text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  कॉल करें
                </a>
              </div>
            </motion.div>

            {/* Back to home */}
            <div className="mt-6 text-center">
              <Link
                to="/"
                className="font-hindi text-sm text-saffron-deep hover:text-saffron transition-colors"
              >
                ← मुख्य पृष्ठ पर जाएं
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-12 bg-foreground text-background/70 py-8 px-4 sm:px-6 text-center">
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
      </main>

      {/* Loading overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-ocid="admission.loading_state"
            className="fixed inset-0 bg-background/40 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <div className="bg-card border border-saffron/20 rounded-2xl p-8 shadow-saffron-lg flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-saffron animate-spin" />
              <p className="font-hindi text-foreground font-semibold">
                फॉर्म जमा हो रहा है...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Dialog */}
      {successCode && (
        <SuccessDialog
          open={!!successCode}
          yogaCode={successCode}
          onClose={handleClose}
        />
      )}

      <BottomNav />
    </>
  );
}
