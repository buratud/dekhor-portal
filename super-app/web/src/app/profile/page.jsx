'use client'

import Link from "next/link"
import NavBar from "../../../components/nav"
import style from "./page.module.css"
import Footer from "../../../components/footer/Footer"
import {NEXT_PUBLIC_BASE_WEB_PATH} from "../../../config.js";

const BlogsProfile = () => {
       return(
            <div>
            </div>
       )
    }

export default function Profile() {
    
    return (

        <div className={style.profile_page}>
            <NavBar></NavBar>
            <div className={style.container}>

                <div className={style.profile}>Profile</div>

                <div className={style.user}>
                    <img className={style.user_img} src={`${NEXT_PUBLIC_BASE_WEB_PATH}images/user_img.png`} />
                    <div className={style.user_info}>
                        <div className={style.username}>Username</div>
                        <Link href={''} className={style.edit_profile_button}>
                            <div className={style.edit_profile_img}>
                                <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}images/edit_profile.png`} />
                            </div>
                            <div className={style.edit_profile}>Edit profile</div>
                        </Link>
                        <div className={style.line} />
                        <select className={style.dropdown}>
                            <option value="volvo">DekHor Blogs</option>
                            <option value="saab">DekHor Dorms</option>
                            <option value="mercedes">DekHor Markets</option>
                        </select>
                    </div>
                </div>

                <div className={style.data}>
                    <BlogsProfile></BlogsProfile>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
