package com.example.furniturewebdemo1.repository;

import com.example.furniturewebdemo1.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {

    @Query(value = "select u.name from customer as c inner join user as u on c.user_id = u.user_id where c.customer_id=:customer_id",nativeQuery = true)
    String getNameByUserId(@Param("customer_id") long customer_id);
}
