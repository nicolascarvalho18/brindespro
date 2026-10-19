package br.com.brindespro.admin;import jakarta.persistence.*;
@Entity @Table(name="materials") public class MaterialOption {@Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;@Column(nullable=false,unique=true) public String name;protected MaterialOption(){} public MaterialOption(String name){this.name=name;}}
