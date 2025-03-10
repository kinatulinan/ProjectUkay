package com.Product.Ukay.UkayService;
import com.Product.Ukay.UkayEntity.CartEntity;

import com.Product.Ukay.UkayRepository.CartRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.naming.NameNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CartService {
    @Autowired
    CartRepository crepo;

    public CartService(){ super();}

    public CartEntity addToCart(CartEntity cart){
        return crepo.save(cart);
    }

    public List<CartEntity> showCart(){
        return crepo.findAll();
    }

    @SuppressWarnings("finally")
    public CartEntity editCartDetails(int cartId, CartEntity newCartDetails){
        CartEntity cart = new CartEntity();
        try{
            cart = crepo.findById(cartId).get();

            cart.setCartProductName(newCartDetails.getCartProductName());
            cart.setCartProductQuantity(newCartDetails.getCartProductQuantity());
            cart.setCartProductTotal(newCartDetails.getCartProductTotal());

        } catch(NoSuchElementException nex){
            throw new NameNotFoundException("Cart " + cartId + " not found");
        } finally{
            return crepo.save(cart);
        }
    }
    public String deleteCart(int cartId) {
        String msg = "";
        if (crepo.existsById(cartId)) {
            crepo.deleteById(cartId);
            msg = "cart deleted!";
        } else {
            msg = cartId + " NOT found!";
        }
        return msg;
    }

}