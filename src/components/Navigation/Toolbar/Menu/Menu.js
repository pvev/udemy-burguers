import React from 'react';

import classes from './Menu.module.css';

const menu = (props) => {
    return (
        <div className={classes.MobileOnly} onClick={props.openSideDrawer}>
            Menu
        </div>
    );
}

export default menu;