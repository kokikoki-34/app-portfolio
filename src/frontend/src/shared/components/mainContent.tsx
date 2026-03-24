interface MainContentProps {
  children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <div className="bg-white rounded-lg p-8 md:p-12 shadow-none border-none">
      {children}
    </div>
  );
}
