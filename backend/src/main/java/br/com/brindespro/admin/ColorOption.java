package br.com.brindespro.admin;import jakarta.persistence.*;
@Entity @Table(name="colors") public class ColorOption {@Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;@Column(nullable=false,unique=true) public String name;@Column(nullable=false) public String hex;protected ColorOption(){} public ColorOption(String name,String hex){this.name=name;this.hex=hex;}}
