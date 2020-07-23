package com.example.furniturewebdemo1.repository;

import com.example.furniturewebdemo1.model.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt,Long> {
    @Query(value = "select month(r.created_date) as monthreceipt\n" +
            "from receipt r\n" +
            "where  year(r.created_date) = year(curdate())\n" +
            "group by month(r.created_date);",nativeQuery = true)
    List<?> revenueStatisticsMonth();

    @Query(value = "select sum(r.total) as totalmonth\n" +
            "from receipt r\n" +
            "where  year(r.created_date) = year(curdate())\n" +
            "group by month(r.created_date);",nativeQuery = true)
    List<?> revenueStatisticsTotal();
}
