package babmukja.system.recipe.config;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import babmukja.system.recipe.utils.JwtUtil;

public class JwtFilter extends OncePerRequestFilter {
    
    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if(header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            if(jwtUtil.validateToken(token)) {
                String user_id = jwtUtil.getUserId(token);
                UsernamePasswordAuthenticationToken auth = 
                        new UsernamePasswordAuthenticationToken(user_id, null, List.of());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        chain.doFilter(request, response);
    }
}
