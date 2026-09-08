export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  gallery?: string[];
  description: string;
  specs: string[];
  stock: number;
  featured?: boolean;
};

export const products: Product[] = [
  { id: 1, name: 'ThermalPro T80', category: 'Thermal printers', price: 189, image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=900&q=85'], description: 'A dependable 80mm thermal receipt printer for busy counters and compact checkout stations.', specs: ['80mm paper width', '250mm/s print speed', 'USB + Ethernet'], stock: 18, featured: true },
  { id: 2, name: 'Webzark ScanMate S2', category: 'Barcode scanners', price: 74, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1587146429688-19e2f3f3a5a6?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=900&q=85'], description: 'Fast 2D scanning with a comfortable grip for retail, inventory and fulfillment teams.', specs: ['1D + 2D scanning', 'USB-C connection', 'Drop tested to 1.5m'], stock: 42, featured: true },
  { id: 3, name: 'CounterView 24', category: 'Monitors', price: 229, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=900&q=85'], description: 'A crisp 24-inch business display with an adjustable stand for all-day counter use.', specs: ['24-inch Full HD', 'HDMI + DisplayPort', 'Height adjustable'], stock: 9 },
  { id: 4, name: 'PayPoint Mini', category: 'POS hardware', price: 349, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85&sat=-15'], description: 'A compact POS terminal that keeps checkout quick and your counter uncluttered.', specs: ['10.1-inch touch display', 'Wi-Fi 6 + Ethernet', 'Android 13'], stock: 7, featured: true },
  { id: 5, name: 'BillDock Pro', category: 'Billing hardware', price: 119, image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85'], description: 'Practical billing hardware built for reliable daily operations and simple setup.', specs: ['Dual display support', 'USB 3.0 hub', 'VESA compatible'], stock: 24 },
  { id: 6, name: 'DeskHub 8-in-1', category: 'Accessories', price: 59, image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=900&q=85'], description: 'Keep your workstation connected with one compact, well-organized expansion hub.', specs: ['8 ports', '100W pass-through', 'Aluminium housing'], stock: 31 },
  { id: 7, name: 'LinkCore Cat6 Cable Kit', category: 'Network cables', price: 29, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85'], description: 'A color-coded Cat6 Ethernet cable kit for reliable office networks and clean installations.', specs: ['Cat6 Gigabit rated', '10-meter mixed lengths', 'Snag-resistant boots'], stock: 56, featured: true },
  { id: 8, name: 'ViewPoint 27 QHD', category: 'Monitors', price: 399, image: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=85'], description: 'A spacious QHD monitor for spreadsheets, dashboards, design work, and multi-window workflows.', specs: ['27-inch QHD panel', 'USB-C 65W charging', 'Height adjustable stand'], stock: 14, featured: true },
  { id: 9, name: 'SecureScan DS40', category: 'Barcode scanners', price: 149, image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1587146429688-19e2f3f3a5a6?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=85'], description: 'A hands-free desktop scanner for checkout counters, receiving desks, and stock rooms.', specs: ['Omnidirectional scan', 'Presentation stand', 'USB + serial support'], stock: 22 },
  { id: 10, name: 'OfficeCam Pro 1080', category: 'Webcams', price: 89, image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=85&sat=-15'], description: 'A sharp 1080p webcam with a privacy shutter for meetings, support calls, and training rooms.', specs: ['1080p video', 'Dual microphone array', 'Universal monitor mount'], stock: 36 },
  { id: 11, name: 'PowerGuard 1200 UPS', category: 'Power protection', price: 249, image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85'], description: 'Battery-backed power protection for POS stations, network equipment, and essential office systems.', specs: ['1200VA capacity', '8 protected outlets', 'USB monitoring port'], stock: 11 },
  { id: 12, name: 'RackLink 16-Port Switch', category: 'Networking', price: 179, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1606904825846-647eb07b5be5?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85'], description: 'A quiet unmanaged switch for connecting workstations, printers, cameras, and access points.', specs: ['16 Gigabit ports', 'Plug-and-play setup', 'Metal rack-ready chassis'], stock: 17, featured: true },
  { id: 13, name: 'TypePro Wireless Keyboard', category: 'Computer accessories', price: 69, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85&sat=-20'], description: 'A quiet wireless keyboard designed for shared desks, front desks, and long office sessions.', specs: ['Bluetooth + USB receiver', 'Quiet low-profile keys', '12-month battery life'], stock: 28 },
  { id: 14, name: 'Precision Mouse M2', category: 'Computer accessories', price: 39, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85&sat=-15'], description: 'An accurate ergonomic mouse with programmable buttons for everyday productivity.', specs: ['1600 DPI sensor', 'Six programmable buttons', 'USB-C rechargeable'], stock: 45 },
  { id: 15, name: 'ClearTalk USB Headset', category: 'Audio equipment', price: 79, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=85'], description: 'A comfortable USB headset with a clear microphone for support teams and video meetings.', specs: ['Noise-reducing microphone', 'USB plug-and-play', 'All-day padded comfort'], stock: 33 },
  { id: 16, name: 'LabelPro L420', category: 'Label printers', price: 159, image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=85', gallery: ['https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=900&q=85'], description: 'A compact label printer for inventory tags, shipping labels, and organized storage rooms.', specs: ['4-inch label width', '203 DPI printing', 'USB + Ethernet'], stock: 20 },
];

export const categories = ['All hardware', 'Printers', 'POS hardware', 'Scanners', 'Monitors', 'Networking', 'Accessories', 'Power protection'];

export type CategoryShowcase = {
  name: string;
  text: string;
  image: string;
  filter: string;
};

export const categoryShowcase: CategoryShowcase[] = [
  {
    name: 'Printers',
    text: 'Receipts, labels and more',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
    filter: 'Printers',
  },
  {
    name: 'POS hardware',
    text: 'Checkout, made simple',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80',
    filter: 'POS hardware',
  },
  {
    name: 'Scanners',
    text: 'Keep every item moving',
    image: 'https://images.unsplash.com/photo-1587146429688-19e2f3f3a5a6?auto=format&fit=crop&w=600&q=80',
    filter: 'Barcode scanners',
  },
  {
    name: 'Workstations',
    text: 'The complete setup',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    filter: 'Monitors',
  },
];
