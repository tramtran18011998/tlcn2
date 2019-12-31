package com.example.furniturewebdemo1.repository;

import com.example.furniturewebdemo1.model.Cart;
import com.example.furniturewebdemo1.model.InvoiceProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceProductRepository extends JpaRepository<InvoiceProduct,Long> {
    @Query(value = "select *from invoiceproduct where customer_id =:customer_id",nativeQuery = true)
    List<InvoiceProduct> getHistoryByCustomer(@Param("customer_id") long customer_id);
}
