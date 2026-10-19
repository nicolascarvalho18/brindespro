package br.com.brindespro.catalog;
import jakarta.persistence.*;
@Entity @Table(name="categories") public class Category { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @Column(nullable=false) public String name; @Column(nullable=false,unique=true) public String slug; @Column(name="image_url") public String imageUrl; protected Category(){} public Category(String name,String slug,String imageUrl){this.name=name;this.slug=slug;this.imageUrl=imageUrl;} }
