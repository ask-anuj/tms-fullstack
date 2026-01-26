package com.tmsapplication.resolver;



import com.tmsapplication.dto.AuthPayload;
import com.tmsapplication.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class AuthResolver {

    private final AuthService authService;

    @MutationMapping
    public AuthPayload login(@Argument String username, @Argument String password) {
        return authService.login(username, password);
    }
}