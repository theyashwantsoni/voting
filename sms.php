<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
$data = json_decode( file_get_contents( 'php://input' ), true );

$q = $data['email'];

$q1 = $data['password'];
$q2 = $data['otp'];
$msg = 'welcome to the most secured way of voting. your otp is '.$q2.' and aadhar is'.$q1;

$fields = array(
    "sender_id" => "FSTSMS",
    "message" => $msg,
    "language" => "english",
    "route" => "p",
    "numbers" => $q,
    "flash" => "1"
);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://www.fast2sms.com/dev/bulk",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode($fields),
  CURLOPT_HTTPHEADER => array(
    "authorization: ojZH2OAqCNUnt3z1kPQDa5guLWr6xl0I8hEJdFwmYRpSTscXGVPYwKZ8oUQzEfCbGtpyO43WqJL2Ve0R",
    "accept: */*",
    "cache-control: no-cache",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo 0;
} else {
  echo 1;
}
