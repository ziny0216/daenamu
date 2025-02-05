import styles from '@/components/module/Post/Post.module.css';
import { FileData } from '@/types/components/common';

export default function PostImageList({ files = [] }: { files?: FileData[] }) {
  console.log(files);
  return (
    <ul className={styles.img_list}>
      {files.map((item, index) => (
        <li className={styles.img_box} key={index}>
          <img src={item.new_filepath as string} alt={item.org_filename} />
        </li>
      ))}
    </ul>
  );
}
