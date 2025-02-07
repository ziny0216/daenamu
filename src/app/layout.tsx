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
        <StyledComponentsRegistry>
          <StoreProvider>
            <div className="wrapper">
              <Header />
              <div className="layout_body">
                <SideMenu />
                {children}
              </div>
            </div>
          </StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
