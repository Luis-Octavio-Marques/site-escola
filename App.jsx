import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  Heart,
  User,
  Plus,
  Minus,
  Trash2,
  Star,
} from "lucide-react";

export default function BeachStore() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000); // troca a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  const products = [
    {
      id: 1,
      name: "Biquíni Margarida Tropical",
      price: 149.9,
      category: "bikini",
      image: "../../public/Biquíni Margarida Tropical.jpeg",
      rating: 4.8,
      description: "Biquíni estampado com proteção UV",
    },
    {
      id: 2,
      name: "Biquíni Sol de Amalfi",
      price: 199.9,
      category: "swimsuit",
      image: "../../public/Biquíni Sol de Amalfi.jpeg",
      rating: 4.9,
      description: "Biquíni de lycra com detalhes em dourado",
    },
    {
      id: 3,
      name: "Maiô Listras Riviera",
      price: 159.9,
      category: "mens",
      image: "../../public/Maiô Listras Riviera.jpeg",
      rating: 4.7,
      description: "Maiô inteiro com recortes modernos",
    },
    {
      id: 4,
      name: "Maiô Vichy Sunset",
      price: 189.9,
      category: "coverup",
      image: "../../public/Maiô Vichy Sunset.jpeg",
      rating: 4.6,
      description: "Saída de praia em tecido linho",
    },
    {
      id: 5,
      name: "Sunga Black Reef",
      price: 89.9,
      category: "bikini",
      image: "../../public/Sunga Black Reef.jpeg",
      rating: 4.8,
      description: "Sunga esportiva de secagem rápida",
    },
    {
      id: 6,
      name: "Sunga Fogo Cítrico",
      price: 119.9,
      category: "mens",
      image: "../../public/Sunga Fogo Cítrico.jpeg",
      rating: 4.5,
      description: "Sunga com ar vibrante e moderna",
    },
    {
      id: 7,
      name: "Shorts Praia Noturna",
      price: 79.9,
      category: "swimsuit",
      image: "../public/Shorts Praia Noturna.jpeg",
      rating: 4.7,
      description: "Bermuda masculina perfeita para um dia de praia",
    },
    {
      id: 8,
      name: "Shorts Verde Oceano",
      price: 139.9,
      category: "coverup",
      image: "../../public/Shorts Verde Oceano.jpeg",
      rating: 4.9,
      description: "Bermuda masculina com vibe tropical",
    },
  ];

  const categories = [
    { id: "all", name: "Todos" },
    { id: "bikini", name: "Biquínis" },
    { id: "swimsuit", name: "Maiôs" },
    { id: "mens", name: "Masculino" },
    { id: "coverup", name: "Saídas" },
  ];

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "all" || p.category === selectedCategory) &&
      (searchTerm === "" ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen w-screen  bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <img src="../../public/marca.png" className="w-50"/>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center bg-gray-200 rounded-full px-4 py-2  text-gray-800">
                <Search className="w-5 h-5 text-gray-800" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-none outline-none ml-2 w-40"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Heart className="w-6 h-6 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <User className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative p-2 hover:bg-cyan-50 rounded-full transition"
              >
                <ShoppingCart className="w-6 h-6 text-cyan-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="md:hidden p-2"
              >
                {mobileMenu ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setMobileMenu(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded ${
                    selectedCategory === cat.id
                      ? "bg-cyan-50 text-cyan-600 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-[555px] overflow-hidden">
        {/* Carrossel de fundo */}
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {["/carrossel1.png", "/carrossel2.jpeg", "/carrossel3.jpeg"].map(
            (img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            )
          )}
        </div>

        {/* Gradiente escuro para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>

        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h2 className="text-5xl font-bold mb-4 animate-fade-in">
            Verão 2026
          </h2>
          <p className="text-xl mb-6 text-cyan-50">
            Nossa mais nova linha de moda praia chegou <br/> com tudo para o verão de 2026. Confira agora! 
          </p>

          {/* Indicadores */}
          <div className="absolute bottom-6 flex space-x-3">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? "bg-white" : "bg-white/50"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800">
            {categories.find((c) => c.id === selectedCategory)?.name}
          </h3>
          <p className="text-gray-600">{filteredProducts.length} produtos</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition">
                  <Heart className="w-5 h-5 text-rose-500" />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-500 mb-3">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-cyan-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full hover:from-cyan-600 hover:to-blue-600 transition transform hover:scale-105 shadow-md"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl animate-slide-in">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Seu Carrinho</h3>
              <button onClick={() => setShowCart(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="p-12 text-center">
                <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Seu carrinho está vazio</p>
              </div>
            ) : (
              <>
                <div className="p-6 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 bg-gray-50 rounded-xl p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {item.name}
                        </h4>
                        <p className="text-cyan-600 font-bold mt-1">
                          R$ {item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto p-1 text-rose-500 hover:bg-rose-50 rounded-full"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="sticky bottom-0 bg-white border-t p-6 space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">
                      R$ {cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Frete:</span>
                    <span className="font-semibold text-green-600">Grátis</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-xl">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-cyan-600">
                      R$ {cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition transform hover:scale-105 shadow-lg">
                    Finalizar Compra
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Seção de Destaque - Imagem e Texto lado a lado */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          {/* Imagem */}
          <div className="md:w-1/2">
            <img
              src="../../public/textoaolado1.png"
              alt="Nova coleção de verão"
              className="rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>

          {/* Texto */}
          <div className="md:w-1/2">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Viva o melhor do verão
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              A coleção{" "}
              <span className="text-cyan-600 font-semibold">
                {" "}
                Maresia 2025{" "}
              </span>{" "}
              foi criada para celebrar a essência do verão — inspirando
              liberdade, conforto e autenticidade. Cada peça reflete o movimento
              do mar e o brilho do sol, com tecidos leves, sustentáveis e
              respiráveis, desenvolvidos para acompanhar seus melhores dias à
              beira d’água. Um encontro entre estilo e natureza, feito para quem
              vive o calor com elegância e alma tropical.
            </p>
          </div>
        </div>
      </section>

      {/* Seção de Promoção */}
      <section className="py-20 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center gap-12">
          {/* Imagem da Promoção */}
          <div className="md:w-1/2">
            <img
              src="/textoaolado2.jpeg"
              alt="Promoções de verão"
              className="rounded-3xl shadow-2xl w-50% object-cover"
            />
          </div>

          {/* Texto da Promoção */}
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              🌞 Promoções de Verão Imperdíveis!
            </h3>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Aproveite descontos de até{" "}
              <span className="text-cyan-600 font-semibold"> 40% </span> em
              nossa nova linha de moda praia 2025! Cada peça foi criada com
              design tropical exclusivo, tecidos de alta qualidade e acabamento
              pensado para valorizar o seu estilo sob o sol. Sinta o conforto
              premium e a energia vibrante do verão — mas corra, essas ofertas
              incríveis são por tempo limitado!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Maresia
              </h4>
              <p className="text-gray-400">
                As melhores roupas de praia para seu verão perfeito.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Atendimento</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Contato</li>
                <li>FAQ</li>
                <li>Trocas e Devoluções</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Empresa</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre Nós</li>
                <li>Trabalhe Conosco</li>
                <li>Sustentabilidade</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Newsletter</h5>
              <p className="text-gray-400 mb-3">Receba nossas ofertas</p>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full px-4 py-2 rounded-lg text-gray-800"
              />
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Maresia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
