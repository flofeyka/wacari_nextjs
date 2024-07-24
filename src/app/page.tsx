import styles from "./page.module.css";
import HomePage from "@/pagesComponents/homePage/HomePage";


const Home = () => {
  return (
    <main
        // className={styles.main}
    >
      <div>
          <HomePage/>
      </div>
    </main>
  );
}

export default Home;
