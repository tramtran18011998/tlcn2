package com.example.furniturewebdemo1.security.oauth2;

import com.example.furniturewebdemo1.controller.ProductController;
import com.example.furniturewebdemo1.exception.AppException;
import com.example.furniturewebdemo1.exception.OAuth2AuthenticationProcessingException;
import com.example.furniturewebdemo1.exception.ResourceNotFoundException;
import com.example.furniturewebdemo1.model.*;
import com.example.furniturewebdemo1.repository.RoleRepository;
import com.example.furniturewebdemo1.repository.UserRepository;
import com.example.furniturewebdemo1.security.UserPrincipal;
import com.example.furniturewebdemo1.security.oauth2.user.OAuth2UserInfo;
import com.example.furniturewebdemo1.security.oauth2.user.OAuth2UserInfoFactory;
import com.example.furniturewebdemo1.service.CustomerService;
import com.example.furniturewebdemo1.service.CustomerTypeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.xml.crypto.Data;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerTypeService customerTypeService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) throws ResourceNotFoundException {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        Customer customer = new Customer();
        CustomerType customerType= customerTypeService.findCustomerTypeById(1).orElseThrow(()-> new ResourceNotFoundException("Employee not found"));
        if(userOptional.isPresent()) {
            user = userOptional.get();
            if(!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
            //logger.error(user.getEmail());
            customer.setUser(user);

            customer.setCustomerType(customerType);
            if(customerType.getName()=="Normal"){
                customer.setDiscount(0);
            }
            if(customerType.getName()=="Silver"){
                customer.setDiscount(5);
            }
            if(customerType.getName()=="Gold"){
                customer.setDiscount(10);
            }
            if(customerType.getName()=="Platinum"){
                customer.setDiscount(15);
            }
            customerService.save(customer);

        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();


        long status=1;
        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2UserInfo.getId());
        user.setName(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setImageUrl(oAuth2UserInfo.getImageUrl());
        user.setInstatus(status);

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setCreatedDate(new Date());
        user.setLastModifiedDate(new Date());
        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

//        Customer customer = new Customer();
//        CustomerType customerType= null;
//        try {
//            customerType = customerTypeService.findCustomerTypeById(1).orElseThrow(()-> new ResourceNotFoundException("Employee not found"));
//        } catch (ResourceNotFoundException e) {
//            e.printStackTrace();
//        }
//        customer.setCustomerType(customerType);
//
//        customer.setUser(user);
//        customer.setCustomerType(customerType);
//        customerService.save(customer);
        //user.setCreatedDate();
        return result;
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
        existingUser.setLastModifiedDate(new Date());
        return userRepository.save(existingUser);
    }

}
