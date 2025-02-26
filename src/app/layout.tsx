import '@/styles/main.css';
import StoreProvider from '@/components/provider/StoreProvider';
import StyledComponentsRegistry from '@/components/provider/StyledComponentsRegistry';
import { Header } from '@/components/layout/Header';
import { ToastProvider } from '@/components/provider/ToastProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <StoreProvider>
            <div className="wrapper">
              <Header />
              <div className="layout_body">{children}</div>
            </div>
          </StoreProvider>
        </StyledComponentsRegistry>
        <ToastProvider />
      </body>
    </html>
  );
}
