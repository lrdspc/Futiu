#!/usr/bin/env python3
import os
import requests
import json

# Credenciais do Supabase
SUPABASE_URL = "https://ddzhsazowiyaahqzntby.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkemhzYXpvd2l5YWFocXpudGJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMDMyNDMsImV4cCI6MjA3NjY3OTI0M30.DfRarLnbI1aPBmlEYXnZG6iS1F2aGzBvp6j4mFH_m0M"

# Dados do Personal Trainer
email = "lrdspc@gmail.com"
password = "ppkdlcia"
full_name = "Lucas Rodrigues da Silva"
user_type = "personal"

# Criar usuário via API do Supabase
url = f"{SUPABASE_URL}/auth/v1/signup"
headers = {
    "apikey": SUPABASE_ANON_KEY,
    "Content-Type": "application/json"
}

data = {
    "email": email,
    "password": password,
    "data": {
        "full_name": full_name,
        "user_type": user_type
    }
}

print(f"Criando usuário Personal Trainer: {full_name} ({email})")
response = requests.post(url, headers=headers, json=data)

if response.status_code in [200, 201]:
    result = response.json()
    print(f"✅ Usuário criado com sucesso!")
    print(f"ID: {result.get('user', {}).get('id')}")
    print(f"Email: {result.get('user', {}).get('email')}")
    print(json.dumps(result, indent=2))
else:
    print(f"❌ Erro ao criar usuário: {response.status_code}")
    print(response.text)

