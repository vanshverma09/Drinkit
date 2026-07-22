import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  imageUrl: string;
  href?: string;
}

export default function CategoryCard({ name, imageUrl, href = "/category" }: CategoryCardProps) {
  return (
    <Link href={href} className="flex flex-col items-center gap-2 group">
      <div className="w-[72px] h-[72px] rounded-full bg-[#F3F4F6] flex items-center justify-center p-3 relative overflow-hidden group-hover:shadow-md transition-shadow">
        <Image 
          src={imageUrl} 
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="72px"
        />
      </div>
      <span className="text-xs font-medium text-center w-full leading-tight">{name}</span>
    </Link>
  );
}
