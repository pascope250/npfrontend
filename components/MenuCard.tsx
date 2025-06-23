'use client';
interface MenuCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  bgColor: string;
}

const MenuCard = ({ title, description, href, icon, bgColor }: MenuCardProps) => {
  
  return (

      <div className={`${bgColor} rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer h-full`}
      onClick={() => window.open(href, '_blank')}
      >
        <div className="p-6 flex flex-col items-center text-center">
          <div className="mb-4 text-4xl animate-float">{icon}</div>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white opacity-90">{description}</p>
        </div>
      </div>
  );
};

export default MenuCard;