package c64.cms.web.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AddPCRequest {
    private Long conferenceId;
    private Long userId;
    private Boolean isChair;
}
