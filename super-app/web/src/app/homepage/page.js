"use client";
import Link from "next/link";
import style from "./page.module.css";
import CardBlogs from "../../../components/CardBlogs";
import CardList from "./data.js";
import CardProducts from "../../../components/CardProduct";

export default function Home() {
  return (
    <div className={style.bg_page}>
      <div className={style.navbar}>
        <img style={{ marginLeft: "53px" }} src="image/DekHor-icon.png" />
        <img style={{ marginRight: "53px" }} src="image/user-icon.png" />
      </div>
      <div className={style.place_holder}>
        <img style={{ width: "100vw" }} src="image/place_holder.png" />
      </div>
      <div className={style.search_bar_area}>
        <div className={style.search_bar}>
          <input
            className={style.search_bar_input}
            type="text"
            placeholder="Search..."
          ></input>
          <div style={{ position: "absolute", display: "flex" }}>
            <img style={{ marginLeft: "21px" }} src="image/search-icon.png" />
            <div
              style={{
                width: "2px",
                height: "35px",
                borderRadius: "1px",
                backgroundColor: "rgba(0, 0, 0, 0.10)",
                marginLeft: "15px",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "150px",
          justifyContent: "space-around",
          width: "100%",
          height: "100vh",
          display: "flex",
        }}
      >
        <Link
          style={{ textDecoration: "none" }}
          href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/dorms"
        >
          <div className={style.portal}>
            <div className={style.icon}>
              <img
                className={style.bg_portal}
                src="image/dekhordorm_portal.png"
              />
            </div>
            <p className={style.subtitle_portal}>DekHor Dorms</p>
          </div>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/market"
        >
          <div className={style.portal}>
            <div className={style.icon}>
              <img
                className={style.bg_portal}
                src="image/dekhormarket_portal.png"
              />
            </div>
            <p className={style.subtitle_portal}>DekHor Markets</p>
          </div>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs"
        >
          <div className={style.portal}>
            <div className={style.icon}>
              <img
                className={style.bg_portal}
                src="image/dekhorblog_portal.png"
              />
            </div>
            <p className={style.subtitle_portal}>DekHor Blogs</p>
          </div>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/eats"
        >
          <div className={style.portal}>
            <div className={style.icon}>
              <img
                className={style.bg_portal}
                src="image/dekhoreat_portal.png"
              />
            </div>
            <p className={style.subtitle_portal}>DekHor Eats</p>
          </div>
        </Link>
      </div>

      {/* dekhor blog */}
      <div>
        <div>{/* bloging(krit) */}</div>

        <div className={style.ReccommendedBlogs}>
          {/* reccommended blog(preaw) */}
          <div className={style.ReccommendedBlogs_text}>Recommended Blogs</div>
          <main className={style.mainBlogs}>
            {/* Back-end ทำการเพิ่มข้อมูลตรงนี้ CardList_Blogs เป็น Reccommend แบบ Random*/}
            {CardList.slice(0, 3).map((card) => (
              <CardBlogs
                img={card.img}
                title={card.title}
                Blogger={card.Blogger}
                Categories={card.Categories}
              />
            ))}
          </main>
        </div>
      </div>

      {/* dekhor dorm */}
      <div></div>

      {/* dekhor market */}
      <div>
        <div>{/* discover (krit) */}</div>
        <div className={style.ReccommendedProducts}>
          {/* slider (poohsit) */}
          <div className={style.ReccommendedBlogs_text}>
            Recommended Products
          </div>
          <main className={style.mainMarket}>
            {/* Back-end ทำการเพิ่มข้อมูลตรงนี้ CardList เป็น Reccommend แบบ Random*/}
            {CardList.slice(0, 4).map((card) => (
              <CardProducts img={card.img} />
            ))}
          </main>
        </div>
      </div>

      <footer>{/* footer ( petch )(component) */}</footer>
    </div>
  );
}
