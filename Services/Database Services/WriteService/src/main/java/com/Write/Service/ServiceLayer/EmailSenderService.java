package com.Write.Service.ServiceLayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public String sendEmail(String mailFrom, String subject, String body, String number, String name){
        try{
            String newBody = "";
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(mailFrom);
            simpleMailMessage.setTo(fromEmail);
            simpleMailMessage.setSubject(subject);
            if(number==null||number.equals("")) {
                newBody = body;
            }
            else{
                newBody = body+"\n Contact Number: \n "+number;
            }
            simpleMailMessage.setText(newBody);

            mailSender.send(simpleMailMessage);

            return "OK";
        }
        catch (Exception e){
            System.out.println("e = " + e);
            e.printStackTrace();
            return "Error";
        }
    }
    public String sendEmail(String subject, String body){
        try{
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(fromEmail);
            simpleMailMessage.setSubject(subject);
            simpleMailMessage.setText(body);
            mailSender.send(simpleMailMessage);
            return "OK";
        }
        catch (Exception e){
            return "Error";
        }
    }
}
