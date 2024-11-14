package com.Product.Ukay.UkayController;


//import com.Product.Ukay.UkayEntity.ProductEntity;
import com.Product.Ukay.UkayEntity.SellEntity;
import com.Product.Ukay.UkayService.SellService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/sell")

public class SellController {

    @Autowired
    SellService sser;

    @GetMapping("/test")
    public String testEndpoint() {
        return "SellController is working";
    }

    //Create of CRUD
    @PostMapping("/post")
    public SellEntity postSellRecord(@RequestBody SellEntity sell) {
        System.out.println("Received product: " + sell); // Log received data
        return sser.postSellRecord(sell);
}


    //Read of CRUD
    @GetMapping("/get")
    public List<SellEntity> getAllSell(){

        return sser.getAllSell();
    }

    //Update
    @PutMapping("/update/{sellId}")
    public SellEntity editSellDetails(@PathVariable  int sellId, @RequestBody SellEntity newSellDetails){
        return sser.editSellDetails(sellId, newSellDetails);
    }

    @DeleteMapping("/delete/{sellId}")
    public String deleteSellProduct(@PathVariable int sellId){
        return sser.deleteSellProduct(sellId);
    }
}
