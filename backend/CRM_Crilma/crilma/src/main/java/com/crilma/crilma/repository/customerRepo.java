package com.crilma.crilma.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crilma.crilma.model.Customer;

public interface customerRepo extends JpaRepository<Customer, Long> {

    Customer findByCemail(String cemail);

}
