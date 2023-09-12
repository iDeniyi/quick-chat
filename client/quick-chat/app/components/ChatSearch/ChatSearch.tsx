"use client";

import React, { useState, ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./ChatSearch.module.css";

const ChatSearch: React.FC = () => {
    const [query, setQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const getChats = async (value: string): Promise<void> => {
        try {
            // TODO: fetch channels
        } catch (error) {
            setQuery("");
        }
    };

    const onSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setLoading(true);
        const searchValue = event.target.value;
        setQuery(searchValue);
        getChats(searchValue);
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
                <div className={styles.searchIcon}>
                    <AiOutlineSearch />
                </div>
                <input
                    className={styles.searchText}
                    placeholder="Search"
                    type="text"
                    value={query}
                    onChange={onSearch}
                />
            </div>
        </div>
    );
};

export default ChatSearch;
