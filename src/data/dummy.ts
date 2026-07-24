export const banners = [
  {
    id: "b1",
    image: "/whiskey/jackdaniels.jpg",
    title: "Premium Whiskey Collection",
    subtitle: "Up to 20% OFF on Single Malts",
    color: "from-amber-500/20 to-orange-600/20",
  },
  {
    id: "b2",
    image: "/whiskey/johnnie-walker-blue-label-1-transparent.webp",
    title: "Weekend Party Starters",
    subtitle: "Best deals on Vodka & Tequila",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "b3",
    image: "/whiskey/bombay-sapphire-premier-cru-murcian-lemon_c3d9408d-5c77-483f-bfdc-502aa3fc6c8d.webp",
    title: "Chilled Craft Beers",
    subtitle: "Buy 2 Get 1 Free",
    color: "from-yellow-500/20 to-amber-500/20",
  },
  {
    id: "b4",
    image: "/whiskey/macallan.jpg",
    title: "First Time Order? 🎉",
    subtitle: "Use PREM1200, LATA1200 or PREMLATA2400 for up to ₹2400 OFF on orders > ₹10k!",
    color: "from-purple-500/20 to-pink-600/20",
  },
];

export const categories = [
  { id: "c1", name: "Whiskey", icon: "🥃", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" },
  { id: "c2", name: "Vodka", icon: "🍸", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
  { id: "c3", name: "Rum", icon: "🍹", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" },
  { id: "c4", name: "Gin", icon: "🌲", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" },
  { id: "c5", name: "Tequila", icon: "🥂", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400" },
  { id: "c6", name: "Beer", icon: "🍺", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400" },
  { id: "c7", name: "Wine", icon: "🍷", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400" },
  { id: "c8", name: "Liqueurs", icon: "🍾", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
  { id: "c9", name: "Soft Drinks", icon: "🥤", color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400" },
];

export const products = [
  {
    id: "p1",
    name: "Jack Daniel's Old No. 7",
    brand: "Jack Daniel's",
    price: 2500,
    mrp: 2800,
    volume: "750 ml",
    image: "/whiskey/jackdaniels.jpg",
    isVeg: true,
    tag: "Trending",
    category: "Whiskey"
  },
  {
    id: "p2",
    name: "Johnnie Walker Blue Label",
    brand: "Johnnie Walker",
    price: 15000,
    mrp: 16500,
    volume: "750 ml",
    image: "/whiskey/johnnie-walker-blue-label-1-transparent.webp",
    isVeg: true,
    discount: "9% OFF",
    category: "Whiskey"
  },
  {
    id: "p3",
    name: "Johnnie Walker Gold Label",
    brand: "Johnnie Walker",
    price: 5000,
    mrp: 5500,
    volume: "750 ml",
    image: "/whiskey/gold label.webp",
    isVeg: true,
    discount: "9% OFF",
    category: "Whiskey"
  },
  {
    id: "p4",
    name: "Johnnie Walker Red Label",
    brand: "Johnnie Walker",
    price: 2000,
    mrp: 2200,
    volume: "750 ml",
    image: "/whiskey/redlabel.jpg",
    isVeg: true,
    category: "Whiskey"
  },
  {
    id: "p5",
    name: "The Macallan 12 Year Old",
    brand: "The Macallan",
    price: 7500,
    mrp: 8200,
    volume: "750 ml",
    image: "/whiskey/macallan.jpg",
    isVeg: true,
    discount: "8% OFF",
    category: "Whiskey"
  },
  {
    id: "p6",
    name: "Bombay Sapphire Premier Cru",
    brand: "Bombay Sapphire",
    price: 3500,
    mrp: 3800,
    volume: "750 ml",
    image: "/whiskey/bombay-sapphire-premier-cru-murcian-lemon_c3d9408d-5c77-483f-bfdc-502aa3fc6c8d.webp",
    isVeg: true,
    tag: "Best Seller",
    category: "Gin"
  },
  {
    id: "p7",
    name: "Imperial Blue Superior Grain",
    brand: "Imperial Blue",
    price: 800,
    mrp: 850,
    volume: "750 ml",
    image: "/whiskey/ib.webp",
    isVeg: true,
    category: "Whiskey"
  },
  {
    id: "p8",
    name: "Signature Premium Whisky",
    brand: "Signature",
    price: 1100,
    mrp: 1250,
    volume: "750 ml",
    image: "/whiskey/8f1a20396fb8b86749b05ba26e90d48f.webp",
    isVeg: true,
    discount: "12% OFF",
    category: "Whiskey"
  },
  {
    id: "p9",
    name: "Absolut Vodka",
    brand: "Absolut",
    price: 1800,
    mrp: 2000,
    volume: "750 ml",
    image: "/vodka/absolute vodka.jpg",
    isVeg: true,
    category: "Vodka"
  },
  {
    id: "p10",
    name: "Grey Goose Vodka",
    brand: "Grey Goose",
    price: 4500,
    mrp: 5000,
    volume: "750 ml",
    image: "/vodka/greygoose.jpg",
    isVeg: true,
    discount: "10% OFF",
    category: "Vodka"
  },
  {
    id: "p11",
    name: "Smirnoff Vodka",
    brand: "Smirnoff",
    price: 1200,
    mrp: 1400,
    volume: "750 ml",
    image: "/vodka/smirnoff.webp",
    isVeg: true,
    category: "Vodka"
  },
  {
    id: "p12",
    name: "Heineken Lager Beer",
    brand: "Heineken",
    price: 350,
    mrp: 400,
    volume: "650 ml",
    image: "/beer/37499961-heineken-wallpaper.jpg",
    isVeg: true,
    discount: "12% OFF",
    category: "Beer"
  },
  {
    id: "p13",
    name: "Bro Code",
    brand: "Bro Code",
    price: 150,
    mrp: 160,
    volume: "500 ml",
    image: "/beer/brocode.jpg",
    isVeg: true,
    category: "Beer"
  },
  {
    id: "p14",
    name: "Budweiser Premium",
    brand: "Budweiser",
    price: 200,
    mrp: 220,
    volume: "650 ml",
    image: "/beer/budweiser.jpg",
    isVeg: true,
    category: "Beer"
  },
  {
    id: "p15",
    name: "Corona Extra",
    brand: "Corona",
    price: 250,
    mrp: 280,
    volume: "330 ml",
    image: "/beer/corona.jpg",
    isVeg: true,
    category: "Beer"
  },
  {
    id: "p16",
    name: "Captain Morgan Original Spiced Gold",
    brand: "Captain Morgan",
    price: 1500,
    mrp: 1800,
    volume: "750 ml",
    image: "/rum/captain morgan.jpg",
    isVeg: true,
    discount: "15% OFF",
    category: "Rum"
  },
  {
    id: "p17",
    name: "Contessa XXX Rum",
    brand: "Contessa",
    price: 800,
    mrp: 900,
    volume: "750 ml",
    image: "/rum/contessa.webp",
    isVeg: true,
    category: "Rum"
  },
  {
    id: "p18",
    name: "Hercules XXX Rum",
    brand: "Hercules",
    price: 700,
    mrp: 800,
    volume: "750 ml",
    image: "/rum/herculees.jpg",
    isVeg: true,
    category: "Rum"
  },
  {
    id: "p19",
    name: "Old Monk Supreme Rum",
    brand: "Old Monk",
    price: 900,
    mrp: 1000,
    volume: "750 ml",
    image: "/rum/old monk.jpg",
    isVeg: true,
    category: "Rum"
  },
  {
    id: "p20",
    name: "Coca Cola Classic",
    brand: "Coca Cola",
    price: 40,
    mrp: 45,
    volume: "330 ml",
    image: "/softdrinks/cola.png",
    isVeg: true,
    tag: "Trending",
    category: "Soft Drinks"
  },
  {
    id: "p21",
    name: "Sprite Lemon Lime",
    brand: "Sprite",
    price: 40,
    mrp: 45,
    volume: "330 ml",
    image: "/softdrinks/sprite.png",
    isVeg: true,
    category: "Soft Drinks"
  },
  {
    id: "p22",
    name: "Pepsi Cola",
    brand: "Pepsi",
    price: 40,
    mrp: 45,
    volume: "330 ml",
    image: "/softdrinks/pepsi.png",
    isVeg: true,
    category: "Soft Drinks"
  },
  {
    id: "p23",
    name: "Fanta Orange",
    brand: "Fanta",
    price: 40,
    mrp: 45,
    volume: "330 ml",
    image: "/softdrinks/fanta.png",
    isVeg: true,
    category: "Soft Drinks"
  },
  {
    id: "p24",
    name: "Thums Up",
    brand: "Thums Up",
    price: 40,
    mrp: 45,
    volume: "330 ml",
    image: "/softdrinks/thums_up.png",
    isVeg: true,
    category: "Soft Drinks"
  },
  {
    id: "p25",
    name: "Mountain Dew",
    brand: "Mountain Dew",
    price: 40,
    mrp: 45,
    volume: "330 ml",
    image: "/softdrinks/mountain_dew.png",
    isVeg: true,
    category: "Soft Drinks"
  },
  {
    id: "p26",
    name: "Red Bull Energy Drink",
    brand: "Red Bull",
    price: 125,
    mrp: 130,
    volume: "250 ml",
    image: "/softdrinks/red_bull.png",
    isVeg: true,
    tag: "Trending",
    category: "Soft Drinks"
  },
  {
    id: "p27",
    name: "Limca",
    brand: "Limca",
    price: 40,
    mrp: 45,
    volume: "330 ml",
    image: "/softdrinks/limca.png",
    isVeg: true,
    category: "Soft Drinks"
  },
  {
    id: "p28",
    name: "Maaza Mango",
    brand: "Maaza",
    price: 45,
    mrp: 50,
    volume: "600 ml",
    image: "/softdrinks/maaza.png",
    isVeg: true,
    category: "Soft Drinks"
  }
];

export const brands = [
  { id: "br1", name: "Jack Daniel's", logo: "🥃" },
  { id: "br2", name: "Johnnie Walker", logo: "🥃" },
  { id: "br3", name: "The Macallan", logo: "🥃" },
  { id: "br4", name: "Bombay Sapphire", logo: "🍸" },
  { id: "br5", name: "Imperial Blue", logo: "🥃" },
  { id: "br6", name: "Signature", logo: "🥃" },
  { id: "br7", name: "Absolut", logo: "🍸" },
  { id: "br8", name: "Grey Goose", logo: "🍸" },
  { id: "br9", name: "Smirnoff", logo: "🍸" },
  { id: "br10", name: "Heineken", logo: "🍺" },
  { id: "br11", name: "Bro Code", logo: "🍺" },
  { id: "br12", name: "Budweiser", logo: "🍺" },
  { id: "br13", name: "Corona", logo: "🍺" },
  { id: "br14", name: "Captain Morgan", logo: "🍹" },
  { id: "br15", name: "Contessa", logo: "🍹" },
  { id: "br16", name: "Hercules", logo: "🍹" },
  { id: "br17", name: "Old Monk", logo: "🍹" },
  { id: "br18", name: "Coca Cola", logo: "🥤" },
  { id: "br19", name: "Sprite", logo: "🥤" },
  { id: "br20", name: "Pepsi", logo: "🥤" },
  { id: "br21", name: "Fanta", logo: "🥤" },
  { id: "br22", name: "Thums Up", logo: "🥤" },
  { id: "br23", name: "Mountain Dew", logo: "🥤" },
  { id: "br24", name: "Red Bull", logo: "⚡" },
  { id: "br25", name: "Limca", logo: "🥤" },
  { id: "br26", name: "Maaza", logo: "🥭" },
];

export const stores = [
  { id: "s1", name: "The Liquor Store", rating: 4.8, time: "15 min", image: "/whiskey/macallan.jpg" },
  { id: "s2", name: "Spirits & More", rating: 4.5, time: "20 min", image: "/whiskey/jackdaniels.jpg" },
  { id: "s3", name: "Craft Booze", rating: 4.9, time: "12 min", image: "/whiskey/gold label.webp" },
];

// Re-usable mock data functions
export const getProductsByCategory = (category: string) => products.filter(p => p.category === category || category === "All");
export const getTrendingProducts = () => products.filter(p => p.tag === "Trending" || p.discount);
export const getFlashSaleProducts = () => products.filter(p => p.discount);
export const getRecommendedProducts = () => [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
export const getPremiumBrandsProducts = () => [...products].sort((a, b) => b.price - a.price).slice(0, 6);
