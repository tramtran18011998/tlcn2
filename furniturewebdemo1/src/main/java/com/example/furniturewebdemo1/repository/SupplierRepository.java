package com.example.furniturewebdemo1.repository;

import com.example.furniturewebdemo1.model.Product;
import com.example.furniturewebdemo1.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier,Long> {

}
