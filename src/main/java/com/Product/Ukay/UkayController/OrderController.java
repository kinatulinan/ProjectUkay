package com.Product.Ukay.UkayController;

import com.Product.Ukay.UkayEntity.OrderEntity;
import com.Product.Ukay.UkayEntity.ProductEntity;
import com.Product.Ukay.UkayService.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/order")
public class OrderController {
    @Autowired
    OrderService oserv;

    @PostMapping("/placeOrder")
    public OrderEntity placeOrder(@RequestBody OrderEntity order) {
        ProductEntity product = order.getProduct();
        if (product == null) {
            throw new IllegalArgumentException("Product information is required to place an order.");
        }
        return oserv.placeOrder(order, product);
    }

    @GetMapping("/showAllOrders")
    public List<OrderEntity> showAllOrders(){
        return oserv.showAllOrders();
    }

    @PutMapping("/editOrderDetails")
    public OrderEntity editOrderDetails(@RequestParam int orderId, @RequestBody OrderEntity newOrderDetails){
        return oserv.editOrderDetails(orderId, newOrderDetails);
    }

    @DeleteMapping("/deleteOrder/{orderId}")
    public String deleteOrder(@PathVariable int orderId){
        return oserv.deleteOrder(orderId);
    }
}