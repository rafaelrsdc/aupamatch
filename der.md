# User
- email
- senha
- id_aupair
- id_agencia
- id_familia

# AuPair
- id_escolaridade
- experiencia
- natacao:bool
- habilitada:bool
- foto:varchar
- carro_exclusivo:bool
- tem_agencia:bool
- qnt_criancas

# AuPairIdioma
- id_aupair
- id_idioma
- nivel

# Agencia

# Familia
- tem_agencia:bool

# Idiomas
- id
- desc

# Escolaridade
- id
- desc

# Vaga
- id_escolaridade
- experiencia
- natacao:bool
- habilitada:bool
- carro_exclusivo:bool
- qnt_criancas
- desc

# VagaIdioma
- id_vaga
- id_idioma
- nivel

# AuPairCertificado
- id_aupair
- id_certificado
- data_validade_inicio
- data_validade_fim
- link
- desc
- titulo

---
# Cenários

1. A famiília informa dias da semana e horários de trabalho e folgas.
2. Períodi de duração da vaga (data inicial e data final).
3. A au pair informa a data de embarque. Exemplo: 1 de janeiro de 2023

---
# Notas
1. Considerar paginação
2. MPV
  - Cadastro de cada perfil (família e au pair)
  - Log in
  - Home
  - Publicação de vagas pela família
  - Painel de vagas: visualização de vagas pelo au pair (tela do Figma)
  - Match: exibir vagas em ordem decrescente de compatibilidade
