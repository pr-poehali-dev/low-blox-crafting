
import { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Gamepad, Keyboard, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Character {
  x: number;
  y: number;
  z: number;
  rotationY: number;
  moveSpeed: number;
  color: string;
  name: string;
}

export const GameEngine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [controlMode, setControlMode] = useState<'touch' | 'keyboard'>('keyboard');
  const [showControls, setShowControls] = useState(false);
  
  // Состояние персонажа
  const characterRef = useRef<Character>({
    x: 0,
    y: 0,
    z: -5,
    rotationY: 0,
    moveSpeed: 0.1,
    color: '#ff4d4d',
    name: 'Player',
  });
  
  // Состояние клавиш
  const keysRef = useRef<{ [key: string]: boolean }>({});
  
  // Инициализация 3D рендеринга
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Установка размеров canvas
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Обработчики клавиш
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Другие объекты мира
    const worldObjects = [
      { x: 3, y: 0, z: -10, width: 2, height: 3, depth: 2, color: '#4d79ff' },
      { x: -4, y: 0, z: -8, width: 2, height: 2, depth: 2, color: '#4dff88' },
      { x: 0, y: 0, z: -15, width: 3, height: 4, depth: 2, color: '#ffcc4d' },
      { x: 6, y: 0, z: -20, width: 4, height: 5, depth: 3, color: '#cc4dff' },
      { x: -7, y: 0, z: -18, width: 3, height: 3, depth: 3, color: '#ff4da6' },
    ];
    
    // Случайные NPC
    const npcs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * 20 - 10,
      y: 0,
      z: Math.random() * -30 - 5,
      rotationY: Math.random() * Math.PI * 2,
      moveSpeed: 0.05,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      name: `NPC_${i+1}`,
      direction: Math.random() * Math.PI * 2,
      timeToChangeDirection: Math.random() * 200 + 100,
    }));
    
    // Анимационный цикл
    let frame = 0;
    const renderLoop = () => {
      frame++;
      // Очистка canvas
      ctx.fillStyle = '#87CEEB';  // Цвет неба
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Рисуем "землю"
      ctx.fillStyle = '#8FBC8F';  // Цвет травы
      ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
      
      // Обновление положения персонажа на основе нажатий клавиш
      updateCharacterPosition();
      
      // Обновление положения NPC
      updateNPCs(frame);
      
      // Рисуем объекты мира
      drawWorldObjects(ctx, worldObjects);
      
      // Рисуем NPC
      drawCharacters(ctx, npcs);
      
      // Рисуем персонажа
      drawCharacter(ctx, characterRef.current);
      
      // Продолжение цикла
      requestAnimationFrame(renderLoop);
    };
    
    const updateCharacterPosition = () => {
      const keys = keysRef.current;
      const character = characterRef.current;
      
      // Обработка движения для клавиатуры
      if (controlMode === 'keyboard') {
        if (keys['w'] || keys['arrowup']) {
          character.z -= character.moveSpeed;
        }
        if (keys['s'] || keys['arrowdown']) {
          character.z += character.moveSpeed;
        }
        if (keys['a'] || keys['arrowleft']) {
          character.x -= character.moveSpeed;
          character.rotationY = Math.PI / 2;
        }
        if (keys['d'] || keys['arrowright']) {
          character.x += character.moveSpeed;
          character.rotationY = -Math.PI / 2;
        }
      }
      
      // Ограничения мира
      character.x = Math.max(-10, Math.min(10, character.x));
      character.z = Math.max(-30, Math.min(5, character.z));
    };
    
    const updateNPCs = (frame: number) => {
      npcs.forEach(npc => {
        // Меняем направление случайным образом
        if (frame % Math.floor(npc.timeToChangeDirection) === 0) {
          npc.direction = Math.random() * Math.PI * 2;
          npc.timeToChangeDirection = Math.random() * 200 + 100;
        }
        
        // Перемещение NPC
        npc.x += Math.cos(npc.direction) * npc.moveSpeed;
        npc.z += Math.sin(npc.direction) * npc.moveSpeed;
        npc.rotationY = npc.direction;
        
        // Ограничения мира
        npc.x = Math.max(-10, Math.min(10, npc.x));
        npc.z = Math.max(-30, Math.min(5, npc.z));
      });
    };
    
    const drawWorldObjects = (ctx: CanvasRenderingContext2D, objects: any[]) => {
      // Сортируем объекты по глубине для правильного рендеринга
      const sortedObjects = [...objects].sort((a, b) => b.z - a.z);
      
      sortedObjects.forEach(obj => {
        // Простой pseudo-3D рендеринг
        const screenX = canvas.width / 2 + (obj.x - characterRef.current.x) * 40;
        const screenY = canvas.height / 2 + (obj.z - characterRef.current.z) * 20;
        const scale = 1 + (characterRef.current.z - obj.z) / 10;
        const width = obj.width * 50 * scale;
        const height = obj.height * 50 * scale;
        
        // Рисуем только если объект в поле зрения
        if (screenX > -width && screenX < canvas.width + width && 
            screenY > -height && screenY < canvas.height + height) {
          
          // Тень
          ctx.fillStyle = 'rgba(0,0,0,0.2)';
          ctx.beginPath();
          ctx.ellipse(screenX, screenY + height/2, Math.max(0.1, width/2), Math.max(0.1, width/6), 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Сам объект
          ctx.fillStyle = obj.color;
          ctx.fillRect(screenX - width/2, screenY - height/2, width, height);
          
          // Добавляем немного объема
          ctx.fillStyle = lightenColor(obj.color, 20);
          ctx.fillRect(screenX - width/2, screenY - height/2, width, height * 0.1);
          
          ctx.fillStyle = darkenColor(obj.color, 20);
          ctx.fillRect(screenX - width/2, screenY + height/2 - height * 0.1, width, height * 0.1);
        }
      });
    };
    
    const drawCharacters = (ctx: CanvasRenderingContext2D, characters: any[]) => {
      // Сортируем персонажей по глубине
      const sortedCharacters = [...characters].sort((a, b) => b.z - a.z);
      
      sortedCharacters.forEach(char => {
        drawCharacter(ctx, char);
      });
    };
    
    const drawCharacter = (ctx: CanvasRenderingContext2D, char: any) => {
      const screenX = canvas.width / 2 + (char.x - characterRef.current.x) * 40;
      const screenY = canvas.height / 2 + (char.z - characterRef.current.z) * 20;
      const scale = Math.max(0.1, 1 + (characterRef.current.z - char.z) / 10);
      
      // Тень
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.ellipse(screenX, screenY + 25 * scale, Math.max(0.1, 15 * scale), Math.max(0.1, 5 * scale), 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Ноги
      ctx.fillStyle = darkenColor(char.color, 20);
      ctx.fillRect(screenX - 10 * scale, screenY, 7 * scale, 25 * scale);
      ctx.fillRect(screenX + 3 * scale, screenY, 7 * scale, 25 * scale);
      
      // Тело
      ctx.fillStyle = char.color;
      ctx.fillRect(screenX - 15 * scale, screenY - 30 * scale, 30 * scale, 30 * scale);
      
      // Голова
      ctx.fillStyle = lightenColor(char.color, 30);
      ctx.beginPath();
      ctx.arc(screenX, screenY - 40 * scale, Math.max(0.1, 12 * scale), 0, Math.PI * 2);
      ctx.fill();
      
      // Руки
      ctx.fillStyle = char.color;
      ctx.fillRect(screenX - 25 * scale, screenY - 25 * scale, 10 * scale, 20 * scale);
      ctx.fillRect(screenX + 15 * scale, screenY - 25 * scale, 10 * scale, 20 * scale);
      
      // Имя персонажа
      ctx.fillStyle = char === characterRef.current ? '#ff9900' : '#ffffff';
      ctx.font = `${Math.max(8, 12 * scale)}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText(char.name, screenX, screenY - 60 * scale);
    };
    
    // Вспомогательные функции для цветов
    const lightenColor = (color: string, percent: number): string => {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = Math.min(255, (num >> 16) + amt);
      const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
      const B = Math.min(255, (num & 0x0000FF) + amt);
      return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
    };
    
    const darkenColor = (color: string, percent: number): string => {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = Math.max(0, (num >> 16) - amt);
      const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
      const B = Math.max(0, (num & 0x0000FF) - amt);
      return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
    };
    
    // Запуск рендеринга
    const animation = requestAnimationFrame(renderLoop);
    
    // Очистка
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animation);
    };
  }, [controlMode]);
  
  // Обработчики для сенсорного управления
  const handleTouchControl = (direction: 'up' | 'down' | 'left' | 'right') => {
    const character = characterRef.current;
    
    switch (direction) {
      case 'up':
        character.z -= character.moveSpeed * 2;
        break;
      case 'down':
        character.z += character.moveSpeed * 2;
        break;
      case 'left':
        character.x -= character.moveSpeed * 2;
        character.rotationY = Math.PI / 2;
        break;
      case 'right':
        character.x += character.moveSpeed * 2;
        character.rotationY = -Math.PI / 2;
        break;
    }
    
    // Ограничения мира
    character.x = Math.max(-10, Math.min(10, character.x));
    character.z = Math.max(-30, Math.min(5, character.z));
  };
  
  return (
    <div className="relative w-full aspect-[16/9] bg-gray-900 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      
      {/* Кнопка смены режима управления */}
      <div className="absolute top-12 left-2 z-10">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-black/50 text-white border-none hover:bg-black/70"
          onClick={() => {
            setControlMode(prev => prev === 'keyboard' ? 'touch' : 'keyboard');
            setShowControls(true);
            setTimeout(() => setShowControls(false), 2000);
          }}
        >
          {controlMode === 'keyboard' ? <Keyboard className="w-4 h-4" /> : <Gamepad className="w-4 h-4" />}
        </Button>
      </div>
      
      {/* Информационное сообщение */}
      {showControls && (
        <div className="absolute top-12 left-12 z-10 bg-black/70 text-white px-3 py-2 rounded text-sm animate-fade-in">
          {controlMode === 'keyboard' 
            ? 'Управление: WASD или стрелки' 
            : 'Управление: экранные кнопки'}
        </div>
      )}
      
      {/* Сенсорное управление */}
      {controlMode === 'touch' && (
        <div className="absolute bottom-4 right-4 z-10 grid grid-cols-3 gap-1">
          <div></div>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-black/50 text-white border-none hover:bg-black/70 p-1"
            onTouchStart={() => handleTouchControl('up')}
            onClick={() => handleTouchControl('up')}
          >
            <ChevronUp className="w-6 h-6" />
          </Button>
          <div></div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-black/50 text-white border-none hover:bg-black/70 p-1"
            onTouchStart={() => handleTouchControl('left')}
            onClick={() => handleTouchControl('left')}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div></div>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-black/50 text-white border-none hover:bg-black/70 p-1"
            onTouchStart={() => handleTouchControl('right')}
            onClick={() => handleTouchControl('right')}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
          
          <div></div>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-black/50 text-white border-none hover:bg-black/70 p-1"
            onTouchStart={() => handleTouchControl('down')}
            onClick={() => handleTouchControl('down')}
          >
            <ChevronDown className="w-6 h-6" />
          </Button>
          <div></div>
        </div>
      )}
      
      {/* Подсказка по управлению */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
        Low Blox | {controlMode === 'keyboard' ? 'WASD для передвижения' : 'Используйте кнопки справа внизу'}
      </div>
    </div>
  );
};
