package com.Product.Ukay.UkayEntity;

import jakarta.persistence.*;

@Entity
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "product_name")
    private ProductEntity product;
    private String order_date;
    private int quantity;
    private float price;
    private float total;

    public OrderEntity(){super();}

    public OrderEntity(int orderId, String order_date, int quantity, float price, float total){
        this.orderId = orderId;
        this.order_date = order_date;
        this.quantity = quantity;
        this.price = price;
        this.total = total;
    }

    public void setOrder_id(int orderId) {
        this.orderId = orderId;
    }

    public String getOrder_date() {
        return order_date;
    }

    public void setOrder_date(String order_date) {
        this.order_date = order_date;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }
}