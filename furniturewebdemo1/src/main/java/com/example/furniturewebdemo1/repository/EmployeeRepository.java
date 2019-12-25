package com.example.furniturewebdemo1.repository;

import com.example.furniturewebdemo1.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    @Query(value = "select u.name from employee as e inner join user as u on e.user_id = u.user_id where e.employee_id=:employee_id",nativeQuery = true)
    String getNameByUserId(@Param("employee_id") long employee_id);
}
