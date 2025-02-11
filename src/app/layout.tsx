import '@/styles/main.css';
import StoreProvider from '@/components/StoreProvider';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import { Header } from '@/components/layout/Header';

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
      </body>
    </html>
  );
}
