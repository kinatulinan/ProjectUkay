package UkayEntity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class CartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartId;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cart", cascade = CascadeType.ALL)
    private List<ProductEntity> products;

//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "cartId")
//    private CartEntity cart;

    public CartEntity(){ super();}

    public CartEntity(int cartId){
        this.cartId = cartId;
    }

    public void setCartId(int cartId) {
        this.cartId = cartId;
    }

    public List<ProductEntity> getProducts() {
        return products;
    }

    public void setProducts(List<ProductEntity> products){
        this.products = products;
    }

}