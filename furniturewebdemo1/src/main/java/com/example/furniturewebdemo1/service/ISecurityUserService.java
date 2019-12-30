package com.example.furniturewebdemo1.service;

public interface ISecurityUserService {
    String validatePasswordResetToken(long id, String token);
}
