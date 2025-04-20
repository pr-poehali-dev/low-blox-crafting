
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Menu, Search, User, Settings, LogOut, Package, Heart, Gamepad2 } from "lucide-react";
import { useState } from "react";

export const NavBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden mr-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">Low Blox</span>
            </a>
            
            <div className="hidden md:flex ml-8 space-x-1">
              <NavItem icon={<Gamepad2 className="h-4 w-4 mr-1.5" />} label="Игры" active />
              <NavItem icon={<Package className="h-4 w-4 mr-1.5" />} label="Маркет" />
              <NavItem icon={<User className="h-4 w-4 mr-1.5" />} label="Аватары" />
              <NavItem icon={<Heart className="h-4 w-4 mr-1.5" />} label="Друзья" />
            </div>
          </div>
          
          <div className="hidden md:flex md:w-1/3 lg:w-1/4 xl:w-1/5">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Поиск игр" 
                className="w-full pl-9 rounded-full bg-gray-100 focus:bg-white" 
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Создать
            </Button>
            <Button variant="default" size="sm" className="bg-gradient-to-r from-blue-600 to-purple-500 hidden sm:flex">
              Вход
            </Button>
            
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Bell className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-purple-100 text-purple-600">LB</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" /> Профиль
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Gamepad2 className="mr-2 h-4 w-4" /> Мои игры
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Package className="mr-2 h-4 w-4" /> Инвентарь
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" /> Настройки
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" /> Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Мобильное меню */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-md py-2 px-4">
          <div className="mb-3">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Поиск игр" 
                className="w-full pl-9 rounded-full bg-gray-100 focus:bg-white" 
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <MobileNavItem label="Игры" active />
            <MobileNavItem label="Маркет" />
            <MobileNavItem label="Аватары" />
            <MobileNavItem label="Друзья" />
            <MobileNavItem label="Создать" />
            <MobileNavItem label="Настройки" />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) => {
  return (
    <Button 
      variant="ghost" 
      className={`flex items-center ${active ? 'bg-gray-100' : ''}`}
    >
      {icon}
      {label}
    </Button>
  );
};

const MobileNavItem = ({ label, active }: { label: string, active?: boolean }) => {
  return (
    <Button 
      variant="ghost" 
      className={`w-full justify-start ${active ? 'bg-gray-100' : ''}`}
    >
      {label}
    </Button>
  );
};
