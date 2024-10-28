package UkayService;

import UkayRepository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import UkayEntity.ProductEntity;
//import org.hibernate.mapping.List;
import javax.naming.NameNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository prepo;

    public ProductService(){
        super();
    }
    //Create of CRUD
    public ProductEntity postProductRecord(ProductEntity product){
        return prepo.save(product);
    }

    //Read of CRUD
    public List<ProductEntity> getAllProducts(){
        return prepo.findAll();
    }


    // Update of CRUD
    public ProductEntity updateProductRecords(int productId, ProductEntity newProductRecords) {
        ProductEntity product = prepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product with ID " + productId + " not found"));

        product.setProductName(newProductRecords.getProductName());
        product.setProductType(newProductRecords.getProductType());
        product.setProductDetails(newProductRecords.getProductDetails());
        product.setProductPrice(newProductRecords.getProductPrice());
        product.setAvailable(newProductRecords.isAvailable());

        return prepo.save(product);
    }

    public String deleteProduct(int productId) {
        String msg;
        if (prepo.findById(productId).isPresent()) {
            prepo.deleteById(productId); // Use productId instead of null
            msg = "Product deleted!";
        } else {
            msg = "Product with ID " + productId + " not found!";
        }
        return msg;
    }

}


