package br.com.brindespro;

import br.com.brindespro.admin.AdminService;
import br.com.brindespro.catalog.*;
import br.com.brindespro.pricing.PricingService;
import br.com.brindespro.quote.QuoteService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import java.math.BigDecimal;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest @ActiveProfiles("test") class AdminProductIntegrationTest {
  @Autowired AdminService admin;
  @Autowired QuoteService quotes;
  @Autowired CategoryRepository categories;
  @Autowired ProductRepository products;

  @Test void createsProductAndPreservesQuotedVariantOnEdit() {
    var category=categories.findAll().getFirst();
    var variant=new AdminService.VariantInput(null,"Preto","#111111","/images/bottle.png","Inox");
    var initial=new AdminService.ProductInput("Produto Integração","produto-integracao", "Descrição",
        category.id,"/images/bottle.png",true,10,new BigDecimal("20.00"),List.of(variant),List.of(),List.of("Laser"));
    var created=admin.saveProduct(null,initial,"integration-admin@example.com");
    assertEquals(new BigDecimal("20.00"),created.tiers().getFirst().unitPrice());
    Long variantId=created.variants().getFirst().id();

    var line=new PricingService.Request(created.id(),variantId,10,"Laser","Frente","Padrão",null,null,null,null);
    var quote=quotes.create(new QuoteService.CreateRequest("Cliente Integração","Empresa","11999999999",
        "cliente-integracao@example.com","",List.of(line)));
    var update=new AdminService.ProductInput("Produto Integração Atualizado","produto-integracao", "Nova descrição",
        category.id,"/images/bottle.png",true,10,null,
        List.of(new AdminService.VariantInput(variantId,"Preto","#111111","/images/bottle.png","Inox")),
        List.of(),List.of("Laser"));
    var updated=admin.saveProduct(created.id(),update,"integration-admin@example.com");
    assertEquals(variantId,updated.variants().getFirst().id());
    assertEquals(variantId,quotes.get(quote.number()).items().getFirst().variantId());
    assertEquals("Produto Integração Atualizado",products.findById(created.id()).orElseThrow().name);
  }
}
