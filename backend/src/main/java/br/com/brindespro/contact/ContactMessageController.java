package br.com.brindespro.contact;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.time.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
public class ContactMessageController {
  private final ContactMessageRepository messages;
  private final Map<String, Instant> recentSubmissions = new ConcurrentHashMap<>();
  public ContactMessageController(ContactMessageRepository messages){this.messages=messages;}
  public record CreateRequest(@NotBlank @Size(min=3,max=200) String name,@NotBlank @Email @Size(max=254) String email,@NotBlank @Pattern(regexp="^\\+?[0-9()\\s-]{10,20}$") String phone,@Size(max=200) String company,@NotBlank @Size(max=100) String subject,@NotBlank @Size(min=10,max=2000) String message){}
  public record MessageDto(UUID id,String name,String email,String phone,String company,String subject,String message,ContactMessage.Status status,String createdAt){}
  private static MessageDto dto(ContactMessage message){return new MessageDto(message.id,message.name,message.email,message.phone,message.company,message.subject,message.message,message.status,message.createdAt.toString());}
  @PostMapping("/api/contact-messages") @ResponseStatus(HttpStatus.CREATED) @Transactional
  public MessageDto create(@Valid @RequestBody CreateRequest request,HttpServletRequest servletRequest){
    String key=Optional.ofNullable(servletRequest.getRemoteAddr()).orElse("unknown"); Instant now=Instant.now(); Instant last=recentSubmissions.put(key,now);
    if(last!=null && last.plusSeconds(30).isAfter(now)) throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS,"Aguarde alguns segundos antes de enviar outra mensagem.");
    ContactMessage message=messages.save(new ContactMessage(request.name().trim(),request.email().trim().toLowerCase(Locale.ROOT),request.phone().trim(),request.company()==null?"":request.company().trim(),request.subject().trim(),request.message().trim()));
    return dto(message);
  }
  @GetMapping("/api/admin/contact-messages") public List<MessageDto> list(){return messages.findAll().stream().sorted(Comparator.comparing((ContactMessage m)->m.createdAt).reversed()).map(ContactMessageController::dto).toList();}
  public record StatusRequest(@NotNull ContactMessage.Status status){}
  @PatchMapping("/api/admin/contact-messages/{id}") @Transactional public MessageDto update(@PathVariable UUID id,@Valid @RequestBody StatusRequest request){ContactMessage message=messages.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Mensagem não encontrada."));message.status=request.status();message.updatedAt=OffsetDateTime.now();return dto(messages.save(message));}
}
