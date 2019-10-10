import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 1,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    addIngredientsHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        if (this.state.ingredients[type] === 0) {
            return;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = this.state.ingredients[type] - 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) => {
        const sum1 = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum1 > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.setState({ loading:true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Pablo Velez',
                addres: {
                    street: 'Test street',
                    zipCode: '345rwe',
                    country: 'Spain'
                },
                email: 'pablo@genesis.com'
            },
            deliveryMethod: 'fastests'
        }
        axios.post('/orders.json', order)
            .then( response => {
                this.setState({ loading: false, purchasing: false });
            } )
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = <OrderSummary
            purchaseContinue={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice}
            purchaseCancel={this.purchaseCancelHandler}
            ingredients={this.state.ingredients}></OrderSummary>

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        // disabledInfo = {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal
                    modalClosed={this.purchaseCancelHandler}
                    show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    totalPrice={this.state.totalPrice}
                    disabled={disabledInfo}
                    removeIngredient={this.removeIngredientsHandler}
                    purchasable={this.state.purchasable}
                    purchasing={this.purchaseHandler}
                    addIngredient={this.addIngredientsHandler}></BuildControls>
            </Aux>
        );
    }
}

export default BurgerBuilder;