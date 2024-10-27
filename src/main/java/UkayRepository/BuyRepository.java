package UkayRepository;

import UkayEntity.BuyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BuyRepository extends JpaRepository<BuyEntity, Integer> {
}
