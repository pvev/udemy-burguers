import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
                                .map(igKey => {
                                    return <li key={igKey}>
                                                <span style={{textTransform: 'capitalize'}}>{igKey}</span>:&nbsp;
                                                    {props.ingredients[igKey]}
                                            </li>
                                });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicius burger with the following ingredients: </p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    )
}

export default orderSummary;