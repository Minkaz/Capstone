import './product-card.styles';
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {Footer, Image, Name, Price, ProductCardContainer} from "./product-card.styles";
import {addItemToCart} from "../../store/cart/cart.action";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selector";

const ProductCard = ({ product}) => {
    const { name, price, imageUrl } = product;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
    return (
        <ProductCardContainer>
            <Image src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart} >Add to card</Button>
        </ProductCardContainer>
    )
}

export default ProductCard;