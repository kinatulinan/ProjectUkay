package com.Product.Ukay.UkayService;

import com.Product.Ukay.UkayEntity.ProductEntity;
import com.Product.Ukay.UkayEntity.SellEntity;
import com.Product.Ukay.UkayRepository.SellRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.NameNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

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


    //Update
    @SuppressWarnings("finally")
    public SellEntity editSellDetails(int sellId, SellEntity newSellDetails){
        SellEntity sell = new SellEntity();
        try{
            sell = srepo.findById(sellId).get();

            sell.setSellProductName(newSellDetails.getSellProductName());
            sell.setSellProductType(newSellDetails.getSellProductType());
            sell.setSellProductPrice(newSellDetails.getSellProductPrice());
            sell.setSellProductSize(newSellDetails.getSellProductSize());
            sell.setSellProductDescription(newSellDetails.getSellProductDescription());

        } catch(NoSuchElementException nex){
            throw new NameNotFoundException("Sell " + sellId + " not found");
        } finally {
            return srepo.save(sell);
        }
    }

    public String deleteSellProduct(int sellId){
        String msg;
        if(srepo.existsById(sellId)){
            srepo.deleteById(sellId);
            msg = "Product Deleted!";
        } else{
            msg = sellId + " NOT FOUND!";
        }
        return msg;
    }

}
