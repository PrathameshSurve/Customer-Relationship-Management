package com.crilma.crilma.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.crilma.crilma.model.Customer;
import com.crilma.crilma.model.User;
import com.crilma.crilma.repository.Repo1;
import com.crilma.crilma.repository.customerRepo;
import com.crilma.crilma.service.UserServiceIMPL;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:4200")
@RestController

// @Controller
// // This is only for URL customization. We only use "RequsetMapping" here.
@RequestMapping("/Crilma")
public class UserController {

    @Autowired
    UserServiceIMPL service;

    @Autowired
    Repo1 repository;

    @Autowired
    customerRepo customerRepository;

    // APIs for Angular Frontend

    @GetMapping("/users")
    public List<User> getUsers() {
        return this.service.findAll();
    }

    @PostMapping("/adduser")
    public User getAdduser(@RequestBody User user) {
        return repository.save(user);
    }

    @PutMapping("/updateuser/{email}")
    public User updateUser(@PathVariable String email, @RequestBody User updatedUser) {
        User existingUser = repository.findByUemail(email);

        if (existingUser != null) {

            existingUser.setSelectedIndustry(updatedUser.getSelectedIndustry());
            existingUser.setSelectedSecurityQuestion(updatedUser.getSelectedSecurityQuestion());
            existingUser.setSecurityAnswer(updatedUser.getSecurityAnswer());
            existingUser.setInitialSetupCompleted(true);

            return repository.save(existingUser);
        } else {
            System.out.println("User not found");
            return null;
        }
    }

