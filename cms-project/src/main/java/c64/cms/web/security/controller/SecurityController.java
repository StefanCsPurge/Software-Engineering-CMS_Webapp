package c64.cms.web.security.controller;

import c64.cms.core.model.User;
import c64.cms.core.service.UserService;
import c64.cms.web.request.AuthenticationRequest;
import c64.cms.web.request.RegisterRequest;
import c64.cms.web.response.MessageResponse;
import c64.cms.web.security.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class SecurityController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
        try{
            authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e){
            throw new Exception("Incorrect username and password" + e.getMessage());
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        System.out.println(userDetails);
        String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new MessageResponse(jwt));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public MessageResponse register(@RequestBody RegisterRequest registerRequest) {
        try {
            userService.addUser(User.builder()
                    .username(registerRequest.getUsername())
                    .password(registerRequest.getPassword())
                    .email(registerRequest.getEmail())
                    .firstName(registerRequest.getFirstname())
                    .lastName(registerRequest.getLastname())
                    .affiliation(registerRequest.getAffiliation())
                    .website(registerRequest.getWebsite())
                    .build()
            );
        } catch (Exception e) {
            e.printStackTrace();
            return new MessageResponse("fail");
        }
        return new MessageResponse("success");
    }

}
