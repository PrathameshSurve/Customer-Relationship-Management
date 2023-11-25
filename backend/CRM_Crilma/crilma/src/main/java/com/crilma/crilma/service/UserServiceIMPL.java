package com.crilma.crilma.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import com.crilma.crilma.repository.Repo1;
import com.crilma.crilma.model.User;

@Service
public class UserServiceIMPL implements UserServiceInterface {

    @Autowired
    private Repo1 obj1;

    @Override
    @Transactional
    public User addUser(User user) {
        try {
            obj1.save(user);
        } catch (Exception e) {
            // Handle other exceptions (e.g., log them)

            System.out.println("Error: " + e.getMessage());

        }
        return user;
    }

    @Override
    public User authenticate(String email, String password) {

        User user = obj1.findByUemail(email);

        if (user != null && user.getUpassword().equals(password)) {

            return user; // Authentication successful
        }

        return null; // Authentication failed (bad request)
    }

    @Override
    @Transactional
    public void deleteUser(String email, String password) {
        User user = authenticate(email, password);

        try {
            if (user != null) {
                obj1.delete(user); // Delete the user.
            } else {
                throw new IllegalArgumentException("Incorrect email or password");
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @Override
    @Transactional
    public void updateUser(User user) {
        try {
            obj1.save(user); // We can also use setter here.
        } catch (Exception e) {
            // Handle the exception (e.g., log it)
            System.out.println(e);
        }
    }

    @Override
    public User isUserExists(String uemail) {
        User user = obj1.findByUemail(uemail);
        if (user != null) {
            return user;
        }

        return null;
    }

    @Override
    public boolean isInitialSetupCompleted(String uemail) {
        User user = obj1.findByUemail(uemail);
        if (user != null) {
            return user.isInitialSetupCompleted();
        }
        return false;
    }

    @Override
    // @Transactional
    public void completeInitialSetup(String uemail, String selectedIndustry, String selectedSecurityQuestion,
            String securityAnswer) {
        User user = obj1.findByUemail(uemail);
        if (user != null) {
            user.setInitialSetupCompleted(true);
            user.setSelectedIndustry(selectedIndustry);
            user.setSelectedSecurityQuestion(selectedSecurityQuestion);
            user.setSecurityAnswer(securityAnswer);
            obj1.save(user);
        }

    }

    @Override
    public boolean isValidPassword(String password) {
        // Password complexity requirements
        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$";
        return password.matches(regex);
    }

    public List<User> findAll() {
        return this.obj1.findAll();
    }

}
