package br.com.brindespro.quote;
import org.springframework.data.jpa.repository.JpaRepository;
public interface QuoteItemRepository extends JpaRepository<QuoteItem,Long> {
  boolean existsByVariantId(Long variantId);
}
