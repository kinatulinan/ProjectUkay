package UkayEntity;

import jakarta.persistence.*;

@Entity
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cartId")
    private CartEntity cart;

//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL)
//    private List<CartEntity> cart;

    private String product_name;
    private String product_type;
    private String product_details;
    private float product_price;
    private String product_description;
    private boolean isAvailable;

    public ProductEntity(){ super();}

    public ProductEntity(int productId, String product_name, String product_type, String product_details, float product_price, String product_description, boolean isAvailable) {
        this.productId = productId;
        this.product_name = product_name;
        this.product_type = product_type;
        this.product_details = product_details;
        this.product_price = product_price;
        this.product_description = product_description;
        this.isAvailable = isAvailable;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getProduct_type() {
        return product_type;
    }

    public void setProduct_type(String product_type) {
        this.product_type = product_type;
    }

    public String getProduct_details() {
        return product_details;
    }

    public void setProduct_details(String product_details) {
        this.product_details = product_details;
    }

    public float getProduct_price() {
        return product_price;
    }

    public void setProduct_price(float product_price) {
        this.product_price = product_price;
    }

    public String getProduct_description() {
        return product_description;
    }

    public void setProduct_description(String product_description) {
        this.product_description = product_description;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public void setCart(CartEntity cart) {
        this.cart = cart;
    }
}