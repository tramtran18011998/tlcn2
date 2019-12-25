package com.example.furniturewebdemo1.repository;

import com.example.furniturewebdemo1.model.Invoiceproduct_Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceProduct_ProductRepository extends JpaRepository<Invoiceproduct_Product,Long> {

    @Query(value = "SELECT * FROM invoiceproduct_product WHERE invoiceproduct_id = :invoiceproduct_id and product_id = :product_id",nativeQuery = true)
    Invoiceproduct_Product findAllInvoiceP_PById(@Param("invoiceproduct_id") Long id1,@Param("product_id") Long id2);

    @Query(value = "select *from invoiceproduct_product c where c.invoiceproduct_id =:invoiceproduct_id",nativeQuery = true)
    List<Invoiceproduct_Product> getListById(@Param("invoiceproduct_id") long invoiceproduct_id);

}
