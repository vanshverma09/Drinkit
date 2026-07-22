import Image from 'next/image';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  name: string;
  weight: string;
  price: number;
  mrp?: number;
  imageUrl: string;
  discount?: string;
  isAdded?: boolean;
}

export default function ProductCard({ name, weight, price, mrp, imageUrl, discount, isAdded }: ProductCardProps) {
  return (
    <div className="bg-card rounded-[20px] p-3 shadow-soft border border-gray-100 flex flex-col h-full relative group hover:shadow-lg transition-shadow duration-300">
      {discount && (
        <div className="absolute top-0 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-b-lg z-10 shadow-sm">
          {discount}
        </div>
      )}
      
      <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-2">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill
          className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="flex flex-col flex-grow">
        <span className="text-text-secondary text-xs font-medium mb-1">{weight}</span>
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-2">{name}</h3>
        
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            {mrp && (
              <span className="text-text-secondary text-[10px] line-through font-number">₹{mrp}</span>
            )}
            <span className="font-bold text-base font-number">₹{price}</span>
          </div>
          
          {isAdded ? (
            <div className="flex items-center bg-primary text-white rounded-[14px] h-8 font-medium overflow-hidden">
              <button className="px-2.5 h-full hover:bg-primary/90">-</button>
              <span className="text-sm font-number w-4 text-center">1</span>
              <button className="px-2.5 h-full hover:bg-primary/90">+</button>
            </div>
          ) : (
            <button className="h-8 px-4 rounded-[14px] border border-primary text-primary font-bold text-xs hover:bg-primary/5 transition-colors">
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
