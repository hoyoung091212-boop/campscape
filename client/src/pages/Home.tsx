import { useState, useEffect, useMemo } from 'react';
import { CAMPGROUNDS, Campground } from '../const';
import { 
  Search, 
  MapPin, 
  Dog, 
  Flame, 
  Sparkles, 
  Compass, 
  Heart, 
  Star, 
  X, 
  ExternalLink, 
  ChevronRight, 
  Moon, 
  Sun,
  Info,
  Layers,
  Trees,
  Waves,
  Map as MapIcon,
  Filter,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { toast } from 'sonner';
import { useTheme } from '../contexts/ThemeContext';

// 네이버 지도 검색 URL 생성 함수 (주소 + 이름 조합)
const getNaverMapUrl = (address: string, campName: string): string => {
  const searchQuery = `${address.trim()} ${campName.trim()}`;
  const encodedQuery = encodeURIComponent(searchQuery);
  return `https://map.naver.com/v5/search/${encodedQuery}`;
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  // 검색 및 필터링 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('전체');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [petFriendlyOnly, setPetFriendlyFriendlyOnly] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>('전체');

  // 상세 모달 상태
  const [selectedCampground, setSelectedCampground] = useState<Campground | null>(null);

  // 찜한 캠핑장 상태 (로컬 스토리지 연동)
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('camp-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // 모바일 필터 Drawer 상태
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // 모바일 네비게이션 메뉴 상태
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 찜하기 상태 로컬스토리지 동기화
  useEffect(() => {
    localStorage.setItem('camp-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 찜하기 토글 함수
  const toggleFavorite = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    setFavorites(prev => {
      const isFav = prev.includes(id);
      if (isFav) {
        toast.success(`'${name}' 찜 목록에서 삭제되었습니다.`);
        return prev.filter(item => item !== id);
      } else {
        toast.success(`'${name}' 찜 목록에 추가되었습니다!`);
        return [...prev, id];
      }
    });
  };

  // 현재 계절에 맞는 테마 추천 계산
  const currentSeasonTheme = useMemo(() => {
    const month = new Date().getMonth() + 1; // 0-indexed -> 1-12
    if (month >= 3 && month <= 5) return { name: '계곡/물놀이', label: '싱그러운 봄, 계곡으로 떠나요', icon: <Waves className="w-4 h-4 text-emerald-600" /> };
    if (month >= 6 && month <= 8) return { name: '계곡/물놀이', label: '뜨거운 여름, 시원한 물놀이 명소', icon: <Waves className="w-4 h-4 text-emerald-600" /> };
    if (month >= 9 && month <= 11) return { name: '단풍명소', label: '낭만 가득한 가을, 단풍 명소 추천', icon: <Trees className="w-4 h-4 text-amber-600" /> };
    return { name: '불멍하기 좋은 곳', label: '차가운 겨울, 따뜻한 온기 가득 불멍 명소', icon: <Flame className="w-4 h-4 text-orange-500" /> };
  }, []);

  // 필터링된 캠핑장 목록 계산
  const filteredCampgrounds = useMemo(() => {
    return CAMPGROUNDS.filter(camp => {
      // 검색어 필터링 (이름, 주소, 설명 등)
      const matchesSearch = searchQuery === '' || 
        camp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.description.toLowerCase().includes(searchQuery.toLowerCase());

      // 지역 필터링
      const matchesRegion = selectedRegion === '전체' || camp.region === selectedRegion;

      // 캠핑 유형 필터링 (다중 선택 가능, 하나라도 일치하면 포함)
      const matchesType = selectedTypes.length === 0 || 
        camp.type.some(t => selectedTypes.includes(t));

      // 반려동물 동반 가능 필터링
      const matchesPet = !petFriendlyOnly || camp.petFriendly;

      // 테마 필터링
      const matchesTheme = selectedTheme === '전체' || camp.themes.includes(selectedTheme as any);

      return matchesSearch && matchesRegion && matchesType && matchesPet && matchesTheme;
    });
  }, [searchQuery, selectedRegion, selectedTypes, petFriendlyOnly, selectedTheme]);

  // 테마 추천 섹션 데이터
  const themeRecommendations = useMemo(() => {
    return {
      season: CAMPGROUNDS.filter(camp => camp.themes.includes(currentSeasonTheme.name as any)).slice(0, 3),
      star: CAMPGROUNDS.filter(camp => camp.themes.includes('별 보기 좋은 곳')).slice(0, 3),
      forest: CAMPGROUNDS.filter(camp => camp.themes.includes('숲속힐링')).slice(0, 3),
    };
  }, [currentSeasonTheme]);

  // 캠핑 유형 토글
  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      
      {/* GNB / Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Compass className="h-6 w-6 text-primary animate-pulse" />
              <span className="hidden sm:inline font-serif text-2xl font-bold tracking-tight text-primary">CampScape</span>
              <span className="sm:hidden font-serif text-xl font-bold tracking-tight text-primary">CS</span>
            </a>
            
            {/* 데스크톱 네비게이션 메뉴 */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                추천 캠핑장
              </a>
              <a href="/hidden-gems" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                Hidden Gems
              </a>
              <a href="/shop" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                Shop
              </a>
            </nav>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            {/* 찜 목록 (모바일에서는 아이콘만) */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Heart className="w-4 h-4 fill-primary text-primary" />
              <span>찜 목록</span>
              <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
                {favorites.length}
              </span>
            </div>

            {/* 모바일: 찜 목록 아이콘만 */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden rounded-full"
            >
              <Heart className="w-5 h-5 fill-primary text-primary" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold">
                  {favorites.length}
                </span>
              )}
            </Button>

            {/* 다크 모드 토글 */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full border-border bg-card/50 hover:bg-accent/20"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-primary" />}
            </Button>

            {/* 모바일 햄버거 메뉴 */}
            <div className="md:hidden">
              <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[60vh]">
                  <DrawerHeader>
                    <DrawerTitle>메뉴</DrawerTitle>
                  </DrawerHeader>
                  <nav className="flex flex-col gap-2 px-4 pb-8">
                    <a 
                      href="/" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      추천 캠핑장
                    </a>
                    <a 
                      href="/hidden-gems" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      Hidden Gems
                    </a>
                    <a 
                      href="/shop" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      Shop
                    </a>
                  </nav>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-emerald-950 py-24 lg:py-32">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663705670486/cBwyzxXFRdvRN69ddLhrJh/hero-camp-WWYXiEgobQCngk6UVyifVd.webp" 
            alt="Camping Hero" 
            className="w-full h-full object-cover object-center opacity-40 scale-105 transform transition-transform duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent" />
        </div>

        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-emerald-800/80 text-emerald-100 border-emerald-700/50 hover:bg-emerald-800/80 px-3 py-1 text-xs tracking-wider uppercase font-medium">
            Find Your Pure Escape
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-emerald-50 mb-6 leading-[1.15]">
            자연과 가장 가까운 숨결,<br />
            나만의 맞춤형 캠핑장을 만나보세요.
          </h1>
          <p className="text-emerald-200/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            CampScape는 당신의 취향, 현재 계절, 동반 반려동물 여부까지 세밀하게 분석하여 완벽한 아웃도어 힐링 명소를 추천합니다.
          </p>

          {/* 통합 검색바 */}
          <div className="bg-white/95 dark:bg-zinc-900/95 p-2 rounded-2xl shadow-xl border border-white/20 max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 items-stretch">
            <div className="flex-1 flex items-center px-3 gap-2 border-b sm:border-b-0 sm:border-r border-border/60 py-2 sm:py-0">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input 
                type="text" 
                placeholder="캠핑장 이름, 키워드, 주소 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 focus:outline-none text-foreground placeholder:text-muted-foreground/80 text-sm"
              />
            </div>
            <div className="flex gap-2 p-1 shrink-0">
              <Button 
                onClick={() => {
                  const target = document.getElementById('explorer-section');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 py-2.5 transition-all duration-200 shadow-md shadow-primary/20"
              >
                검색하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 테마별 맞춤 추천 섹션 */}
      <section className="py-16 bg-secondary/30 border-b border-border/40">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-primary font-semibold text-sm tracking-wider uppercase block mb-1">Curated Selection</span>
              <h2 className="font-serif text-3xl font-bold tracking-tight">테마별 맞춤 추천 캠핑장</h2>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-sm text-primary font-medium cursor-pointer hover:underline" onClick={() => {
              setSelectedTheme('전체');
              document.getElementById('explorer-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <span>전체 탐색하기</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            
            {/* 1. 계절 추천 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                {currentSeasonTheme.icon}
                <h3 className="font-serif text-lg font-bold">{currentSeasonTheme.label}</h3>
              </div>
              <div className="flex flex-col gap-3">
                {themeRecommendations.season.map(camp => (
                  <div 
                    key={camp.id}
                    onClick={() => setSelectedCampground(camp)}
                    className="group flex gap-3 p-2.5 rounded-xl hover:bg-card/80 border border-transparent hover:border-border/60 cursor-pointer transition-all duration-200"
                  >
                    <img src={camp.imageUrl} alt={camp.name} className="w-14 sm:w-16 h-14 sm:h-16 rounded-lg object-cover object-center shrink-0" />
                    <div className="min-w-0 flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{camp.name}</h4>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{camp.address}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-primary">{camp.region}</span>
                        <span className="text-[10px] text-muted-foreground">•</span>
                        <div className="flex items-center gap-0.5 text-amber-500 text-xs font-medium">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>{camp.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. 별 보기 좋은 곳 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <h3 className="font-serif text-lg font-bold">밤하늘 가득, 은하수가 쏟아지는 곳</h3>
              </div>
              <div className="flex flex-col gap-3">
                {themeRecommendations.star.map(camp => (
                  <div 
                    key={camp.id}
                    onClick={() => setSelectedCampground(camp)}
                    className="group flex gap-3 p-2.5 rounded-xl hover:bg-card/80 border border-transparent hover:border-border/60 cursor-pointer transition-all duration-200"
                  >
                    <img src={camp.imageUrl} alt={camp.name} className="w-14 sm:w-16 h-14 sm:h-16 rounded-lg object-cover object-center shrink-0" />
                    <div className="min-w-0 flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{camp.name}</h4>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{camp.address}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-primary">{camp.region}</span>
                        <span className="text-[10px] text-muted-foreground">•</span>
                        <div className="flex items-center gap-0.5 text-amber-500 text-xs font-medium">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>{camp.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. 숯속 히링 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <Trees className="w-4 h-4 text-emerald-600" />
                <h3 className="font-serif text-lg font-bold">피톤치드 가듍, 깊은 숯속의 휴식</h3>
              </div>
              <div className="flex flex-col gap-3">
                {themeRecommendations.forest.map(camp => (
                  <div 
                    key={camp.id}
                    onClick={() => setSelectedCampground(camp)}
                    className="group flex gap-3 p-2.5 rounded-xl hover:bg-card/80 border border-transparent hover:border-border/60 cursor-pointer transition-all duration-200"
                  >
                    <img src={camp.imageUrl} alt={camp.name} className="w-14 sm:w-16 h-14 sm:h-16 rounded-lg object-cover object-center shrink-0" />
                    <div className="min-w-0 flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{camp.name}</h4>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{camp.address}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-primary">{camp.region}</span>
                        <span className="text-[10px] text-muted-foreground">•</span>
                        <div className="flex items-center gap-0.5 text-amber-500 text-xs font-medium">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>{camp.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 탐색 및 검색 필터링 섹션 */}
      <section id="explorer-section" className="py-12 md:py-20 flex-1">
        <div className="container">
          
          {/* 모바일 필터 버튼 (md 이상에서는 숨김) */}
          <div className="md:hidden mb-6">
            <Drawer open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" className="w-full rounded-xl gap-2">
                  <Filter className="w-4 h-4" />
                  필터 보기
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh]">
                <DrawerHeader>
                  <DrawerTitle>검색 필터</DrawerTitle>
                </DrawerHeader>
                <div className="overflow-y-auto px-4 pb-8 space-y-6">
                  {/* 1. 지역 필터 */}
                  <div className="mb-6">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">지역 선택</label>
                    <div className="flex flex-wrap gap-1.5">
                      {['전체', '서울', '경기', '강원', '충청', '전라', '경상', '제주'].map(region => (
                        <button
                          key={region}
                          onClick={() => setSelectedRegion(region)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${selectedRegion === region ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20' : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
                        >
                          {region}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. 캠핑 유형 필터 */}
                  <div className="mb-6">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">캠핑 유형</label>
                    <div className="flex flex-col gap-2">
                      {['오토캠핑', '글램핑', '카라반'].map(type => {
                        const isSelected = selectedTypes.includes(type);
                        return (
                          <button
                            key={type}
                            onClick={() => handleTypeToggle(type)}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${isSelected ? 'bg-primary/5 border-primary/40 text-primary' : 'bg-transparent border-border/60 text-muted-foreground hover:bg-secondary/30 hover:text-foreground'}`}
                          >
                            <span>{type}</span>
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-border/80'}`}>
                              {isSelected && <span className="text-[10px]">✓</span>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. 반려동물 필터 */}
                  <div className="mb-6">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">반려동물 케어</label>
                    <button
                      onClick={() => setPetFriendlyFriendlyOnly(!petFriendlyOnly)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium border transition-all duration-200 ${petFriendlyOnly ? 'bg-primary/5 border-primary/40 text-primary' : 'bg-transparent border-border/60 text-muted-foreground hover:bg-secondary/30 hover:text-foreground'}`}
                    >
                      <div className="flex items-center gap-2">
                        <Dog className="w-4 h-4" />
                        <span>반려동물 동반</span>
                      </div>
                      <div className={`w-8 h-5 rounded-full p-0.5 transition-colors duration-200 ${petFriendlyOnly ? 'bg-primary' : 'bg-muted'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 transform ${petFriendlyOnly ? 'translate-x-3' : 'translate-x-0'}`} />
                      </div>
                    </button>
                  </div>

                  {/* 4. 감성 테마 필터 */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">감성 테마</label>
                    <div className="flex flex-col gap-1.5">
                      {['전체', '단풍명소', '불멍하기 좋은 곳', '별 보기 좋은 곳', '계곡/물놀이', '바다전망', '숲속힐링'].map(theme => (
                        <button
                          key={theme}
                          onClick={() => setSelectedTheme(theme)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${selectedTheme === theme ? 'bg-primary/10 text-primary font-bold' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}`}
                        >
                          # {theme}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            
            {/* 좌측 사이드바 필터 패널 (md 이상에서만 표시) */}
            <div className="hidden md:block w-full md:w-80 shrink-0 bg-card p-6 rounded-2xl border border-border/60 shadow-sm lg:sticky lg:top-24">
              <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-primary" />
                  <h3 className="font-serif text-lg font-bold">검색 필터</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRegion('전체');
                    setSelectedTypes([]);
                    setPetFriendlyFriendlyOnly(false);
                    setSelectedTheme('전체');
                    toast.success('필터가 초기화되었습니다.');
                  }}
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  초기화
                </Button>
              </div>

              {/* 1. 지역 필터 */}
              <div className="mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">지역 선택</label>
                <div className="flex flex-wrap gap-1.5">
                  {['전체', '서울', '경기', '강원', '충청', '전라', '경상', '제주'].map(region => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        selectedRegion === region 
                          ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20' 
                          : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. 캠핑 유형 필터 */}
              <div className="mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">캠핑 유형 (중복 선택)</label>
                <div className="flex flex-col gap-2">
                  {['오토캠핑', '글램핑', '카라반'].map(type => {
                    const isSelected = selectedTypes.includes(type);
                    return (
                      <button
                        key={type}
                        onClick={() => handleTypeToggle(type)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${
                          isSelected 
                            ? 'bg-primary/5 border-primary/40 text-primary' 
                            : 'bg-transparent border-border/60 text-muted-foreground hover:bg-secondary/30 hover:text-foreground'
                        }`}
                      >
                        <span>{type}</span>
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                          isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-border/80'
                        }`}>
                          {isSelected && <span className="text-[10px]">✓</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. 반려동물 동반 필터 */}
              <div className="mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">반려동물 케어</label>
                <button
                  onClick={() => setPetFriendlyFriendlyOnly(!petFriendlyOnly)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium border transition-all duration-200 ${
                    petFriendlyOnly 
                      ? 'bg-primary/5 border-primary/40 text-primary' 
                      : 'bg-transparent border-border/60 text-muted-foreground hover:bg-secondary/30 hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Dog className="w-4 h-4" />
                    <span>반려동물 동반 가능만 보기</span>
                  </div>
                  <div className={`w-8 h-5 rounded-full p-0.5 transition-colors duration-200 ${
                    petFriendlyOnly ? 'bg-primary' : 'bg-muted'
                  }`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 transform ${
                      petFriendlyOnly ? 'translate-x-3' : 'translate-x-0'
                    }`} />
                  </div>
                </button>
              </div>

              {/* 4. 감성 테마 필터 */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">감성 테마</label>
                <div className="flex flex-col gap-1.5">
                  {['전체', '단풍명소', '불멍하기 좋은 곳', '별 보기 좋은 곳', '계곡/물놀이', '바다전망', '숲속힐링'].map(theme => (
                    <button
                      key={theme}
                      onClick={() => setSelectedTheme(theme)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                        selectedTheme === theme 
                          ? 'bg-primary/10 text-primary font-bold' 
                          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                      }`}
                    >
                      # {theme}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* 우측 결과 리스트 그리드 */}
            <div className="flex-1 w-full mt-8 md:mt-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h3 className="font-serif text-xl font-bold">
                    검색 결과 <span className="text-primary font-sans">{filteredCampgrounds.length}</span>개
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">자연 친화적인 최고의 공간들이 당신을 기다립니다.</p>
                </div>

                {/* 활성화된 필터 칩 */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedRegion !== '전체' && (
                    <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary border-transparent">
                      {selectedRegion}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedRegion('전체')} />
                    </Badge>
                  )}
                  {selectedTypes.map(type => (
                    <Badge key={type} variant="secondary" className="gap-1 bg-primary/10 text-primary border-transparent">
                      {type}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => handleTypeToggle(type)} />
                    </Badge>
                  ))}
                  {petFriendlyOnly && (
                    <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary border-transparent">
                      반려동물 동반
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setPetFriendlyFriendlyOnly(false)} />
                    </Badge>
                  )}
                  {selectedTheme !== '전체' && (
                    <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary border-transparent">
                      #{selectedTheme}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTheme('전체')} />
                    </Badge>
                  )}
                </div>
              </div>

              {filteredCampgrounds.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-card/40 border border-dashed border-border/80 rounded-2xl text-center">
                  <Compass className="w-12 h-12 text-muted-foreground/60 mb-4 animate-bounce" />
                  <h4 className="font-serif text-lg font-bold text-foreground mb-1">일치하는 캠핑장이 없습니다.</h4>
                  <p className="text-sm text-muted-foreground max-w-sm">필터를 완화하거나 다른 검색어로 찾아보세요.</p>
                  <Button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRegion('전체');
                      setSelectedTypes([]);
                      setPetFriendlyFriendlyOnly(false);
                      setSelectedTheme('전체');
                    }}
                    className="mt-6 rounded-xl"
                    variant="outline"
                  >
                    모든 필터 초기화
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredCampgrounds.map((camp, index) => {
                    const isFav = favorites.includes(camp.id);
                    // 와일드 미니멀리스트: 첫 번째 추천 카드는 비대칭적으로 더 크게 보이게 할 수 있음
                    return (
                      <Card 
                        key={camp.id}
                        onClick={() => setSelectedCampground(camp)}
                        className="group bg-card overflow-hidden rounded-2xl border border-border/50 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
                      >
                        {/* 이미지 영역 */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
                          <img 
                            src={camp.imageUrl} 
                            alt={camp.name} 
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          
                          {/* 찜하기 하트 버튼 */}
                          <button
                            onClick={(e) => toggleFavorite(camp.id, camp.name, e)}
                            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm shadow-md text-muted-foreground hover:text-rose-500 hover:scale-110 active:scale-95 transition-all duration-200"
                          >
                            <Heart className={`w-5 h-5 transition-colors ${isFav ? 'fill-rose-500 text-rose-500' : 'text-zinc-600 dark:text-zinc-400'}`} />
                          </button>

                          {/* 지역 배지 */}
                          <div className="absolute bottom-4 left-4 flex items-center gap-2">
                            <Badge className="bg-primary/90 hover:bg-primary/90 text-primary-foreground font-semibold px-2.5 py-1 text-xs">
                              {camp.region}
                            </Badge>
                            {camp.petFriendly && (
                              <Badge className="bg-emerald-600/90 hover:bg-emerald-600/90 text-white font-semibold px-2.5 py-1 text-xs gap-1">
                                <Dog className="w-3 h-3" />
                                펫동반
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* 텍스트 정보 영역 */}
                        <CardContent className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="flex gap-1">
                                {camp.type.map(t => (
                                  <span key={t} className="text-[10px] font-bold text-primary tracking-wider uppercase">
                                    {t}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                                <Star className="w-3.5 h-3.5 fill-amber-500" />
                                <span>{camp.rating}</span>
                              </div>
                            </div>

                            <h4 className="font-serif text-lg font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                              {camp.name}
                            </h4>
                            
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                              {camp.description}
                            </p>
                          </div>

                          <div>
                            {/* 테마 해시태그 배지 */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {camp.themes.map(t => (
                                <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium">
                                  #{t}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-border/40 text-xs">
                              <span className="text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate max-w-full">{camp.address}</span>
                              </span>
                              <span className="font-bold text-foreground">
                                ₩{camp.price.toLocaleString()} <span className="text-[10px] font-normal text-muted-foreground">/1박</span>
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 찜한 캠핑장 섹션 (로컬 스토리지에 저장된 항목이 있을 때만 표시) */}
      {favorites.length > 0 && (
        <section className="py-16 bg-secondary/20 border-t border-border/40">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
                <h3 className="font-serif text-2xl font-bold tracking-tight">내가 찜한 힐링 스폿</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setFavorites([]);
                  toast.success('찜 목록이 비워졌습니다.');
                }}
                className="text-xs text-muted-foreground hover:text-rose-500"
              >
                전체 삭제
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {CAMPGROUNDS.filter(camp => favorites.includes(camp.id)).map(camp => (
                <div 
                  key={camp.id}
                  onClick={() => setSelectedCampground(camp)}
                  className="group bg-card border border-border/40 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <img src={camp.imageUrl} alt={camp.name} className="w-full h-full object-cover object-center" />
                    <button
                      onClick={(e) => toggleFavorite(camp.id, camp.name, e)}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm shadow-md text-rose-500"
                    >
                      <Heart className="w-4 h-4 fill-rose-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="font-serif font-bold text-sm truncate group-hover:text-primary transition-colors">{camp.name}</h4>
                    <p className="text-xs text-muted-foreground truncate mt-1">{camp.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 상세 정보 창 (모달 다이얼로그) */}
      {selectedCampground && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div 
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border/80 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button 
              onClick={() => setSelectedCampground(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 이미지 헤더 */}
            <div className="relative w-full aspect-[21/9] overflow-hidden bg-muted">
              <img src={selectedCampground.imageUrl} alt={selectedCampground.name} className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex gap-2 mb-2">
                  {selectedCampground.type.map(t => (
                    <Badge key={t} className="bg-white/20 hover:bg-white/30 text-white border-transparent backdrop-blur-sm text-[10px] font-bold">
                      {t}
                    </Badge>
                  ))}
                  {selectedCampground.petFriendly && (
                    <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-transparent text-[10px] font-bold gap-1">
                      <Dog className="w-3 h-3" />
                      펫동반 가능
                    </Badge>
                  )}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                  {selectedCampground.name}
                </h3>
              </div>
            </div>

            {/* 내용 영역 */}
            <div className="p-6 sm:p-8 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* 왼쪽 메인 상세 설명 */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary mb-2.5">소개</h4>
                    <p className="text-sm text-foreground/90 leading-relaxed font-light whitespace-pre-line">
                      {selectedCampground.detailedDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary mb-2.5">주요 시설</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCampground.facilities.map(facility => (
                        <Badge key={facility} variant="secondary" className="bg-secondary/80 text-secondary-foreground font-medium rounded-lg px-3 py-1 text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary mb-2.5">주변 관광지</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCampground.nearbyAttractions.map(attraction => (
                        <Badge key={attraction} variant="outline" className="border-border text-muted-foreground font-medium rounded-lg px-3 py-1 text-xs">
                          {attraction}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 오른쪽 메타 정보 영역 */}
                <div className="bg-secondary/40 p-5 rounded-xl border border-border/40 h-fit space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <span className="text-xs font-bold text-muted-foreground uppercase">평점</span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span>{selectedCampground.rating} / 5.0</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 pb-3 border-b border-border/60">
                    <span className="text-xs font-bold text-muted-foreground uppercase">이용 요금</span>
                    <span className="font-bold text-lg text-foreground">
                      ₩{selectedCampground.price.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">/ 1박 기준</span>
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-muted-foreground uppercase mb-1">위치 정보</span>
                    <div className="flex items-start gap-1.5 text-xs text-muted-foreground leading-relaxed mb-3">
                      <MapPin className="w-4 h-4 shrink-0 text-primary mt-0.5" />
                      <span>{selectedCampground.address}</span>
                    </div>

                    {/* 지도 바로가기 버튼 */}
                    <a 
                      href={getNaverMapUrl(selectedCampground.address, selectedCampground.name)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-4 py-3 text-xs transition-all shadow-sm"
                    >
                      <MapIcon className="w-4 h-4" />
                      <span>네이버 지도로 확인하기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* 찜하기 상태 토글 */}
                  <Button
                    onClick={(e) => toggleFavorite(selectedCampground.id, selectedCampground.name, e)}
                    variant={favorites.includes(selectedCampground.id) ? "destructive" : "outline"}
                    className="w-full rounded-xl text-xs font-bold py-5"
                  >
                    <Heart className={`w-4 h-4 mr-2 ${favorites.includes(selectedCampground.id) ? 'fill-current' : ''}`} />
                    {favorites.includes(selectedCampground.id) ? '찜한 캠핑장 해제' : '캠핑장 찜하기'}
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-900">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-emerald-500" />
              <span className="font-serif text-lg font-bold tracking-tight text-white">CampScape</span>
            </div>
            <p className="text-xs font-light">
              © {new Date().getFullYear()} CampScape. All rights reserved. 자연을 존중하고 흔적을 남기지 않는 캠핑을 실천합시다.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
