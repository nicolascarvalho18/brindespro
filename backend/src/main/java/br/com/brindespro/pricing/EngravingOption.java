package br.com.brindespro.pricing;
import jakarta.persistence.*;import java.math.BigDecimal;
@Entity @Table(name="engraving_options") public class EngravingOption { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @Column(nullable=false,unique=true) public String name; @Column(nullable=false,precision=7,scale=4) public BigDecimal percent; public boolean active=true; protected EngravingOption(){} }
