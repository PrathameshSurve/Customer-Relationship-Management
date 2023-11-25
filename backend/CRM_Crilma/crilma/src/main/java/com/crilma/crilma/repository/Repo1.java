package com.crilma.crilma.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crilma.crilma.model.User;

public interface Repo1 extends JpaRepository<User, Long> {

    User findByUemail(String email);
}
