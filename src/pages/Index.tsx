
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GameCard } from "@/components/GameCard";
import { NavBar } from "@/components/NavBar";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const popularGames = [
  {
    id: 1,
    title: "Приключения в городе",
    players: 28564,
    thumbnail: "/placeholder.svg",
    liked: 92
  },
  {
    id: 2,
    title: "Симулятор супергероя",
    players: 15421,
    thumbnail: "/placeholder.svg",
    liked: 88
  },
  {
    id: 3,
    title: "Побег из тюрьмы",
    players: 43982,
    thumbnail: "/placeholder.svg",
    liked: 95
  },
  {
    id: 4,
    title: "Строительный симулятор",
    players: 12751,
    thumbnail: "/placeholder.svg",
    liked: 90
  },
  {
    id: 5,
    title: "Гонки на выживание",
    players: 32104,
    thumbnail: "/placeholder.svg",
    liked: 93
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      
      <main className="container mx-auto pt-20 px-4">
        <section className="mb-10">
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-8 rounded-lg shadow-lg text-white">
            <h1 className="text-4xl font-bold mb-4">Добро пожаловать в Low Blox!</h1>
            <p className="text-xl mb-6">Исследуй тысячи виртуальных миров, создавай и играй вместе с друзьями</p>
            <div className="flex gap-4">
              <Button variant="default" className="bg-white text-blue-600 hover:bg-gray-100">Начать игру</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">Создать аккаунт</Button>
            </div>
          </div>
        </section>
        
        <Tabs defaultValue="popular" className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Исследуй игры</h2>
            <TabsList>
              <TabsTrigger value="popular">Популярные</TabsTrigger>
              <TabsTrigger value="recommended">Рекомендуемые</TabsTrigger>
              <TabsTrigger value="new">Новые</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="popular" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {popularGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recommended" className="mt-0">
            <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
              <p className="text-muted-foreground">Войдите, чтобы увидеть рекомендуемые игры</p>
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="mt-0">
            <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
              <p className="text-muted-foreground">Новые игры появляются ежедневно</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <CategoryCard title="Приключения" icon="🗺️" />
            <CategoryCard title="Симуляторы" icon="🏠" />
            <CategoryCard title="Ролевые" icon="👑" />
            <CategoryCard title="Паркур" icon="🏃" />
            <CategoryCard title="Стрелялки" icon="🔫" />
            <CategoryCard title="Строительство" icon="🏗️" />
          </div>
        </section>
        
        <section className="mb-10">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Настрой своего персонажа</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-80">
                  <div className="w-40 h-60 bg-blue-500 rounded-md relative flex flex-col items-center">
                    <div className="w-20 h-20 bg-yellow-200 rounded-full absolute -top-8"></div>
                    <div className="w-32 h-32 bg-red-500 rounded-md mt-14"></div>
                    <div className="flex mt-2 gap-2">
                      <div className="w-8 h-16 bg-blue-700 rounded"></div>
                      <div className="w-8 h-16 bg-blue-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3">Доступные скины</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors">
                      <div className="h-20 flex items-center justify-center">
                        <span className="text-5xl">{['🧙‍♂️', '🦸‍♀️', '🤖', '👨‍🚀', '🧟', '👻'][i-1]}</span>
                      </div>
                      <p className="text-center text-sm mt-1">Скин #{i}</p>
                    </div>
                  ))}
                </div>
                <Button className="w-full">Применить выбранный скин</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Low Blox</h3>
              <p className="text-gray-400">© 2023 Low Blox Corporation</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-2">О нас</h4>
                <ul className="text-gray-400">
                  <li className="mb-1"><a href="#" className="hover:text-white">О компании</a></li>
                  <li className="mb-1"><a href="#" className="hover:text-white">Карьера</a></li>
                  <li className="mb-1"><a href="#" className="hover:text-white">Контакты</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Ресурсы</h4>
                <ul className="text-gray-400">
                  <li className="mb-1"><a href="#" className="hover:text-white">Помощь</a></li>
                  <li className="mb-1"><a href="#" className="hover:text-white">Создание игр</a></li>
                  <li className="mb-1"><a href="#" className="hover:text-white">Сообщество</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Правила</h4>
                <ul className="text-gray-400">
                  <li className="mb-1"><a href="#" className="hover:text-white">Условия использования</a></li>
                  <li className="mb-1"><a href="#" className="hover:text-white">Конфиденциальность</a></li>
                  <li className="mb-1"><a href="#" className="hover:text-white">Безопасность</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Вспомогательный компонент для категорий
const CategoryCard = ({ title, icon }: { title: string, icon: string }) => {
  return (
    <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
      <div className="flex flex-col items-center">
        <span className="text-3xl mb-2">{icon}</span>
        <span className="font-medium text-center">{title}</span>
      </div>
    </Card>
  );
};

export default Index;
