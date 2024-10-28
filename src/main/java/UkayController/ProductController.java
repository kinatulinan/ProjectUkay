package UkayController;

import UkayEntity.ProductEntity;
import UkayService.ProductService;
//import org.hibernate.mapping.List;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/product")
public class ProductController {
    @Autowired
    ProductService pserv;

    @PostMapping("/postProducts")
    public ProductEntity postProducts(@RequestBody ProductEntity product){
        return pserv.postProducts(product);
    }

    @GetMapping("/showAllProducts")
    public List<ProductEntity> showAllProducts(){
        return pserv.showAllProducts();
    }

    @PutMapping("/editProductDetails")
    public ProductEntity editProductDetails(@RequestParam int productId, @RequestBody ProductEntity newProductDetails){
        return pserv.editProductDetails(productId, newProductDetails);
    }

    @DeleteMapping("/deleteProduct/{productId}")
    public String deleteProduct(@PathVariable int productId){
        return pserv.deleteProduct(productId);
    }
}