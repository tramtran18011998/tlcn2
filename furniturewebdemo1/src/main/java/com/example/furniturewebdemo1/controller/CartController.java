package com.example.furniturewebdemo1.controller;

import com.example.furniturewebdemo1.exception.ResourceNotFoundException;
import com.example.furniturewebdemo1.model.*;
import com.example.furniturewebdemo1.repository.CartRepository;
import com.example.furniturewebdemo1.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private ProductService productService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ReceiptService receiptService;

    @Autowired
    private InvoiceProduct_ProductService invoiceProduct_productService;

    @Autowired
    private InvoiceProductService invoiceProductService;

    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    @GetMapping("/cart")
    public List<Cart> getAllCart(){
        return cartService.findAllCart();
    }



    @GetMapping("/cart/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable(value = "id") long id) throws ResourceNotFoundException {
        Cart cart=cartService.findCartById(id).orElseThrow(()-> new ResourceNotFoundException("Category not found"));
        return ResponseEntity.ok().body(cart);
    }

    @GetMapping("/cartcheck/{product_id}/{customer_id}")
    public Cart checkCartExistProCus(@PathVariable(value = "product_id") long product_id,@PathVariable(value = "customer_id") long customer_id) throws ResourceNotFoundException {
        //Cart cart=cartService.findCartById(id).orElseThrow(()-> new ResourceNotFoundException("Category not found"));
        Cart cart1 = cartRepository.checkCartExistProCus(product_id,customer_id);
        return cart1;
    }

    @GetMapping("/check")
    public Cart checkC() throws ResourceNotFoundException {
        //Cart cart=cartService.findCartById(id).orElseThrow(()-> new ResourceNotFoundException("Category not found"));
        Cart cart1 = checkCartExistProCus(16,5);
        return cart1;
    }

    @GetMapping("/cartcount/{id}")
    public long countQuantity(@PathVariable(value = "id") long id){
        return cartRepository.countQuantity(id);
    }

    @GetMapping("/cartlist/{id}")
    public List<Cart> getListCartByCustomer(@PathVariable(value = "id") long id){
        return cartRepository.getListCartByCustomer(id);
    }



//    @PostMapping("/cart")
//    public  Cart createCartCheck(@Valid @RequestBody Cart cart) throws ResourceNotFoundException {
//        //Product product = cart.getProduct();
//        Product product = cart.getProduct();
//        logger.info(String.valueOf(product.getId()));
//        Customer customer = cart.getCustomer();
//        logger.info(String.valueOf(customer.getId()));
//
//        Cart cart1 = checkCartExistProCus(product.getId(), customer.getId());
//        logger.info(String.valueOf(cart1));
//
//        //exist
//        if(cart1 != null){
//            cart1.setQuantity(cart1.getQuantity()+1);
//            logger.info(String.valueOf(cart1.getQuantity()));
//            cart1.setTotalprice(cart1.getPrice()*cart1.getQuantity());
//            logger.info(String.valueOf(cart1.getTotalprice()));
//            updateCart(cart1.getId(), cart1);
//            logger.info("null");
//            long count =cartRepository.countQuantity(customer.getId());
//            logger.info(String.valueOf(count));
//            return cart1;
//        }
//        else {
//            //create new cart
//            logger.info("save");
//            cartService.save(cart);
//            return cart;
//        }
//
//    }

    @PostMapping("/cart/{idpro}/{idcus}")
    public  Cart createCartCheck(@PathVariable(value = "idpro") long idpro,@PathVariable(value = "idcus") long idcus,@Valid @RequestBody Cart cart) throws ResourceNotFoundException {
        //Product product = cart.getProduct();
        Product product = productService.findProductById(idpro).orElseThrow(()-> new ResourceNotFoundException("Product not found"));
        logger.info(String.valueOf(product.getId()));
        Customer customer = customerService.findCustomerId(idcus).orElseThrow(()-> new ResourceNotFoundException("Product not found"));
        logger.info(String.valueOf(customer.getId()));

        Cart cart1 = checkCartExistProCus(product.getId(), customer.getId());
        logger.info(String.valueOf(cart1));

        cart.setCustomer(customer);
        cart.setProduct(product);
        //exist
        if(cart1 != null){
            cart1.setQuantity(cart1.getQuantity()+cart.getQuantity());
            logger.info(String.valueOf(cart1.getQuantity()));
            cart1.setTotalprice(cart1.getPrice()*cart1.getQuantity());
            logger.info(String.valueOf(cart1.getTotalprice()));
            updateCart(cart1.getId(), cart1);
            logger.info("null");
            long count =cartRepository.countQuantity(customer.getId());
            logger.info(String.valueOf(count));
            return cart1;
        }
        else {
            //create new cart
            logger.info("save");
            cartService.save(cart);
            return cart;
        }

    }

