import styles from '@/components/module/Post/Post.module.css';

export default function PostImageList() {
  return (
    <ul className={styles.img_list}>
      <li className={styles.img_box}>
        <img src="https://picsum.photos/32/32" alt="이미지" />
      </li>
      <li className={styles.img_box}>
        <img src="https://picsum.photos/32/32" alt="이미지" />
      </li>
      <li className={styles.img_box}>
        <img src="https://picsum.photos/32/32" alt="이미지" />
      </li>
      <li className={styles.img_box}>
        <img src="https://picsum.photos/32/32" alt="이미지" />
      </li>
      <li className={styles.img_box}>
        <img src="https://picsum.photos/32/32" alt="이미지" />
      </li>
    </ul>
  );
}
