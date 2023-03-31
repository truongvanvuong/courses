package com.example.Repostiory;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class PasswordEncoder {
	private static final String SECRET_KEY = "mysecretkey";

    public static String generateToken(byte[] digest2) {
        String token = null;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            String data = digest2 + SECRET_KEY;
            md.update(data.getBytes(StandardCharsets.UTF_8));
            byte[] digest = md.digest();
            token = Base64.getEncoder().encodeToString(digest);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return token;
    }
}
