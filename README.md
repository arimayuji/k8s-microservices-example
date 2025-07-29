# 🧱 Arquitetura de Microserviços com Kubernetes

Repositório monolítico que demonstra como aplicar conceitos de Kubernetes para orquestrar uma arquitetura de **microserviços** usando duas APIs Node.js separadas: `auth-service` e `user-service`. Os serviços são empacotados com Docker, expostos via `Service` e roteados com `Ingress`.

> Este projeto é educativo. Nenhum provedor cloud é utilizado — tudo roda localmente com `minikube` ou `kind`.

---

## 📂 Estrutura

```
.
├── README.md
├── ingress/
│   └── ingress.yaml
├── deployments/
│   ├── auth-deployment.yaml
│   └── user-deployment.yaml
├── services/
│   ├── auth-service.yaml
│   └── user-service.yaml
├── namespace.yaml
└── hpa/
    ├── auth-hpa.yaml
    └── user-hpa.yaml
```

---

## 🧩 Microserviços

| Serviço        | Porta | Descrição                         | Imagem Docker Hub                        |
|----------------|-------|-----------------------------------|------------------------------------------|
| `auth-service` | 3001  | Serviço de autenticação           | `docker.io/seuusuario/auth-service`      |
| `user-service` | 3002  | CRUD de usuários                  | `docker.io/seuusuario/user-service`      |

---

## 🌐 Roteamento via Ingress

As requisições externas são roteadas pelo recurso `Ingress`, com base no caminho da URL:

| Caminho         | Destino interno          |
|-----------------|--------------------------|
| `/auth`         | auth-service:3001        |
| `/users`        | user-service:3002        |

---

## 🚀 Como rodar localmente

```bash
# Suba o cluster local
minikube start

# (Opcional) Crie um namespace
kubectl apply -f namespace.yaml

# Aplique deployments e services
kubectl apply -f deployments/
kubectl apply -f services/

# Habilite o ingress controller (exemplo com minikube)
minikube addons enable ingress

# Aplique o Ingress
kubectl apply -f ingress/ingress.yaml

# Pegue o IP do minikube
minikube ip
```

---

## 🧪 Testes

```bash
curl http://<MINIKUBE_IP>/auth/health
curl http://<MINIKUBE_IP>/users/health
```

---

## ✅ Conceitos Demonstrados

- Separação de microserviços
- Deploy e gerenciamento com `Deployment`
- Exposição com `Service`
- Roteamento com `Ingress`
- Imagens Docker públicas
- Possível integração com `HPA`

---

## 👨‍💻 Autor

Feito por [Seu Nome Aqui]  
GitHub: [github.com/seuusuario](https://github.com/seuusuario)