import '@/styles/main.css';
import styles from '@/components/module/User/User.module.css';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="inner">
      <section className={styles.sign_container}>
        <div className={styles.sign_inner}>{children}</div>
      </section>
    </div>
  );
}
