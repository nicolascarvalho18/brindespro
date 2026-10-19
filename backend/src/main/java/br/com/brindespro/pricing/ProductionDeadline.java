package br.com.brindespro.pricing;
import jakarta.persistence.*;import java.math.BigDecimal;
@Entity @Table(name="production_deadlines") public class ProductionDeadline { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @Column(nullable=false,unique=true) public String name; public int days; @Column(nullable=false,precision=7,scale=4) public BigDecimal percent; public boolean active=true; protected ProductionDeadline(){} }
