import '@/styles/main.css';
import StoreProvider from '@/components/provider/StoreProvider';
import StyledComponentsRegistry from '@/components/provider/StyledComponentsRegistry';
import { Header } from '@/components/layout/Header';
import { ToastProvider } from '@/components/provider/ToastProvider';
import ConfirmModal from '@/components/modal/ConfirmModal';

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
              <ConfirmModal />
            </div>
          </StoreProvider>
        </StyledComponentsRegistry>
        <ToastProvider />
        <div id="modal"></div>
      </body>
    </html>
  );
}
