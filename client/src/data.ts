// ============================================================================
// 프리미엄 캠핑 브랜드 D2C 제품 데이터 & Hidden Gems 캠핑장 데이터
// ============================================================================

export interface Product {
  id: string;
  name: string;
  category: '텐트' | '체어' | '테이블' | '랜턴' | '조리기구' | '침낭' | '백팩';
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  specs: {
    weight?: string;
    material?: string;
    capacity?: string;
    dimensions?: string;
    color?: string;
  };
  comparison: {
    brand: 'Helinox' | 'Kovea' | 'Our Brand';
    weight: number; // grams
    durability: number; // 1-10
    price: number;
  }[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface HiddenGem {
  id: string;
  name: string;
  region: string;
  address: string;
  type: 'wild' | 'private' | 'semi-private'; // 노지, 프라이빗, 세미프라이빗
  description: string;
  locationAnalysis: {
    drainage: string; // 배수 상태
    windProtection: string; // 바람 차단
    sunExposure: string; // 일출/일몰 포인트
    terrain: string; // 지형 특성
    accessibility: string; // 접근성
  };
  crowdLevel: number; // 1-5 (1: 매우 조용함, 5: 붐빔)
  viewQuality: number; // 1-5 (경치 품질)
  reservationAvailable: boolean;
  capacity: number;
  imageUrl: string;
  coordinates: { lat: number; lng: number };
  expertComment: string;
  bestSeason: string[];
  price?: number;
}

// ============================================================================
// 프리미엄 캠핑 브랜드 제품 카탈로그
// ============================================================================
export const PRODUCTS: Product[] = [
  {
    id: 'prod-tent-1',
    name: 'AlphaLite Pro 2-Person Tent',
    category: '텐트',
    price: 389000,
    originalPrice: 450000,
    image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=800&q=80',
    description: '초경량 백패킹용 2인 텐트. Helinox의 기술력을 벤치마킹한 혁신적인 프레임 구조로 무게는 최소화하고 내구성은 극대화했습니다.',
    specs: {
      weight: '1.2kg',
      material: '40D Nylon + DAC Aluminum Frame',
      capacity: '2인',
      dimensions: '210 x 130 x 110cm',
      color: 'Sage Green / Storm Grey'
    },
    comparison: [
      { brand: 'Helinox', weight: 1400, durability: 8, price: 450000 },
      { brand: 'Kovea', weight: 1600, durability: 7, price: 380000 },
      { brand: 'Our Brand', weight: 1200, durability: 9, price: 389000 }
    ],
    rating: 4.8,
    reviews: 234,
    inStock: true
  },
  {
    id: 'prod-tent-2',
    name: 'BaseCamp Ultra 4-Person Tent',
    category: '텐트',
    price: 589000,
    originalPrice: 680000,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    description: '가족 캠핑용 4인 텐트. 넉넉한 내부 공간과 통풍 시스템으로 쾌적한 캠핑 환경을 제공합니다.',
    specs: {
      weight: '2.8kg',
      material: '68D Polyester + Fiberglass Frame',
      capacity: '4인',
      dimensions: '280 x 200 x 170cm',
      color: 'Forest Green / Charcoal'
    },
    comparison: [
      { brand: 'Helinox', weight: 3200, durability: 8, price: 650000 },
      { brand: 'Kovea', weight: 3000, durability: 7, price: 580000 },
      { brand: 'Our Brand', weight: 2800, durability: 9, price: 589000 }
    ],
    rating: 4.9,
    reviews: 412,
    inStock: true
  },
  {
    id: 'prod-chair-1',
    name: 'Feather Compact Chair',
    category: '체어',
    price: 129000,
    originalPrice: 150000,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
    description: '초경량 캠핑 체어. 무게는 단 650g이지만 내구성은 최고 수준. 백팩킹부터 캠프장까지 모든 상황에 완벽합니다.',
    specs: {
      weight: '650g',
      material: 'Aluminum + Ripstop Nylon',
      capacity: '150kg',
      dimensions: '접음: 30x12x12cm / 펼침: 60x55x80cm',
      color: 'Titanium / Charcoal'
    },
    comparison: [
      { brand: 'Helinox', weight: 890, durability: 8, price: 180000 },
      { brand: 'Kovea', weight: 950, durability: 7, price: 120000 },
      { brand: 'Our Brand', weight: 650, durability: 9, price: 129000 }
    ],
    rating: 4.7,
    reviews: 189,
    inStock: true
  },
  {
    id: 'prod-chair-2',
    name: 'Comfort Lounger Chair',
    category: '체어',
    price: 249000,
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=800&q=80',
    description: '럭셔리 캠핑용 라운저 체어. 최고의 편안함과 세련된 디자인으로 캠프장에서 우아한 휴식을 즐기세요.',
    specs: {
      weight: '2.1kg',
      material: 'Premium Canvas + Solid Wood Frame',
      capacity: '120kg',
      dimensions: '접음: 60x25x25cm / 펼침: 70x80x100cm',
      color: 'Beige / Charcoal'
    },
    comparison: [
      { brand: 'Helinox', weight: 2400, durability: 8, price: 280000 },
      { brand: 'Kovea', weight: 2300, durability: 7, price: 240000 },
      { brand: 'Our Brand', weight: 2100, durability: 9, price: 249000 }
    ],
    rating: 4.9,
    reviews: 156,
    inStock: true
  },
  {
    id: 'prod-table-1',
    name: 'Ultralight Compact Table',
    category: '테이블',
    price: 89000,
    originalPrice: 110000,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    description: '초경량 캠핑 테이블. 무게 800g으로 백팩에 쉽게 담을 수 있으며, 견고한 구조로 안정적인 사용이 가능합니다.',
    specs: {
      weight: '800g',
      material: 'Aluminum + Mesh Top',
      capacity: '20kg',
      dimensions: '접음: 50x30x5cm / 펼침: 50x30x30cm',
      color: 'Silver / Black'
    },
    comparison: [
      { brand: 'Helinox', weight: 1100, durability: 8, price: 130000 },
      { brand: 'Kovea', weight: 1000, durability: 7, price: 85000 },
      { brand: 'Our Brand', weight: 800, durability: 9, price: 89000 }
    ],
    rating: 4.6,
    reviews: 98,
    inStock: true
  },
  {
    id: 'prod-lantern-1',
    name: 'Stellar LED Lantern',
    category: '랜턴',
    price: 79000,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    description: '프리미엄 LED 랜턴. 밝기 조절 가능하고 배터리 수명이 최대 100시간까지 지속됩니다.',
    specs: {
      weight: '280g',
      material: 'Aluminum + Tempered Glass',
      capacity: '1200 Lumens',
      dimensions: '10 x 10 x 15cm',
      color: 'Matte Black / Titanium'
    },
    comparison: [
      { brand: 'Helinox', weight: 320, durability: 8, price: 95000 },
      { brand: 'Kovea', weight: 350, durability: 7, price: 75000 },
      { brand: 'Our Brand', weight: 280, durability: 9, price: 79000 }
    ],
    rating: 4.8,
    reviews: 267,
    inStock: true
  },
  {
    id: 'prod-stove-1',
    name: 'Compact Titanium Stove',
    category: '조리기구',
    price: 59000,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    description: '초경량 티타늄 캠핑 스토브. 빠른 점화와 효율적인 열 분산으로 백팩킹에 최적화되어 있습니다.',
    specs: {
      weight: '150g',
      material: 'Pure Titanium',
      capacity: '1.5L',
      dimensions: '15 x 12 x 8cm',
      color: 'Natural Titanium'
    },
    comparison: [
      { brand: 'Helinox', weight: 180, durability: 8, price: 75000 },
      { brand: 'Kovea', weight: 200, durability: 7, price: 55000 },
      { brand: 'Our Brand', weight: 150, durability: 9, price: 59000 }
    ],
    rating: 4.7,
    reviews: 134,
    inStock: true
  },
  {
    id: 'prod-sleeping-1',
    name: 'Premium Down Sleeping Bag',
    category: '침낭',
    price: 349000,
    originalPrice: 420000,
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80',
    description: '프리미엄 다운 침낭. -10°C까지 사용 가능한 고급 침낭으로 겨울 캠핑의 필수품입니다.',
    specs: {
      weight: '1.2kg',
      material: '90% White Duck Down + Ripstop Nylon',
      capacity: '-10°C',
      dimensions: '접음: 30x20x20cm / 펼침: 200x80cm',
      color: 'Navy / Charcoal'
    },
    comparison: [
      { brand: 'Helinox', weight: 1400, durability: 8, price: 450000 },
      { brand: 'Kovea', weight: 1500, durability: 7, price: 330000 },
      { brand: 'Our Brand', weight: 1200, durability: 9, price: 349000 }
    ],
    rating: 4.9,
    reviews: 203,
    inStock: true
  },
  {
    id: 'prod-backpack-1',
    name: 'TrailMaster 50L Backpack',
    category: '백팩',
    price: 279000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description: '50L 용량의 프리미엄 백팩. 인체공학적 설계와 통풍 시스템으로 장시간 착용해도 편안합니다.',
    specs: {
      weight: '1.8kg',
      material: '600D Polyester + Aluminum Frame',
      capacity: '50L',
      dimensions: '32 x 20 x 60cm',
      color: 'Charcoal / Forest Green'
    },
    comparison: [
      { brand: 'Helinox', weight: 2100, durability: 8, price: 320000 },
      { brand: 'Kovea', weight: 2000, durability: 7, price: 260000 },
      { brand: 'Our Brand', weight: 1800, durability: 9, price: 279000 }
    ],
    rating: 4.8,
    reviews: 178,
    inStock: true
  }
];

// ============================================================================
// Hidden Gems: 알려지지 않은 최고의 캠핑 입지
// ============================================================================
export const HIDDEN_GEMS: HiddenGem[] = [
  {
    id: 'gem-1',
    name: '양산 대나무숲 노지캠핑',
    region: '경상',
    address: '경상남도 양산시 원동면 대나무숲길 45',
    type: 'wild',
    description: '수령 100년 이상의 대나무숲으로 둘러싸인 비경의 노지 캠핑지. 대나무 사이로 부는 바람이 만드는 자연음악과 함께 명상적인 캠핑을 즐길 수 있습니다.',
    locationAnalysis: {
      drainage: '우수한 배수 상태 - 자갈과 모래 혼합 지형으로 빗물이 빠르게 빠짐',
      windProtection: '대나무숲이 북풍을 완벽하게 차단하며 남동풍만 통과',
      sunExposure: '동쪽 개방으로 일출이 압도적 - 새벽 5시 30분 일출 포인트 최고',
      terrain: '완만한 경사지로 자연 배수 형성, 텐트 설치에 최적',
      accessibility: '4WD 차량으로만 진입 가능, 차량 진입로 1.2km'
    },
    crowdLevel: 1,
    viewQuality: 5,
    reservationAvailable: false,
    capacity: 8,
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 35.3742, lng: 129.0123 },
    expertComment: '지역 주민들도 잘 모르는 숨은 명소. 대나무숲의 자연 차음 효과로 완벽한 정적을 경험할 수 있으며, 동쪽 개방으로 인한 일출 경험이 정말 압도적입니다. 배수가 우수해 우기에도 안전합니다.',
    bestSeason: ['봄', '가을'],
    price: 0
  },
  {
    id: 'gem-2',
    name: '강릉 해안 절벽 글래머핑 스팟',
    region: '강원',
    address: '강원특별자치도 강릉시 강동면 해안로 234',
    type: 'private',
    description: '동해 바다를 마주한 절벽 위의 프라이빗 글래머핑 사이트. 파도 소리와 함께 일출을 맞이하는 경험은 평생 잊지 못할 추억이 됩니다.',
    locationAnalysis: {
      drainage: '절벽 위치로 자연 배수 완벽 - 빗물이 바로 바다로 흘러감',
      windProtection: '해안 절벽이지만 남쪽 방향 텐트 배치로 북풍 차단 가능',
      sunExposure: '동쪽 완전 개방 - 수평선 위의 일출이 정말 장관',
      terrain: '암반 지형으로 매우 견고, 텐트 고정 용이',
      accessibility: '승용차 진입 가능, 주차장에서 도보 5분'
    },
    crowdLevel: 2,
    viewQuality: 5,
    reservationAvailable: true,
    capacity: 4,
    imageUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 37.7749, lng: 129.1234 },
    expertComment: '강릉 해안의 가장 아름다운 비경 중 하나. 절벽 위치로 인한 완벽한 배수와 파도 소리의 명상 효과가 최고입니다. 일출 시간 30분 전 도착을 추천합니다.',
    bestSeason: ['봄', '여름', '가을'],
    price: 150000
  },
  {
    id: 'gem-3',
    name: '여수 섬 노지캠핑 - 독도 뷰',
    region: '전라',
    address: '전라남도 여수시 남면 독도길 12',
    type: 'wild',
    description: '여수 앞바다의 작은 섬에 위치한 노지 캠핑지. 일몰 시 독도 방향의 하늘이 불타는 듯한 색상으로 변하는 경험을 할 수 있습니다.',
    locationAnalysis: {
      drainage: '해안 모래사장 지형 - 배수 최상',
      windProtection: '섬의 중앙 위치로 해풍 완화, 서쪽 바위로 일몰 시 바람 차단',
      sunExposure: '서쪽 완전 개방 - 일몰이 정말 압도적, 해 질 때 하늘이 불타는 듯함',
      terrain: '모래사장과 자갈 혼합, 텐트 설치 용이',
      accessibility: '여객선으로만 진입 가능 (1일 2회 운항)'
    },
    crowdLevel: 1,
    viewQuality: 5,
    reservationAvailable: false,
    capacity: 6,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 34.7604, lng: 127.7622 },
    expertComment: '섬이라는 특수성으로 인해 거의 알려지지 않은 명소. 일몰의 색감이 정말 압도적이며, 밤하늘의 별도 정말 많습니다. 여객선 시간 확인 필수.',
    bestSeason: ['가을', '겨울'],
    price: 0
  },
  {
    id: 'gem-4',
    name: '남이섬 뒤 계곡 세미프라이빗 캠핑',
    region: '경기',
    address: '경기도 가평군 북면 계곡로 156',
    type: 'semi-private',
    description: '남이섬으로 유명한 가평이지만, 관광객이 거의 모르는 뒷산 계곡의 프라이빗 캠핑지. 맑은 계곡물과 함께 고요한 숲속 캠핑을 즐길 수 있습니다.',
    locationAnalysis: {
      drainage: '계곡 지형으로 자연 배수 완벽',
      windProtection: '계곡 양쪽 산이 완벽하게 바람 차단',
      sunExposure: '계곡 중앙으로 오전 9시부터 오후 3시까지 햇빛 충분',
      terrain: '계곡 바닥 모래사장, 텐트 설치 최적',
      accessibility: '일반 승용차 진입 가능, 주차장에서 도보 10분'
    },
    crowdLevel: 2,
    viewQuality: 4,
    reservationAvailable: true,
    capacity: 10,
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 37.8234, lng: 127.5123 },
    expertComment: '남이섬 근처지만 관광객이 거의 모르는 명소. 계곡의 맑은 물과 자연 배수가 최고의 장점입니다. 여름 물놀이와 가을 단풍이 정말 아름답습니다.',
    bestSeason: ['여름', '가을'],
    price: 80000
  },
  {
    id: 'gem-5',
    name: '설악산 백담계곡 상류 노지',
    region: '강원',
    address: '강원특별자치도 인제군 북면 백담계곡로 234',
    type: 'wild',
    description: '설악산 백담계곡의 상류에 위치한 완전 노지 캠핑지. 계곡의 맑은 물과 원시림의 정취를 그대로 느낄 수 있는 진정한 백컨트리 캠핑 경험을 제공합니다.',
    locationAnalysis: {
      drainage: '계곡 상류로 배수 최상',
      windProtection: '계곡 양쪽 절벽과 원시림이 완벽하게 바람 차단',
      sunExposure: '계곡 중앙으로 제한적이지만 자연스러운 일출/일몰 경험',
      terrain: '계곡 바닥 자갈과 모래, 자연 배수 형성',
      accessibility: '4WD 차량 또는 도보 진입만 가능 (도보 2시간)'
    },
    crowdLevel: 1,
    viewQuality: 5,
    reservationAvailable: false,
    capacity: 5,
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 38.1234, lng: 128.5678 },
    expertComment: '진정한 백컨트리 캠핑을 원한다면 이곳이 최고입니다. 완전 노지이지만 계곡의 배수가 우수하고, 원시림의 정취가 정말 특별합니다. 도보 진입이 필수이므로 체력이 필요합니다.',
    bestSeason: ['여름', '가을'],
    price: 0
  },
  {
    id: 'gem-6',
    name: '제주 한라산 자락 고지대 캠핑',
    region: '제주',
    address: '제주특별자치도 제주시 고산리 한라산로 567',
    type: 'private',
    description: '제주 한라산 자락의 고지대에 위치한 프라이빗 캠핑지. 해발 800m의 높이에서 구름 위의 캠핑을 경험할 수 있습니다.',
    locationAnalysis: {
      drainage: '고지대 위치로 자연 배수 완벽',
      windProtection: '한라산 남쪽 경사지로 북풍 차단, 하지만 강풍 주의 필요',
      sunExposure: '고지대로 인한 조기 일출 - 새벽 5시 일출 가능',
      terrain: '화산암 지형으로 매우 견고',
      accessibility: '일반 승용차 진입 가능, 주차장에서 도보 15분'
    },
    crowdLevel: 2,
    viewQuality: 5,
    reservationAvailable: true,
    capacity: 8,
    imageUrl: 'https://images.unsplash.com/photo-1533873984035-25970ab07461?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 33.3617, lng: 126.5292 },
    expertComment: '제주의 숨은 명소 중 최고. 해발 800m의 고지대에서 구름 위의 캠핑을 경험할 수 있으며, 별도 정말 많습니다. 강풍 주의 필수이지만 경험할 가치가 충분합니다.',
    bestSeason: ['봄', '가을'],
    price: 120000
  }
];