//    @PostMapping("/cart")
//    public  ResponseEntity<Cart> createCart(@Valid @RequestBody Cart cart){
//        cartService.save(cart);
//        return new ResponseEntity<>(cart, HttpStatus.CREATED);
//    }

    @PutMapping("/cart/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable(value = "id") long id, @Valid @RequestBody Cart cart) throws ResourceNotFoundException {
        Cart currentCart= cartService.findCartById(id).orElseThrow(()-> new ResourceNotFoundException("Category not found"));

        if(cart.getProduct()!= null){
            currentCart.setProduct(cart.getProduct());
        }
        if(cart.getCustomer()!= null){
            currentCart.setCustomer(cart.getCustomer());
        }
        if (cart.getPrice()!=0){
            currentCart.setPrice(cart.getPrice());
        }
        if(cart.getProductname()!=null){
            currentCart.setProductname(cart.getProductname());
        }
        if(cart.getQuantity()!=0){
            currentCart.setQuantity(cart.getQuantity());
        }
        if(cart.getTotalprice()!=0){
            currentCart.setTotalprice(cart.getTotalprice());
        }
        if(cart.getStatus()!=0){
            currentCart.setStatus(cart.getStatus());
        }

        cartService.save(currentCart);
        return ResponseEntity.ok(currentCart);

    }

    @PostMapping("/invoiceproduct/{idcus}/{idemp}")
    public InvoiceProduct createInvoiceProduct(@PathVariable(value = "idcus") long idcus,@PathVariable(value = "idemp") long idemp) throws ResourceNotFoundException {

        InvoiceProduct invoiceProduct = new InvoiceProduct();
        Customer customer = customerService.findCustomerId(idcus).orElseThrow(()-> new ResourceNotFoundException("Cus not found"));
        Employee employee = employeeService.findEmployeeId(idemp).orElseThrow(()-> new ResourceNotFoundException("Emp not found"));

        invoiceProduct.setCustomer(customer);
        invoiceProduct.setEmployee(employee);

        List<Cart> carts = cartRepository.getListCartByCustomer(idcus);

        double total =0;
        for (int i=0; i< carts.size(); i++){
            total += carts.get(i).getTotalprice();
        }
        logger.info(String.valueOf(total));
        invoiceProduct.setTotal(total);
        invoiceProduct.setCreatedDate(new Date());

        invoiceProductService.save(invoiceProduct);
        logger.info(String.valueOf(invoiceProduct.getId()));

        for (int i=0; i< carts.size(); i++){
            Product product = carts.get(i).getProduct();

            product.setQuantity(product.getQuantity() - carts.get(i).getQuantity());

            Invoiceproduct_Product invoiceproduct_product = new Invoiceproduct_Product();
            invoiceproduct_product.setInvoiceProduct(invoiceProduct);
            invoiceproduct_product.setProduct(product);
            invoiceproduct_product.setPrice(carts.get(i).getPrice());

            invoiceproduct_product.setTotalprice(carts.get(i).getTotalprice());
            invoiceproduct_product.setQuantity(carts.get(i).getQuantity());
            invoiceProduct_productService.save(invoiceproduct_product);
            productService.save(product);

        }
        for (int i=0; i< carts.size(); i++){
            carts.get(i).setStatus(1);
            cartRepository.save(carts.get(i));
        }




        //add to receipt;
        Receipt receipt = new Receipt();
        receipt.setInvoiceProduct(invoiceProduct);
        receipt.setEmployee(invoiceProduct.getEmployee());
        receipt.setTotal(invoiceProduct.getTotal());
        //receipt.setStateDelivering(true);
        receipt.setDiscount(customer.getDiscount());
        double money = invoiceProduct.getTotal() -  (invoiceProduct.getTotal()*customer.getDiscount())/100;
        receipt.setAmount(money);
        receipt.setCreatedDate(new Date());
        receiptService.save(receipt);


        return invoiceProduct;
    }
    @PostMapping("/invoiceproduct/{idcus}")
    public ResponseEntity<?> createInvoiceProduct(@PathVariable(value = "idcus") long idcus,@Valid @RequestBody InvoiceProduct invoiceProduct){

        InvoiceProduct invoiceProduct1 = new InvoiceProduct();
        //invoiceProduct1 = invoiceProduct.s
        List<Cart> carts = cartRepository.getListCartByCustomer(idcus);


        invoiceProductService.save(invoiceProduct);
        return new ResponseEntity<>(invoiceProduct, HttpStatus.CREATED);
    }



    @DeleteMapping("/cart/{id}")
    public ResponseEntity<Cart> deleteCart(@PathVariable(value = "id") long id) throws ResourceNotFoundException {
        Cart cart=cartService.findCartById(id).orElseThrow(()-> new ResourceNotFoundException("Category not found"));
        cartService.delete(cart);
        return ResponseEntity.ok(cart);
    }
}