    @DeleteMapping("/deleteuseraccount/{email}/{password}")
    public ResponseEntity<String> deleteUser(@PathVariable String email, @PathVariable String password) {
        User existingUser = repository.findByUemail(email);

        if (existingUser != null && existingUser.getUpassword().equals(password)) {
            repository.delete(existingUser);
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    // Customers Entity
    @GetMapping("/customers")
    public List<Customer> getCustomers() {
        return this.customerRepository.findAll();
    }

    // APIs for Springboot templates only

    @GetMapping("/home")
    public String getHome() {
        return "home";
    }

    @GetMapping("/signup")
    public String getSignup() {
        return "signup";
    }

    @PostMapping("/signupsuccessful")
    public String getSignUpSuccessful(@ModelAttribute User a, RedirectAttributes redirectAttributes) {

        User existingUser = service.isUserExists(a.getUemail());
        if (existingUser == null) {

            service.addUser(a);
            System.out.println(a);
            System.out.println("User added successfully!");
            return "signupsuccessful";
        } else {
            System.out.println("User is already exists.");
            redirectAttributes.addFlashAttribute("userAlreadyExistsError", "User is already exists.");
        }
        return "redirect:/Crilma/signup";
    }

    @GetMapping("/login")
    public String getLogin() {
        return "login";
    }

    @GetMapping("/initialsetup")
    public String getIntialseString(HttpSession session,
            Model model) {
        System.out.println("User need to complete initial setup");
        return "redirect:/Crilma/dashboard";
    }

    @PostMapping("/checkinitialsetup")
    public String getInitialsetup(@RequestParam String email, @RequestParam String password,
            RedirectAttributes redirectAttributes, Model model, HttpSession session) {

        User existingUser = service.isUserExists(email);

        if (existingUser == null) {
            redirectAttributes.addFlashAttribute("userNotExistsError", "User does not exists!");
            System.out.println("User does not exists! (Can't login.)");
            return "redirect:/Crilma/login";
        } else {
            User user = service.authenticate(email, password);

            if (user != null) {
                // Authentication successful
                if (service.isInitialSetupCompleted(email)) {
                    // Initial setup is completed; redirect to the dashboard
                    System.out.println("User redirected to dashboard!");
                    session.setAttribute("userEmail", email);
                    return "redirect:/Crilma/redirect-to-dashboard";
                } else {

                    // Initial setup is not completed; proceed to initial setup
                    System.out.println("User Logged in successfully!");
                    model.addAttribute("userName", user.getUname());
                    session.setAttribute("userEmail", email);
                    return "initialsetup"; // Redirect to the initial setup page
                }
            } else {
                // Authentication failed
                redirectAttributes.addFlashAttribute("passwordError", "Incorrect password. Please try again");
                System.out.println("User Entered Wrong Password!");
                return "redirect:/Crilma/login";
            }

        }
    }

    @GetMapping("/redirect-to-dashboard")
    public String redirectToDashboard(HttpSession session, String email, String password) {

        session.getAttribute(email);
        return "dashboard"; // Assuming "dashboard.html" is the view name
    }

    @GetMapping("/dashboard")
    public String getDashboard(HttpSession session, Model model, User user) {
        String userEmail = (String) session.getAttribute("userEmail");

        if (userEmail != null) {
            boolean initialSetupCompleted = service.isInitialSetupCompleted(userEmail);
            if (initialSetupCompleted) {
                // Initial setup is completed; proceed to the dashboard
                return "dashboard";
            }
        }

        // Update the user's information and mark initial setup as completed
        service.completeInitialSetup(userEmail, user.getSelectedIndustry(), user.getSelectedSecurityQuestion(),
                user.getSecurityAnswer());
        session.setAttribute("userEmail", userEmail);
        return "redirect:/Crilma/initialsetup";

    }

    @PostMapping("/deleteuser")
    public String deleteUser(@RequestParam String email, @RequestParam String password,
            RedirectAttributes redirectAttributes) {
        User user = service.authenticate(email, password);

        if (user != null) {
            // Authentication successful
            service.deleteUser(email, password); // Delete the user by ID.
            System.out.println("Account deleted successful.");

            return "redirect:/Crilma/login"; // Redirect to the login screen after successful deletion.
        } else {
            // Authentication failed
            redirectAttributes.addFlashAttribute("deleteError", "Incorrect email or password");
        }
        return "redirect:/Crilma/dashboard";
    }

    @GetMapping("/update_password")
    public String getResetPassword() {
        return "update_password";
    }

    @PostMapping("/updatepassword")
    public String updatePassword(@RequestParam String email, @RequestParam String oldPassword,
            @RequestParam String newPassword, RedirectAttributes redirectAttributes) {
        User user = service.authenticate(email, oldPassword);

        if (user != null) {
            // Authentication successful, update the password
            user.setUpassword(newPassword);
            service.updateUser(user); // Call your service method to update the user's password.

            // Add a success message as a query parameter
            redirectAttributes.addFlashAttribute("updatepasswordMessage", "Password updated successfully.");
        } else {
            // Add an error message as a query parameter
            redirectAttributes.addFlashAttribute("updatepasswordMessage",
                    "Failed to update password. Invalid email or old password.");
        }

        return "redirect:/Crilma/dashboard";
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam("forgotEmail") String email,
            RedirectAttributes redirectAttributes,
            Model model, HttpSession session) {

        User existingUser = service.isUserExists(email);

        if (existingUser == null) {
            redirectAttributes.addFlashAttribute("userDoesNotExistsError", "User does not exists!");
            System.out.println("User does not exists!");
            return "redirect:/Crilma/login";
        }
        model.addAttribute("securityQuestion", existingUser.getSelectedSecurityQuestion());
        session.setAttribute("email", email);
        return "forgot_password_confirmation";
    }

    @PostMapping("/checkSecurityAnswer")
    public String checkSecurityAnswer(HttpSession session, String securityAnswer, Model model) {
        String email = (String) session.getAttribute("email");

        User ExistingUser = service.isUserExists(email);

        if (ExistingUser != null) {
            String storedSecurityAnswer = ExistingUser.getSecurityAnswer();
            System.out.println("Answer should be: " + storedSecurityAnswer);

            if (storedSecurityAnswer != null && storedSecurityAnswer.equals(securityAnswer)) {
                // Security answer is correct
                System.out.println("answer matched!");
                model.addAttribute("securityAnswerError", false);
                model.addAttribute("securityAnswerMatched", "Correct security answer. Please reset your password.");

            } else {
                // Security answer is incorrect, add an error message to the model
                model.addAttribute("securityAnswerError", "Incorrect security answer. Please try again.");
            }

        }

        return "forgot_password_confirmation";

    }

    @PostMapping("/resetpassword")
    public String resetPassword(HttpSession session, @RequestParam String newPassword,
            @RequestParam String confirmPassword, RedirectAttributes redirectAttributes, Model model) {
        String email = (String) session.getAttribute("email");
        model.addAttribute("securityAnswerError", false);

        if (newPassword.equals(confirmPassword)) {
            // Passwords match; now, check the password complexity requirements
            if (service.isValidPassword(newPassword)) {
                User user = service.isUserExists(email);
                if (user != null) {
                    user.setUpassword(newPassword);
                    service.updateUser(user);

                    redirectAttributes.addFlashAttribute("PasswordResetSuccessfulMessage",
                            "Password reset successful.");
                    System.out.println("Password Reset Successful");
                    return "redirect:/Crilma/login";
                }
            } else {
                model.addAttribute("ResetPasswordFormatErrMessage",
                        "Paswword should be 8-16 characters long, and must contain at least one lowercase, one uppercase, one number and one spacial symbol.");
                System.out.println("Invalid Password Format while Reset");
            }
        }
        // Passwords don't match
        model.addAttribute("ResetPasswordNotMatchMessage", "Please enter matching passwords.");
        System.out.println("Password Doesn't match.");

        return "forgot_password_confirmation";
    }

}
