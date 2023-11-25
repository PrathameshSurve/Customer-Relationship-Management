package com.crilma.crilma.service;

import com.crilma.crilma.model.User;

public interface UserServiceInterface {

    public User addUser(User user);

    public User authenticate(String email, String password);

    public void deleteUser(String email, String password);

    public void updateUser(User user);

    public User isUserExists(String uemail);

    public boolean isInitialSetupCompleted(String uemail);

    public void completeInitialSetup(String uemail, String selectedIndustry, String selectedSecurityQuestion,
            String securityAnswer);

    public boolean isValidPassword(String password);

}
