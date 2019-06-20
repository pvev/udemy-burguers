import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredient/BurgerIngredients';

const burger = (props) => {
    let transformedIngredientsArray = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredients key={igKey + i} type={igKey}/>
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transformedIngredientsArray.length === 0) {
        transformedIngredientsArray = <p>Start Adding Ingredients</p>
    }
    return (
    <div className={classes.Burger}>
        <BurgerIngredients type="bread-top"></BurgerIngredients>
        {transformedIngredientsArray}
        <BurgerIngredients type="bread-bottom"></BurgerIngredients>
    </div>)
}

export default burger;