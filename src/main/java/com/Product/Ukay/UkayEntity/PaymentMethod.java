package com.Product.Ukay.UkayEntity;

public enum PaymentMethod {
    CASH,                 // Physical currency
    CREDIT_CARD,          // Payment by credit card
    DEBIT_CARD,           // Payment by debit card
    PAYPAL,               // Payment through PayPal
    BANK_TRANSFER,        // Direct bank transfer
    MOBILE_PAYMENT,       // Payments via mobile apps (e.g., Apple Pay, Google Pay)
    GIFT_CARD,            // Payment using a store gift card or voucher
    STORE_CREDIT,         // Credit given by the store (for returns, loyalty points, etc.)
    CHECK,                // Payment by physical check
    OTHER;

    public static PaymentMethod fromString(String value) {
        for (PaymentMethod method : PaymentMethod.values()) {
            if (method.name().equalsIgnoreCase(value)) {
                return method;
            }
        }
        throw new IllegalArgumentException("Unknown enum value: " + value);
    }
}
