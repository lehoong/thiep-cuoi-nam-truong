import { useState, type FormEvent } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../../hooks/useInView";
import { weddingConfig } from "../../config/wedding";

type AttendingStatus = "yes" | "no" | null;

interface FormData {
  name: string;
  attending: AttendingStatus;
  guests: number | "";
}

const STORAGE_KEY = "wedding-rsvp-submitted";

export default function RSVPSection() {
  const { ref, isInView } = useInView();

  const alreadySubmitted =
    typeof window !== "undefined" &&
    localStorage.getItem(STORAGE_KEY) === "true";
  const storedAttending = 
    typeof window !== "undefined" ? localStorage.getItem("wedding-rsvp-attending") : null;

  const [form, setForm] = useState<FormData>({
    name: "",
    attending: null,
    guests: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(alreadySubmitted);
  const [submittedAttending, setSubmittedAttending] = useState<boolean>(
    storedAttending === "no" ? false : true
  );
  const [error, setError] = useState(false);

  const isValid = form.name.trim().length > 0 && form.attending !== null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setError(false);

    try {
      await fetch(weddingConfig.rsvp.googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          attending: form.attending === "yes" ? "Có" : "Không",
          guests: form.attending === "yes" ? form.guests : 0,
        }),
      });

      if (form.attending === "yes") {
        triggerConfetti();
      }

      setSubmittedAttending(form.attending === "yes");
      setSubmitted(true);
      localStorage.setItem(STORAGE_KEY, "true");
      localStorage.setItem("wedding-rsvp-attending", form.attending === "yes" ? "yes" : "no");
    } catch {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-[#FFFEF9]" aria-label="Xác nhận tham dự">
      <div
        ref={ref}
        className={`max-w-md mx-auto transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2C2C2C] mb-2">
            Xác Nhận Tham Dự
          </h2>
          <div className="flex justify-center mt-4">
            <div className="w-10 h-px bg-[#C9B88C]/40" />
            <div className="w-1 h-1 rounded-full bg-[#C9B88C]/50 mx-2 -mt-px" />
            <div className="w-10 h-px bg-[#C9B88C]/40" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center py-12 px-6 border border-[#C9B88C]/20 bg-white/50">
                <div className="text-3xl mb-4">
                  {submittedAttending ? "🎉" : "💌"}
                </div>
                <p className="font-serif text-lg text-[#2C2C2C]/80">
                  {submittedAttending
                    ? "Cảm ơn bạn đã xác nhận!"
                    : "Cảm ơn bạn đã phản hồi."}
                </p>
                <p className="font-sans text-sm text-[#2C2C2C]/50 mt-2">
                  {submittedAttending
                    ? "Chúng tôi rất mong được gặp bạn."
                    : "Chúng tôi rất tiếc!"}
                </p>
              </div>
            </motion.div>
          ) : (
            /* Form */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="block font-sans text-xs tracking-[0.15em] text-[#2C2C2C]/60 uppercase mb-2"
                  >
                    Họ và tên
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-[#C9B88C]/30 bg-white/80 text-[#2C2C2C] font-sans text-sm focus:outline-none focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C]/20 transition-colors"
                    placeholder="Nhập họ và tên"
                  />
                </div>

                {/* Attending */}
                <div>
                  <p className="font-sans text-xs tracking-[0.15em] text-[#2C2C2C]/60 uppercase mb-3">
                    Bạn sẽ tham dự chứ?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 px-4 py-3 border border-[#C9B88C]/20 bg-white/50 cursor-pointer transition-colors hover:border-[#1B3A5C]/30 has-[:checked]:border-[#1B3A5C]/50 has-[:checked]:bg-[#1B3A5C]/5">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={form.attending === "yes"}
                        onChange={() =>
                          setForm((f) => ({ ...f, attending: "yes" }))
                        }
                        className="w-4 h-4 accent-[#1B3A5C]"
                      />
                      <span className="font-sans text-sm text-[#2C2C2C]/80">
                        Có, tôi sẽ tham dự
                      </span>
                    </label>
                    <label className="flex items-center gap-3 px-4 py-3 border border-[#C9B88C]/20 bg-white/50 cursor-pointer transition-colors hover:border-[#1B3A5C]/30 has-[:checked]:border-[#1B3A5C]/50 has-[:checked]:bg-[#1B3A5C]/5">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={form.attending === "no"}
                        onChange={() =>
                          setForm((f) => ({ ...f, attending: "no" }))
                        }
                        className="w-4 h-4 accent-[#1B3A5C]"
                      />
                      <span className="font-sans text-sm text-[#2C2C2C]/80">
                        Tôi rất tiếc, không thể tham dự
                      </span>
                    </label>
                  </div>
                </div>

                {/* Number of guests — only when attending */}
                {form.attending === "yes" && (
                  <div className="transition-all duration-300">
                    <label
                      htmlFor="rsvp-guests"
                      className="block font-sans text-xs tracking-[0.15em] text-[#2C2C2C]/60 uppercase mb-2"
                    >
                      Số lượng người tham dự
                    </label>
                    <input
                      id="rsvp-guests"
                      type="number"
                      min={1}
                      max={10}
                      value={form.guests}
                      onChange={(e) => {
                        const val = e.target.value;
                        setForm((f) => ({
                          ...f,
                          guests: val === "" ? "" : Number(val),
                        }));
                      }}
                      className="w-full px-4 py-3 border border-[#C9B88C]/30 bg-white/80 text-[#2C2C2C] font-sans text-sm focus:outline-none focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C]/20 transition-colors"
                    />
                  </div>
                )}

                {/* Error message */}
                {error && (
                  <p className="font-sans text-sm text-[#D4A5A5] text-center">
                    Có lỗi xảy ra, vui lòng thử lại.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="w-full py-3.5 bg-[#1B3A5C] text-white font-sans text-sm tracking-[0.2em] transition-all duration-300 hover:bg-[#1B3A5C]/90 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3A5C]"
                >
                  {isSubmitting ? "ĐANG GỬI..." : "GỬI XÁC NHẬN"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

const triggerConfetti = () => {
  const colors = ["#C9B88C", "#E6D5B8", "#FFFEF9"];
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
      disableForReducedMotion: true
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
      disableForReducedMotion: true
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};
