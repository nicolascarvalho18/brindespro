package br.com.brindespro.contact;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name="contact_messages")
public class ContactMessage {
  @Id @GeneratedValue(strategy=GenerationType.UUID) public UUID id;
  @Column(nullable=false,length=200) public String name;
  @Column(nullable=false,length=254) public String email;
  @Column(nullable=false,length=20) public String phone;
  @Column(length=200) public String company;
  @Column(nullable=false,length=100) public String subject;
  @Column(nullable=false,length=2000) public String message;
  @Enumerated(EnumType.STRING) @Column(nullable=false,length=30) public Status status=Status.NEW;
  @Column(name="created_at",nullable=false) public OffsetDateTime createdAt=OffsetDateTime.now();
  @Column(name="updated_at",nullable=false) public OffsetDateTime updatedAt=OffsetDateTime.now();
  protected ContactMessage() {}
  public ContactMessage(String name,String email,String phone,String company,String subject,String message){this.name=name;this.email=email;this.phone=phone;this.company=company;this.subject=subject;this.message=message;}
  public enum Status { NEW, IN_PROGRESS, RESOLVED }
}
