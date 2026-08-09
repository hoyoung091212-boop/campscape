export interface Campground {
  id: string;
  name: string;
  region: '서울' | '경기' | '강원' | '충청' | '전라' | '경상' | '제주';
  address: string;
  type: ('오토캠핑' | '글램핑' | '카라반')[];
  petFriendly: boolean;
  themes: ('단풍명소' | '불멍하기 좋은 곳' | '별 보기 좋은 곳' | '계곡/물놀이' | '바다전망' | '숲속힐링')[];
  description: string;
  detailedDescription: string;
  imageUrl: string;
  facilities: string[];
  nearbyAttractions: string[];
  mapUrl: string; // 네이버 또는 구글 지도 연결 링크
  rating: number;
  price: number;
}

export const CAMPGROUNDS: Campground[] = [
  {
    id: 'camp-1',
    name: '포천 가래골 힐링캠핑장',
    region: '경기',
    address: '경기도 포천시 창수면 가래울길 29-1',
    type: ['오토캠핑', '카라반'],
    petFriendly: true,
    themes: ['숲속힐링', '불멍하기 좋은 곳'],
    description: '울창한 소나무 숲속에서 프라이빗한 힐링을 즐길 수 있는 캠핑장입니다.',
    detailedDescription: '포천 가래골 힐링캠핑장은 도심에서 벗어나 깊은 숲속의 맑은 공기를 호흡할 수 있는 최적의 힐링 명소입니다. 넓은 사이트 간격과 철저한 매너타임 관리로 조용하고 평화로운 캠핑을 보장합니다. 저녁에는 소나무 숲 사이로 내려앉는 노을을 바라보며 감성 가득한 불멍을 즐기실 수 있습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    facilities: ['개별샤워실', '매점', '와이파이', '전기', '산책로'],
    nearbyAttractions: ['포천 아트밸리', '산정호수', '허브아일랜드'],
    mapUrl: 'https://map.naver.com/v5/search/%ED%8F%AC%EC%B2%9C%20%EA%B0%80%EB%9E%98%EA%B3%A8%20%ED%9E%90%EB%A7%81%EC%BA%A5%ED%95%91%EC%9E%A5',
    rating: 4.8,
    price: 50000
  },
  {
    id: 'camp-2',
    name: '평창 산너미목장 캠핑장',
    region: '강원',
    address: '강원특별자치도 평창군 미탄면 서동로 348-15',
    type: ['오토캠핑'],
    petFriendly: true,
    themes: ['별 보기 좋은 곳', '숲속힐링', '단풍명소'],
    description: '청정 고원 지대 목장에서 밤하늘 가득 쏟아지는 은하수를 만나는 곳.',
    detailedDescription: '해발 700m 청정 고원에 위치한 산너미목장은 광활한 초지와 밤하늘의 은하수가 매력적인 캠핑장입니다. 흑염소들이 뛰어노는 평화로운 목장 산책로를 따라 올라가면 평창의 산세가 한눈에 들어오는 육백마지기 전망대에 닿을 수 있습니다. 빛공해가 전혀 없어 밤이 되면 쏟아지는 별을 관측할 수 있는 국내 최고의 별 보기 명소입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    facilities: ['샤워실', '개수대', '반려견 놀이터', '산책로', '매점'],
    nearbyAttractions: ['육백마지기', '백룡동굴', '청옥산'],
    mapUrl: 'https://map.naver.com/v5/search/%ED%8F%89%EC%B0%BD%20%EC%82%B0%EB%84%88%EB%AF%B8%EB%AA%A9%EC%9E%A5',
    rating: 4.9,
    price: 60000
  },
  {
    id: 'camp-3',
    name: '가평 글램트리 리조트',
    region: '경기',
    address: '경기도 가평군 서면 자라섬길 120',
    type: ['글램핑'],
    petFriendly: false,
    themes: ['단풍명소', '숲속힐링'],
    description: '자연과 건축의 조화가 돋보이는 최고급 럭셔리 글램핑 하우스.',
    detailedDescription: '글램트리 리조트는 자연 속에서 호텔급의 안락함을 누릴 수 있는 프리미엄 글램핑장입니다. 독창적인 숲속 나뭇잎 모양의 객실 디자인과 사계절 온수 풀, 최고급 어메니티가 완비되어 있습니다. 가을이 되면 울긋불긋하게 물드는 가평의 산자락을 객실 통유리창을 통해 감상할 수 있는 단풍 명소이기도 합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
    facilities: ['실내외 온수풀', '개별화장실', '바비큐그릴', '카페', '어메니티'],
    nearbyAttractions: ['자라섬', '남이섬', '쁘띠프랑스'],
    mapUrl: 'https://map.naver.com/v5/search/%EA%B0%80%ED%8F%89%20%EA%B8%80%EB%9E%A8%ED%8A%B8%EB%A6%AC%20%EB%A6%AC%EC%A1%B0%ED%8A%B8',
    rating: 4.7,
    price: 250000
  },
  {
    id: 'camp-4',
    name: '태안 어은돌송림 캠핑장',
    region: '충청',
    address: '충청남도 태안군 소원면 어은돌길 114',
    type: ['오토캠핑', '카라반'],
    petFriendly: true,
    themes: ['바다전망', '불멍하기 좋은 곳'],
    description: '서해안의 아름다운 낙조와 송림 숲이 어우러진 해변 캠핑장입니다.',
    detailedDescription: '어은돌송림 캠핑장은 울창한 소나무 숲 바로 앞이 모래사장인 환상적인 입지를 자랑합니다. 시원한 솔바람을 맞으며 캠핑을 즐기고, 물때에 맞춰 갯벌 체험이나 조개잡이를 할 수 있어 가족 단위 캠퍼들에게 인기가 많습니다. 특히 서해안 특유의 붉게 타오르는 저녁 노을을 배경으로 즐기는 모닥불과 바비큐는 잊지 못할 추억을 선사합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80',
    facilities: ['온수샤워실', '갯벌체험도구대여', '와이파이', '트램펄린', '공용냉장고'],
    nearbyAttractions: ['어은돌해수욕장', '만리포해수욕장', '천리포수목원'],
    mapUrl: 'https://map.naver.com/v5/search/%ED%83%9C%EC%95%88%20%EC%96%B4%EC%9D%80%EB%8F%8C%EC%86%A1%EB%A6%BC%20%EC%BE%A1%ED%95%91%EC%9E%A5',
    rating: 4.5,
    price: 45000
  },
  {
    id: 'camp-5',
    name: '제주 어라운드폴리',
    region: '제주',
    address: '제주특별자치도 서귀포시 성산읍 서성일로 433-48',
    type: ['글램핑', '카라반', '오토캠핑'],
    petFriendly: false,
    themes: ['바다전망', '별 보기 좋은 곳', '숲속힐링'],
    description: '제주 중산간의 이국적인 풍경 속에 펼쳐진 아웃도어 스테이 파크.',
    detailedDescription: '제주 어라운드폴리는 전통적인 캠핑의 감성과 현대적인 건축 디자인이 결합된 하이브리드 아웃도어 공간입니다. 넓은 대지 위에 나지막이 솟은 오름들을 조망하며 제주의 바람과 돌, 하늘을 온전히 느낄 수 있습니다. 빈티지 카라반부터 디자인 롯지까지 다양한 스타일의 숙박을 지원하며, 저녁에는 밤하늘을 수놓는 별빛 아래에서 야외 스파를 즐길 수 있습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1533873984035-25970ab07461?auto=format&fit=crop&w=800&q=80',
    facilities: ['아웃도어풀', '바비큐펍', '개별스파', '공용키친', '편집숍'],
    nearbyAttractions: ['성산일출봉', '섭지코지', '빛의 벙커'],
    mapUrl: 'https://map.naver.com/v5/search/%EC%A0%9C%EC%A3%BC%20%EC%96%B4%EB%9D%BC%EC%9A%B4%EB%93%9C%ED%8F%AC%EB%A6%AC',
    rating: 4.9,
    price: 180000
  },
  {
    id: 'camp-6',
    name: '홍천 코코코코 카라반&글램핑',
    region: '강원',
    address: '강원특별자치도 홍천군 서면 한치골길 262',
    type: ['글램핑', '카라반'],
    petFriendly: true,
    themes: ['계곡/물놀이', '불멍하기 좋은 곳'],
    description: '맑고 깨끗한 홍천강변에 위치해 물놀이와 불멍을 동시에 즐기는 감성 캠프.',
    detailedDescription: '홍천강의 수려한 물줄기를 바로 눈앞에서 감상할 수 있는 리버뷰 글램핑장입니다. 여름철에는 카약과 물놀이를 즐기기에 최적이며, 전 객실 강변을 마주한 개별 데크에서 프라이빗한 불멍과 바비큐 파티가 가능합니다. 반려동물 전용 사이트와 운동장이 완비되어 있어 사랑하는 반려견과 함께 행복한 시간을 보낼 수 있습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1496545672447-f699b503d270?auto=format&fit=crop&w=800&q=80',
    facilities: ['반려견운동장', '강변산책로', '개별바비큐장', '공용샤워실', '와이파이'],
    nearbyAttractions: ['비발디파크', '팔봉산', '홍천강'],
    mapUrl: 'https://map.naver.com/v5/search/%ED%99%8D%EC%B2%9C%20%EC%BD%94%EC%BD%94%EC%BD%94%EC%BD%94%20%EC%BE%A1%ED%95%91%EC%9E%A5',
    rating: 4.6,
    price: 120000
  },
  {
    id: 'camp-7',
    name: '지리산 달궁자동차야영장',
    region: '전라',
    address: '전라북도 남원시 산내면 지리산로 365',
    type: ['오토캠핑'],
    petFriendly: false,
    themes: ['계곡/물놀이', '단풍명소', '숲속힐링'],
    description: '국립공원 지리산의 정기와 맑은 계곡물을 품은 전통의 명품 야영장.',
    detailedDescription: '지리산 국립공원 내에 위치한 달궁자동차야영장은 맑고 차가운 달궁계곡을 끼고 있어 여름철 피서지로 최상의 선택입니다. 울창한 원시림이 뿜어내는 피톤치드를 마시며 삼림욕을 즐길 수 있으며, 가을에는 온 산을 붉게 물들이는 지리산의 단풍을 가장 가까이서 감상할 수 있는 국립공원 대표 캠핑장입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?auto=format&fit=crop&w=800&q=80',
    facilities: ['샤워장', '취사장', '전기시설', '화장실', '대피소'],
    nearbyAttractions: ['뱀사골계곡', '노고단', '정령치전망대'],
    mapUrl: 'https://map.naver.com/v5/search/%EC%A7%80%EB%A6%AC%EC%82%B0%20%EB%8B%AC%EA%B6%81%EC%9E%90%EB%8F%99%EC%B0%A8%EC%95%BC%EC%98%81%EC%9E%A5',
    rating: 4.4,
    price: 30000
  },
  {
    id: 'camp-8',
    name: '남해 버드하우스 캠핑장',
    region: '경상',
    address: '경상남도 남해군 창선면 서부로 1451-22',
    type: ['오토캠핑'],
    petFriendly: true,
    themes: ['바다전망', '숲속힐링'],
    description: '폐교를 아기자기한 예술 정원으로 꾸민 감성 넘치는 바닷가 캠핑장.',
    detailedDescription: '남해 버드하우스는 시골의 폐교를 캠핑 예술 공간으로 재탄생시킨 이색적인 캠핑장입니다. 캠핑장 곳곳에 정성스레 가꿔진 수목과 아기자기한 나무 조각품들이 동화 같은 분위기를 연출합니다. 텐트 사이트에서 남해의 푸른 바다가 보이며, 주인장의 따뜻한 배려와 감성적인 인테리어 덕분에 아는 사람들만 찾아가는 숨은 보석 같은 곳입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=800&q=80',
    facilities: ['실내샤워실', '목공체험실', '야외도서관', '공용냉장고', '개수대'],
    nearbyAttractions: ['독일마을', '다랭이마을', '보리암'],
    mapUrl: 'https://map.naver.com/v5/search/%EB%82%A8%ED%95%B4%20%EB%B2%84%EB%93%9C%ED%95%98%EC%9A%B0%EC%8A%A4%20%EC%BE%A1%ED%95%91%EC%9E%A5',
    rating: 4.8,
    price: 55000
  },
  {
    id: 'camp-9',
    name: '서울 난지캠핑장',
    region: '서울',
    address: '서울특별시 마포구 한강난지로 22',
    type: ['오토캠핑', '글램핑'],
    petFriendly: false,
    themes: ['불멍하기 좋은 곳', '계곡/물놀이'],
    description: '멀리 떠나지 않고 도심 속 한강변에서 즐기는 바비큐와 감성 캠핑.',
    detailedDescription: '바쁜 일상 속에서 멀리 떠나지 않고도 한강의 정취를 만끽할 수 있는 서울 도심 속 유일무이한 대규모 캠핑장입니다. 한강을 바라보며 바비큐 파티를 즐길 수 있는 바비큐 존과 아늑한 글램핑 텐트, 오토캠핑 사이트가 고루 조성되어 있어 가볍게 피크닉을 오거나 주말 캠핑을 즐기기에 매우 편리합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1526491109672-74740652b963?auto=format&fit=crop&w=800&q=80',
    facilities: ['공용샤워실', '한강산책로', '편의점', '식수대', '그늘막'],
    nearbyAttractions: ['난지한강공원', '하늘공원', '망원시장'],
    mapUrl: 'https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%20%EB%82%9C%EC%A7%80%EC%BE%A1%ED%95%91%EC%9E%A5',
    rating: 4.3,
    price: 35000
  },
  {
    id: 'camp-10',
    name: '괴산 코오롱스포츠 캠핑파크',
    region: '충청',
    address: '충청북도 괴산군 청천면 관평길 70',
    type: ['글램핑', '오토캠핑'],
    petFriendly: false,
    themes: ['숲속힐링', '단풍명소', '별 보기 좋은 곳'],
    description: '캠핑 명가 코오롱스포츠가 제안하는 완벽한 장비와 고품격 아웃도어 가이드.',
    detailedDescription: '괴산 속리산 자락에 위치한 코오롱스포츠 캠핑파크는 빈손으로 가도 완벽한 캠핑을 경험할 수 있는 \'렛츠고 캠핑\' 프로그램을 운영합니다. 최고급 코오롱 텐트와 모든 장비가 세팅되어 있으며, 전문 캠핑 가이드들이 상주하며 캠핑 교육과 숲 체험 프로그램을 제공하여 초보 캠퍼들에게 가장 안전하고 완벽한 캠핑 경험을 선사합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80',
    facilities: ['풀패키지장비제공', '어드벤처파크', '샤워실', '매점', '세탁실'],
    nearbyAttractions: ['화양구곡', '산막이옛길', '속리산국립공원'],
    mapUrl: 'https://map.naver.com/v5/search/%EA%B4%B4%EC%82%B0%20%EC%BD%94%EC%98%A4%EB%A1%B1%EC%8A%A4%ED%8F%AC%EC%B8%A0%20%EC%BE%A1%ED%95%91%ED%8C%8C%ED%81%AC',
    rating: 4.9,
    price: 150000
  }
];
