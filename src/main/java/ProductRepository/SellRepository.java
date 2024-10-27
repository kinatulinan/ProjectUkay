package ProductRepository;

import ProductEntity.SellEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  SellRepository extends JpaRepository<SellEntity, Integer>{

}
