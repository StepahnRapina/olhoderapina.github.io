<?php
if(isset($_POST['email'])) {
    $email = $_POST['email'];
    $to = "olhoderapinaoficial@gmail.com"; 
    $subject = "Novo inscrito na newsletter";
    $message = "Um novo usuário se inscreveu com o e-mail: " . $email;
    $headers = "From: no-reply@seudominio.com";

    mail($to, $subject, $message, $headers);
    echo "Obrigado por se inscrever!";
}
?>
