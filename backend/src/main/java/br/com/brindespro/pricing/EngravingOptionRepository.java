package br.com.brindespro.pricing;
import org.springframework.data.jpa.repository.JpaRepository;import java.util.Optional;
public interface EngravingOptionRepository extends JpaRepository<EngravingOption,Long>{Optional<EngravingOption> findByNameAndActiveTrue(String name);}
