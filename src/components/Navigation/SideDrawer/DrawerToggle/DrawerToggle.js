import React from 'react';

import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => {
    return (
        <div className={[classes.MobileOnly, classes.DrawerToggle].join(' ')} onClick={props.openSideDrawer}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default drawerToggle;