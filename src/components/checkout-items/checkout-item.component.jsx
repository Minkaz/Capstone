import './checkout-items.styles'
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {
    Arrow,
    CheckoutItemContainer,
    ImageContainer,
    Name,
    Price,
    Quantity,
    RemoveButton, Value
} from "./checkout-items.styles";

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);
    const clearItemHandler = () => clearItemFromCart(cartItem);
    return (
        <CheckoutItemContainer >
            <ImageContainer >
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <Name> {name} </Name>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                    <Value> {quantity} </Value>
                <Arrow onClick={addItemHandler} >&#10095;</Arrow>
            </Quantity>
            <Price > {price} </Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;