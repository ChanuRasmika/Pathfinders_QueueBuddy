package com.example.backend.service;

import com.example.backend.entity.Users;
import com.example.backend.util.CustomUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final SecretKey secretKey;
    private final long jwtExpirationMillis;

    public JwtService(
            @Value("${security.jwt.secret-key}") String base64SecretKey,
            @Value("${security.jwt.expiration-time}") long jwtExpirationMillis
    ) {
        //Decode the Base64 secret key ONCE during bean creation
        this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(base64SecretKey));
        this.jwtExpirationMillis = jwtExpirationMillis;
    }

    //Extract Username
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }


    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(extractAllClaims(token));
    }


    public String generateToken(CustomUserDetails userDetails) {
        return buildToken(Map.of(), userDetails);
    }

    public String buildToken(Map<String, Object> extraClaims, CustomUserDetails userDetails) {
        Instant now = Instant.now();
        Instant expiry = now.plusMillis(jwtExpirationMillis);

        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .signWith(secretKey)
                .compact();
    }

    public long getExpirationTime() {
        return jwtExpirationMillis;
    }


    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }



    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }


    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

}
