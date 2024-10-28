package com.Product.Ukay.UkayController;

import com.Product.Ukay.UkayEntity.CartEntity;
import com.Product.Ukay.UkayService.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/cart")
public class CartController {
    @Autowired
    CartService cserv;

    @PostMapping("/postCart")
    public CartEntity postCart(@RequestBody CartEntity cart){
        return cserv.postCart(cart);
    }

    @GetMapping("/showCart")
    public List<CartEntity> showCart(){
        return cserv.showCart();
    }

    @PutMapping("/editCartDetails")
    public CartEntity editCartDetails(@RequestParam int cartId, @RequestBody CartEntity newCartDetails){
        return cserv.editCartDetails(cartId, newCartDetails);
    }

    @DeleteMapping("/deleteCart/{cartId}")
    public String deleteCart(@PathVariable int cartId){
        return cserv.deleteCart(cartId);
    }
}