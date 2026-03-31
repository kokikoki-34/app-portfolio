interface MainContentProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainContentProps) {
  return (
    <main className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4">
            <div className="bg-white rounded-lg p-8 md:p-12 shadow-none border-none">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
