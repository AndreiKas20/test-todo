import React from 'react';
import ToggleButtonComponent from "./components/ToggleButtonComponent/ToggleButtonComponent";
import styles from './Header.module.scss'
import Languge from "./components/Language/Languge";

const Header = () => {
    return (
        <header className={styles.header}>
            <ToggleButtonComponent/>
            <Languge/>
        </header>
    );
};

export default Header;
