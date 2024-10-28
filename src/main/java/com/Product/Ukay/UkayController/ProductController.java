package com.Product.Ukay.UkayController;

import com.Product.Ukay.UkayEntity.ProductEntity;
import com.Product.Ukay.UkayService.ProductService;

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

        return "Test product entity";
    }

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