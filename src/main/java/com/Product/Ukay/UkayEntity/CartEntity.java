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
    private String cartProductType;
    private int cartProductQuantity;
    private float cartProductPrice;
    private float cartProductTotal;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductEntity> products;

    public CartEntity(){ super();}

    public CartEntity(int cartId, String cartProductName, String cartProductType, int cartProductQuantity, float cartProductPrice, float cartProductTotal){
        this.cartId = cartId;
        this.cartProductName = cartProductName;
        this.cartProductType = cartProductType;
        this.cartProductQuantity = cartProductQuantity;
        this.cartProductPrice = cartProductPrice;
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

    public String getCartProductType() {
        return cartProductType;
    }

    public void setCartProductType(String cartProductType) {
        this.cartProductType = cartProductType;
    }

    public int getCartProductQuantity() {
        return cartProductQuantity;
    }

    public void setCartProductQuantity(int cartProductQuantity) {
        this.cartProductQuantity = cartProductQuantity;
    }

    public float getCartProductPrice() {
        return cartProductPrice;
    }

    public void setCartProductPrice(float cartProductPrice) {
        this.cartProductPrice = cartProductPrice;
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