package br.com.brindespro.portfolio;
import org.springframework.data.jpa.repository.JpaRepository;import java.util.*;
public interface PortfolioTestimonialRepository extends JpaRepository<PortfolioTestimonial,Long>{List<PortfolioTestimonial> findByActiveTrue();}
