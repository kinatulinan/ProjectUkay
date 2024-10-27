package UkayService;

import UkayRepository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import UkayEntity.ProductEntity;
//import org.hibernate.mapping.List;
import java.util.List;

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

}
