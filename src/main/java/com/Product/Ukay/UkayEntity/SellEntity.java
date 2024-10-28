package com.Product.Ukay.UkayEntity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class SellEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sellId;

    private String sellProductName;
    private String sellProductType;
    private double sellProductPrice;

    @OneToMany(mappedBy = "sell", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductEntity> products;


    public SellEntity(){
        super();
    }

    public SellEntity(int sellId, String sellProductName, String sellProductType, double sellProductPrice){
        this.sellId = sellId;
        this.sellProductName = sellProductName;
        this.sellProductType = sellProductType;
        this.sellProductPrice = sellProductPrice;
    }

    public int getSellId() {
        return sellId;
    }

    public void setSellId(int sellId) {
        this.sellId = sellId;
    }

    public String getSellProductName() {
        return sellProductName;
    }

    public void setSellProductName(String sellProductName) {
        this.sellProductName = sellProductName;
    }

    public String getSellProductType() {
        return sellProductType;
    }

    public void setSellProductType(String sellProductType) {
        this.sellProductType = sellProductType;
    }

    public double getSellProductPrice() {
        return sellProductPrice;
    }

    public void setSellProductPrice(double sellProductPrice) {
        this.sellProductPrice = sellProductPrice;
    }


}
