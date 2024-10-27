package UkayController;


import UkayEntity.SellEntity;
import UkayService.SellService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sell")
public class SellController {

    @Autowired
    SellService sser;


    //Create of CRUD
    @PostMapping("/postSell")
    public SellEntity postSellRecord(@RequestBody SellEntity sell){
        return sser.postSellRecord(sell);
    }

    //Read of CRUD
    @GetMapping("/getSell")
    public List<SellEntity> getAllSell(){
        return sser.getAllSell();
    }
}
