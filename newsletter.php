<?php
$status = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $to = "olhoderapinaoficial@gmail.com";
        $subject = "Novo inscrito na newsletter";
        $message = "Um novo usuário se inscreveu com o e-mail: " . $email;
        $headers = "From: no-reply@olhoderapina.com.br\r\nReply-To: no-reply@olhoderapina.com.br";

        if (mail($to, $subject, $message, $headers)) {
            $status = "Obrigado por se inscrever!";
        } else {
            $status = "Erro ao enviar. Tente novamente mais tarde.";
        }
    } else {
        $status = "Endereço de e-mail inválido.";
    }
}
?>
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Inscrição Newsletter</title>
  <style>body{font-family:Arial,Helvetica,sans-serif;padding:20px}</style>
</head>
<body>
  <?php if ($status): ?>
    <p><?php echo htmlspecialchars($status, ENT_QUOTES); ?></p>
  <?php endif; ?>

  <form method="post" action="">
    <label for="email">E-mail:</label><br />
    <input id="email" name="email" type="email" required /><br /><br />
    <button type="submit">Inscrever</button>
  </form>
</body>
</html>