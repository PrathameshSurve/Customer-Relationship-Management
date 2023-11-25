package com.crilma.crilma.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "User", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private long id;

    @Column(name = "email", unique = true, nullable = false)
    @NotBlank
    @Email
    private String uemail;
    @Column(name = "Name") // This annotation is not compulsory. By default it will create a column.
    private String uname;
    @Column(name = "Password")
    private String upassword;
    @Transient
    private String email;
    @Transient
    private String password;

    @Column(name = "selectedIndustry")
    private String selectedIndustry;

    @Column(name = "selectedSecurityQuestion")
    private String selectedSecurityQuestion;

    @Column(name = "securityAnswer")
    private String securityAnswer;

    @Column(name = "initialSetupCompleted")
    private boolean initialSetupCompleted;

    public User() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getUemail() {
        return uemail;
    }

    public void setUemail(String uemail) {
        this.uemail = uemail;
    }

    public String getUpassword() {
        return upassword;
    }

    public void setUpassword(String upassword) {
        this.upassword = upassword;
    }

    public String getUsername() {
        return email;
    }

    public void setUsername(String username) {
        this.email = username;
    }

    public String getConfirmedpassword() {
        return password;
    }

    public void setConfirmedpassword(String confirmedpassword) {
        this.password = confirmedpassword;
    }

    public String getSelectedIndustry() {
        return selectedIndustry;
    }

    public void setSelectedIndustry(String selectedIndustry) {
        this.selectedIndustry = selectedIndustry;
    }

    public String getSelectedSecurityQuestion() {
        return selectedSecurityQuestion;
    }

    public void setSelectedSecurityQuestion(String selectedSecurityQuestion) {
        this.selectedSecurityQuestion = selectedSecurityQuestion;
    }

    public String getSecurityAnswer() {
        return securityAnswer;
    }

    public void setSecurityAnswer(String securityAnswer) {
        this.securityAnswer = securityAnswer;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", uname=" + uname + ", uemail=" + uemail + ", upassword="
                + upassword + "username=" + email + ", confirmedpassword=" + password + "]";
    }

    public void setInitialSetupCompleted(boolean completed) {
        this.initialSetupCompleted = completed;
    }

    public boolean isInitialSetupCompleted() {
        return initialSetupCompleted;
    }

}