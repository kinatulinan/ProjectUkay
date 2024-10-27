package ProductController;

import ProductEntity.ProductEntity;
import ProductService.ProductService;
//import org.hibernate.mapping.List;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    ProductService pserv;

    @GetMapping("/print")
    public String print(){
        return "Test";
    }
    @PostMapping("/postProduct")
    public ProductEntity postProductRecord(@RequestBody ProductEntity product){
        return pserv.postProductRecord(product);
    }

    @GetMapping("/getProduct")
    public List<ProductEntity> getAllProducts(){
        return pserv.getAllProducts();
    }

}
