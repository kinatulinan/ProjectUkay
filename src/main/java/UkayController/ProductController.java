package UkayController;

import UkayEntity.ProductEntity;
import UkayService.ProductService;
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
        return "Test Product Entity";
    }

    @PostMapping("/postProduct")
    public ProductEntity postProductRecord(@RequestBody ProductEntity product){
        return pserv.postProductRecord(product);
    }

    @GetMapping("/getProduct")
    public List<ProductEntity> getAllProducts(){
        return pserv.getAllProducts();
    }

    @PutMapping("/updateProduct")
    public ProductEntity updateProductRecords(@RequestParam int productId, @RequestBody ProductEntity newProductRecords){
        return pserv.updateProductRecords(productId, newProductRecords);
    }

    @DeleteMapping("/deleteProduct/{productId}")
    public String deleteProduct(@PathVariable int productId){

        return pserv.deleteProduct(productId);
    }



}
