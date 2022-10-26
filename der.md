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

# AuPairIdioma
- id_aupair
- id_idioma
- nivel

# Agencia

# Familia

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

# VagaIdioma
- id_vaga
- id_idioma
- nivel

---
# Cenários

1. A famiília informa dias da semana e horários de trabalho e folgas.
2. Períodi de duração da vaga (data inicial e data final).
3. A au pair informa a data de embarque. Exemplo: 1 de janeiro de 2023
