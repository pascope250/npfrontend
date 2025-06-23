import Link from 'next/link';

interface MenuCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  bgColor: string;
}

const MenuCard = ({ title, description, href, icon, bgColor }: MenuCardProps) => {
  // open new tab
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(href, '_blank');
  };
  return (
    <Link href={href} onClick={handleClick}>
      <div className={`${bgColor} rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer h-full`}>
        <div className="p-6 flex flex-col items-center text-center">
          <div className="mb-4 text-4xl animate-float">{icon}</div>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white opacity-90">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default MenuCard;