import Navbar from '@/components/Navbar';
import { UseClientProvider } from '@/hooks/useClientProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className={`relative lg:flex lg:h-fit flex-row-reverse  w-content bg-[#F6F5F2]`}>
        <UseClientProvider>
          <div className="max-h-[calc(100vh-128px)] mt-[64px] lg:mt-0 lg:max-h-dvh overflow-auto w-full">
            {children}
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </UseClientProvider>
        <Navbar />
      </main>
  );
}
