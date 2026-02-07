interface GridProps {
  children: React.ReactNode;
}

export function Grid({ children }: GridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6">
      {children}
    </div>
  );
}
