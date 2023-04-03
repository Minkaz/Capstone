import './checkout.styles';
import {useSelector} from "react-redux";
import {selectCartItems, selectCartTotal} from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-items/checkout-item.component";
import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from "./checkout.styles";
const CheckOut = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Products</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map((cartItem) => {
                    return (
                       <CheckoutItem key={cartItem.id} cartItem={cartItem}></CheckoutItem>
                    );
                })
            }
            <Total>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    )
}

export default CheckOut;