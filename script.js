/* ===================================
   UPVORIA — script.js
   =================================== */

// ─── CURSOR ─────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();
function refreshCursorTargets() {
  document.querySelectorAll('button, a, select, input, .upill, .industry-card, .utab').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; ring.style.opacity = '0'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.opacity = '0.5'; });
  });
}

// ─── COUNTER ANIMATION ──────────────────────────
function animateCounter(el, end, suffix = '', duration = 1800) {
  let start = 0, step = end / (duration / 16);
  let t = setInterval(() => {
    start += step;
    if (start >= end) { el.textContent = end + suffix; clearInterval(t); return; }
    el.textContent = Math.floor(start) + suffix;
  }, 16);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(document.getElementById('counter1'), 12);
      animateCounter(document.getElementById('counter2'), 47, '%');
      animateCounter(document.getElementById('counter3'), 12);
      counterObserver.disconnect();
    }
  });
});
counterObserver.observe(document.getElementById('counter1'));

// ─── SCROLL REVEAL ───────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(r => revealObserver.observe(r));

// ─── INDUSTRY DATA ────────────────────────────────
const industryData = {
  manufaktur: {
    name: 'Manufaktur & Produksi', risk: 85, level: 'kritis',
    horizon: '2–4 Tahun', impact: 'Sangat Tinggi', urgency: '🔴 Mendesak', adaptability: 'Sedang',
    desc: 'Manufaktur adalah salah satu sektor paling rentan terhadap otomatisasi. Robot industri dan AI sudah menggantikan lini produksi di berbagai pabrik global. Teknisi dan operator mesin manual menghadapi risiko terbesar.',
    actions: [
      'Kuasai pemrograman robot (PLC, CNC, ROS)',
      'Pelajari predictive maintenance berbasis AI',
      'Tingkatkan skill manajemen & quality control',
      'Pertimbangkan transisi ke peran teknisi automation',
      'Ikuti sertifikasi Industry 4.0 / Smart Manufacturing'
    ]
  },
  keuangan: {
    name: 'Keuangan & Perbankan', risk: 78, level: 'kritis',
    horizon: '2–5 Tahun', impact: 'Tinggi', urgency: '🔴 Mendesak', adaptability: 'Tinggi',
    desc: 'Analisis kredit, trading, deteksi fraud, dan layanan nasabah rutin sudah mulai diotomasi oleh AI. Namun peran strategis seperti perencanaan keuangan kompleks dan hubungan klien tetap relevan.',
    actions: [
      'Pelajari FinTech dan financial modeling dengan AI',
      'Kuasai tools seperti Python untuk analisis data keuangan',
      'Fokus pada advisory, perencanaan, dan hubungan klien',
      'Ambil sertifikasi CFA atau CFP untuk nilai lebih',
      'Pahami regulasi FinTech terbaru di Indonesia'
    ]
  },
  transportasi: {
    name: 'Transportasi & Logistik', risk: 82, level: 'kritis',
    horizon: '3–6 Tahun', impact: 'Sangat Tinggi', urgency: '🟠 Tinggi', adaptability: 'Rendah',
    desc: 'Kendaraan otonom, drone pengiriman, dan sistem manajemen armada AI sedang berkembang pesat. Sopir jarak jauh dan operator gudang konvensional berisiko besar dalam dekade ini.',
    actions: [
      'Pelajari sistem manajemen logistik berbasis AI',
      'Kuasai operasional drone dan kendaraan semi-otonom',
      'Transisi ke peran dispatcher atau fleet manager digital',
      'Ikuti pelatihan last-mile delivery management',
      'Eksplorasi peluang di e-commerce fulfillment'
    ]
  },
  ritel: {
    name: 'Ritel & E-Commerce', risk: 72, level: 'tinggi',
    horizon: '2–4 Tahun', impact: 'Tinggi', urgency: '🟠 Tinggi', adaptability: 'Sedang',
    desc: 'Kasir otomatis, chatbot layanan pelanggan, dan rekomendasi produk AI sudah mengubah lanskap ritel. Posisi stok dan kasir paling terancam, sementara visual merchandising dan brand management lebih aman.',
    actions: [
      'Kuasai e-commerce dan digital marketing',
      'Pelajari analitik data pelanggan (CRM, Shopify)',
      'Tingkatkan kemampuan kurasi produk dan personal styling',
      'Fokus pada pengalaman pelanggan yang tidak bisa diotomasi',
      'Kembangkan keahlian supply chain digital'
    ]
  },
  kesehatan: {
    name: 'Layanan Kesehatan', risk: 42, level: 'sedang',
    horizon: '5–10 Tahun', impact: 'Sedang', urgency: '🟡 Moderat', adaptability: 'Tinggi',
    desc: 'AI membantu diagnosa radiologi, analisis data pasien, dan administrasi medis. Namun aspek empati, perawatan langsung, dan keputusan klinis kompleks tetap membutuhkan manusia.',
    actions: [
      'Pelajari AI diagnostic tools untuk bidangmu',
      'Kuasai Electronic Health Records (EHR) terbaru',
      'Tingkatkan soft skill: empati, komunikasi pasien',
      'Spesialisasi di bidang yang butuh sentuhan manusia',
      'Pahami etika AI dalam kesehatan'
    ]
  },
  hukum: {
    name: 'Hukum & Kepatuhan', risk: 65, level: 'tinggi',
    horizon: '3–6 Tahun', impact: 'Sedang', urgency: '🟠 Tinggi', adaptability: 'Sedang',
    desc: 'Legal research, review kontrak, dan due diligence sudah mulai diotomasi AI seperti Harvey. Paralegal dan asisten hukum junior paling berisiko. Namun litigasi, negosiasi, dan konseling tetap membutuhkan manusia.',
    actions: [
      'Kuasai LegalTech tools seperti Harvey, Kira, Relativity',
      'Fokus pada litigation dan konseling strategis',
      'Pelajari regulasi AI dan hukum teknologi',
      'Bangun keahlian di bidang hukum yang sangat kontekstual',
      'Kembangkan skill negosiasi dan hubungan klien'
    ]
  },
  pendidikan: {
    name: 'Pendidikan & Pelatihan', risk: 38, level: 'sedang',
    horizon: '5–10 Tahun', impact: 'Rendah-Sedang', urgency: '🟡 Moderat', adaptability: 'Sangat Tinggi',
    desc: 'Platform e-learning dan tutor AI sedang berkembang, namun peran guru dalam membentuk karakter, motivasi, dan mentorship tidak dapat sepenuhnya digantikan. Guru yang memanfaatkan AI justru lebih powerful.',
    actions: [
      'Integrasikan AI tools dalam pengajaran (ChatGPT, Khanmigo)',
      'Fokus pada mentorship, motivasi, dan social-emotional learning',
      'Kembangkan kurikulum yang mengajarkan AI literacy',
      'Manfaatkan data analytics untuk personalisasi pembelajaran',
      'Pelajari instructional design untuk platform digital'
    ]
  },
  media: {
    name: 'Media & Jurnalisme', risk: 70, level: 'tinggi',
    horizon: '1–3 Tahun', impact: 'Tinggi', urgency: '🔴 Mendesak', adaptability: 'Sedang',
    desc: 'Penulisan berita otomatis, pembuatan konten AI, dan deepfake sudah mengancam jurnalis dan content creator. Investigasi mendalam, analisis opini, dan sumber daya manusia tetap krusial.',
    actions: [
      'Fokus pada investigasi dan jurnalisme data mendalam',
      'Kuasai multimedia storytelling (video, podcast, AR)',
      'Pelajari cara verifikasi konten dan fact-checking AI',
      'Bangun personal brand dan loyal audience',
      'Spesialisasi di niche yang butuh keahlian manusia'
    ]
  },
  akunting: {
    name: 'Akunting & Pajak', risk: 80, level: 'kritis',
    horizon: '2–4 Tahun', impact: 'Sangat Tinggi', urgency: '🔴 Mendesak', adaptability: 'Sedang',
    desc: 'Bookkeeping rutin, rekonsiliasi, dan pelaporan pajak standar sudah banyak diotomasi software seperti Xero dan AI. Akuntan yang hanya mengandalkan entry data manual sangat rentan.',
    actions: [
      'Kuasai platform akunting berbasis cloud (Xero, QuickBooks)',
      'Pelajari audit berbasis data dan analitik keuangan',
      'Fokus pada advisory, tax planning strategis',
      'Ambil sertifikasi CPA atau ACCA yang diakui global',
      'Pelajari forensic accounting dan fraud detection AI'
    ]
  },
  customer_service: {
    name: 'Customer Service', risk: 75, level: 'kritis',
    horizon: '1–3 Tahun', impact: 'Tinggi', urgency: '🔴 Mendesak', adaptability: 'Sedang',
    desc: 'Chatbot dan virtual assistant AI sudah menggantikan banyak peran customer service tier-1. Namun penanganan eskalasi kompleks, empati dalam situasi emosional, dan account management tetap membutuhkan manusia.',
    actions: [
      'Spesialisasi di customer success dan account management',
      'Kuasai tools CRM dan customer analytics',
      'Tingkatkan kemampuan problem solving kompleks',
      'Pelajari cara mengelola dan melatih AI chatbot',
      'Kembangkan keahlian komunikasi dan empati mendalam'
    ]
  },
  pertanian: {
    name: 'Pertanian & Agrikultur', risk: 55, level: 'sedang',
    horizon: '4–8 Tahun', impact: 'Sedang', urgency: '🟡 Moderat', adaptability: 'Sedang',
    desc: 'Drone pertanian, sensor IoT, dan analitik hasil panen sudah masuk ke sektor ini. Petani kecil mungkin tertinggal, namun mereka yang mengadopsi agritech justru bisa meningkatkan produktivitas secara signifikan.',
    actions: [
      'Pelajari precision farming dan agritech modern',
      'Manfaatkan drone dan sensor untuk monitoring lahan',
      'Ikuti program smart farming dari Kementan',
      'Diversifikasi ke agrowisata dan produk premium',
      'Kuasai platform marketplace pertanian digital'
    ]
  },
  konstruksi: {
    name: 'Konstruksi & Arsitektur', risk: 35, level: 'rendah',
    horizon: '7–12 Tahun', impact: 'Rendah', urgency: '🟢 Rendah', adaptability: 'Tinggi',
    desc: 'Desain generatif AI dan BIM sudah membantu arsitek, namun konstruksi fisik masih sangat bergantung pada keahlian manusia. Kreativitas desain, manajemen proyek, dan kerja lapangan tetap aman dalam jangka menengah.',
    actions: [
      'Pelajari BIM (Building Information Modeling) lanjutan',
      'Integrasikan desain generatif AI dalam workflow',
      'Kuasai sustainable design dan green architecture',
      'Eksplorasi konstruksi modular dan 3D printing bangunan',
      'Kembangkan keahlian project management digital'
    ]
  }
};

