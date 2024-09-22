import CountdownTimer from '../components/CountdownTimer';
import styles from '@/components/index.module.css'; // Assuming you have a separate CSS file for the container

export default function Home() {
  return (
    <div className={styles.container}>
      <CountdownTimer />
    </div>
  );
}



