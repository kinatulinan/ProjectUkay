package com.Product.Ukay.UkayService;

import com.Product.Ukay.UkayEntity.OrderEntity;
import com.Product.Ukay.UkayEntity.ProductEntity;
import com.Product.Ukay.UkayRepository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.NameNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orepo;

    public OrderService() {
        super();
    }

    public OrderEntity placeOrder(OrderEntity order, ProductEntity product) {
        order.setProduct(product);
        float total = order.getQuantity() * order.getPrice();
        order.setTotal(total);
        return orepo.save(order);
    }

    public List<OrderEntity> showAllOrders() {
        return orepo.findAll();
    }

    @SuppressWarnings("finally")
    public OrderEntity editOrderDetails(int orderId, OrderEntity newOrderDetails) {
        OrderEntity order = null;
        try {
            order = orepo.findById(orderId).orElseThrow(() -> new NoSuchElementException("Order not found"));

            order.setOrder_date(newOrderDetails.getOrder_date());
            order.setQuantity(newOrderDetails.getQuantity());
            order.setPrice(newOrderDetails.getPrice());

            float total = newOrderDetails.getQuantity() * newOrderDetails.getPrice();
            order.setTotal(total);
        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Order " + orderId + " not found");
        } finally {
            if (order != null) {
                return orepo.save(order);
            } else {
                return null;
            }
        }
    }

    public String deleteOrder(int orderId) {
        String msg = "";
        if (orepo.existsById(orderId)) {
            orepo.deleteById(orderId);
            msg = "Order deleted!";
        } else {
            msg = orderId + " NOT found!";
        }
        return msg;
    }
}
