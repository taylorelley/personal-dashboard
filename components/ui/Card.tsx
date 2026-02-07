interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`
      bg-white dark:bg-gray-800 
      rounded-lg shadow-lg 
      p-6 
      hover:shadow-xl transition-shadow duration-300
      ${className}
    `}>
      {title && (
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
