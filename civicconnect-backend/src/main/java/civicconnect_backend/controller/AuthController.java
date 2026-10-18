package civicconnect_backend.controller;

import civicconnect_backend.dto.LoginRequest;
import civicconnect_backend.dto.LoginResponse;
import civicconnect_backend.entity.User;
import civicconnect_backend.repository.UserRepository;
import civicconnect_backend.security.JwtService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public LoginResponse register(
            @Valid @RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already registered"
            );
        }

        user.setRole("USER");

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        User savedUser = userRepository.save(user);

        return new LoginResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                null
        );
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED,
                                "Invalid email or password"
                        )
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password"
            );
        }

        String token = jwtService.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole()
        );

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                token
        );
    }
}