"use client";
import styles from "./style.module.css";
import CardDorm from "../../components/CardDorm";
import CardDorm_home from "../../components/CardDorm_home";
import Recent_review from "../../components/Recent_review";
import { NEXT_PUBLIC_BASE_WEB_PATH } from '../../config'
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <img className={styles.banner} src="images/banner.png"/>
      <img className={styles.banner2} src="images/banner2.png"/>
      
      <div className={styles.info_area}>
        <div className={styles.info_container}>
          <img src="images/icon.png"/>
          <div className={styles.title_info}>Affordable Price</div>
          <div className={styles.info}>
            Each and every dorm is priced<br/>
            reasonably.We want to make sure<br/>
            that students get what they paid for.
          </div>
        </div>

        <div className={styles.info_container}>
          <img src="images/icon.png"/>
          <div className={styles.title_info}>Affordable Price</div>
          <div className={styles.info}>
            Each and every dorm is priced<br/>
            reasonably.We want to make sure<br/>
            that students get what they paid for.
          </div>
        </div>
      </div>

      <div className={styles.top_list_area}>top list of dorm</div>
      
      <Link className={styles.button} href={`${NEXT_PUBLIC_BASE_WEB_PATH}/dorms/all`}>
        <div className={styles.button_text}>Discover</div>
        <img src="images/arrow_right.png"/>
      </Link>
      
      <div className={styles.recent_review_title}>
        <div className={styles.line}/>
        <div className={styles.recent_review}>Recent reviews</div>
        <div className={styles.line}/>
      </div>

      <div className={styles.recent_review_area}>
        <Recent_review
          img = "https://upload.wikimedia.org/wikipedia/commons/8/84/Sharp_Hall_Dorm_Room.jpg"
          dorm_name = "Ulike apartment"
          review = "very very good"
          star = {4.5}
        />

        <Recent_review
          img = "data:image/jpeg;base64,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"
          dorm_name = "Hello dorm"
          review = "bad"
          star = {1.5}
        />
      </div>
    </main>
  );
}
