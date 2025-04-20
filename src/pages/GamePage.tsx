
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Gamepad2, Users, MessageCircle, ThumbsUp, Share2, Flag, ArrowLeft, Maximize2, VolumeX, Volume2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GameEngine } from "@/components/GameEngine";

const games = [
  {
    id: 1,
    title: "Приключения в городе",
    description: "Исследуйте огромный открытый мир, выполняйте задания и взаимодействуйте с другими игроками в этом захватывающем приключении!",
    players: 28564,
    thumbnail: "/placeholder.svg",
    liked: 92,
    creator: "MegaCreator",
    visits: "42M+",
    favorites: "2.8M",
    created: "2022-05-15"
  },
  {
    id: 2,
    title: "Симулятор супергероя",
    description: "Станьте супергероем с уникальными способностями! Летайте, сражайтесь с злодеями и спасайте город от опасностей.",
    players: 15421,
    thumbnail: "/placeholder.svg",
    liked: 88,
    creator: "HeroStudios",
    visits: "28M+",
    favorites: "1.9M",
    created: "2022-08-23"
  },
  {
    id: 3,
    title: "Побег из тюрьмы",
    description: "Совершите дерзкий побег из самой охраняемой тюрьмы! Пройдите через все препятствия и обретите свободу.",
    players: 43982,
    thumbnail: "/placeholder.svg",
    liked: 95,
    creator: "EscapeMasters",
    visits: "65M+",
    favorites: "4.2M",
    created: "2021-11-02"
  },
  {
    id: 4,
    title: "Строительный симулятор",
    description: "Постройте дом своей мечты! Используйте различные материалы и инструменты для создания уникальных архитектурных проектов.",
    players: 12751,
    thumbnail: "/placeholder.svg",
    liked: 90,
    creator: "BuilderTeam",
    visits: "15M+",
    favorites: "1.2M",
    created: "2023-01-10"
  },
  {
    id: 5,
    title: "Гонки на выживание",
    description: "Участвуйте в эпических гонках с препятствиями! Используйте бонусы, уклоняйтесь от ловушек и придите к финишу первым.",
    players: 32104,
    thumbnail: "/placeholder.svg",
    liked: 93,
    creator: "SpeedDevs",
    visits: "38M+",
    favorites: "2.5M",
    created: "2022-09-30"
  }
];

const GamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  
  // Находим игру по ID из URL
  const gameId = parseInt(id || "1");
  const game = games.find(g => g.id === gameId) || games[0];

  useEffect(() => {
    // Имитация загрузки игры
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleFullscreen = () => {
    if (gameContainerRef.current) {
      if (!document.fullscreenElement) {
        gameContainerRef.current.requestFullscreen().catch(err => {
          console.error(`Ошибка при переходе в полноэкранный режим: ${err.message}`);
        });
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isFullscreen && <NavBar />}
      
      <div className={`container mx-auto ${!isFullscreen ? 'pt-20 px-4' : 'p-0'}`}>
        <div className={`game-container ${isFullscreen ? 'fixed inset-0 z-50' : ''}`} ref={gameContainerRef}>
          <div className="relative">
            {/* Панель управления игрой */}
            <div className="absolute top-2 left-2 z-10 flex gap-2">
              {!isFullscreen && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-black/50 text-white border-none hover:bg-black/70"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Назад
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-black/50 text-white border-none hover:bg-black/70"
                onClick={toggleFullscreen}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
              <div className="flex items-center bg-black/50 rounded px-2 py-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white h-6 w-6 p-0"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <div className="w-24">
                  <Slider
                    value={volume}
                    max={100}
                    step={1}
                    className="cursor-pointer"
                    onValueChange={(value) => {
                      setVolume(value);
                      setIsMuted(value[0] === 0);
                    }}
                  />
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-black/50 text-white border-none hover:bg-black/70"
              >
                <Flag className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Игровой чат */}
            {activeChat && (
              <div className="absolute bottom-16 right-2 z-10 w-64 h-80 bg-black/70 text-white rounded overflow-hidden flex flex-col">
                <div className="p-2 bg-black/50 font-semibold flex justify-between">
                  <span>Чат</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0 text-white"
                    onClick={() => setActiveChat(false)}
                  >
                    ✕
                  </Button>
                </div>
                <div className="flex-1 p-2 overflow-y-auto">
                  <div className="mb-2">
                    <span className="text-blue-400 font-medium">Player123: </span>
                    <span>Привет всем! Кто хочет в команду?</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-green-400 font-medium">CoolGamer: </span>
                    <span>Я с вами, где встречаемся?</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-red-400 font-medium">ProBuilder: </span>
                    <span>У центрального фонтана через 2 минуты</span>
                  </div>
                </div>
                <div className="p-2 bg-black/30">
                  <input 
                    type="text" 
                    placeholder="Написать сообщение..." 
                    className="w-full bg-black/50 border border-gray-700 rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>
            )}
            
            {/* Кнопка чата */}
            <div className="absolute bottom-2 right-2 z-10">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-black/50 text-white border-none hover:bg-black/70"
                onClick={() => setActiveChat(!activeChat)}
              >
                <MessageCircle className="w-4 h-4 mr-1" /> Чат
              </Button>
            </div>
            
            {/* Информация о игроках */}
            <div className="absolute bottom-2 left-2 z-10 bg-black/50 text-white text-sm px-2 py-1 rounded flex items-center">
              <Users className="w-3 h-3 mr-1" /> 
              <span>{Math.floor(Math.random() * 1000) + game.players} в игре</span>
            </div>
            
            {/* Экран загрузки */}
            {isLoading ? (
              <div className="w-full aspect-[16/9] bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white text-lg">Загрузка {game.title}...</p>
                  <p className="text-gray-400 text-sm mt-2">Подготовка игрового мира</p>
                </div>
              </div>
            ) : (
              <GameEngine />
            )}
          </div>
        </div>
        
        {/* Информация об игре (видна только если не в полноэкранном режиме) */}
        {!isFullscreen && !isLoading && (
          <div className="mt-4 bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-3/4">
                <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <div className="flex items-center mr-4">
                    <Gamepad2 className="w-4 h-4 mr-1" />
                    <span>Играет: {game.players.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span>Оценка: {game.liked}%</span>
                  </div>
                  <div>
                    <span>Посещений: {game.visits}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{game.description}</p>
                
                <div className="flex gap-2 mb-6">
                  <Button>
                    <ThumbsUp className="w-4 h-4 mr-2" /> Нравится
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" /> Поделиться
                  </Button>
                </div>
                
                <h2 className="text-xl font-semibold mb-3">Детали</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Создатель:</span>
                    <div className="flex items-center">
                      <Avatar className="h-5 w-5 mr-1">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>C</AvatarFallback>
                      </Avatar>
                      {game.creator}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Создано:</span>
                    <div>{new Date(game.created).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Избранное:</span>
                    <div>{game.favorites}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Жанр:</span>
                    <div>Приключения</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Доступно на:</span>
                    <div>Всех устройствах</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Максимум игроков:</span>
                    <div>30</div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Ваш персонаж в игре</h3>
                  <div className="bg-white p-3 rounded-lg mb-3 flex items-center justify-center">
                    <div className="w-24 h-36 bg-blue-500 rounded relative flex flex-col items-center">
                      <div className="w-12 h-12 bg-yellow-200 rounded-full absolute -top-4"></div>
                      <div className="w-20 h-20 bg-red-500 rounded mt-9"></div>
                      <div className="flex mt-1 gap-1">
                        <div className="w-5 h-10 bg-blue-700 rounded"></div>
                        <div className="w-5 h-10 bg-blue-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mb-2">Сменить аватар</Button>
                  <Button variant="outline" className="w-full">Инвентарь</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
