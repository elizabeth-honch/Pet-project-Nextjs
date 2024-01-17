import Image from "next/image";
import styles from './styles.module.css';

export default function Gallery({ imgs }) {
  return (
    <ul className={styles.gallery}>
      <div className={styles.galleryBlock}>
        {imgs.map(img => (
          <li key={img.id}>
            <Image
              width={350}
              height={550}
              src={img.image}
              alt={img.title}
              className={styles.galleryImg}
            />
          </li>
        ))}
      </div>
    </ul>
  );
};
