package br.com.brindespro.pricing;
import org.springframework.data.jpa.repository.JpaRepository;import java.util.Optional;
public interface ProductionDeadlineRepository extends JpaRepository<ProductionDeadline,Long>{Optional<ProductionDeadline> findByNameAndActiveTrue(String name);}
