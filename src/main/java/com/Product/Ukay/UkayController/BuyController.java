package com.Product.Ukay.UkayController;

import com.Product.Ukay.UkayEntity.BuyEntity;
import com.Product.Ukay.UkayService.BuyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buy")
public class BuyController {

    @Autowired
    BuyService bserv;


    @GetMapping("/test")
    public String testEndpoint() {
        return "BuyController is working";
    }

    @PostMapping("/postBuy")
    public BuyEntity postBuyRecord(@RequestBody BuyEntity buy){
        return bserv.postBuyRecord(buy);
    }

    //Read of CRUD
    @GetMapping("/getBuy")
    public List<BuyEntity> getAllBuy(){
        return bserv.getAllBuy();
    }
}
