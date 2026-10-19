package br.com.brindespro.admin;
import br.com.brindespro.security.AdminUserRepository;import org.springframework.web.bind.annotation.*;import java.util.*;
@RestController @RequestMapping("/api/admin/users") public class AdminUserController {private final AdminUserRepository users;public AdminUserController(AdminUserRepository users){this.users=users;}public record UserDto(Long id,String name,String email,boolean active){}@GetMapping public List<UserDto> users(){return users.findAll().stream().map(u->new UserDto(u.id,u.name,u.email,u.active)).toList();}}
