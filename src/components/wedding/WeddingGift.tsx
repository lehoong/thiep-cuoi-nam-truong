import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Copy, Check } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import { weddingConfig } from "../../config/wedding";

export default function WeddingGift() {
  const { ref, isInView } = useInView();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(weddingConfig.gift.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = weddingConfig.gift.accountNumber;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Trigger Section */}
      <section
        ref={ref}
        className="py-16 px-6 bg-[#FDF8F0]"
        aria-label="Gửi quà mừng"
      >
        <div
          className={`text-center transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="group relative inline-flex flex-col items-center justify-center gap-2 w-28 h-28 mx-auto rounded-full bg-white border border-[#C9B88C]/60 shadow-xl hover:shadow-2xl hover:scale-[1.05] active:scale-[0.95] transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B3A5C]"
            aria-label="Mở thông tin gửi quà mừng"
          >
            <div className="absolute inset-0 rounded-full border border-[#C9B88C]/40 animate-ping opacity-75" />
            <Heart
              size={28}
              className="text-[#D4A5A5] group-hover:text-[#C9B88C] transition-colors duration-300"
              strokeWidth={1.5}
            />
            <span className="font-sans text-[10px] tracking-[0.25em] text-[#1B3A5C]/80 group-hover:text-[#1B3A5C] transition-colors uppercase">
              Mừng Cưới
            </span>
          </button>
        </div>
      </section>

      {/* Bottom Sheet Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#FFFEF9] rounded-t-2xl max-h-[85vh] overflow-y-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-label="Thông tin mừng cưới"
            >
              {/* Drag indicator */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-[#2C2C2C]/15" />
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#2C2C2C]/40 hover:text-[#2C2C2C]/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3A5C]"
                aria-label="Đóng"
              >
                <X size={20} />
              </button>

              <div className="px-6 pb-8 pt-4">
                {/* Title */}
                <h3 className="font-serif text-3xl sm:text-4xl text-center text-[#2C2C2C] mb-4">
                  Gửi Lời Chúc Phúc
                </h3>

                {/* Thank You Note */}
                <p className="font-serif text-base text-center text-[#2C2C2C]/70 italic leading-relaxed mb-8 px-2 sm:px-6">
                  "Sự hiện diện của bạn trong ngày vui là món quà vô giá nhất đối với chúng mình. Nếu bạn muốn gửi thêm những lời chúc phúc qua một phương thức khác, chúng mình xin trân trọng cảm ơn."
                </p>

                {/* QR Code */}
                <div className="flex justify-center mb-8">
                  <div className="w-56 h-56 border border-[#C9B88C]/60 rounded-xl shadow-lg bg-white p-3">
                    <img
                      src={weddingConfig.gift.qrImage}
                      alt="QR Code chuyển khoản"
                      className="w-full h-full object-contain rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Bank info */}
                <div className="space-y-4 text-center mb-8">
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.2em] text-[#2C2C2C]/40 uppercase mb-1">
                      Ngân hàng
                    </p>
                    <p className="font-sans text-sm tracking-widest text-[#2C2C2C]/80 uppercase">
                      {weddingConfig.gift.bankName}
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.2em] text-[#2C2C2C]/40 uppercase mb-1">
                      Tên tài khoản
                    </p>
                    <p className="font-sans text-sm tracking-widest text-[#2C2C2C]/80 uppercase">
                      {weddingConfig.gift.accountName}
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.2em] text-[#2C2C2C]/40 uppercase mb-1">
                      Số tài khoản
                    </p>
                    <p className="font-sans text-lg font-medium text-[#1B3A5C] tracking-widest uppercase">
                      {weddingConfig.gift.accountNumber}
                    </p>
                  </div>
                </div>

                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  className="w-full py-3.5 bg-white border border-[#C9B88C]/60 text-[#1B3A5C] font-sans text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#1B3A5C] hover:text-white hover:border-[#1B3A5C] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3A5C] shadow-sm rounded-sm"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      ĐÃ COPY!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      COPY SỐ TÀI KHOẢN
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
