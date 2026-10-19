package br.com.brindespro.pricing;
import org.springframework.data.jpa.repository.JpaRepository;import java.util.Optional;
public interface PrintingPositionRepository extends JpaRepository<PrintingPosition,Long>{Optional<PrintingPosition> findByNameAndActiveTrue(String name);}