// ─── UPSKILLING DATA ─────────────────────────────
const upskillingData = {
  manufaktur: {
    icon: '🏭', subtitle: 'Dari Operator ke Automation Specialist',
    roadmap: [
      {
        phase: '01', label: 'Fase Fondasi', duration: '0–3 Bulan',
        title: 'Kuasai Dasar Otomasi Industri',
        skills: ['PLC Programming', 'SCADA Basics', 'K3 Industri', 'Dasar Elektronika', 'Microsoft Excel Lanjutan'],
        highlight: ['PLC Programming'],
        desc: 'Mulai dari pemahaman sistem kontrol industri dasar. PLC (Programmable Logic Controller) adalah tulang punggung otomasi pabrik modern.',
        cert: 'Sertifikasi: Siemens SIMATIC S7 Foundation / Allen-Bradley'
      },
      {
        phase: '02', label: 'Fase Pengembangan', duration: '3–6 Bulan',
        title: 'Masuk ke Dunia Industry 4.0',
        skills: ['IoT Sensor Integration', 'Robotics Basics (ROS)', 'Predictive Maintenance', 'Python for Data', 'CAD/CAM Software'],
        highlight: ['IoT Sensor Integration', 'Predictive Maintenance'],
        desc: 'Industry 4.0 menggabungkan IoT, AI, dan data analytics dalam lini produksi. Kemampuan ini yang paling dicari pabrik-pabrik modern.',
        cert: 'Sertifikasi: Coursera "Industry 4.0" / edX Smart Manufacturing'
      },
      {
        phase: '03', label: 'Fase Spesialisasi', duration: '6–12 Bulan',
        title: 'Jadilah Automation Engineer',
        skills: ['Robot Programming (FANUC/KUKA)', 'Machine Learning for QC', 'Digital Twin', 'OEE Optimization', 'Six Sigma'],
        highlight: ['Digital Twin', 'Machine Learning for QC'],
        desc: 'Spesialisasi di robot programming dan digital twin membuka peluang gaji premium di industri manufaktur global.',
        cert: 'Sertifikasi: FANUC Robot Training / Six Sigma Green Belt'
      },
      {
        phase: '04', label: 'Fase Karier', duration: '12+ Bulan',
        title: 'Smart Factory Consultant / Manager',
        skills: ['Smart Factory Design', 'AI-Driven Production', 'Team Leadership', 'Vendor Management', 'ROI Analysis Automation'],
        highlight: ['Smart Factory Design'],
        desc: 'Dengan portofolio otomasi yang solid, kamu bisa naik ke posisi manajerial atau konsultan smart factory dengan kompensasi sangat kompetitif.',
        cert: 'Sertifikasi: PMP / CPIM Supply Chain Management'
      }
    ],
    resources: [
      { type: 'Platform E-Learning', platform: 'Coursera', icon: '🎓', free: false, desc: 'Kursus "Industrial IoT" dari University of Colorado dan "Automation" dari Duke University.', tags: ['IoT', 'Automation', 'Industry 4.0'] },
      { type: 'YouTube Channel', platform: 'RealPars', icon: '▶️', free: true, desc: 'Tutorial PLC, SCADA, dan automation industri dalam format video yang sangat mudah dipahami.', tags: ['PLC', 'SCADA', 'Free'] },
      { type: 'Platform Sertifikasi', platform: 'Siemens Learning', icon: '⚙️', free: false, desc: 'Pelatihan resmi Siemens untuk PLC SIMATIC, TIA Portal, dan sistem otomasi industri.', tags: ['PLC', 'Siemens', 'Bersertifikat'] },
      { type: 'Komunitas Online', platform: 'PLCTalk Forum', icon: '💬', free: true, desc: 'Forum diskusi automation engineer global. Tempat tanya jawab dan berbagi pengalaman terbaik.', tags: ['Community', 'PLC', 'Networking'] },
      { type: 'Platform Belajar', platform: 'edX', icon: '📖', free: true, desc: 'Kursus "Smart Manufacturing" dan "Robotics" dari MIT dan TU Delft — tersedia audit gratis.', tags: ['Robotics', 'Manufacturing', 'MIT'] },
      { type: 'Lokal Indonesia', platform: 'Prakerja + Tokopedia', icon: '🇮🇩', free: true, desc: 'Kursus automation dan teknisi industri dengan subsidi pemerintah lewat Program Kartu Prakerja.', tags: ['Lokal', 'Subsidi', 'Prakerja'] }
    ],
    careers: [
      { title: 'Automation Engineer', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Merancang dan mengimplementasikan sistem otomasi di lini produksi. Gaji entry level cukup kompetitif.', salary: 'Rp 8–20 Jt/bln', growth: '↑ 45% demand dalam 3 tahun' },
      { title: 'Robotics Technician', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Memasang, mengoperasikan, dan memelihara robot industri. Dibutuhkan di semua pabrik modern.', salary: 'Rp 6–15 Jt/bln', growth: '↑ 38% demand dalam 3 tahun' },
      { title: 'Quality Control AI Analyst', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Menggunakan computer vision dan AI untuk inspeksi kualitas produk secara real-time.', salary: 'Rp 9–22 Jt/bln', growth: '↑ 52% demand dalam 3 tahun' },
      { title: 'Smart Factory Manager', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Memimpin transformasi digital pabrik secara menyeluruh. Posisi strategis dengan paket kompensasi premium.', salary: 'Rp 20–50 Jt/bln', growth: '↑ 60% demand dalam 5 tahun' }
    ],
    tools: [
      { emoji: '🤖', name: 'FANUC Robot', use: 'Pemrograman robot industri paling populer di dunia', type: 'Robot Programming' },
      { emoji: '⚙️', name: 'Siemens TIA Portal', use: 'Software PLC & SCADA dari Siemens', type: 'Automation' },
      { emoji: '📊', name: 'Ignition SCADA', use: 'Platform monitoring dan kontrol produksi real-time', type: 'SCADA' },
      { emoji: '🔮', name: 'Azure Digital Twins', use: 'Buat simulasi digital pabrik sebelum implementasi', type: 'Digital Twin' },
      { emoji: '🛠️', name: 'ROS (Robot OS)', use: 'Framework open-source untuk programming robot', type: 'Robotics' },
      { emoji: '📈', name: 'SAP Manufacturing', use: 'ERP terintegrasi untuk manajemen produksi', type: 'ERP' },
      { emoji: '🐍', name: 'Python + TensorFlow', use: 'Machine learning untuk predictive maintenance', type: 'AI/ML' },
      { emoji: '🔧', name: 'AutoCAD Electrical', use: 'Desain sistem kelistrikan dan otomasi', type: 'CAD' }
    ]
  },
  keuangan: {
    icon: '💰', subtitle: 'Dari Analis ke FinTech & AI Finance Specialist',
    roadmap: [
      {
        phase: '01', label: 'Fase Fondasi', duration: '0–3 Bulan',
        title: 'Digital Finance Fundamentals',
        skills: ['Excel & Power BI Lanjutan', 'Python Dasar', 'Financial Modeling', 'SQL Database', 'FinTech Ecosystem'],
        highlight: ['Python Dasar', 'Power BI'],
        desc: 'Mulai dengan memperkuat kemampuan analisis data. Python dan SQL menjadi bahasa wajib analis keuangan di era AI.',
        cert: 'Sertifikasi: Microsoft PL-300 Power BI / Google Data Analytics'
      },
      {
        phase: '02', label: 'Fase Pengembangan', duration: '3–6 Bulan',
        title: 'AI & Data-Driven Finance',
        skills: ['Machine Learning Finance', 'Risk Modeling AI', 'Algorithmic Trading Basics', 'NLP for Finance', 'Blockchain Fundamentals'],
        highlight: ['Machine Learning Finance', 'Risk Modeling AI'],
        desc: 'Pelajari bagaimana AI digunakan dalam credit scoring, fraud detection, dan portfolio optimization.',
        cert: 'Sertifikasi: Coursera "Machine Learning for Trading" / AI in Finance'
      },
      {
        phase: '03', label: 'Fase Spesialisasi', duration: '6–12 Bulan',
        title: 'FinTech & Regulatory Expertise',
        skills: ['RegTech & Compliance AI', 'Robo-Advisory Systems', 'DeFi & Crypto Finance', 'ESG Analytics', 'OJK Regulation Framework'],
        highlight: ['RegTech & Compliance AI', 'ESG Analytics'],
        desc: 'Indonesia membutuhkan profesional yang paham regulasi OJK sekaligus teknologi FinTech. Kombinasi ini sangat langka dan bernilai tinggi.',
        cert: 'Sertifikasi: CFA Level 1 / CFP (Certified Financial Planner)'
      },
      {
        phase: '04', label: 'Fase Karier', duration: '12+ Bulan',
        title: 'Chief Financial Technologist / AI Advisor',
        skills: ['AI Strategy Finance', 'Executive Storytelling', 'Venture Finance', 'M&A with AI Due Diligence', 'Board-level Communication'],
        highlight: ['AI Strategy Finance'],
        desc: 'Profesional keuangan yang memahami AI akan memimpin transformasi digital di bank dan lembaga keuangan.',
        cert: 'Sertifikasi: CFA Level 3 / MIT FinTech Future Commerce'
      }
    ],
    resources: [
      { type: 'Platform E-Learning', platform: 'Coursera / DeepLearning.AI', icon: '🎓', free: false, desc: 'Spesialisasi "AI for Finance" dan "Machine Learning" — salah satu yang terbaik untuk finance professional.', tags: ['AI', 'Finance', 'ML'] },
      { type: 'YouTube', platform: 'Sentdex', icon: '▶️', free: true, desc: 'Tutorial Python untuk analisis keuangan, algorithmic trading, dan machine learning.', tags: ['Python', 'Trading', 'Free'] },
      { type: 'Platform Sertifikasi', platform: 'CFA Institute', icon: '📜', free: false, desc: 'Sertifikasi CFA adalah standar emas profesi keuangan global. Diakui di 170+ negara.', tags: ['CFA', 'Investasi', 'Global'] },
      { type: 'Buku & Jurnal', platform: 'Investopedia', icon: '📖', free: true, desc: 'Ensiklopedia keuangan terlengkap. Artikel mendalam tentang FinTech, AI dalam finance, dan market analysis.', tags: ['Finance', 'Free', 'Reference'] },
      { type: 'Lokal Indonesia', platform: 'OJK Learning Center', icon: '🇮🇩', free: true, desc: 'Materi edukasi resmi dari OJK tentang regulasi keuangan, investasi, dan FinTech di Indonesia.', tags: ['OJK', 'Regulasi', 'Lokal'] },
      { type: 'Bootcamp', platform: 'QuantConnect', icon: '📈', free: true, desc: 'Platform open-source untuk belajar algorithmic trading dan quantitative finance secara gratis.', tags: ['Quant', 'Trading', 'Coding'] }
    ],
    careers: [
      { title: 'FinTech Product Manager', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Memimpin pengembangan produk keuangan digital. Dibutuhkan oleh Gojek, OVO, DANA, dan startup FinTech lain.', salary: 'Rp 15–40 Jt/bln', growth: '↑ 65% demand dalam 3 tahun' },
      { title: 'AI Credit Analyst', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Mengembangkan dan mengoptimalkan model credit scoring berbasis AI untuk bank dan lembaga pembiayaan.', salary: 'Rp 12–28 Jt/bln', growth: '↑ 48% demand dalam 3 tahun' },
      { title: 'Quantitative Analyst (Quant)', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Menggunakan matematika dan coding untuk strategi investasi dan manajemen risiko di perusahaan sekuritas.', salary: 'Rp 18–60 Jt/bln', growth: '↑ 40% demand dalam 5 tahun' },
      { title: 'RegTech Compliance Specialist', demand: 'Sedang', demandColor: '#4dffcb', desc: 'Memastikan kepatuhan regulasi menggunakan AI. Peran yang berkembang seiring ketatnya regulasi keuangan digital.', salary: 'Rp 10–25 Jt/bln', growth: '↑ 35% demand dalam 3 tahun' }
    ],
    tools: [
      { emoji: '🐍', name: 'Python (pandas/NumPy)', use: 'Analisis data dan model keuangan', type: 'Programming' },
      { emoji: '📊', name: 'Power BI / Tableau', use: 'Visualisasi data keuangan yang powerful', type: 'Analytics' },
      { emoji: '🤖', name: 'Bloomberg Terminal AI', use: 'AI-powered financial data & analytics', type: 'Finance Platform' },
      { emoji: '🔗', name: 'Plaid', use: 'API untuk integrasi data perbankan FinTech', type: 'FinTech API' },
      { emoji: '📈', name: 'QuantConnect', use: 'Backtest strategi trading algorithmic', type: 'Trading' },
      { emoji: '🛡️', name: 'Darktrace Finance', use: 'AI untuk deteksi fraud dan keamanan', type: 'Security AI' },
      { emoji: '🏦', name: 'Xero / QuickBooks AI', use: 'Akuntansi cloud dengan otomasi AI', type: 'Accounting' },
      { emoji: '⛓️', name: 'Ethereum / Solidity', use: 'Pemrograman smart contract DeFi', type: 'Blockchain' }
    ]
  },
  transportasi: {
    icon: '🚗', subtitle: 'Dari Driver ke Logistics Technology Expert',
    roadmap: [
      {
        phase: '01', label: 'Fase Fondasi', duration: '0–3 Bulan',
        title: 'Digital Logistics Basics',
        skills: ['GPS & Fleet Management', 'Logistics Software (SAP TM)', 'Supply Chain Basics', 'Data Entry Digital', 'Customer Service Digital'],
        highlight: ['Fleet Management', 'Supply Chain Basics'],
        desc: 'Mulai dengan memahami ekosistem digital logistik — dari tracking real-time hingga manajemen armada berbasis software.',
        cert: 'Sertifikasi: Google IT Support / Digital Logistics Fundamentals'
      },
      {
        phase: '02', label: 'Fase Pengembangan', duration: '3–6 Bulan',
        title: 'Smart Logistics & Route Optimization',
        skills: ['AI Route Optimization', 'Warehouse Management System', 'Drone Operations Basics', 'IoT Fleet Tracking', 'E-commerce Fulfillment'],
        highlight: ['AI Route Optimization', 'Drone Operations'],
        desc: 'AI sudah mengoptimalkan rute pengiriman secara real-time. Pahami cara kerja sistem ini untuk menjadi aset berharga di industri.',
        cert: 'Sertifikasi: APICS CSCP Supply Chain / Amazon Logistics'
      },
      {
        phase: '03', label: 'Fase Spesialisasi', duration: '6–12 Bulan',
        title: 'Last-Mile & Autonomous Logistics',
        skills: ['Last-Mile Delivery Tech', 'Autonomous Vehicle Ops', 'Cold Chain Management', 'Cross-border Logistics', 'Demand Forecasting AI'],
        highlight: ['Last-Mile Delivery Tech', 'Autonomous Vehicle Ops'],
        desc: 'Last-mile delivery adalah satu dari sedikit area yang masih butuh manusia di logistik. Spesialisasi ini tetap relevan meski teknologi berkembang.',
        cert: 'Sertifikasi: IATA Dangerous Goods / Supply Chain Management Pro'
      },
      {
        phase: '04', label: 'Fase Karier', duration: '12+ Bulan',
        title: 'Logistics Operations Manager / Tech Lead',
        skills: ['Logistics Technology Strategy', 'Team & Fleet Leadership', 'Vendor Negotiation', 'KPI & Analytics Dashboard', 'ESG Logistics'],
        highlight: ['Logistics Technology Strategy'],
        desc: 'Dengan pemahaman teknologi dan operasional, kamu bisa memimpin tim logistik yang mengintegrasikan AI dan drone dalam operasi sehari-hari.',
        cert: 'Sertifikasi: PMP / CLTD (Logistics, Transportation & Distribution)'
      }
    ],
    resources: [
      { type: 'Platform E-Learning', platform: 'Coursera / MIT', icon: '🎓', free: false, desc: 'Kursus "Supply Chain Management" dari MIT dan "Last Mile Delivery" dari Georgia Tech.', tags: ['Supply Chain', 'Logistics', 'MIT'] },
      { type: 'YouTube', platform: 'Logistics Bureau', icon: '▶️', free: true, desc: 'Video edukasi tentang supply chain, warehouse management, dan teknologi logistik modern.', tags: ['Logistics', 'Free', 'Supply Chain'] },
      { type: 'Platform Sertifikasi', platform: 'APICS', icon: '📜', free: false, desc: 'APICS menawarkan sertifikasi CPIM dan CSCP yang diakui global untuk supply chain professional.', tags: ['APICS', 'Sertifikasi', 'Global'] },
      { type: 'Lokal Indonesia', platform: 'Tokopedia University', icon: '🇮🇩', free: true, desc: 'Kursus logistik, e-commerce fulfillment, dan supply chain untuk pasar Indonesia.', tags: ['E-commerce', 'Lokal', 'Free'] },
      { type: 'Komunitas', platform: 'ALFI Indonesia', icon: '🤝', free: true, desc: 'Asosiasi Logistik dan Forwarder Indonesia — networking dan update industri logistik lokal.', tags: ['Networking', 'Asosiasi', 'Lokal'] },
      { type: 'E-Learning', platform: 'LinkedIn Learning', icon: '💼', free: false, desc: 'Kursus warehouse management, supply chain analytics, dan drone delivery operations.', tags: ['Professional', 'Drone', 'Warehouse'] }
    ],
    careers: [
      { title: 'Fleet Manager (Digital)', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Mengelola armada kendaraan menggunakan AI dan IoT untuk optimasi rute dan biaya operasional.', salary: 'Rp 8–20 Jt/bln', growth: '↑ 35% demand dalam 3 tahun' },
      { title: 'Last-Mile Delivery Specialist', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Merancang dan mengoptimalkan operasi pengiriman kilometer terakhir yang kritis di e-commerce.', salary: 'Rp 7–18 Jt/bln', growth: '↑ 55% demand dalam 3 tahun' },
      { title: 'Drone Logistics Operator', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Mengoperasikan drone untuk pengiriman atau survei logistik. Profesi baru dengan demand yang terus naik.', salary: 'Rp 8–22 Jt/bln', growth: '↑ 70% demand dalam 5 tahun' },
      { title: 'Supply Chain Data Analyst', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Menganalisis data supply chain untuk mengoptimalkan inventori, demand forecasting, dan biaya logistik.', salary: 'Rp 10–25 Jt/bln', growth: '↑ 60% demand dalam 3 tahun' }
    ],
    tools: [
      { emoji: '🗺️', name: 'Google Maps Platform', use: 'Route optimization API untuk logistik', type: 'Routing' },
      { emoji: '📦', name: 'SAP Transportation Mgmt', use: 'ERP untuk manajemen transportasi enterprise', type: 'TMS' },
      { emoji: '🚁', name: 'DJI Enterprise', use: 'Drone untuk pengiriman dan survei logistik', type: 'Drone' },
      { emoji: '📡', name: 'Samsara IoT', use: 'Platform IoT untuk fleet tracking real-time', type: 'IoT' },
      { emoji: '🤖', name: 'Geek+ Robotics', use: 'Robot warehouse untuk sortasi otomatis', type: 'Warehouse Robot' },
      { emoji: '📊', name: 'Tableau / Power BI', use: 'Dashboard analytics supply chain', type: 'Analytics' },
      { emoji: '🔮', name: 'Blue Yonder AI', use: 'AI untuk demand forecasting dan planning', type: 'AI Forecasting' },
      { emoji: '🏭', name: 'Shopify Fulfillment', use: 'Platform fulfillment e-commerce terintegrasi', type: 'E-Commerce' }
    ]
  },
  ritel: {
    icon: '🛍️', subtitle: 'Dari Kasir ke Digital Commerce Specialist',
    roadmap: [
      {
        phase: '01', label: 'Fase Fondasi', duration: '0–3 Bulan',
        title: 'Digital Commerce Basics',
        skills: ['E-commerce Platform (Shopee/Tokopedia)', 'Social Media Marketing', 'Digital Photography', 'Customer Analytics Basic', 'Copywriting Digital'],
        highlight: ['E-commerce Platform', 'Social Media Marketing'],
        desc: 'Mulai dengan membangun presence di platform e-commerce dan memahami perilaku konsumen digital Indonesia.',
        cert: 'Sertifikasi: Google Digital Marketing / Meta Blueprint'
      },
      {
        phase: '02', label: 'Fase Pengembangan', duration: '3–6 Bulan',
        title: 'Data-Driven Retail Marketing',
        skills: ['CRM & Customer Segmentation', 'SEO & SEM', 'Email Marketing Automation', 'Product Analytics', 'Influencer Marketing'],
        highlight: ['CRM & Customer Segmentation', 'Product Analytics'],
        desc: 'Retailer modern berhasil bukan karena harga murah, tapi karena mereka mengerti data pelanggan mereka lebih baik dari siapapun.',
        cert: 'Sertifikasi: HubSpot CRM / Google Analytics 4'
      },
      {
        phase: '03', label: 'Fase Spesialisasi', duration: '6–12 Bulan',
        title: 'Omnichannel & AI Commerce',
        skills: ['Omnichannel Strategy', 'AI Recommendation Engine', 'Live Commerce & Streaming', 'AR Shopping Experience', 'Supply Chain Digital'],
        highlight: ['Live Commerce', 'AI Recommendation Engine'],
        desc: 'Live commerce dan AR shopping adalah masa depan ritel. Kombinasi entertainment dan belanja membuka peluang baru yang tidak bisa diotomasi sepenuhnya.',
        cert: 'Sertifikasi: Shopify Partners / TikTok Shop Expert'
      },
      {
        phase: '04', label: 'Fase Karier', duration: '12+ Bulan',
        title: 'E-Commerce Director / Brand Builder',
        skills: ['Brand Strategy', 'D2C (Direct to Consumer)', 'International Market Expansion', 'Retail AI Consulting', 'Investor Pitch'],
        highlight: ['D2C Strategy', 'Brand Building'],
        desc: 'Dengan track record dan expertise digital commerce, kamu bisa memimpin brand lokal go global atau jadi konsultan e-commerce.',
        cert: 'Sertifikasi: MBA Digital Marketing / Shopify Commerce+'
      }
    ],
    resources: [
      { type: 'Platform Belajar', platform: 'Tokopedia Academy', icon: '🛒', free: true, desc: 'Pelatihan resmi untuk seller dan merchant Tokopedia — dari foto produk hingga ads optimization.', tags: ['E-commerce', 'Lokal', 'Free'] },
      { type: 'Sertifikasi', platform: 'Google Digital Garage', icon: '🎓', free: true, desc: 'Kursus digital marketing, e-commerce, dan analytics dari Google. Sertifikat diakui industri.', tags: ['Google', 'Digital Marketing', 'Free'] },
      { type: 'Platform E-Learning', platform: 'Shopify Learn', icon: '🛍️', free: true, desc: 'Tutorial lengkap membangun toko online, manajemen produk, dan strategi scale-up bisnis.', tags: ['Shopify', 'E-commerce', 'Free'] },
      { type: 'Komunitas', platform: 'Indonesian E-Commerce Community', icon: '🤝', free: true, desc: 'Komunitas seller dan retailer digital Indonesia yang aktif berbagi strategi dan tips terbaru.', tags: ['Community', 'Lokal', 'Networking'] },
      { type: 'Platform Ads', platform: 'Meta Blueprint', icon: '📘', free: true, desc: 'Kursus resmi Facebook dan Instagram Ads dari Meta untuk para digital marketer.', tags: ['Meta', 'Ads', 'Social Media'] },
      { type: 'Analytics', platform: 'Google Analytics 4 Academy', icon: '📊', free: true, desc: 'Belajar menganalisis perilaku pengunjung toko online dan mengoptimalkan konversi penjualan.', tags: ['Analytics', 'Conversion', 'Free'] }
    ],
    careers: [
      { title: 'E-Commerce Manager', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Mengelola seluruh operasi toko online dari pricing, inventory, hingga ads. Demand sangat tinggi di marketplace.', salary: 'Rp 8–22 Jt/bln', growth: '↑ 55% demand dalam 3 tahun' },
      { title: 'Live Commerce Host/Streamer', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Menjual produk secara live di TikTok Shop, Shopee Live, dan Lazada Live. Pasar tumbuh 200% per tahun.', salary: 'Rp 5–50 Jt/bln', growth: '↑ 200% demand dalam 2 tahun' },
      { title: 'Retail Data Analyst', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Menganalisis data penjualan, perilaku konsumen, dan tren produk untuk keputusan bisnis berbasis data.', salary: 'Rp 10–25 Jt/bln', growth: '↑ 45% demand dalam 3 tahun' },
      { title: 'Brand & Community Manager', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Membangun komunitas pelanggan loyal dan mengelola brand identity di era digital. Skill manusia yang tak tergantikan.', salary: 'Rp 7–18 Jt/bln', growth: '↑ 40% demand dalam 3 tahun' }
    ],
    tools: [
      { emoji: '🛒', name: 'Shopify / Tokopedia API', use: 'Platform e-commerce dan integrasi toko', type: 'E-Commerce' },
      { emoji: '📊', name: 'Google Analytics 4', use: 'Analisis traffic dan konversi toko online', type: 'Analytics' },
      { emoji: '🤖', name: 'Klevu AI', use: 'AI-powered search dan rekomendasi produk', type: 'AI Commerce' },
      { emoji: '📧', name: 'Klaviyo', use: 'Email & SMS marketing automation untuk retail', type: 'Marketing' },
      { emoji: '📱', name: 'TikTok Shop', use: 'Platform live commerce yang sedang booming', type: 'Live Commerce' },
      { emoji: '🎨', name: 'Canva / Adobe Express', use: 'Desain materi marketing produk dengan cepat', type: 'Design' },
      { emoji: '📦', name: 'Brightpearl', use: 'Inventory management omnichannel retail', type: 'Inventory' },
      { emoji: '🔍', name: 'SEMrush', use: 'SEO dan kompetitor analysis untuk toko online', type: 'SEO' }
    ]
  },
  kesehatan: {
    icon: '🏥', subtitle: 'Dari Tenaga Medis ke HealthTech Professional',
    roadmap: [
      {
        phase: '01', label: 'Fase Fondasi', duration: '0–3 Bulan',
        title: 'Health Informatics & Digital Tools',
        skills: ['Electronic Health Records (EHR)', 'Telemedicine Platform', 'Health Data Privacy (HIPAA)', 'Microsoft Office Advanced', 'Basic Health Informatics'],
        highlight: ['EHR', 'Telemedicine'],
        desc: 'Profesional kesehatan yang bisa menggunakan teknologi digital akan jauh lebih produktif dan tidak akan tergantikan AI.',
        cert: 'Sertifikasi: Epic EHR Training / Health Informatics Certificate'
      },
      {
        phase: '02', label: 'Fase Pengembangan', duration: '3–6 Bulan',
        title: 'AI-Assisted Clinical Practice',
        skills: ['AI Diagnostic Tools (radiology/pathology)', 'Clinical Data Analytics', 'Wearable & IoMT Devices', 'Mental Health Tech', 'Patient Engagement Apps'],
        highlight: ['AI Diagnostic Tools', 'Clinical Data Analytics'],
        desc: 'AI sudah membantu dokter mendiagnosis lebih akurat. Tenaga medis yang bisa kolaborasi dengan AI akan menjadi yang paling dicari.',
        cert: 'Sertifikasi: Coursera Health Informatics / Stanford AI in Medicine'
      },
      {
        phase: '03', label: 'Fase Spesialisasi', duration: '6–12 Bulan',
        title: 'HealthTech Specialization',
        skills: ['Drug Discovery AI', 'Genomics & Precision Medicine', 'Hospital Operations Analytics', 'Digital Therapeutics', 'Global Health Policy'],
        highlight: ['Precision Medicine', 'Digital Therapeutics'],
        desc: 'Precision medicine dan genomics adalah masa depan kesehatan. Spesialisasi ini membutuhkan kombinasi unik antara ilmu medis dan teknologi.',
        cert: 'Sertifikasi: AMIA Health Informatics / Digital Health Certificate'
      },
      {
        phase: '04', label: 'Fase Karier', duration: '12+ Bulan',
        title: 'Chief Medical Information Officer / HealthTech Consultant',
        skills: ['Hospital Digital Transformation', 'HealthTech Startup Advisory', 'Clinical AI Ethics', 'Healthcare Policy', 'Research & Publication'],
        highlight: ['Digital Transformation', 'AI Ethics Healthcare'],
        desc: 'Profesional medis yang paham teknologi sangat dibutuhkan untuk memimpin transformasi digital di rumah sakit dan startup kesehatan.',
        cert: 'Sertifikasi: HIMSS Digital Health / Hospital Administration MBA'
      }
    ],
    resources: [
      { type: 'MOOC Elite', platform: 'Stanford Medicine', icon: '🏫', free: false, desc: 'Kursus "AI in Medicine" dari Stanford. Program terbaik untuk tenaga medis yang ingin masuk HealthTech.', tags: ['AI', 'Medicine', 'Stanford'] },
      { type: 'YouTube', platform: 'Andromeda Channel', icon: '▶️', free: true, desc: 'Konten edukasi kesehatan dan HealthTech dalam bahasa Indonesia yang mudah dipahami.', tags: ['Lokal', 'HealthTech', 'Free'] },
      { type: 'Jurnal', platform: 'NEJM & The Lancet Digital', icon: '📚', free: false, desc: 'Jurnal medis terkemuka dengan section khusus digital health dan AI in medicine.', tags: ['Research', 'Jurnal', 'Clinical'] },
      { type: 'Platform Lokal', platform: 'IDI Digital & KemKes', icon: '🇮🇩', free: true, desc: 'Program digitalisasi kesehatan dari Ikatan Dokter Indonesia dan Kementerian Kesehatan RI.', tags: ['Lokal', 'IDI', 'Government'] },
      { type: 'Sertifikasi', platform: 'Coursera / Johns Hopkins', icon: '🎓', free: false, desc: 'Spesialisasi "Health Informatics" dari Johns Hopkins University — program terbaik di bidangnya.', tags: ['Sertifikasi', 'Informatics', 'Hopkins'] },
      { type: 'Komunitas', platform: 'HealthTech Indonesia', icon: '🤝', free: true, desc: 'Komunitas profesional HealthTech Indonesia — networking, sharing, dan job opportunities.', tags: ['Community', 'Networking', 'Lokal'] }
    ],
    careers: [
      { title: 'Clinical Informatics Specialist', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Mengelola sistem EHR dan clinical data di rumah sakit. Peran hybrid antara medis dan IT yang sangat dibutuhkan.', salary: 'Rp 10–25 Jt/bln', growth: '↑ 45% demand dalam 3 tahun' },
      { title: 'Telemedicine Doctor/Nurse', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Memberikan konsultasi medis secara online. Demand meledak sejak pandemi dan terus tumbuh.', salary: 'Rp 8–30 Jt/bln', growth: '↑ 80% demand dalam 3 tahun' },
      { title: 'HealthTech Product Manager', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Memimpin pengembangan produk digital kesehatan di startup dan perusahaan HealthTech.', salary: 'Rp 15–45 Jt/bln', growth: '↑ 55% demand dalam 3 tahun' },
      { title: 'AI Healthcare Data Analyst', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Menganalisis data klinis untuk meningkatkan outcome pasien dan efisiensi operasional rumah sakit.', salary: 'Rp 12–30 Jt/bln', growth: '↑ 50% demand dalam 3 tahun' }
    ],
    tools: [
      { emoji: '💊', name: 'Epic EHR', use: 'Sistem rekam medis elektronik terpopuler', type: 'EHR' },
      { emoji: '🩺', name: 'Aidoc', use: 'AI untuk deteksi penyakit dari citra medis', type: 'AI Diagnostic' },
      { emoji: '📱', name: 'Halodoc / Alodokter', use: 'Platform telemedicine Indonesia', type: 'Telemedicine' },
      { emoji: '⌚', name: 'Apple Watch / Fitbit', use: 'Wearable untuk monitoring kesehatan real-time', type: 'IoMT' },
      { emoji: '🧬', name: '23andMe API', use: 'Platform genomics untuk precision medicine', type: 'Genomics' },
      { emoji: '🤖', name: 'IBM Watson Health', use: 'AI analytics untuk clinical decision support', type: 'AI Analytics' },
      { emoji: '📊', name: 'Tableau Healthcare', use: 'Visualisasi data kesehatan dan outcome pasien', type: 'Analytics' },
      { emoji: '🔒', name: 'Microsoft Azure HIPAA', use: 'Cloud healthcare data storage yang compliant', type: 'Cloud Security' }
    ]
  },
  hukum: {
    icon: '⚖️', subtitle: 'Dari Paralegal ke Legal Technology Expert',
    roadmap: [
      {
        phase: '01', label: 'Fase Fondasi', duration: '0–3 Bulan',
        title: 'LegalTech Fundamentals',
        skills: ['Legal Research Tools Digital', 'Contract Management Software', 'E-Discovery Basics', 'Microsoft 365 Lanjutan', 'Legal Project Management'],
        highlight: ['Contract Management', 'E-Discovery'],
        desc: 'LegalTech adalah pasar yang tumbuh pesat. Pengacara yang bisa menggunakan tools modern akan jauh lebih produktif.',
        cert: 'Sertifikasi: CIPP/E Privacy Law / Legal Project Management'
      },
      {
        phase: '02', label: 'Fase Pengembangan', duration: '3–6 Bulan',
        title: 'AI-Powered Legal Practice',
        skills: ['Harvey AI & Contract AI', 'Legal Analytics', 'Predictive Litigation', 'Document Automation', 'Regulatory Technology (RegTech)'],
        highlight: ['Harvey AI', 'Predictive Litigation'],
        desc: 'AI seperti Harvey sudah bisa review kontrak ratusan halaman dalam hitungan menit. Pengacara yang paham tools ini menjadi 10x lebih efektif.',
        cert: 'Sertifikasi: Relativity Certified Admin / CIPP Certification'
      },
      {
        phase: '03', label: 'Fase Spesialisasi', duration: '6–12 Bulan',
        title: 'Tech Law & Digital Compliance',
        skills: ['Hukum AI & Data Privacy', 'Cybersecurity Law', 'Intellectual Property Digital', 'Fintech & Crypto Regulation', 'International Arbitration'],
        highlight: ['Hukum AI', 'Data Privacy'],
        desc: 'Indonesia membutuhkan pengacara yang memahami regulasi AI dan data privasi. UU Perlindungan Data Pribadi (PDP) membuka banyak peluang.',
        cert: 'Sertifikasi: IAPP CIPM / Privacy by Design'
      },
      {
        phase: '04', label: 'Fase Karier', duration: '12+ Bulan',
        title: 'General Counsel / LegalTech Founder',
        skills: ['AI Strategy Legal', 'Board-level Counsel', 'LegalTech Entrepreneurship', 'International Law', 'Legal Operations (Legal Ops)'],
        highlight: ['Legal Ops', 'AI Strategy'],
        desc: 'Kombinasi keahlian hukum dan teknologi membuka jalan ke posisi General Counsel atau mendirikan startup LegalTech.',
        cert: 'Sertifikasi: Stanford LegalTech Certificate / Harvard LLM'
      }
    ],
    resources: [
      { type: 'Platform AI Legal', platform: 'Harvey AI', icon: '⚖️', free: false, desc: 'Platform AI khusus hukum yang digunakan oleh firma hukum top dunia untuk review kontrak dan research.', tags: ['AI', 'Kontrak', 'Harvey'] },
      { type: 'E-Learning', platform: 'Coursera Law', icon: '🎓', free: false, desc: 'Kursus "LegalTech" dari Yale Law School dan "Data Privacy" dari University of Michigan.', tags: ['LegalTech', 'Yale', 'Privacy'] },
      { type: 'Komunitas Lokal', platform: 'ILUNI Hukum UI', icon: '🇮🇩', free: true, desc: 'Jaringan alumni hukum Universitas Indonesia — networking dan pengembangan profesi hukum Indonesia.', tags: ['Lokal', 'Networking', 'UI'] },
      { type: 'Jurnal', platform: 'Harvard Law Review', icon: '📚', free: true, desc: 'Jurnal hukum terkemuka dengan artikel tentang AI law, digital regulation, dan tech policy.', tags: ['Research', 'AI Law', 'Harvard'] },
      { type: 'Sertifikasi Privasi', platform: 'IAPP (iapp.org)', icon: '🔒', free: false, desc: 'Sertifikasi CIPP/CIPM/CIPT untuk spesialis privasi data — sangat relevan dengan UU PDP Indonesia.', tags: ['Privacy', 'GDPR', 'PDP'] },
      { type: 'Platform Indonesia', platform: 'Hukumonline', icon: '📖', free: false, desc: 'Database hukum Indonesia terlengkap. Peraturan, putusan pengadilan, dan analisis regulasi terbaru.', tags: ['Hukum Indonesia', 'Database', 'Regulasi'] }
    ],
    careers: [
      { title: 'Legal Technology Specialist', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Implementasi dan manajemen tools LegalTech di firma hukum dan perusahaan. Peran baru yang langka.', salary: 'Rp 12–30 Jt/bln', growth: '↑ 60% demand dalam 3 tahun' },
      { title: 'Data Privacy Counsel', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Memastikan kepatuhan perusahaan terhadap UU PDP Indonesia dan GDPR. Demand melonjak sejak UU PDP.', salary: 'Rp 15–40 Jt/bln', growth: '↑ 90% demand setelah UU PDP' },
      { title: 'AI & Tech Regulation Lawyer', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Spesialisasi hukum AI, fintech, dan regulasi teknologi. Bidang baru dengan kompetisi yang masih sangat rendah.', salary: 'Rp 15–50 Jt/bln', growth: '↑ 75% demand dalam 3 tahun' },
      { title: 'Legal Operations Manager', demand: 'Sedang', demandColor: '#4dffcb', desc: 'Mengoptimalkan operasional departemen hukum perusahaan menggunakan teknologi dan process improvement.', salary: 'Rp 12–28 Jt/bln', growth: '↑ 40% demand dalam 3 tahun' }
    ],
    tools: [
      { emoji: '🤖', name: 'Harvey AI', use: 'AI untuk legal research dan review kontrak', type: 'Legal AI' },
      { emoji: '📋', name: 'Kira Systems', use: 'Machine learning untuk analisis kontrak massal', type: 'Contract AI' },
      { emoji: '🔍', name: 'Relativity', use: 'Platform e-discovery dan document review', type: 'E-Discovery' },
      { emoji: '📖', name: 'Hukumonline Pro', use: 'Database hukum Indonesia paling lengkap', type: 'Legal Research' },
      { emoji: '✍️', name: 'DocuSign', use: 'E-signature dan contract lifecycle management', type: 'Contracts' },
      { emoji: '🛡️', name: 'OneTrust', use: 'Platform manajemen privasi data dan compliance', type: 'Privacy Tech' },
      { emoji: '📊', name: 'Lex Machina', use: 'Legal analytics dan prediksi outcome litigasi', type: 'Analytics' },
      { emoji: '🌐', name: 'LexisNexis AI', use: 'Research hukum global berbantuan AI', type: 'Research AI' }
    ]
  },
  pendidikan: {
    icon: '🎓', subtitle: 'Dari Guru ke EdTech Innovator',
    roadmap: [
      {
        phase: '01', label: 'Fase Fondasi', duration: '0–3 Bulan',
        title: 'Digital Teaching Fundamentals',
        skills: ['Google Workspace for Education', 'Zoom / Google Meet Pro', 'Canva & Slide Design', 'LMS (Google Classroom/Moodle)', 'Basic Video Editing'],
        highlight: ['LMS', 'Video Production'],
        desc: 'Pendidik yang menguasai tools digital bisa menjangkau lebih banyak siswa dan menciptakan pengalaman belajar yang lebih menarik.',
        cert: 'Sertifikasi: Google Certified Educator / Microsoft Innovative Educator'
      },
      {
        phase: '02', label: 'Fase Pengembangan', duration: '3–6 Bulan',
        title: 'AI-Enhanced Teaching',
        skills: ['ChatGPT for Education', 'Khanmigo AI Tutor', 'Personalized Learning Design', 'Learning Analytics', 'Gamification'],
        highlight: ['ChatGPT for Education', 'Personalized Learning'],
        desc: 'Guru yang mengintegrasikan AI seperti Khanmigo bisa mempersonalisasi pembelajaran untuk setiap siswa — sesuatu yang tidak bisa dilakukan tanpa teknologi.',
        cert: 'Sertifikasi: Coursera "AI for Teachers" / Khan Academy Khanmigo'
      },
      {
        phase: '03', label: 'Fase Spesialisasi', duration: '6–12 Bulan',
        title: 'Instructional Design & EdTech',
        skills: ['Instructional Design (ADDIE)', 'Course Creation (Udemy/Ruangguru)', 'VR/AR Learning Experience', 'Assessment & Feedback AI', 'Social-Emotional Learning'],
        highlight: ['Instructional Design', 'Course Creation'],
        desc: 'Instructional designer adalah arsitek pembelajaran — menggabungkan pedagogi dengan teknologi untuk menciptakan pengalaman belajar yang transformatif.',
        cert: 'Sertifikasi: ATD Instructional Design / Articulate 360'
      },
      {
        phase: '04', label: 'Fase Karier', duration: '12+ Bulan',
        title: 'EdTech Leader / Course Creator',
        skills: ['EdTech Product Strategy', 'Learning Experience Platform', 'Online Course Business', 'Education Policy AI', 'Research & Publication'],
        highlight: ['EdTech Strategy', 'Online Business'],
        desc: 'Guru yang menguasai teknologi bisa membangun platform edukasi sendiri atau memimpin transformasi digital di institusi pendidikan.',
        cert: 'Sertifikasi: EdD Educational Technology / MIT Teaching with Digital Technology'
      }
    ],
    resources: [
      { type: 'Platform Lokal', platform: 'Ruangguru for Educator', icon: '🇮🇩', free: true, desc: 'Program mitra pengajar Ruangguru — bisa mengajar online dan mendapat income tambahan.', tags: ['Lokal', 'Teaching', 'Income'] },
      { type: 'Komunitas', platform: 'Guru Penggerak Kemendikbud', icon: '🏫', free: true, desc: 'Program Kemendikbud untuk mengembangkan guru inovatif yang mengintegrasikan teknologi dalam pembelajaran.', tags: ['Pemerintah', 'Sertifikasi', 'Free'] },
      { type: 'E-Learning', platform: 'Coursera for Educators', icon: '🎓', free: false, desc: 'Kursus "Learning How to Learn" dari UCSD dan "AI for Teachers" untuk pengembangan profesional guru.', tags: ['Learning Design', 'AI', 'Teachers'] },
      { type: 'Platform Kursus', platform: 'Udemy (Instructor)', icon: '💰', free: true, desc: 'Buat dan jual kursus online di Udemy. Ribuan guru Indonesia sudah menghasilkan puluhan juta dari platform ini.', tags: ['Income', 'Online Course', 'Business'] },
      { type: 'Tools AI', platform: 'Khan Academy Khanmigo', icon: '🤖', free: false, desc: 'AI tutor dari Khan Academy yang membantu personalisasi pembelajaran siswa secara individual.', tags: ['AI Tutor', 'Personalized', 'Khan'] },
      { type: 'Desain', platform: 'Canva for Education', icon: '🎨', free: true, desc: 'Versi premium Canva gratis untuk guru — buat materi ajar yang menarik secara visual.', tags: ['Design', 'Free', 'Visual Learning'] }
    ],
    careers: [
      { title: 'Instructional Designer', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Merancang program pelatihan dan e-learning untuk perusahaan dan lembaga pendidikan. Demand korporat sangat tinggi.', salary: 'Rp 8–22 Jt/bln', growth: '↑ 45% demand dalam 3 tahun' },
      { title: 'Online Course Creator', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Buat dan monetisasi kursus online di platform seperti Udemy, Ruangguru, atau platform mandiri.', salary: 'Rp 5–50 Jt/bln', growth: '↑ 60% demand konten edukasi' },
      { title: 'EdTech Product Manager', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Memimpin pengembangan produk startup edukasi seperti Ruangguru, Zenius, Cakap, dll.', salary: 'Rp 15–40 Jt/bln', growth: '↑ 70% startup EdTech Indonesia' },
      { title: 'AI Literacy Trainer', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Melatih siswa dan profesional tentang cara menggunakan AI secara efektif dan etis. Profesi baru yang paling dibutuhkan!', salary: 'Rp 8–25 Jt/bln', growth: '↑ Baru tapi demand sangat cepat' }
    ],
    tools: [
      { emoji: '🤖', name: 'Khanmigo (Khan Academy)', use: 'AI tutor yang membantu personalisasi belajar', type: 'AI Tutor' },
      { emoji: '🎓', name: 'Google Classroom', use: 'LMS paling populer untuk manajemen kelas digital', type: 'LMS' },
      { emoji: '🎮', name: 'Kahoot! / Quizizz', use: 'Gamifikasi kuis dan assessment yang engaging', type: 'Gamification' },
      { emoji: '🎨', name: 'Canva for Education', use: 'Desain materi ajar visual yang profesional', type: 'Design' },
      { emoji: '📹', name: 'Loom', use: 'Record dan share video penjelasan dengan mudah', type: 'Video Tool' },
      { emoji: '🧠', name: 'ChatGPT / Claude', use: 'Asisten AI untuk persiapan materi dan personalisasi', type: 'AI Assistant' },
      { emoji: '📊', name: 'Articulate Storyline', use: 'Buat e-learning interaktif profesional', type: 'E-Learning Authoring' },
      { emoji: '🌐', name: 'Moodle', use: 'Platform LMS open-source untuk institusi pendidikan', type: 'LMS Open-Source' }
    ]
  },
  media: {
    icon: '📡', subtitle: 'Dari Jurnalis ke Digital Media Strategist',
    roadmap: [
      {
        phase: '01', label: 'Fase Fondasi', duration: '0–3 Bulan',
        title: 'Digital Storytelling Basics',
        skills: ['Video Production & Editing', 'Podcast Production', 'SEO for Content', 'Social Media Strategy', 'WordPress / CMS'],
        highlight: ['Video Production', 'SEO'],
        desc: 'Jurnalis dan kreator konten yang bisa memproduksi multimedia akan jauh lebih berharga dari yang hanya bisa menulis.',
        cert: 'Sertifikasi: Google News Initiative / Facebook Journalism Project'
      },
      {
        phase: '02', label: 'Fase Pengembangan', duration: '3–6 Bulan',
        title: 'Data Journalism & Verification',
        skills: ['Data Journalism Tools', 'Fact-Checking Methodologi', 'AI Content Detection', 'Investigative Reporting', 'OSINT (Open Source Intelligence)'],
        highlight: ['Data Journalism', 'Fact-Checking', 'OSINT'],
        desc: 'Jurnalisme data dan verifikasi fakta adalah kekuatan manusia yang tidak bisa digantikan AI. Ini justru area yang paling dibutuhkan di era disinformasi.',
        cert: 'Sertifikasi: Knight Center Data Journalism / Bellingcat OSINT'
      },
      {
        phase: '03', label: 'Fase Spesialisasi', duration: '6–12 Bulan',
        title: 'Media Innovation & Creator Economy',
        skills: ['Newsletter & Substack', 'YouTube Channel Building', 'Personal Brand Strategy', 'Multimedia Narrative', 'AI Tools for Media (Ethical Use)'],
        highlight: ['Newsletter Business', 'Personal Brand'],
        desc: 'Era creator economy memberi jurnalis kesempatan membangun bisnis media sendiri dengan audiens yang loyal.',
        cert: 'Sertifikasi: Reuters Digital Journalism / Google Certificate in Digital Marketing'
      },
      {
        phase: '04', label: 'Fase Karier', duration: '12+ Bulan',
        title: 'Media Entrepreneur / Content Director',
        skills: ['Media Business Model', 'Subscription & Monetization', 'Branded Content Strategy', 'AI-Human Newsroom', 'International Reporting'],
        highlight: ['Media Business Model', 'Monetization'],
        desc: 'Jurnalis yang berhasil membangun brand personal dan platform sendiri bisa jauh lebih sukses dan independen dari media tradisional.',
        cert: 'Sertifikasi: Journalism Innovation Leader / Columbia Journalism School'
      }
    ],
    resources: [
      { type: 'Sertifikasi Gratis', platform: 'Google News Initiative', icon: '📰', free: true, desc: 'Kursus gratis dari Google untuk jurnalis: digital storytelling, data journalism, dan monetisasi konten.', tags: ['Google', 'Journalism', 'Free'] },
      { type: 'Training Investigasi', platform: 'Bellingcat', icon: '🔍', free: true, desc: 'Metodologi OSINT dan investigasi digital dari komunitas jurnalis investigatif terkemuka dunia.', tags: ['OSINT', 'Investigasi', 'Free'] },
      { type: 'Platform Lokal', platform: 'AJI Indonesia', icon: '🇮🇩', free: true, desc: 'Aliansi Jurnalis Independen — pelatihan, networking, dan pengembangan profesional jurnalis Indonesia.', tags: ['AJI', 'Lokal', 'Networking'] },
      { type: 'Newsletter Platform', platform: 'Substack', icon: '✉️', free: true, desc: 'Platform untuk membangun newsletter berbayar. Banyak jurnalis Indonesia sudah menghasilkan jutaan dari Substack.', tags: ['Newsletter', 'Monetisasi', 'Creator'] },
      { type: 'Data Tools', platform: 'Datawrapper', icon: '📊', free: true, desc: 'Tools data visualisasi gratis untuk jurnalis. Buat chart dan infografis interaktif tanpa coding.', tags: ['Data', 'Visualisasi', 'Free'] },
      { type: 'Komunitas', platform: 'Tempo Institut', icon: '🤝', free: false, desc: 'Lembaga pelatihan jurnalisme dari media Tempo — investigasi, data, dan multimedia journalism.', tags: ['Training', 'Investigasi', 'Lokal'] }
    ],
    careers: [
      { title: 'Data Journalist', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Menggunakan data dan visualisasi untuk bercerita. Sangat langka di Indonesia, permintaan terus meningkat.', salary: 'Rp 8–20 Jt/bln', growth: '↑ 55% demand dalam 3 tahun' },
      { title: 'Newsletter Creator', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Membangun bisnis newsletter premium dengan subscriber berbayar. Model bisnis yang tahan dari disrupsi AI.', salary: 'Rp 5–50 Jt/bln', growth: '↑ Creator Economy tumbuh 200%' },
      { title: 'Content Strategy Director', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Memimpin strategi konten brand atau media. Menentukan suara, positioning, dan distribusi konten perusahaan.', salary: 'Rp 15–40 Jt/bln', growth: '↑ 45% demand dalam 3 tahun' },
      { title: 'AI Content Ethicist', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Memastikan penggunaan AI dalam media yang etis dan bertanggung jawab. Profesi baru yang sangat dibutuhkan.', salary: 'Rp 12–35 Jt/bln', growth: '↑ Profesi baru, demand cepat naik' }
    ],
    tools: [
      { emoji: '📊', name: 'Datawrapper', use: 'Visualisasi data untuk jurnalisme online', type: 'Data Viz' },
      { emoji: '🔍', name: 'Maltego', use: 'OSINT dan investigasi digital investigatif', type: 'OSINT' },
      { emoji: '🤖', name: 'Originality.ai', use: 'Deteksi konten AI vs konten manusia', type: 'AI Detection' },
      { emoji: '✉️', name: 'Substack / Beehiiv', use: 'Platform newsletter berbayar untuk kreator', type: 'Newsletter' },
      { emoji: '🎥', name: 'Premiere Pro / DaVinci', use: 'Editing video dan produksi multimedia', type: 'Video' },
      { emoji: '🧩', name: 'Notion', use: 'Manajemen riset dan penulisan investigasi', type: 'Research' },
      { emoji: '🌍', name: 'Archive.org / WayBack', use: 'Verifikasi konten digital dan cek sejarah URL', type: 'Verification' },
      { emoji: '🎙️', name: 'Riverside.fm', use: 'Rekam podcast dan video interview berkualitas', type: 'Podcast' }
    ]
  },
  akunting: {
    icon: '📊', subtitle: 'Dari Akuntan Entry ke Financial Advisory Expert',
    roadmap: [
      {
        phase: '01', label: 'Fase Fondasi', duration: '0–3 Bulan',
        title: 'Cloud Accounting Mastery',
        skills: ['Xero / QuickBooks Online', 'Excel Advanced & Power Query', 'Cloud ERP Basics', 'PSAK Digital', 'Pajak Online (DJP)'],
        highlight: ['Xero', 'Cloud ERP'],
        desc: 'Akuntan yang masih manual sudah tidak relevan. Kuasai platform cloud accounting yang mengotomasi pekerjaan repetitif.',
        cert: 'Sertifikasi: Xero Advisor Certified / QuickBooks ProAdvisor'
      },
      {
        phase: '02', label: 'Fase Pengembangan', duration: '3–6 Bulan',
        title: 'Data Analytics for Finance',
        skills: ['Power BI for Finance', 'Python for Accounting', 'Financial Modeling Advanced', 'Tax Planning Digital', 'Audit Data Analytics'],
        highlight: ['Power BI', 'Python for Accounting'],
        desc: 'Akuntan yang bisa menganalisis data jauh melampaui yang hanya bisa mencatat transaksi. Ini adalah diferensiasi kritis.',
        cert: 'Sertifikasi: Microsoft PL-300 Power BI / Google Data Analytics'
      },
      {
        phase: '03', label: 'Fase Spesialisasi', duration: '6–12 Bulan',
        title: 'Advisory & Forensic Accounting',
        skills: ['Forensic Accounting', 'Fraud Detection AI', 'ESG Reporting', 'M&A Financial Advisory', 'Strategic Financial Planning'],
        highlight: ['Forensic Accounting', 'ESG Reporting'],
        desc: 'Peran advisory dan forensik justru makin dibutuhkan di era AI — karena ini membutuhkan judgment manusia yang tidak bisa diotomasi.',
        cert: 'Sertifikasi: CFE (Certified Fraud Examiner) / CPA Indonesia'
      },
      {
        phase: '04', label: 'Fase Karier', duration: '12+ Bulan',
        title: 'CFO / Financial Strategist',
        skills: ['Corporate Finance Strategy', 'M&A Due Diligence', 'Investor Relations', 'AI Finance Strategy', 'Capital Markets'],
        highlight: ['CFO Strategy', 'AI Finance'],
        desc: 'Dengan kombinasi keahlian teknis dan strategic, akuntan bisa naik ke posisi CFO atau financial advisor level C-suite.',
        cert: 'Sertifikasi: CPA / ACCA / CFA Level 1–3'
      }
    ],
    resources: [
      { type: 'Sertifikasi Cloud', platform: 'Xero Academy', icon: '📗', free: false, desc: 'Kursus dan sertifikasi resmi Xero untuk akuntan. Sertifikat Xero Advisor sangat dicari firma akunting modern.', tags: ['Xero', 'Cloud', 'Sertifikasi'] },
      { type: 'Lokal Indonesia', platform: 'IAI (Ikatan Akuntan Indonesia)', icon: '🇮🇩', free: false, desc: 'Sertifikasi CPA Indonesia dan program pengembangan profesi akuntan dari Ikatan Akuntan Indonesia.', tags: ['IAI', 'CPA', 'Lokal'] },
      { type: 'E-Learning', platform: 'Coursera / ACCA Online', icon: '🎓', free: false, desc: 'Program ACCA online dan kursus Financial Accounting dari top universities global.', tags: ['ACCA', 'CPA', 'Global'] },
      { type: 'Analytics', platform: 'Microsoft Learn (Power BI)', icon: '📊', free: true, desc: 'Tutorial resmi Power BI dari Microsoft — gratis dan lengkap untuk membangun dashboard keuangan.', tags: ['Power BI', 'Analytics', 'Free'] },
      { type: 'Pajak Digital', platform: 'DJP Online Training', icon: '🏛️', free: true, desc: 'Pelatihan pajak online dari Direktorat Jenderal Pajak. Update regulasi perpajakan Indonesia terbaru.', tags: ['Pajak', 'DJP', 'Lokal'] },
      { type: 'Komunitas', platform: 'Akuntan Muda Indonesia', icon: '🤝', free: true, desc: 'Komunitas akuntan muda Indonesia — sharing, mentoring, dan update perkembangan profesi akunting.', tags: ['Community', 'Networking', 'Lokal'] }
    ],
    careers: [
      { title: 'Cloud Accounting Advisor', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Membantu UMKM dan perusahaan bertransisi ke cloud accounting. Demand sangat tinggi dari bisnis yang baru go-digital.', salary: 'Rp 8–20 Jt/bln', growth: '↑ 50% demand dalam 3 tahun' },
      { title: 'Forensic Accountant', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Menginvestigasi fraud keuangan perusahaan. Peran yang justru makin penting di era transaksi digital.', salary: 'Rp 15–45 Jt/bln', growth: '↑ 40% demand dalam 3 tahun' },
      { title: 'ESG Reporting Specialist', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Menyusun laporan keberlanjutan ESG yang kini diwajibkan bagi perusahaan publik. Peran baru yang sangat langka.', salary: 'Rp 12–30 Jt/bln', growth: '↑ 80% demand ESG 2024-2026' },
      { title: 'FP&A Analyst (AI-powered)', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Financial Planning & Analysis dengan bantuan AI untuk forecasting yang lebih akurat dan skenario simulation.', salary: 'Rp 12–28 Jt/bln', growth: '↑ 45% demand dalam 3 tahun' }
    ],
    tools: [
      { emoji: '📗', name: 'Xero', use: 'Cloud accounting terpopuler untuk SMB global', type: 'Cloud Accounting' },
      { emoji: '📘', name: 'QuickBooks Online', use: 'Platform akuntansi cloud dengan fitur AI', type: 'Accounting' },
      { emoji: '📊', name: 'Power BI', use: 'Dashboard keuangan real-time yang powerful', type: 'Analytics' },
      { emoji: '🤖', name: 'MindBridge AI', use: 'AI untuk audit analytics dan anomaly detection', type: 'Audit AI' },
      { emoji: '🐍', name: 'Python + pandas', use: 'Analisis data keuangan dan otomasi laporan', type: 'Programming' },
      { emoji: '🏛️', name: 'DJP e-Filing', use: 'Sistem pajak digital resmi Indonesia', type: 'Tax' },
      { emoji: '🔍', name: 'ACL Analytics', use: 'Software audit data analytics profesional', type: 'Audit' },
      { emoji: '📈', name: 'Anaplan', use: 'Platform FP&A berbasis cloud dan AI', type: 'Planning' }
    ]
  },
  customer_service: {
    icon: '💬', subtitle: 'Dari CS Agent ke Customer Experience Strategist',
    roadmap: [
      {
        phase: '01', label: 'Fase Fondasi', duration: '0–3 Bulan',
        title: 'Digital CS & CRM Mastery',
        skills: ['Salesforce / Zendesk / HubSpot', 'Omnichannel Support (WA, Email, Chat)', 'Customer Journey Mapping', 'Data Entry & CRM', 'Basic Analytics Dashboard'],
        highlight: ['CRM Tools', 'Omnichannel'],
        desc: 'CS profesional yang fasih dengan tools CRM modern akan menjadi bridge antara AI chatbot dan customer yang butuh sentuhan manusia.',
        cert: 'Sertifikasi: Salesforce Certified Associate / Zendesk Support'
      },
      {
        phase: '02', label: 'Fase Pengembangan', duration: '3–6 Bulan',
        title: 'AI Chatbot Management & Customer Analytics',
        skills: ['Chatbot Training & Optimization', 'Sentiment Analysis Tools', 'Voice of Customer Analytics', 'Customer Segmentation', 'Helpdesk AI Tools'],
        highlight: ['Chatbot Management', 'Customer Analytics'],
        desc: 'Bukan AI yang mengancam CS, tapi CS yang bisa mengelola AI-lah yang mengancam CS lainnya. Jadilah yang mengelola chatbot, bukan yang digantikannya.',
        cert: 'Sertifikasi: HubSpot Service Hub / Customer Success Manager'
      },
      {
        phase: '03', label: 'Fase Spesialisasi', duration: '6–12 Bulan',
        title: 'Customer Success & Experience',
        skills: ['Customer Success Management', 'NPS & CSAT Strategy', 'Escalation Handling Complex', 'B2B Account Management', 'Customer Retention Strategy'],
        highlight: ['Customer Success', 'Account Management'],
        desc: 'Customer Success adalah masa depan CS — fokus pada kesuksesan pelanggan jangka panjang, bukan sekadar menjawab tiket.',
        cert: 'Sertifikasi: SuccessHACKER CCSM / Gainsight Pulse'
      },
      {
        phase: '04', label: 'Fase Karier', duration: '12+ Bulan',
        title: 'CX Director / Customer Success Leader',
        skills: ['CX Strategy & Vision', 'Team Building CS', 'Voice of Customer Program', 'Revenue from CS', 'C-Suite Communication'],
        highlight: ['CX Strategy', 'Revenue from CS'],
        desc: 'Pemimpin Customer Experience adalah posisi strategis yang menggabungkan empati manusia dengan kekuatan data — tidak tergantikan AI.',
        cert: 'Sertifikasi: CCXP (Certified Customer Experience Professional)'
      }
    ],
    resources: [
      { type: 'Sertifikasi CRM', platform: 'Salesforce Trailhead', icon: '☁️', free: true, desc: 'Platform belajar Salesforce yang gamified dan gratis. Ratusan modul dari pemula hingga expert.', tags: ['Salesforce', 'CRM', 'Free'] },
      { type: 'Customer Success', platform: 'SuccessHACKER', icon: '🎯', free: false, desc: 'Kursus Customer Success Management terbaik. Sertifikasi CCSM diakui oleh ratusan perusahaan SaaS.', tags: ['Customer Success', 'Sertifikasi', 'SaaS'] },
      { type: 'Komunitas Lokal', platform: 'CS Indonesia Community', icon: '🇮🇩', free: true, desc: 'Komunitas Customer Service Indonesia — sharing best practices, tips, dan lowongan kerja di industri CS.', tags: ['Community', 'Lokal', 'Networking'] },
      { type: 'E-Learning', platform: 'HubSpot Academy', icon: '🎓', free: true, desc: 'Kursus CRM, customer service, dan inbound marketing gratis dari HubSpot. Sertifikat diakui industri.', tags: ['HubSpot', 'CRM', 'Free'] },
      { type: 'Analytics', platform: 'Medallia / Qualtrics', icon: '📊', free: false, desc: 'Platform Voice of Customer dan NPS analytics yang digunakan perusahaan Fortune 500.', tags: ['NPS', 'VoC', 'Enterprise'] },
      { type: 'Chatbot Training', platform: 'Dialogflow (Google)', icon: '🤖', free: true, desc: 'Platform AI chatbot dari Google. Belajar membuat dan melatih chatbot CS sendiri.', tags: ['Chatbot', 'AI', 'Google'] }
    ],
    careers: [
      { title: 'Customer Success Manager', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Memastikan pelanggan sukses menggunakan produk/layanan perusahaan. Peran kunci di perusahaan SaaS.', salary: 'Rp 8–25 Jt/bln', growth: '↑ 65% demand dalam 3 tahun' },
      { title: 'CX (Customer Experience) Designer', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Merancang pengalaman pelanggan yang seamless di semua touchpoint. Gabungan riset, UX, dan empati.', salary: 'Rp 10–28 Jt/bln', growth: '↑ 50% demand dalam 3 tahun' },
      { title: 'AI Chatbot Trainer / Analyst', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Melatih, mengoptimalkan, dan menganalisis performa chatbot CS. Profesi baru yang makin dibutuhkan.', salary: 'Rp 7–20 Jt/bln', growth: '↑ 75% demand dalam 2 tahun' },
      { title: 'Voice of Customer Analyst', demand: 'Sedang', demandColor: '#4dffcb', desc: 'Menganalisis feedback pelanggan secara menyeluruh untuk insight bisnis yang actionable.', salary: 'Rp 8–20 Jt/bln', growth: '↑ 40% demand dalam 3 tahun' }
    ],
    tools: [
      { emoji: '☁️', name: 'Salesforce Service Cloud', use: 'CRM enterprise untuk customer service', type: 'CRM' },
      { emoji: '🎫', name: 'Zendesk', use: 'Ticketing system dan helpdesk terpopuler', type: 'Helpdesk' },
      { emoji: '🤖', name: 'Intercom', use: 'AI-powered customer messaging platform', type: 'AI Chat' },
      { emoji: '📊', name: 'Gainsight', use: 'Platform Customer Success Management', type: 'CS Platform' },
      { emoji: '😊', name: 'SurveyMonkey / Typeform', use: 'NPS dan CSAT survey yang engaging', type: 'Survey' },
      { emoji: '📱', name: 'WhatsApp Business API', use: 'Otomasi CS via WhatsApp di Indonesia', type: 'Messaging' },
      { emoji: '🧠', name: 'Dialogflow CX', use: 'Buat dan kelola AI chatbot enterprise', type: 'Chatbot' },
      { emoji: '📈', name: 'Amplitude', use: 'Analisis perilaku user dan customer journey', type: 'Analytics' }
    ]
  },
  pertanian: {
    icon: '🌾', subtitle: 'Dari Petani Tradisional ke Agripreneur Digital',
    roadmap: [
      {
        phase: '01', label: 'Fase Fondasi', duration: '0–3 Bulan',
        title: 'Digital Farming Basics',
        skills: ['Smartphone & Apps Pertanian', 'Marketplace Pertanian (TaniHub, Sayurbox)', 'Pencatatan Keuangan Digital', 'Dasar Agronomi Modern', 'Media Sosial untuk Petani'],
        highlight: ['Marketplace Pertanian', 'Media Sosial'],
        desc: 'Mulai dengan memahami ekosistem digital pertanian Indonesia dan cara menjual hasil panen langsung ke konsumen tanpa perantara.',
        cert: 'Sertifikasi: PUSDATIN Kementan / Agri Digital Literacy'
      },
      {
        phase: '02', label: 'Fase Pengembangan', duration: '3–6 Bulan',
        title: 'Smart Farming & Precision Agriculture',
        skills: ['Drone Pertanian', 'Sensor IoT Lahan', 'Data Cuaca & BMKG', 'Manajemen Irigasi Digital', 'Analisis Tanah Digital'],
        highlight: ['Drone Pertanian', 'IoT Sensor'],
        desc: 'Precision agriculture menggunakan data untuk mengoptimalkan penggunaan pupuk, air, dan pestisida — meningkatkan hasil panen hingga 30%.',
        cert: 'Sertifikasi: Smart Farming Kementan / DJI Agriculture Training'
      },
      {
        phase: '03', label: 'Fase Spesialisasi', duration: '6–12 Bulan',
        title: 'Agribusiness & Value-Added Products',
        skills: ['Pengolahan & Produk Premium', 'Ekspor & Sertifikasi Halal/Organik', 'Agrowisata Digital', 'E-commerce Produk Pertanian', 'Koperasi Digital'],
        highlight: ['Produk Premium', 'Ekspor'],
        desc: 'Petani yang mengolah hasil panen menjadi produk premium dan menjual langsung ke konsumen atau ekspor akan jauh lebih sejahtera.',
        cert: 'Sertifikasi: Sertifikasi Organik / GlobalGAP / Halal MUI'
      },
      {
        phase: '04', label: 'Fase Karier', duration: '12+ Bulan',
        title: 'Agripreneur & AgriTech Leader',
        skills: ['Startup AgriTech', 'Crowdfunding Pertanian', 'Vertical Farming', 'Carbon Trading Pertanian', 'Konsultan AgriTech'],
        highlight: ['AgriTech Startup', 'Carbon Trading'],
        desc: 'Agripreneur yang menggabungkan pertanian dengan teknologi bisa membangun bisnis yang berdampak besar dan menguntungkan.',
        cert: 'Sertifikasi: AgriTech Entrepreneur / IFOAM Organic Training'
      }
    ],
    resources: [
      { type: 'Platform Lokal', platform: 'TaniHub for Farmer', icon: '🌱', free: true, desc: 'Platform yang menghubungkan petani langsung dengan pembeli. Akses pasar yang lebih luas dan harga lebih baik.', tags: ['Marketplace', 'Lokal', 'Direct Selling'] },
      { type: 'Pemerintah', platform: 'Kementan Digital', icon: '🏛️', free: true, desc: 'Program digitalisasi pertanian dari Kementerian Pertanian: pelatihan, subsidi, dan akses teknologi.', tags: ['Pemerintah', 'Subsidi', 'Free'] },
      { type: 'Drone Training', platform: 'DJI Agriculture', icon: '🚁', free: false, desc: 'Pelatihan resmi penggunaan drone DJI untuk pertanian — spraying, monitoring, dan mapping lahan.', tags: ['Drone', 'DJI', 'Precision Farming'] },
      { type: 'Komunitas', platform: 'Petani Milenial (Kementan)', icon: '🤝', free: true, desc: 'Program pemerintah untuk petani muda yang ingin mengadopsi teknologi pertanian modern.', tags: ['Milenial', 'Program Pemerintah', 'Gratis'] },
      { type: 'E-Commerce', platform: 'Tokopedia Fresh', icon: '🥬', free: true, desc: 'Panduan menjual produk pertanian segar di Tokopedia Fresh — langsung ke konsumen tanpa perantara.', tags: ['E-Commerce', 'Direct to Consumer', 'Lokal'] },
      { type: 'AgriTech', platform: 'Hara.ag', icon: '🛰️', free: false, desc: 'Platform AgriTech Indonesia untuk mapping lahan, analisis tanah, dan manajemen pertanian berbasis data.', tags: ['AgriTech', 'Data', 'Lokal'] }
    ],
    careers: [
      { title: 'Precision Farming Specialist', demand: 'Sedang', demandColor: '#4dffcb', desc: 'Mengimplementasikan teknologi precision farming di lahan besar. Dibutuhkan oleh perusahaan agribisnis modern.', salary: 'Rp 7–18 Jt/bln', growth: '↑ 40% demand dalam 5 tahun' },
      { title: 'Agripreneur / Agro-exporter', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Membangun bisnis produk pertanian premium dan ekspor. Banyak petani muda sukses di jalur ini.', salary: 'Rp Variabel (bisnis)', growth: '↑ Pasar ekspor agro Indonesia tumbuh 15%/tahun' },
      { title: 'Drone Agriculture Operator', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Mengoperasikan drone untuk spraying dan monitoring lahan. Permintaan tinggi dari perusahaan agribisnis besar.', salary: 'Rp 5–15 Jt/bln', growth: '↑ 60% demand dalam 3 tahun' },
      { title: 'AgriTech Consultant', demand: 'Sedang', demandColor: '#4dffcb', desc: 'Membantu koperasi dan perusahaan agri mengadopsi teknologi modern. Peran konsultan yang sangat dibutuhkan.', salary: 'Rp 8–25 Jt/bln', growth: '↑ 35% demand dalam 3 tahun' }
    ],
    tools: [
      { emoji: '🚁', name: 'DJI Agras (Drone)', use: 'Drone pertanian untuk spraying dan monitoring', type: 'Drone' },
      { emoji: '🌡️', name: 'Sensor IoT Tanah', use: 'Monitoring kelembaban, pH, dan nutrisi tanah', type: 'IoT' },
      { emoji: '🛰️', name: 'Google Earth Engine', use: 'Analisis citra satelit untuk pertanian', type: 'Remote Sensing' },
      { emoji: '📱', name: 'TaniHub / Sayurbox', use: 'Marketplace digital untuk jual hasil panen', type: 'Marketplace' },
      { emoji: '🌦️', name: 'AccuWeather API', use: 'Data cuaca real-time untuk planning tanam', type: 'Weather' },
      { emoji: '🗺️', name: 'Hara.ag', use: 'Platform mapping dan analytics lahan pertanian', type: 'AgriTech' },
      { emoji: '💧', name: 'Netafim Smart Irrigation', use: 'Sistem irigasi otomatis berbasis sensor', type: 'IoT' },
      { emoji: '📊', name: 'AgroStar / Plantix', use: 'AI untuk diagnosis penyakit tanaman dari foto', type: 'AI Plant Health' }
    ]
  },
  konstruksi: {
    icon: '🏗️', subtitle: 'Dari Arsitek/Kontraktor ke BIM & PropTech Expert',
    roadmap: [
      {
        phase: '01', label: 'Fase Fondasi', duration: '0–3 Bulan',
        title: 'Digital Design Fundamentals',
        skills: ['AutoCAD Lanjutan', 'SketchUp Pro', 'MS Project / Primavera', 'Revit Basics', 'Building Codes Digital'],
        highlight: ['Revit', 'MS Project'],
        desc: 'Kuasai tools digital desain dan manajemen proyek yang kini menjadi standar industri konstruksi modern.',
        cert: 'Sertifikasi: Autodesk Revit Essentials / MS Project Certification'
      },
      {
        phase: '02', label: 'Fase Pengembangan', duration: '3–6 Bulan',
        title: 'BIM & Collaborative Design',
        skills: ['Revit Advanced (BIM)', 'Navisworks Clash Detection', 'BIM 360 Collaboration', 'Drone Survey Construction', 'Cost Estimation Software'],
        highlight: ['BIM 360', 'Navisworks'],
        desc: 'BIM (Building Information Modeling) merevolusi cara bangunan dirancang dan dikelola. Profesional BIM adalah yang paling dicari di konstruksi.',
        cert: 'Sertifikasi: Autodesk Certified Professional BIM / buildingSMART'
      },
      {
        phase: '03', label: 'Fase Spesialisasi', duration: '6–12 Bulan',
        title: 'Sustainable & Smart Building',
        skills: ['Green Building (GREENSHIP)', 'Passive Design & BIPV', 'Smart Building IoT', 'Generative Design AI', 'Life Cycle Assessment'],
        highlight: ['Green Building', 'Generative Design AI'],
        desc: 'Green building dan smart building adalah arah regulasi dan pasar global. Spesialisasi ini menjamin relevansi di dekade mendatang.',
        cert: 'Sertifikasi: GREENSHIP (GBCI) / LEED AP / WELL Building'
      },
      {
        phase: '04', label: 'Fase Karier', duration: '12+ Bulan',
        title: 'BIM Manager / PropTech Innovator',
        skills: ['BIM Implementation Strategy', 'Digital Twin Buildings', '3D Printing Construction', 'PropTech Startup', 'Construction Data Analytics'],
        highlight: ['Digital Twin', '3D Printing Construction'],
        desc: 'BIM Manager dan PropTech expert adalah posisi premium dengan gaji tinggi dan permintaan yang terus meningkat di era konstruksi digital.',
        cert: 'Sertifikasi: CBO (Certified BIM Officer) / PMP Construction'
      }
    ],
    resources: [
      { type: 'Platform Autodesk', platform: 'Autodesk Learning', icon: '🏛️', free: false, desc: 'Platform belajar resmi Autodesk untuk Revit, AutoCAD, Civil 3D, dan tools BIM. Trial 30 hari gratis.', tags: ['BIM', 'Autodesk', 'Revit'] },
      { type: 'Sertifikasi Hijau', platform: 'GBCI Indonesia', icon: '🌿', free: false, desc: 'Green Building Council Indonesia — sertifikasi GREENSHIP untuk bangunan hijau di Indonesia.', tags: ['Green Building', 'GREENSHIP', 'Lokal'] },
      { type: 'YouTube', platform: 'ArchDaily & Dezeen', icon: '▶️', free: true, desc: 'Inspirasi desain dan teknologi konstruksi terbaru dari seluruh dunia. Update tren arsitektur global.', tags: ['Design', 'Architecture', 'Free'] },
      { type: 'Komunitas Lokal', platform: 'IAI (Ikatan Arsitek Indonesia)', icon: '🇮🇩', free: false, desc: 'Organisasi profesi arsitek Indonesia — sertifikasi, networking, dan pengembangan kapasitas.', tags: ['IAI', 'Arsitek', 'Lokal'] },
      { type: 'E-Learning BIM', platform: 'BIMsider Community', icon: '🤝', free: true, desc: 'Komunitas BIM global dengan tutorial, tips, dan best practices implementasi BIM.', tags: ['BIM', 'Community', 'Free'] },
      { type: 'Smart Building', platform: 'Siemens Building Tech', icon: '🏢', free: false, desc: 'Kursus dan sertifikasi smart building dan IoT dari Siemens Building Technologies.', tags: ['Smart Building', 'IoT', 'Siemens'] }
    ],
    careers: [
      { title: 'BIM Manager', demand: 'Sangat Tinggi', demandColor: '#ff4d6d', desc: 'Mengelola proses BIM di proyek konstruksi besar. Sangat langka di Indonesia dengan gaji premium.', salary: 'Rp 15–45 Jt/bln', growth: '↑ 70% demand dalam 3 tahun' },
      { title: 'Green Building Consultant', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Membantu developer dan pemerintah mencapai standar bangunan hijau. Pasar tumbuh seiring regulasi ESG.', salary: 'Rp 10–30 Jt/bln', growth: '↑ 55% demand dalam 3 tahun' },
      { title: 'Construction Tech Analyst', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Menggunakan data dan AI untuk mengoptimalkan proyek konstruksi — dari biaya hingga keselamatan kerja.', salary: 'Rp 10–25 Jt/bln', growth: '↑ 45% demand dalam 3 tahun' },
      { title: 'PropTech Product Developer', demand: 'Tinggi', demandColor: '#ffaa4d', desc: 'Mengembangkan solusi teknologi untuk industri properti — platform listing, manajemen gedung, AR viewing.', salary: 'Rp 12–35 Jt/bln', growth: '↑ PropTech Indonesia tumbuh 40%/tahun' }
    ],
    tools: [
      { emoji: '🏛️', name: 'Autodesk Revit', use: 'Platform BIM utama untuk desain arsitektur', type: 'BIM' },
      { emoji: '🔍', name: 'Navisworks', use: 'Clash detection dan koordinasi model 3D', type: 'Coordination' },
      { emoji: '☁️', name: 'BIM 360 / Autodesk Docs', use: 'Kolaborasi cloud untuk tim konstruksi', type: 'Collaboration' },
      { emoji: '🚁', name: 'DJI Enterprise Drone', use: 'Survey lahan dan monitoring progress proyek', type: 'Survey' },
      { emoji: '🧠', name: 'Spacemaker AI (Autodesk)', use: 'Generative design untuk optimasi tapak', type: 'Generative AI' },
      { emoji: '🌿', name: 'IES VE (Energy Simulation)', use: 'Simulasi efisiensi energi bangunan', type: 'Green Building' },
      { emoji: '🔮', name: 'Unreal Engine / Twinmotion', use: 'Visualisasi real-time dan virtual tour bangunan', type: 'Visualization' },
      { emoji: '🏗️', name: 'Procore', use: 'Project management konstruksi berbasis cloud', type: 'PM Software' }
    ]
  }
};

// ─── INDUSTRY ICONS ──────────────────────────────
const icons = {
  manufaktur:'🏭', keuangan:'💰', transportasi:'🚗', ritel:'🛍️',
  kesehatan:'🏥', hukum:'⚖️', pendidikan:'🎓', media:'📡',
  akunting:'📊', customer_service:'💬', pertanian:'🌾', konstruksi:'🏗️'
};

// ─── PREDICTION LOGIC ─────────────────────────────
function runPrediction() {
  const industry = document.getElementById('industrySelect').value;
  const exp = document.getElementById('expSelect').value;
  const tech = document.getElementById('techSelect').value;

  if (!industry) { alert('Pilih industri terlebih dahulu!'); return; }

  const data = industryData[industry];
  if (!data) return;

  let adjustedRisk = data.risk;
  if (exp === 'senior') adjustedRisk = Math.max(adjustedRisk - 12, 10);
  else if (exp === 'pemula') adjustedRisk = Math.min(adjustedRisk + 8, 98);
  if (tech === 'tinggi') adjustedRisk = Math.max(adjustedRisk - 15, 10);
  else if (tech === 'rendah') adjustedRisk = Math.min(adjustedRisk + 10, 98);
  adjustedRisk = Math.round(adjustedRisk);

  let level = data.level;
  if (adjustedRisk >= 80) level = 'kritis';
  else if (adjustedRisk >= 60) level = 'tinggi';
  else if (adjustedRisk >= 35) level = 'sedang';
  else level = 'rendah';

  const levelLabel = { kritis: 'RISIKO KRITIS', tinggi: 'RISIKO TINGGI', sedang: 'RISIKO SEDANG', rendah: 'RISIKO RENDAH' };
  const meterColor = { kritis: '#ff4d6d', tinggi: '#ffaa4d', sedang: '#4dffcb', rendah: '#4dff9b' };
  const adaptText = adjustedRisk < 40 ? 'Sangat Tinggi' : adjustedRisk < 60 ? 'Tinggi' : adjustedRisk < 80 ? 'Sedang' : 'Perlu Usaha';

  document.getElementById('resultEmpty').style.display = 'none';
  const content = document.getElementById('resultContent');
  content.classList.remove('active');
  const overlay = document.getElementById('loadingOverlay');
  overlay.style.display = 'flex';

  setTimeout(() => {
    overlay.style.display = 'none';
    document.getElementById('rIndustry').textContent = data.name;
    const badge = document.getElementById('rBadge');
    badge.textContent = levelLabel[level];
    badge.className = `risk-badge badge-${level}`;
    document.getElementById('rPct').textContent = adjustedRisk + '%';
    const meter = document.getElementById('rMeter');
    meter.style.background = meterColor[level];
    meter.style.width = '0%';
    setTimeout(() => { meter.style.width = adjustedRisk + '%'; }, 50);
    document.getElementById('rHorizon').textContent = data.horizon;
    document.getElementById('rImpact').textContent = data.impact;
    document.getElementById('rUrgency').textContent = data.urgency;
    document.getElementById('rAdapt').textContent = adaptText;
    document.getElementById('rDesc').textContent = data.desc;

    const actionsList = document.getElementById('rActions');
    actionsList.innerHTML = data.actions.map(a => `<li>${a}</li>`).join('');
    content.classList.add('active');

    // Auto-set upskilling pill to the selected industry
    activateUpskillingIndustry(industry);
  }, 1200);
}

// ─── SCROLL TO UPSKILLING ─────────────────────────
function scrollToUpskilling() {
  const industry = document.getElementById('industrySelect').value;
  if (industry) activateUpskillingIndustry(industry);
  document.getElementById('upskilling').scrollIntoView({ behavior: 'smooth' });
}

// ─── UPSKILLING PILLS RENDER ──────────────────────
const pillsContainer = document.getElementById('upskillingPills');
Object.keys(upskillingData).forEach(key => {
  const d = industryData[key];
  const btn = document.createElement('button');
  btn.className = 'upill';
  btn.id = `upill-${key}`;
  const dotColor = { kritis: '#ff4d6d', tinggi: '#ffaa4d', sedang: '#4dffcb', rendah: '#4dff9b' };
  btn.innerHTML = `<span class="upill-dot" style="background:${dotColor[d.level]}"></span>${icons[key]} ${d.name}`;
  btn.addEventListener('click', () => activateUpskillingIndustry(key));
  pillsContainer.appendChild(btn);
});

// ─── ACTIVATE UPSKILLING INDUSTRY ─────────────────
let currentUpskillingKey = null;

function activateUpskillingIndustry(key) {
  if (currentUpskillingKey === key) return; // already active
  currentUpskillingKey = key;

  // Update pills
  document.querySelectorAll('.upill').forEach(p => p.classList.remove('active'));
  const activePill = document.getElementById(`upill-${key}`);
  if (activePill) activePill.classList.add('active');

  // Show content
  document.getElementById('upskillingEmpty').style.display = 'none';
  const content = document.getElementById('upskillingContent');
  content.style.display = 'block';
  content.style.animation = 'none';
  content.offsetHeight; // reflow
  content.style.animation = 'fadeUp 0.4s ease';

  const indData = industryData[key];
  const upData = upskillingData[key];
  const levelLabel = { kritis: 'RISIKO KRITIS', tinggi: 'RISIKO TINGGI', sedang: 'RISIKO SEDANG', rendah: 'RISIKO RENDAH' };
  const levelColor = { kritis: 'var(--danger)', tinggi: 'var(--warn)', sedang: 'var(--accent2)', rendah: 'var(--safe)' };
  const levelBg = { kritis: 'rgba(255,77,109,0.15)', tinggi: 'rgba(255,170,77,0.15)', sedang: 'rgba(77,255,203,0.1)', rendah: 'rgba(77,255,155,0.1)' };
  const levelBorder = { kritis: 'rgba(255,77,109,0.3)', tinggi: 'rgba(255,170,77,0.3)', sedang: 'rgba(77,255,203,0.25)', rendah: 'rgba(77,255,155,0.25)' };

  // Header
  document.getElementById('uIcon').textContent = upData.icon;
  document.getElementById('uName').textContent = indData.name;
  document.getElementById('uSubtitle').textContent = upData.subtitle;
  const riskPill = document.getElementById('uRiskPill');
  riskPill.textContent = `${levelLabel[indData.level]} · ${indData.risk}%`;
  riskPill.style.background = levelBg[indData.level];
  riskPill.style.border = `1px solid ${levelBorder[indData.level]}`;
  riskPill.style.color = levelColor[indData.level];

  // Default to roadmap tab
  switchTab('roadmap', document.querySelector('.utab[data-tab="roadmap"]'));

  // Render roadmap
  renderRoadmap(upData.roadmap);
  renderResources(upData.resources);
  renderCareers(upData.careers);
  renderTools(upData.tools);

  refreshCursorTargets();
}

// ─── RENDER ROADMAP ───────────────────────────────
function renderRoadmap(roadmap) {
  const container = document.getElementById('roadmapTimeline');
  container.innerHTML = roadmap.map(r => `
    <div class="roadmap-phase">
      <div class="roadmap-phase-left">
        <div class="roadmap-phase-num">${r.phase}</div>
        <div class="roadmap-phase-label">${r.label}</div>
        <div class="roadmap-phase-duration">${r.duration}</div>
      </div>
      <div class="roadmap-phase-right">
        <div class="roadmap-phase-title">${r.title}</div>
        <div class="roadmap-skills">
          ${r.skills.map(s => `<span class="skill-tag ${r.highlight && r.highlight.includes(s) ? 'highlight' : ''}">${s}</span>`).join('')}
        </div>
        <div class="roadmap-phase-desc">${r.desc}</div>
        <div class="roadmap-phase-cert">${r.cert}</div>
      </div>
    </div>
  `).join('');
}

// ─── RENDER RESOURCES ─────────────────────────────
function renderResources(resources) {
  const container = document.getElementById('resourcesGrid');
  container.innerHTML = resources.map(r => `
    <div class="resource-card">
      <div class="resource-type">${r.type}</div>
      <div class="resource-platform">
        <span class="resource-icon">${r.icon}</span>${r.platform}
      </div>
      <div class="${r.free ? 'resource-free' : 'resource-paid'}">${r.free ? 'GRATIS' : 'BERBAYAR'}</div>
      <div class="resource-desc">${r.desc}</div>
      <div class="resource-tags">
        ${r.tags.map(t => `<span class="resource-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// ─── RENDER CAREERS ───────────────────────────────
function renderCareers(careers) {
  const container = document.getElementById('careersGrid');
  container.innerHTML = careers.map(c => `
    <div class="career-card">
      <div class="career-demand" style="color:${c.demandColor}">
        <span class="demand-dot" style="background:${c.demandColor}"></span>
        Demand ${c.demand}
      </div>
      <div class="career-title">${c.title}</div>
      <div class="career-desc">${c.desc}</div>
      <div class="career-salary">
        <div>
          <div class="career-salary-num">${c.salary}</div>
          <div class="career-salary-label">Estimasi Gaji</div>
        </div>
        <div class="career-growth">${c.growth}</div>
      </div>
    </div>
  `).join('');
}

// ─── RENDER TOOLS ─────────────────────────────────
function renderTools(tools) {
  const container = document.getElementById('toolsGrid');
  container.innerHTML = tools.map(t => `
    <div class="tool-card">
      <div class="tool-emoji">${t.emoji}</div>
      <div class="tool-name">${t.name}</div>
      <div class="tool-use">${t.use}</div>
      <div class="tool-type">${t.type}</div>
    </div>
  `).join('');
}

// ─── TAB SWITCHING ────────────────────────────────
function switchTab(tabId, btn) {
  document.querySelectorAll('.utab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.utab-panel').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const panel = document.getElementById(`panel-${tabId}`);
  if (panel) panel.classList.add('active');
}

// ─── INDUSTRY CARDS RENDER ────────────────────────
const grid = document.getElementById('industriesGrid');
Object.entries(industryData).forEach(([key, d], i) => {
  const card = document.createElement('div');
  card.className = `industry-card card-${d.level} reveal`;
  if (i % 3 === 1) card.classList.add('reveal-delay-1');
  if (i % 3 === 2) card.classList.add('reveal-delay-2');
  const levelLabel = { kritis: 'Kritis', tinggi: 'Tinggi', sedang: 'Sedang', rendah: 'Rendah' };
  const barColor = { kritis: 'var(--danger)', tinggi: 'var(--warn)', sedang: 'var(--accent2)', rendah: 'var(--safe)' };
  card.innerHTML = `
    <div class="industry-icon">${icons[key]||'🔹'}</div>
    <div class="industry-name">${d.name}</div>
    <div class="industry-risk-pct pct-${d.level}">${d.risk}%</div>
    <div class="industry-risk-label">Risiko ${levelLabel[d.level]}</div>
    <div class="industry-bar"><div class="industry-bar-fill" style="background:${barColor[d.level]};width:${d.risk}%"></div></div>
  `;
  card.addEventListener('click', () => {
    document.getElementById('industrySelect').value = key;
    document.getElementById('predictor').scrollIntoView({ behavior: 'smooth' });
  });
  grid.appendChild(card);
});

// Re-observe cards for reveal animation
document.querySelectorAll('.reveal').forEach(r => revealObserver.observe(r));

// Enter key on job input
document.getElementById('jobInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') runPrediction();
});

// Init cursor targets
refreshCursorTargets();