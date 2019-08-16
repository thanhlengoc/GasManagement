package com.vn.gasmanagement.config;

import com.vn.gasmanagement.auth.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  public CustomUserDetailService customUserDetailService;

  @Bean
  public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(customUserDetailService).passwordEncoder(passwordEncoder());
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.cors();

    http
        .authorizeRequests()
        .antMatchers("/login",
            "/css/**",
            "/img/**",
            "/vendors/**",
            "/js/**").permitAll()
        .antMatchers("/", "/user/**").hasAnyRole("MANAGER", "WORKER")
        .anyRequest()
        .authenticated()
        .and().csrf().disable()
        .formLogin()
        .loginPage("/login")
        .usernameParameter("username")
        .passwordParameter("password")
        .defaultSuccessUrl("/index",true)
        .failureUrl("/login?error=true")
        .and()
        .logout()
        .logoutRequestMatcher(new AntPathRequestMatcher( "/logout"))
        .logoutSuccessUrl("/login")
        .invalidateHttpSession(false)
        .deleteCookies("JSESSIONID")
        .and()
        .exceptionHandling()
          .accessDeniedPage("/403")
        .and()
        .headers().frameOptions().sameOrigin();
  }

  @Override
  public void configure(WebSecurity web) throws Exception {
    web
        .ignoring()
        .antMatchers("/static/**", "/css/**", "/js/**", "/images/**", "/vendors/**");
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.addAllowedOrigin("http://localhost:8080");
    corsConfiguration.addAllowedHeader("*");
    corsConfiguration.addAllowedMethod("*");
    corsConfiguration.setAllowCredentials(true);
    source.registerCorsConfiguration("/**", corsConfiguration);

    return source;
  }


}
