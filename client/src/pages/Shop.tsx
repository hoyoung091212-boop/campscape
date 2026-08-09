import { useState, useMemo } from 'react';
import React from 'react';
import { PRODUCTS, Product } from '../data';
import { 
  ShoppingCart, 
  Filter, 
  Star, 
  Heart, 
  X, 
  ChevronRight,
  Package,
  TrendingUp,
  Zap,
  ArrowLeft,
  Compass,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { toast } from 'sonner';

interface CartItem extends Product {
  quantity: number;
}

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart-items');
    return saved ? JSON.parse(saved) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 장바구니 로컬스토리지 동기화
  React.useEffect(() => {
    localStorage.setItem('cart-items', JSON.stringify(cartItems));
  }, [cartItems]);

  // 카테고리 목록
  const categories = ['전체', '텐트', '체어', '테이블', '랜턴', '조리기구', '침낭', '백팩'];

  // 필터링된 제품 목록
  const filteredProducts = useMemo(() => {
    if (selectedCategory === '전체') {
      return PRODUCTS;
    }
    return PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  // 장바구니에 제품 추가
  const addToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast.success(`'${product.name}' 수량이 증가했습니다.`);
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast.success(`'${product.name}'을(를) 장바구니에 추가했습니다!`);
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // 장바구니에서 제품 제거
  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.success('장바구니에서 삭제되었습니다.');
  };

  // 장바구니 수량 변경
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // 총 가격 계산
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
              <Package className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg font-bold tracking-tight text-primary">Shop</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              onClick={() => setShowCart(!showCart)}
              variant="outline"
              size="icon"
              className="relative rounded-full border-border bg-card/50 hover:bg-accent/20"
            >
              <ShoppingCart className="h-5 w-5 text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 container py-8">
        
        {/* 좌측 필터 패널 */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 pb-4 border-b border-border mb-6">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-lg font-bold">카테고리</h3>
            </div>

            <div className="flex flex-col gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                      : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* 프로모션 배너 */}
            <div className="mt-8 p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-primary/20">
              <div className="flex items-start gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider">Limited Offer</p>
                  <p className="text-xs text-foreground/80 mt-1">선택 제품 최대 20% 할인</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 우측 제품 리스트 */}
        <div className="flex-1 w-full">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-2">
              {selectedCategory === '전체' ? '모든 제품' : selectedCategory}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length}개의 프리미엄 캠핑 장비
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-card/40 border border-dashed border-border/80 rounded-2xl text-center">
              <Package className="w-12 h-12 text-muted-foreground/60 mb-4" />
              <h4 className="font-serif text-lg font-bold text-foreground mb-1">제품이 없습니다.</h4>
              <p className="text-sm text-muted-foreground">다른 카테고리를 선택해주세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map(product => {
                const inCart = cartItems.find(item => item.id === product.id);
                const discount = product.originalPrice 
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;

                return (
                  <Card
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="group bg-card overflow-hidden rounded-2xl border border-border/50 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
                  >
                    {/* 이미지 영역 */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                      {/* 할인 배지 */}
                      {discount > 0 && (
                        <Badge className="absolute top-4 left-4 bg-rose-500 hover:bg-rose-600 text-white font-bold px-3 py-1">
                          {discount}% OFF
                        </Badge>
                      )}

                      {/* 카테고리 배지 */}
                      <Badge className="absolute top-4 right-4 bg-primary/90 hover:bg-primary/90 text-primary-foreground font-semibold px-2.5 py-1 text-xs">
                        {product.category}
                      </Badge>

                      {/* 재고 상태 */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">품절</span>
                        </div>
                      )}
                    </div>

                    {/* 텍스트 정보 */}
                    <CardContent className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <h4 className="font-serif text-sm font-bold tracking-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                              {product.name}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {product.description}
                            </p>
                          </div>
                        </div>

                        {/* 평점 */}
                        <div className="flex items-center gap-1 mt-2 mb-3">
                          <div className="flex items-center gap-0.5 text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-amber-500' : 'text-amber-500/30'}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground font-medium">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>

                      {/* 가격 및 버튼 */}
                      <div className="pt-4 border-t border-border/40 space-y-3">
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-lg text-foreground">
                            ₩{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              ₩{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <Button
                          onClick={(e) => addToCart(product, e)}
                          disabled={!product.inStock}
                          className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2.5 text-sm transition-all duration-200 shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {inCart ? `장바구니에 있음 (${inCart.quantity})` : '장바구니 추가'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* 장바구니 사이드패널 */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-end lg:justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          
          <div className="relative w-full lg:w-96 h-[90vh] lg:h-auto lg:max-h-[90vh] bg-card rounded-t-3xl lg:rounded-2xl border border-border/80 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 lg:slide-in-from-right-10 duration-300">
            
            {/* 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-border/40">
              <h3 className="font-serif text-xl font-bold">장바구니</h3>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 장바구니 내용 */}
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <ShoppingCart className="w-12 h-12 text-muted-foreground/60 mb-4" />
                <p className="text-sm text-muted-foreground">장바구니가 비어있습니다.</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cartItems.map(item => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-secondary/30 rounded-xl border border-border/40"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          ₩{item.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 rounded-md bg-muted hover:bg-muted/80 text-xs font-medium"
                          >
                            −
                          </button>
                          <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 rounded-md bg-muted hover:bg-muted/80 text-xs font-medium"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto p-1 rounded-md hover:bg-destructive/10 text-destructive transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 푸터 */}
                <div className="border-t border-border/40 p-6 space-y-4 bg-secondary/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">소계</span>
                    <span className="font-bold">₩{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">배송료</span>
                    <span className="font-bold">무료</span>
                  </div>
                  <div className="flex items-center justify-between text-lg border-t border-border/40 pt-4">
                    <span className="font-bold">합계</span>
                    <span className="font-bold text-primary">₩{totalPrice.toLocaleString()}</span>
                  </div>
                  <Button className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 text-sm">
                    <Zap className="w-4 h-4 mr-2" />
                    결제하기
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 상품 상세 모달 */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => {
            addToCart(selectedProduct);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}

// 상품 상세 모달 컴포넌트
function ProductDetailModal({
  product,
  onClose,
  onAddToCart
}: {
  product: Product;
  onClose: () => void;
  onAddToCart: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border/80 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-8">
          
          {/* 좌측 이미지 */}
          <div className="flex items-center justify-center bg-secondary/30 rounded-xl overflow-hidden w-full">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center" />
          </div>

          {/* 우츧0 정보 */}
          <div className="flex flex-col justify-between">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-transparent px-3 py-1 text-xs font-bold">
                {product.category}
              </Badge>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-500' : 'text-amber-500/30'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {product.rating} ({product.reviews} 리뷰)
                </span>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* 스펙 정보 */}
              <div className="bg-secondary/30 p-4 rounded-xl mb-6 space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  value && (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  )
                ))}
              </div>

              {/* 경쟁사 비교 차트 */}
              <div className="mb-6">
                <h4 className="font-bold text-sm mb-3">경쟁사 비교</h4>
                <div className="space-y-3">
                  {product.comparison.map((comp, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{comp.brand}</span>
                        <span className="text-muted-foreground">{comp.weight}g</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${comp.brand === 'Our Brand' ? 'bg-primary' : 'bg-secondary'}`}
                          style={{
                            width: `${Math.min((comp.weight / 2000) * 100, 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 가격 및 구매 버튼 */}
            <div className="space-y-4 pt-6 border-t border-border/40">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-3xl text-foreground">
                  ₩{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₩{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <Button
                onClick={onAddToCart}
                className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 text-base transition-all duration-200 shadow-md shadow-primary/20"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                장바구니에 추가
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
