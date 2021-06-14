package c64.cms.web.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AuthenticationRequest {
    String username;
    String password;
}
