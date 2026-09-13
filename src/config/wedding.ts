// ============================================
// CENTRALIZED WEDDING CONFIGURATION
// Chỉnh sửa nội dung ở đây, KHÔNG sửa trong component
// ============================================

export const weddingConfig = {
  couple: {
    groom: {
      name: "Tần Nam Trường",
      // parents: "", // Bổ sung sau
    },
    bride: {
      name: "Tần Thu Thủy",
      // parents: "", // Bổ sung sau
    },
  },

  date: {
    display: "20 · 09 · 2026",
    iso: "2026-09-20",
    day: "20",
    month: "09",
    year: "2026",
  },

  events: {
    ceremony: {
      title: "LỄ THÀNH HÔN",
      time: "09:00",
      venue: "TƯ GIA",
      address: "Xuân Long - Kim Anh - Hà Nội",
      mapUrl: "https://maps.google.com/?q=Xuân+Long,+Kim+Anh,+Hà+Nội",
    },
    reception: {
      title: "TIỆC CƯỚI",
      time: "11:00",
      venue: "TRUNG TÂM TIỆC CƯỚI",
      address: "Khu đô thị mới, Hà Nội",
      mapUrl: "https://maps.google.com/?q=Hà+Nội",
    },
  },

  rsvp: {
    googleScriptUrl: "YOUR_GOOGLE_SCRIPT_URL", // ← Thay bằng URL Google Apps Script
  },

  gift: {
    bankName: "Ngân hàng Ngoại thương Việt Nam (Vietcombank)",
    accountName: "TẦN NAM TRƯỜNG",
    accountNumber: "0123456789",
    qrImage: "/photos/qr-placeholder.png",
  },

  music: {
    src: "/music/wedding-bg.mp3",
  },

  media: {
    hero: "/photos/hero.jpg",
    featured: [
      "/photos/photo-1.jpg",
      "/photos/photo-2.jpg",
      "/photos/photo-3.jpg",
      "/photos/photo-4.jpg",
    ],
    closing: "/photos/closing.jpg",
  },

  meta: {
    title: "Thiệp mời đám cưới - Nam Trường & Thu Thủy",
    description:
      "Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi — 20.09.2026",
    ogImage: "/photos/hero.jpg",
  },
} as const;

// Re-export types for components
export type WeddingConfig = typeof weddingConfig;
