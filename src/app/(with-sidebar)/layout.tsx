import '@/styles/main.css';
import { SideMenu } from '@/components/layout/SideMenu';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="inner">
      <SideMenu />
      <section>{children}</section>
    </div>
  );
}
