<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Перевіряємо, чи була відправлена ​​форма
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Зчитуємо JSON дані з тіла запиту
    $data = json_decode(file_get_contents('php://input'), true); 

    // Задаємо змінні для даних форми
    $formName = 'Форма з сайту Pilgrimage';
    $name = !empty($data['name']) ? "<b>Ім'я: </b>". $data['name'] ."<br>" : ''; 
    $email = !empty($data['email']) ? "<b>Пошта: </b>". $data['email'] ."<br>" : '';
    $phone = !empty($data['phone']) ? "<b>Телефон: </b>". $data['phone'] ."<br>" : '';
    $formFrom = !empty($data['formFrom']) ? "<b>Відправлення зі сторінки:</b> ". $data['formFrom'] ."<br>" : '';

    // Створюємо новий об'єкт PHPMailer
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('uk', 'PHPMailer/language/');
    $mail->IsHTML(true);

    // Налаштування SMTP
    $mail->SMTPDebug = 0;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'ukraineafon@gmail.com';
    $mail->Password = 'jhpj bluv byzr retp';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    // Від кого лист 
    $mail->setFrom('ukraineafon@gmail.com', ' GORA');

    // Кому лист
    $mail->addAddress('ukraineafon@gmail.com', ' GORA');

    // Тема листа
    $mail->Subject = 'Форма з сайту Pilgrimage';

    // Тіло листа
    $mail->Body =
    '<p><strong><h3>'.$formName.'</h3></strong></p><br/>'.
    '<p>'.$name.' </p>'.
    '<p>'.$email.'</p>'.
    '<p>'.$phone.'</p>'. 
    '<p>'.$formFrom.'</p>';

    // Надсилаємо лист
    if ($mail->send()) {
        echo 'Ваше повідомлення надіслане!';
    } else {
        echo 'Виникла помилка, сбробуй ще раз :) : ' . $mail->ErrorInfo;
    }
}
?>
