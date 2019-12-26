package com.example.furniturewebdemo1.controller;

import com.example.furniturewebdemo1.exception.ResourceNotFoundException;
import com.example.furniturewebdemo1.model.Receipt;

import com.example.furniturewebdemo1.service.ReceiptService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ReceiptController {
    @Autowired
    private ReceiptService receiptService;

    @GetMapping("/receipt")
    public List<Receipt> getAllReceipt(){
        return receiptService.findAllReceipt();
    }

    @GetMapping("/receipt/{id}")
    public ResponseEntity<Receipt> getReceiptById(@PathVariable(value = "id") long id) throws ResourceNotFoundException {
        Receipt receipt=receiptService.findReceiptById(id).orElseThrow(()-> new ResourceNotFoundException("Receipt not found"));
        return ResponseEntity.ok().body(receipt);
    }

//    @PostMapping("/receipt")
//    public ResponseEntity<Receipt> createReceipt(@Valid @RequestBody Receipt receipt){
//        receiptService.save(receipt);
//        return new ResponseEntity<>(receipt, HttpStatus.CREATED);
//    }

    @PutMapping("/receipt/{id}")
    public ResponseEntity<Receipt> updateReceipt(@PathVariable(value = "id") long id, @Valid @RequestBody Receipt receipt) throws ResourceNotFoundException {
        Receipt currentReceipt= receiptService.findReceiptById(id).orElseThrow(()-> new ResourceNotFoundException("Receipt not found"));

        if(receipt.getAmount()!=0){
            currentReceipt.setAmount(receipt.getAmount());
        }
        if(receipt.getDiscount()!=0){
            currentReceipt.setDiscount(receipt.getDiscount());
        }
        currentReceipt.setStateDelivering(receipt.isStateDelivering());
        currentReceipt.setStateDelivered(receipt.isStateDelivered());
        currentReceipt.setStatePaid(receipt.isStatePaid());

        if(receipt.getTotal()!= 0){
            currentReceipt.setTotal(receipt.getTotal());
        }
        if(receipt.getEmployee()!=null){
            currentReceipt.setEmployee(receipt.getEmployee());
        }
        if(receipt.getInvoiceProduct()!=null){
            currentReceipt.setInvoiceProduct(receipt.getInvoiceProduct());
        }

        receiptService.save(currentReceipt);
        return ResponseEntity.ok(currentReceipt);
    }

    @DeleteMapping("/receipt/{id}")
    public ResponseEntity<Receipt> deleteReceipt(@PathVariable(value = "id") long id) throws ResourceNotFoundException {
        Receipt receipt=receiptService.findReceiptById(id).orElseThrow(()-> new ResourceNotFoundException("Receipt not found"));
        receiptService.delete(receipt);
        return ResponseEntity.ok(receipt);
    }
}
