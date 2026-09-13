// ============================================
// CENTRALIZED WEDDING CONFIGURATION
// Chỉnh sửa nội dung ở đây, KHÔNG sửa trong component
// ============================================

export const weddingConfig = {
  couple: {
    groom: {
      name: "Trần Nam Trường",
      parents: "Ông Trần Văn Thi - Bà Nguyễn Thị Là",
    },
    bride: {
      name: "Trần Thu Thủy",
      parents: "Ông Trần Văn Trung - Bà Nguyễn Thị Hà",
    },
  },

  date: {
    display: "20 · 09 · 2026",
    iso: "2026-09-20",
    day: "20",
    month: "09",
    year: "2026",
    lunar: "(Nhằm ngày 10 tháng 08 năm Bính Ngọ)",
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
    googleScriptUrl: "https://script.google.com/macros/s/AKfycbyTrleOk02OVIeckzLz2ifPxF3XCOwBa-Nyo80NKogS53qDtjpwUjryxSwTKjcfLlcGqA/exec", // ← Thay bằng URL Google Apps Script
  },

  gift: {
    bankName: "Techcombank",
    accountName: "TRẦN NAM TRƯỜNG",
    accountNumber: "1111200004",
    qrImage: "/photos/qr-techcombank.jpg",
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
