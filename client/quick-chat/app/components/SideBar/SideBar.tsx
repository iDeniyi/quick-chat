"use client";

import React from "react";
import { IoIosFlash, IoIosLogOut } from "react-icons/io";
import styles from "./SideBar.module.css";

function SideBar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.iconContainer}>
                <IoIosFlash size={30} />
            </div>
            <div className={styles.iconContainer}>
                <IoIosLogOut size={30} />
            </div>
        </div>
    );
}

export default SideBar;
