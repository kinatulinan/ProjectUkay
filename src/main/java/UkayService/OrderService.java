package UkayService;

import UkayEntity.OrderEntity;
import UkayRepository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.NameNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class OrderService {
    @Autowired
    OrderRepository orepo;

    public OrderService(){
        super();
    }

    public OrderEntity placeOrder(OrderEntity order) {
        float total = order.getQuantity() * order.getPrice();
        order.setTotal(total);
        return orepo.save(order);
    }

    public OrderEntity postOrders(OrderEntity order){

        return orepo.save(order);
    }

    public List<OrderEntity> showAllOrders(){

        return orepo.findAll();
    }

    @SuppressWarnings("fiinally")
    public OrderEntity editOrderDetails(int orderId, OrderEntity newOrderDetails){
        OrderEntity order = new OrderEntity();
        try{
            order = orepo.findById(orderId).get();

            order.setOrder_date(newOrderDetails.getOrder_date());
            order.setQuantity(newOrderDetails.getQuantity());
            order.setPrice(newOrderDetails.getPrice());
            order.setTotal(newOrderDetails.getTotal());
        } catch(NoSuchElementException nex){
            throw new NameNotFoundException("Order " + orderId + " not found");
        } finally{
            return orepo.save(order);
        }
    }

    public String deleteOrder(int orderId){
        String msg;
        if(orepo.findById(orderId) != null){
            orepo.deleteById(null);
            msg = "Order deleted!";
        } else
            msg = orderId + " NOT found!";
        return msg;
    }
}
