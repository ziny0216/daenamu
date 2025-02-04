import '@/styles/main.css';
import StoreProvider from '@/components/StoreProvider';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import { Header } from '@/components/layout/Header';
import { SideMenu } from '@/components/layout/SideMenu';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="wrapper">
          <Header />
          <div className="layout_body">
            <SideMenu />
            <StyledComponentsRegistry>
              <StoreProvider>{children}</StoreProvider>
            </StyledComponentsRegistry>
          </div>
        </div>
      </body>
    </html>
  );
}
