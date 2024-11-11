package com.Product.Ukay.UkayController;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Product.Ukay.UkayEntity.PaymentEntity;
import com.Product.Ukay.UkayEntity.UserEntity;
import com.Product.Ukay.UkayRepository.PaymentRepository;
import com.Product.Ukay.UkayRepository.UserRepository;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository pRepo;

    @Autowired
    private UserRepository uRepo;


    @GetMapping(value = "/showPayment/{userid}")
    public ResponseEntity<List<PaymentEntity>> getPayments() {
        List<PaymentEntity> payments = pRepo.findAll();
        if (payments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(payments);
    }

    @PostMapping(value = "/savePayment/{userid}")
    public ResponseEntity<String> savePayment(@PathVariable int userid, @RequestBody PaymentEntity payment) {
        Optional<UserEntity> userOptional = uRepo.findById(userid);
        if (userOptional.isPresent()) {
            try {
                payment.setUser(userOptional.get());
                pRepo.save(payment);
                return ResponseEntity.ok("Payment saved with user ID: " + userid);
            } catch (Exception e) {
                System.out.println("Error saving payment: " + e.getMessage());
                return ResponseEntity.status(500).body("Error saving payment: " + e.getMessage());
            }
        } else {
            return ResponseEntity.badRequest().body("User not found with ID: " + userid);
        }
    }


    @PutMapping(value = "/updatePayment/{paymentid}/{userid}")
    public ResponseEntity<String> updatePayment(@PathVariable int paymentid, @PathVariable int userid, @RequestBody PaymentEntity paymentdets) {
        Optional<PaymentEntity> optionalPayment = pRepo.findById(paymentid);
        Optional<UserEntity> optionalUser = uRepo.findById(userid);

        if (optionalPayment.isEmpty()) {
            return ResponseEntity.badRequest().body("Payment not found.");
        }

        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        PaymentEntity existingPayment = optionalPayment.get();
        UserEntity user = optionalUser.get();

        existingPayment.setAmount(paymentdets.getAmount());
        existingPayment.setPaymentDate(paymentdets.getPaymentDate());
        existingPayment.setTransactionId(paymentdets.getTransactionId());
        existingPayment.setNotes(paymentdets.getNotes());
        existingPayment.setPaymentMethod(paymentdets.getPaymentMethod());
        existingPayment.setUser(user);

        try {
            pRepo.save(existingPayment);
            return ResponseEntity.ok("Payment updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating payment: " + e.getMessage());
        }
    }

    @DeleteMapping(value = "/deletePayment/{id}")
    public ResponseEntity<String> deletePayment(@PathVariable int id) {
        Optional<PaymentEntity> optionalPayment = pRepo.findById(id);
        if (optionalPayment.isPresent()) {
            try {
                pRepo.delete(optionalPayment.get());
                return ResponseEntity.ok("Deleted payment with ID: " + id);
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Error deleting payment: " + e.getMessage());
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}

