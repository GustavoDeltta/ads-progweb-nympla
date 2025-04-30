/* Usuários não logáveis, pois a senha não é criptografada ao ser inserida diretamente no banco de dados. (apenas para exibição e testes) */
INSERT INTO users (name, email, password, dob, role)
VALUES
  ('Carlos', 'carlos@gmail.com', 'senha101', '1990-03-12', 'user'),
  ('Fernanda', 'fernanda@gmail.com', 'senha202', '1994-05-25', 'user'),
  ('Ricardo', 'ricardo@gmail.com', 'senha303', '1987-09-30', 'user'),
  ('Juliana', 'juliana@gmail.com', 'senha404', '1993-11-02', 'user'),
  ('Beatriz', 'beatriz@gmail.com', 'senha505', '1991-01-16', 'user'),
  ('admin', 'admin@gmail.com', 'admin', '1991-01-16', 'admin');

  /* Para testar, por gentileza criar um usuário no sistema e mudar manualmente sua role para admin no banco de dados */

select * from users

INSERT INTO events (title, date, description, image_url)
VALUES
  ('Conecta Imobi - 2025', '2025-07-01 10:00:00', 'Evento presencial em São Paulo Expo, São Paulo - SP', 'https://images.sympla.com.br/67f02c722a801-lg.jpg'),
  ('RIO2C 2025 | CREATOR', '2025-07-15 14:00:00', 'Evento presencial em Cidade das Artes, Rio de Janeiro - RJ', 'https://images.sympla.com.br/674fb92308039-lg.png'),
  ('iFood MOVE - 2025', '2025-08-05 09:00:00', 'Evento presencial em São Paulo Expo, São Paulo - SP', 'https://images.sympla.com.br/67d0b36074da7-lg.png'),
  ('House Paradise | Vintage Culture', '2025-08-20 18:00:00', 'Evento presencial em Parque de Exposições de Divinópolis, Divinópolis - MG', 'https://images.sympla.com.br/6810f751d7067-lg.jpg'),
  ('NUMANICE | RIO DE JANEIRO', '2025-09-10 17:00:00', 'Evento presencial em Gramado do Riocentro, Rio de Janeiro - RJ', 'https://images.sympla.com.br/67e16bfe700d7-lg.jpg');

select * from events

INSERT INTO subscriptions (user_id, event_id, check_in)
VALUES
  (1, 2, 'pending'),
  (2, 3, 'pending'),
  (3, 4, 'pending'),
  (4, 5, 'pending'),
  (5, 1, 'pending'),
  (2, 4, 'pending'),
  (3, 2, 'pending'),
  (4, 3, 'pending'),
  (5, 5, 'pending');

select * from subscriptions
