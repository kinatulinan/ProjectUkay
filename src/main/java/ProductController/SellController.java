package ProductController;


import ProductEntity.SellEntity;
import ProductService.SellService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sell")
public class SellController {

    @Autowired
    SellService sser;


    //Create of CRUD
    @PostMapping("/postSell")
    public SellEntity postSellRecord(SellEntity sell){
        return sser.postSellRecord(sell);
    }

    //Read of CRUD
    @GetMapping("/getSell")
    public List<SellEntity> getAllSell(){
        return sser.getAllSell();
    }
}
