
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface Game {
  id: number;
  title: string;
  players: number;
  thumbnail: string;
  liked: number;
}

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div className="relative">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-44 object-cover" 
        />
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center">
          <Users className="h-3 w-3 mr-1" />
          {game.players.toLocaleString()}
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center">
          <ThumbsUp className="h-3 w-3 mr-1" />
          {game.liked}%
        </div>
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium line-clamp-1 mb-2">{game.title}</h3>
        <Link to={`/game/${game.id}`}>
          <Button size="sm" className="w-full">Играть</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
