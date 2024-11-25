package com.Product.Ukay.UkayEntity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class CartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartId;

    private String cartProductName;
    private int cartProductQuantity;
    private float cartProductTotal;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductEntity> products;

    public CartEntity(){ super();}

    public CartEntity(int cartId, String cartProductName, int cartProductQuantity, float cartProductTotal){
        this.cartId = cartId;
        this.cartProductName = cartProductName;
        this.cartProductQuantity = cartProductQuantity;
        this.cartProductTotal = cartProductTotal;
    }

    public void setCartId(int cartId) {
        this.cartId = cartId;
    }

    public int getCartId() {
        return cartId;
    }

    public String getCartProductName() {
        return cartProductName;
    }

    public void setCartProductName(String cartProductName) {
        this.cartProductName = cartProductName;
    }

    public int getCartProductQuantity() {
        return cartProductQuantity;
    }

    public void setCartProductQuantity(int cartProductQuantity) {
        this.cartProductQuantity = cartProductQuantity;
    }

    public float getCartProductTotal() {
        return cartProductTotal;
    }

    public void setCartProductTotal(float cartProductTotal) {
        this.cartProductTotal = cartProductTotal;
    }

//    public List<ProductEntity> getProducts() {
//        return products;
//    }
//
//    public void setProducts(List<ProductEntity> products) {
//        this.products = products;
//    }

}