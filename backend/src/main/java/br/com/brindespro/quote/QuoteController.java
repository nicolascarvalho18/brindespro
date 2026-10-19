package br.com.brindespro.quote;
import jakarta.validation.Valid;import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/quotes") public class QuoteController {private final QuoteService service;public QuoteController(QuoteService service){this.service=service;}@PostMapping public QuoteService.QuoteDto create(@Valid @RequestBody QuoteService.CreateRequest request){return service.create(request);}@GetMapping("/{number}") public QuoteService.QuoteDto get(@PathVariable String number){return service.get(number);}}
