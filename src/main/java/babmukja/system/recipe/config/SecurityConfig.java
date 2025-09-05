package babmukja.system.recipe.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import babmukja.system.recipe.utils.JwtUtil;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtUtil jwtUtil;

    public SecurityConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebSecurityCustomizer configure() {
        return (web -> web.ignoring()
          .requestMatchers(PathRequest.toStaticResources().atCommonLocations())); 
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors().and()
            .authorizeRequests()
                .antMatchers("/api/customer/**").permitAll()
                .antMatchers(
                    "/",
                    "/index.html",
                    "/static/**",
                    "/favicon.ico",
                    "/manifest.json",
                    "/img/**"
                ).permitAll()
                .anyRequest().authenticated()
            .and()
            .addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
            .formLogin().disable()
            .httpBasic().disable();
        return http.build();
    }
}
