import Navbar from '@/components/Navbar';
import { UseClientProvider } from '@/hooks/useClientProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className={`relative flex md:h-fit  w-content bg-[#F6F5F2]`}>
        <Navbar />
        <UseClientProvider>
          <div className="max-h-[calc(100dvh-80px)] lg:max-h-dvh overflow-auto w-full">
            {children}
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </UseClientProvider>
      </main>
  );
}
