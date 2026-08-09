import React, { useState, useMemo } from 'react';
import { HIDDEN_GEMS, HiddenGem } from '../data';
import {
  MapPin,
  Users,
  Eye,
  Compass,
  Droplets,
  Wind,
  Sun,
  Mountain,
  Navigation,
  X,
  ChevronDown,
  Zap,
  Award,
  Info,
  ChevronRight,
  Menu,
  ExternalLink as ExternalLinkIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

// 네이버 지도 검색 URL 생성 함수 (주소 + 이름 조합)
const getNaverMapUrl = (address: string, gemName: string): string => {
  const searchQuery = `${address.trim()} ${gemName.trim()}`;
  const encodedQuery = encodeURIComponent(searchQuery);
  return `https://map.naver.com/v5/search/${encodedQuery}`;
};

export default function HiddenGems() {
  const [selectedGem, setSelectedGem] = useState<HiddenGem | null>(null);
  const [crowdLevelFilter, setCrowdLevelFilter] = useState<number | null>(null);
  const [viewQualityFilter, setViewQualityFilter] = useState<number | null>(null);
  const [reservationFilter, setReservationFilter] = useState<string>('전체');
  const [selectedSeason, setSelectedSeason] = useState<string>('전체');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 필터링된 Hidden Gems
  const filteredGems = useMemo(() => {
    return HIDDEN_GEMS.filter(gem => {
      const matchesCrowd = crowdLevelFilter === null || gem.crowdLevel <= crowdLevelFilter;
      const matchesView = viewQualityFilter === null || gem.viewQuality >= viewQualityFilter;
      const matchesReservation =
        reservationFilter === '전체' ||
        (reservationFilter === '예약가능' && gem.reservationAvailable) ||
        (reservationFilter === '노지' && !gem.reservationAvailable);
      const matchesSeason =
        selectedSeason === '전체' || gem.bestSeason.includes(selectedSeason);

      return matchesCrowd && matchesView && matchesReservation && matchesSeason;
    });
  }, [crowdLevelFilter, viewQualityFilter, reservationFilter, selectedSeason]);

  const getCrowdLabel = (level: number) => {
    const labels = ['매우 조용함', '조용함', '보통', '약간 붐빔', '매우 붐빔'];
    return labels[level - 1] || '알 수 없음';
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      wild: '완전 노지',
      private: '프라이빗',
      'semi-private': '세미프라이빗'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      
      {/* 헤더 */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 홈 로고 링크 */}
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Compass className="h-6 w-6 text-primary animate-pulse" />
              <span className="hidden sm:inline font-serif text-2xl font-bold tracking-tight text-primary">CampScape</span>
              <span className="sm:hidden font-serif text-xl font-bold tracking-tight text-primary">CS</span>
            </a>

            {/* 현재 페이지 표시 */}
            <div className="hidden md:flex items-center gap-2 text-muted-foreground">
              <ChevronRight className="w-4 h-4" />
              <Compass className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg font-bold tracking-tight text-primary">Hidden Gems</span>
            </div>
          </div>
          <div className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {filteredGems.length}개 발견
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 py-16 lg:py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <Badge className="mb-4 bg-emerald-800/80 text-emerald-100 border-emerald-700/50 hover:bg-emerald-800/80 px-3 py-1 text-xs tracking-wider uppercase font-medium">
            Undiscovered Paradises
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-emerald-50 mb-6 leading-[1.15]">
            아직 덜 알려진,<br />
            비경의 캠핑 입지를 찾아보세요.
          </h1>
          <p className="text-emerald-200/90 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            전문가가 엄선한 숨은 명소들. 사람이 적고, 뷰가 압도적이며, 입지 분석이 완벽한 곳들만 모았습니다.
          </p>
        </div>
      </section>

      {/* 필터 및 콘텐츠 영역 */}
      <div className="flex-1 container py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* 좌측 필터 패널 */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm sticky top-24 space-y-6">
              
              {/* 사람 많음 필터 */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  사람 많음 정도
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { level: null, label: '전체' },
                    { level: 1, label: '매우 조용함 (1)' },
                    { level: 2, label: '조용함 (2)' },
                    { level: 3, label: '보통 (3)' }
                  ].map(({ level, label }) => (
                    <button
                      key={label}
                      onClick={() => setCrowdLevelFilter(level)}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        crowdLevelFilter === level
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 뷰 품질 필터 */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  뷰 품질
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { level: null, label: '전체' },
                    { level: 5, label: '최고 (5/5)' },
                    { level: 4, label: '매우 좋음 (4+)' },
                    { level: 3, label: '좋음 (3+)' }
                  ].map(({ level, label }) => (
                    <button
                      key={label}
                      onClick={() => setViewQualityFilter(level)}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        viewQualityFilter === level
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 예약 가능 여부 */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  예약 방식
                </label>
                <div className="flex flex-col gap-2">
                  {['전체', '예약가능', '노지'].map(type => (
                    <button
                      key={type}
                      onClick={() => setReservationFilter(type)}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        reservationFilter === type
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      {type === '전체' ? '전체' : type === '예약가능' ? '예약 가능' : '완전 노지'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 계절 필터 */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">
                  추천 계절
                </label>
                <div className="flex flex-col gap-2">
                  {['전체', '봄', '여름', '가을', '겨울'].map(season => (
                    <button
                      key={season}
                      onClick={() => setSelectedSeason(season)}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        selectedSeason === season
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>

              {/* 초기화 버튼 */}
              <Button
                onClick={() => {
                  setCrowdLevelFilter(null);
                  setViewQualityFilter(null);
                  setReservationFilter('전체');
                  setSelectedSeason('전체');
                }}
                variant="outline"
                className="w-full rounded-xl"
              >
                필터 초기화
              </Button>
            </div>
          </div>

          {/* 우측 결과 리스트 */}
          <div className="flex-1 w-full">
            {filteredGems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-card/40 border border-dashed border-border/80 rounded-2xl text-center">
                <Compass className="w-12 h-12 text-muted-foreground/60 mb-4" />
                <h4 className="font-serif text-lg font-bold text-foreground mb-1">일치하는 캠핑지가 없습니다.</h4>
                <p className="text-sm text-muted-foreground">필터를 조정해보세요.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredGems.map(gem => (
                  <Card
                    key={gem.id}
                    onClick={() => setSelectedGem(gem)}
                    className="group bg-card overflow-hidden rounded-2xl border border-border/50 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      {/* 이미지 */}
                      <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-full overflow-hidden bg-muted">
                        <img
                          src={gem.imageUrl}
                          alt={gem.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        
                        {/* 타입 배지 */}
                        <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary/90 text-primary-foreground font-semibold px-2.5 py-1 text-xs">
                          {getTypeLabel(gem.type)}
                        </Badge>

                        {/* 뷰 품질 배지 */}
                        {gem.viewQuality === 5 && (
                          <Badge className="absolute top-4 right-4 bg-amber-600 hover:bg-amber-600 text-white font-semibold px-2.5 py-1 text-xs gap-1">
                            <Award className="w-3 h-3" />
                            최고의 뷰
                          </Badge>
                        )}
                      </div>

                      {/* 정보 */}
                      <CardContent className="md:col-span-2 p-4 sm:p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                            {gem.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                            {gem.description}
                          </p>

                          {/* 메타 정보 */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
                            <div className="flex items-center gap-2 text-xs">
                              <Users className="w-4 h-4 text-primary shrink-0" />
                              <div>
                                <p className="text-muted-foreground">혼잡도</p>
                                <p className="font-bold">{getCrowdLabel(gem.crowdLevel)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Eye className="w-4 h-4 text-primary shrink-0" />
                              <div>
                                <p className="text-muted-foreground">뷰</p>
                                <p className="font-bold">{gem.viewQuality}/5</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <MapPin className="w-4 h-4 text-primary shrink-0" />
                              <div>
                                <p className="text-muted-foreground">지역</p>
                                <p className="font-bold">{gem.region}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Navigation className="w-4 h-4 text-primary shrink-0" />
                              <div>
                                <p className="text-muted-foreground">수용</p>
                                <p className="font-bold">{gem.capacity}명</p>
                              </div>
                            </div>
                          </div>

                          {/* 계절 배지 */}
                          <div className="flex flex-wrap gap-1">
                            {gem.bestSeason.map(season => (
                              <Badge key={season} variant="secondary" className="text-xs">
                                {season}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-4">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                            <div className="flex items-center gap-2">
                              {gem.reservationAvailable ? (
                                <Badge className="bg-emerald-600/90 hover:bg-emerald-600/90 text-white text-xs font-bold">
                                  예약 가능
                                </Badge>
                              ) : (
                                <Badge className="bg-indigo-600/90 hover:bg-indigo-600/90 text-white text-xs font-bold">
                                  완전 노지
                                </Badge>
                              )}
                            </div>
                            {gem.price && gem.price > 0 && (
                              <span className="text-xs font-bold text-primary">
                                ₩{gem.price.toLocaleString()}/1박
                              </span>
                            )}
                          </div>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedGem(gem);
                            }}
                            variant="outline"
                            size="sm"
                            className="rounded-lg"
                          >
                            <Info className="w-4 h-4 mr-1" />
                            상세보기
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 상세 정보 모달 */}
      {selectedGem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border/80 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedGem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 이미지 헤더 */}
            <div className="relative w-full aspect-[21/9] overflow-hidden bg-muted">
              <img src={selectedGem.imageUrl} alt={selectedGem.name} className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex gap-2 mb-2">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-transparent backdrop-blur-sm text-[10px] font-bold">
                    {getTypeLabel(selectedGem.type)}
                  </Badge>
                  {selectedGem.viewQuality === 5 && (
                    <Badge className="bg-amber-600 hover:bg-amber-600 text-white border-transparent text-[10px] font-bold gap-1">
                      <Award className="w-3 h-3" />
                      최고의 뷰
                    </Badge>
                  )}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                  {selectedGem.name}
                </h3>
              </div>
            </div>

            {/* 내용 영역 */}
            <div className="p-4 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                
                {/* 좌측 설명 및 입지 분석 */}
                <div className="md:col-span-2 space-y-8">
                  
                  {/* 소개 */}
                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary mb-3">소개</h4>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {selectedGem.description}
                    </p>
                  </div>

                  {/* 입지 분석 (전문가 큐레이션) */}
                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <Compass className="w-5 h-5" />
                      입지 분석 (전문가 큐레이션)
                    </h4>
                    <div className="space-y-3">
                      <div className="flex gap-4 p-4 bg-secondary/30 rounded-xl border border-border/40">
                        <Droplets className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-primary uppercase mb-1">배수 상태</p>
                          <p className="text-sm text-foreground/80">{selectedGem.locationAnalysis.drainage}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 p-4 bg-secondary/30 rounded-xl border border-border/40">
                        <Wind className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-primary uppercase mb-1">바람 차단</p>
                          <p className="text-sm text-foreground/80">{selectedGem.locationAnalysis.windProtection}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 p-4 bg-secondary/30 rounded-xl border border-border/40">
                        <Sun className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-primary uppercase mb-1">일출/일몰 포인트</p>
                          <p className="text-sm text-foreground/80">{selectedGem.locationAnalysis.sunExposure}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 p-4 bg-secondary/30 rounded-xl border border-border/40">
                        <Mountain className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-primary uppercase mb-1">지형 특성</p>
                          <p className="text-sm text-foreground/80">{selectedGem.locationAnalysis.terrain}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 p-4 bg-secondary/30 rounded-xl border border-border/40">
                        <Navigation className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-primary uppercase mb-1">접근성</p>
                          <p className="text-sm text-foreground/80">{selectedGem.locationAnalysis.accessibility}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 전문가 코멘트 */}
                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      전문가 코멘트
                    </h4>
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                      <p className="text-sm text-foreground/90 leading-relaxed italic">
                        "{selectedGem.expertComment}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* 우측 메타 정보 */}
                <div className="bg-secondary/40 p-5 rounded-xl border border-border/40 h-fit space-y-5">
                  
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <span className="text-xs font-bold text-muted-foreground uppercase">혼잡도</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < selectedGem.crowdLevel ? 'bg-rose-500' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <span className="text-xs font-bold text-muted-foreground uppercase">뷰 품질</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < selectedGem.viewQuality ? 'bg-amber-500' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 pb-3 border-b border-border/60">
                    <span className="text-xs font-bold text-muted-foreground uppercase">위치</span>
                    <span className="font-bold text-foreground">{selectedGem.region}</span>
                    <span className="text-xs text-muted-foreground">{selectedGem.address}</span>
                  </div>

                  <div className="flex flex-col gap-1 pb-3 border-b border-border/60">
                    <span className="text-xs font-bold text-muted-foreground uppercase">수용 인원</span>
                    <span className="font-bold text-foreground">{selectedGem.capacity}명</span>
                  </div>

                  <div className="flex flex-col gap-1 pb-3 border-b border-border/60">
                    <span className="text-xs font-bold text-muted-foreground uppercase">추천 계절</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedGem.bestSeason.map(season => (
                        <Badge key={season} variant="secondary" className="text-xs">
                          {season}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedGem.price && selectedGem.price > 0 && (
                    <div className="flex flex-col gap-1 pb-3 border-b border-border/60">
                      <span className="text-xs font-bold text-muted-foreground uppercase">이용 요금</span>
                      <span className="font-bold text-lg text-foreground">
                        ₩{selectedGem.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">/ 1박 기준</span>
                    </div>
                  )}

                  <Badge className={`w-full py-2 text-center justify-center text-xs font-bold ${
                    selectedGem.reservationAvailable
                      ? 'bg-emerald-600 hover:bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-600 text-white'
                  }`}>
                    {selectedGem.reservationAvailable ? '예약 가능' : '완전 노지'}
                  </Badge>

                  {/* 네이버 지도 바로가기 버튼 */}
                  <a 
                    href={getNaverMapUrl(selectedGem.address, selectedGem.name)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-4 py-3 text-xs transition-all shadow-sm"
                  >
                    <Compass className="w-4 h-4" />
                    <span>네이버 지도로 확인</span>
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
