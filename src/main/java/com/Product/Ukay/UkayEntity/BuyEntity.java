package com.Product.Ukay.UkayEntity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BuyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int buyId;

    private String buyProductName;
    private String buyProductType;
    private double buyProductPrice;


    public BuyEntity(){
        super();
    }

    public BuyEntity(int buyId, String buyProductName, String buyProductType, double buyProductPrice){
        this.buyId = buyId;
        this.buyProductName = buyProductName;
        this.buyProductType = buyProductType;
        this.buyProductPrice = buyProductPrice;
    }


    public int getBuyId() {
        return buyId;
    }

    public void setBuyId(int buyId) {
        this.buyId = buyId;
    }

    public String getBuyProductName() {
        return buyProductName;
    }

    public void setBuyProductName(String buyProductName) {
        this.buyProductName = buyProductName;
    }

    public String getBuyProductType() {
        return buyProductType;
    }

    public void setBuyProductType(String buyProductType) {
        this.buyProductType = buyProductType;
    }

    public double getBuyProductPrice() {
        return buyProductPrice;
    }

    public void setBuyProductPrice(double buyProductPrice) {
        this.buyProductPrice = buyProductPrice;
    }
}
