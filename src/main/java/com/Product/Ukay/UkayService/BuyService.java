package com.Product.Ukay.UkayService;


import com.Product.Ukay.UkayEntity.BuyEntity;
import com.Product.Ukay.UkayRepository.BuyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuyService {

    @Autowired
    BuyRepository brepo;

    public BuyService(){

        super();
    }


    //Create of CRUD
    public BuyEntity postBuyRecord(BuyEntity buy){
        return brepo.save(buy);
    }


    //Read of CRUD
    public List <BuyEntity> getAllBuy(){
        return brepo.findAll();
    }
}
