package com.Product.Ukay.UkayService;

import com.Product.Ukay.UkayEntity.SellEntity;
import com.Product.Ukay.UkayRepository.SellRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SellService {


    @Autowired
    SellRepository srepo;

    public SellService(){
        super();
    }

    //Create of CRUD
    public SellEntity postSellRecord(SellEntity sell){
        return srepo.save(sell);
    }


    //Read of CRUD
    public List<SellEntity> getAllSell(){
        return srepo.findAll();
    }

}
