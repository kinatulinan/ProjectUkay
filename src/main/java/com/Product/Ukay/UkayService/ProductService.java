package com.Product.Ukay.UkayService;

import com.Product.Ukay.UkayRepository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Product.Ukay.UkayEntity.ProductEntity;
//import org.hibernate.mapping.List;
import javax.naming.NameNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProductService {
    @Autowired
    ProductRepository prepo;

    public ProductService(){
        super();
    }

    //Create
    public ProductEntity postProducts(ProductEntity product){
        return prepo.save(product);
    }

    //Read
    public List<ProductEntity> showAllProducts(){
        return prepo.findAll();
    }

    @SuppressWarnings("finally")
    public ProductEntity editProductDetails(int productId, ProductEntity newProductDetails){
        ProductEntity product = new ProductEntity();
        try{
            product = prepo.findById(productId).get();

            product.setProduct_name(newProductDetails.getProduct_name());
            product.setProduct_type(newProductDetails.getProduct_type());
            product.setProduct_details(newProductDetails.getProduct_details());
            product.setProduct_price(newProductDetails.getProduct_price());
            product.setProduct_description(newProductDetails.getProduct_description());
            product.setAvailable(newProductDetails.isAvailable());
        } catch(NoSuchElementException nex){
            throw new NameNotFoundException("Product " + productId + " not found");
        } finally {
            return prepo.save(product);
        }
    }

    public String deleteProduct(int productId){
        String msg = "";
        if(prepo.existsById(productId)){
            prepo.deleteById(productId);
            msg = "Product Deleted!";
        } else{
            msg = productId + " NOT FOUND!";
        }
        return msg;
    }

}
