package c64.cms.web.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AddListenerRequest {
    private Long conferenceId;
    private Long userId;
}
