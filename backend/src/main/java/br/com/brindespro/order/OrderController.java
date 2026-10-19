package br.com.brindespro.order;
import br.com.brindespro.quote.QuoteService;import org.springframework.security.core.Authentication;import org.springframework.web.bind.annotation.*;import java.util.*;
@RestController @RequestMapping("/api") public class OrderController {private final OrderService service;private final QuoteService quotes;public OrderController(OrderService service,QuoteService quotes){this.service=service;this.quotes=quotes;}
  @PostMapping("/orders") public QuoteService.QuoteDto create(@jakarta.validation.Valid @RequestBody QuoteService.CreateRequest input){return quotes.create(input);}
  @GetMapping("/orders/track") public OrderService.OrderDto track(@RequestParam String number,@RequestParam String email){return service.track(number,email);}
  @GetMapping("/admin/orders") public List<QuoteService.QuoteDto> list(@RequestParam(defaultValue="") String search,@RequestParam(defaultValue="") String status,@RequestParam(defaultValue="") String from,@RequestParam(defaultValue="") String to){return service.list(search,status,from,to);}
  @GetMapping("/admin/orders/{id}") public OrderService.OrderDto detail(@PathVariable Long id){return service.detail(id);}
  @PatchMapping("/admin/orders/{id}/status") public OrderService.OrderDto update(@PathVariable Long id,@RequestBody OrderService.UpdateRequest input,Authentication auth){return service.update(id,input,auth.getName());}
  @GetMapping("/admin/notifications") public List<Map<String,Object>> notifications(){return service.notifications();}
}
