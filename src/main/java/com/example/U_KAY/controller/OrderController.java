package com.example.U_KAY.controller;


import com.example.U_KAY.entity.OrderEntity;
import com.example.U_KAY.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/order")
public class OrderController {
    @Autowired
    OrderService oserv;

    @PostMapping("/postOrders")
    public OrderEntity postOrders(@RequestBody OrderEntity order){
        return oserv.postOrders(order);
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
